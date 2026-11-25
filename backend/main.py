import json
import pickle
import pandas as pd
import numpy as np
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from database import get_db
from models import (
    CellInfoResponse,
    SimulationRequest,
    SimulationResponse
)
from utils import format_shap_insights

app = FastAPI(title="SheetKshetra Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


with open("xgboost_residual_model.pkl", "rb") as f:
    model_bundle = pickle.load(f)
    xgb_model = model_bundle["model"]
    feature_cols = model_bundle["feature_cols"]

interventions_df = pd.read_csv("intervention_deltas_and_costs.csv")


@app.get("/")
def root():
    return {"status": "SheetKshetra backend online"}


# Endpoint 1: Nearest cell info & SHAP explanation
@app.get("/api/cell-info", response_model=CellInfoResponse)
def get_cell_info(lat: float, lon: float, db: Session = Depends(get_db)):
    query = text("""
        SELECT cell_id, actual_lst, predicted_lst, lulc_class, shap_top_features
        FROM grid_cells
        ORDER BY geom <-> ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
        LIMIT 1;
    """)
    result = db.execute(query, {"lon": lon, "lat": lat}).mappings().first()
    
    if not result:
        raise HTTPException(status_code=404, detail="No cell found for given coordinates")
    
    raw_shap = result["shap_top_features"]
    if isinstance(raw_shap, str):
        raw_shap = json.loads(raw_shap)
        
    narrative, formatted_insights = format_shap_insights(raw_shap or [])
    
    return {
        "cell_id": str(result["cell_id"]),
        "actual_lst": round(result["actual_lst"], 2),
        "predicted_lst": round(result["predicted_lst"], 2),
        "lulc_class": result["lulc_class"],
        "narrative": narrative,
        "top_features": formatted_insights
    }


# Endpoint 2: What-if heat mitigation simulation
@app.post("/api/simulate", response_model=SimulationResponse)
def simulate_intervention(payload: SimulationRequest, db: Session = Depends(get_db)):
    
    query = text("""
        SELECT *
        FROM grid_cells
        ORDER BY geom <-> ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
        LIMIT 1;
    """)
    cell = db.execute(query, {"lon": payload.lon, "lat": payload.lat}).mappings().first()
    
    if not cell:
        raise HTTPException(status_code=404, detail="Grid cell not found")
    matching_rows = interventions_df[
        interventions_df["intervention_type"] == payload.intervention_type
    ]
    if matching_rows.empty:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid intervention_type: {payload.intervention_type}"
        )
    cell_dict = dict(cell)
    input_data = {}
    
 
    for col in feature_cols:
        db_key = col.lower()
        if col.startswith("lulc_"):
            actual_class = cell_dict.get("lulc_class")
            target_class = col.replace("lulc_", "")
            input_data[col] = 1.0 if actual_class == target_class else 0.0
        else:
            val = cell_dict.get(db_key, cell_dict.get(col, 0.0))
            input_data[col] = float(val) if val is not None else 0.0
    total_cost = 0.0
    max_drop = float(matching_rows["max_plausible_drop_c"].iloc[0])

    for _, row in matching_rows.iterrows():
        feat = row["feature_modified"]
        delta = float(row["delta_value"]) * payload.quantity
        cost_unit = float(row["cost_per_unit"]) * payload.quantity
        total_cost += cost_unit
        for col in feature_cols:
            if col.lower() == feat.lower():
                input_data[col] += delta

   
    df_features = pd.DataFrame([input_data])[feature_cols]
    new_residual = float(xgb_model.predict(df_features)[0])

    
    invest_base = cell_dict.get("invest_baseline_lst")
    if invest_base is not None:
        baseline_lst = float(cell_dict.get("actual_lst") or cell_dict.get("predicted_lst"))
        simulated_lst = float(invest_base) + new_residual
    else:
        baseline_lst = float(cell_dict.get("actual_lst") or cell_dict.get("predicted_lst"))
        orig_residual = float(cell_dict.get("predicted_residual") or 0.0)
        simulated_lst = baseline_lst + (new_residual - orig_residual)

    temp_drop = baseline_lst - simulated_lst
    clamped = False

   
    if temp_drop > max_drop:
        temp_drop = max_drop
        simulated_lst = baseline_lst - temp_drop
        clamped = True
    elif temp_drop < 0:
        temp_drop = 0.0
        simulated_lst = baseline_lst

    population_benefited = float(cell_dict.get("population") or 0.0)

    return {
        "cell_id": str(cell["cell_id"]),
        "intervention_type": payload.intervention_type,
        "baseline_lst": round(baseline_lst, 2),
        "new_lst": round(simulated_lst, 2),
        "temp_drop_celsius": round(temp_drop, 2),
        "estimated_cost_inr": round(total_cost, 2),
        "population_benefited": round(population_benefited, 2),
        "clamped": clamped
    }