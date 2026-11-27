import json
import logging
import os
import pickle
from pathlib import Path

import pandas as pd
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from models import CellInfoResponse, SimulationRequest, SimulationResponse
from utils import format_shap_insights

logger = logging.getLogger("sheetkshetra")

BASE_DIR = Path(__file__).resolve().parent

# ---------------------------------------------------------------------------
# Settings
# ---------------------------------------------------------------------------

# Clicks farther than this from the nearest grid cell are rejected (404).
# Set it to roughly your grid cell size. Override with the env var if needed.
MAX_CELL_DISTANCE_M = float(os.getenv("MAX_CELL_DISTANCE_M", "500"))

# Comma-separated list, e.g. "http://localhost:3000,https://your-frontend.com"
ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",") if o.strip()
]

# ASSUMPTION (confirm with your team): `quantity` = hectares of intervention.
# The CSV deltas are per 1 hectare treated, and the CSV costs are converted
# to a per-hectare cost with these multipliers.
#   "per tree" -> the CSV delta is "per 100 trees/hectare", so 100 trees per ha
#   "per sqm"  -> 10,000 sqm per hectare
COST_UNITS_PER_HECTARE = {
    "per tree": 100,
    "per sqm": 10_000,
}

# Physical limits applied to a feature after an intervention is added.
# (min, max); None means no limit on that side. Keys are lower-case.
FEATURE_BOUNDS = {
    "ndvi": (-1.0, 1.0),
    "ndwi": (-1.0, 1.0),
    "albedo": (0.0, 1.0),
    "impervious_fraction": (0.0, 1.0),
    "dist_to_green": (0.0, None),
    "dist_to_water": (0.0, None),
}

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(title="SheetKshetra Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    # Browsers reject credentials together with a wildcard origin
    allow_credentials=ALLOWED_ORIGINS != ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Only unpickle files you created yourself - pickle can run arbitrary code.
with open(BASE_DIR / "xgboost_residual_model.pkl", "rb") as f:
    model_bundle = pickle.load(f)
    xgb_model = model_bundle["model"]
    feature_cols = model_bundle["feature_cols"]

interventions_df = pd.read_csv(BASE_DIR / "intervention_deltas_and_costs.csv")
interventions_df["cost_per_unit"] = interventions_df["cost_per_unit"].fillna(0)

_required_cols = {
    "intervention_type",
    "feature_modified",
    "delta_value",
    "cost_per_unit",
    "cost_unit",
    "max_plausible_drop_c",
}
_missing_cols = _required_cols - set(interventions_df.columns)
if _missing_cols:
    raise RuntimeError(f"intervention CSV is missing columns: {sorted(_missing_cols)}")

_unknown_units = set(
    interventions_df.loc[interventions_df["cost_per_unit"] > 0, "cost_unit"]
) - set(COST_UNITS_PER_HECTARE)
if _unknown_units:
    raise RuntimeError(
        f"No hectare conversion for cost_unit values: {sorted(_unknown_units)}. "
        "Add them to COST_UNITS_PER_HECTARE."
    )

COL_BY_LOWER = {c.lower(): c for c in feature_cols}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

NEAREST_CELL_SQL = text(
    """
    SELECT *,
           ST_Distance(
               geom::geography,
               ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography
           ) AS dist_m
    FROM grid_cells
    ORDER BY geom <-> ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
    LIMIT 1;
    """
)


def find_nearest_cell(db: Session, lat: float, lon: float) -> dict:
    row = db.execute(NEAREST_CELL_SQL, {"lon": lon, "lat": lat}).mappings().first()
    if row is None:
        raise HTTPException(status_code=404, detail="No cell found for given coordinates")
    cell = dict(row)
    dist_m = cell.get("dist_m")
    if dist_m is not None and float(dist_m) > MAX_CELL_DISTANCE_M:
        raise HTTPException(
            status_code=404,
            detail="Location is outside the mapped area",
        )
    return cell


def get_lst_values(cell: dict):
    """Return (actual_lst, predicted_lst), using one to fill in the other."""
    actual = cell.get("actual_lst")
    predicted = cell.get("predicted_lst")
    if actual is None and predicted is None:
        raise HTTPException(
            status_code=422, detail="This cell has no temperature data"
        )
    actual = float(actual if actual is not None else predicted)
    predicted = float(predicted if predicted is not None else actual)
    return actual, predicted


def build_feature_row(cell: dict) -> dict:
    row = {}
    missing = []
    for col in feature_cols:
        if col.startswith("lulc_"):
            target_class = col[len("lulc_"):]
            row[col] = 1.0 if cell.get("lulc_class") == target_class else 0.0
            continue
        key = col.lower() if col.lower() in cell else col
        if key not in cell:
            missing.append(col)
        val = cell.get(key)
        row[col] = float(val) if val is not None else 0.0
    if missing:
        logger.warning("Columns missing from grid_cells, defaulted to 0: %s", missing)
    return row


def clamp_feature(col: str, value: float) -> float:
    low, high = FEATURE_BOUNDS.get(col.lower(), (None, None))
    if low is not None:
        value = max(low, value)
    if high is not None:
        value = min(high, value)
    return value


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@app.get("/")
def root():
    return {"status": "SheetKshetra backend online"}


# Endpoint 1: Nearest cell info & SHAP explanation
@app.get("/api/cell-info", response_model=CellInfoResponse)
def get_cell_info(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    db: Session = Depends(get_db),
):
    cell = find_nearest_cell(db, lat, lon)
    actual_lst, predicted_lst = get_lst_values(cell)

    raw_shap = cell.get("shap_top_features")
    if isinstance(raw_shap, str):
        try:
            raw_shap = json.loads(raw_shap)
        except ValueError:
            logger.warning("Bad shap_top_features JSON for cell %s", cell.get("cell_id"))
            raw_shap = []

    narrative, formatted_insights = format_shap_insights(raw_shap or [])

    return {
        "cell_id": str(cell["cell_id"]),
        "actual_lst": round(actual_lst, 2),
        "predicted_lst": round(predicted_lst, 2),
        "lulc_class": str(cell.get("lulc_class") or "Unknown"),
        "narrative": narrative,
        "top_features": formatted_insights,
    }


# Endpoint 2: What-if heat mitigation simulation
@app.post("/api/simulate", response_model=SimulationResponse)
def simulate_intervention(payload: SimulationRequest, db: Session = Depends(get_db)):
    matching_rows = interventions_df[
        interventions_df["intervention_type"] == payload.intervention_type
    ]
    if matching_rows.empty:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid intervention_type: {payload.intervention_type}",
        )

    cell = find_nearest_cell(db, payload.lat, payload.lon)
    baseline_lst, _ = get_lst_values(cell)

    base_features = build_feature_row(cell)
    new_features = dict(base_features)
    modified_cols = set()
    total_cost = 0.0
    max_drop = float(matching_rows["max_plausible_drop_c"].iloc[0])

    for _, row in matching_rows.iterrows():
        feat = str(row["feature_modified"])
        col = COL_BY_LOWER.get(feat.lower())
        if col is None:
            logger.warning("Feature '%s' is not used by the model, skipped", feat)
        else:
            new_features[col] += float(row["delta_value"]) * payload.quantity
            modified_cols.add(col)

        cost_per_unit = float(row["cost_per_unit"])
        if cost_per_unit > 0:
            units_per_hectare = COST_UNITS_PER_HECTARE[row["cost_unit"]]
            total_cost += cost_per_unit * units_per_hectare * payload.quantity

    for col in modified_cols:
        new_features[col] = clamp_feature(col, new_features[col])

    # Predict the original and modified cell with the same model, so the
    # difference only reflects the intervention.
    df_features = pd.DataFrame([base_features, new_features])[feature_cols]
    base_residual, new_residual = (float(v) for v in xgb_model.predict(df_features))

    temp_drop = base_residual - new_residual
    clamped = False

    if temp_drop > max_drop:
        temp_drop = max_drop
        clamped = True
    elif temp_drop < 0:
        temp_drop = 0.0

    simulated_lst = baseline_lst - temp_drop
    population_benefited = float(cell.get("population") or 0.0)

    return {
        "cell_id": str(cell["cell_id"]),
        "intervention_type": payload.intervention_type,
        "baseline_lst": round(baseline_lst, 2),
        "new_lst": round(simulated_lst, 2),
        "temp_drop_celsius": round(temp_drop, 2),
        "estimated_cost_inr": round(total_cost, 2),
        "population_benefited": round(population_benefited, 2),
        "clamped": clamped,
    }