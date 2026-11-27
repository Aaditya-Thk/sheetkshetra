from typing import List, Literal

from pydantic import BaseModel, Field

InterventionType = Literal[
    "plant_trees",
    "cool_roofs",
    "green_roofs",
    "reflective_roads",
    "green_corridors",
    "water_bodies",
]


# GET /api/cell-info
class ShapFeatureInsight(BaseModel):
    feature: str
    display_name: str
    impact: Literal["Warming", "Cooling", "Neutral"]
    contribution_pct: float


class CellInfoResponse(BaseModel):
    cell_id: str
    actual_lst: float
    predicted_lst: float
    lulc_class: str
    narrative: str
    top_features: List[ShapFeatureInsight]


# POST /api/simulate
class SimulationRequest(BaseModel):
    lat: float = Field(..., ge=-90, le=90)
    lon: float = Field(..., ge=-180, le=180)
    intervention_type: InterventionType = Field(
        ...,
        description=(
            "One of: plant_trees, cool_roofs, green_roofs, "
            "reflective_roads, green_corridors, water_bodies"
        ),
    )
    quantity: float = Field(
        1.0,
        gt=0,
        le=100,
        description="Area of intervention in hectares (must be > 0, max 100).",
    )


class SimulationResponse(BaseModel):
    cell_id: str
    intervention_type: str
    baseline_lst: float
    new_lst: float
    temp_drop_celsius: float
    estimated_cost_inr: float
    population_benefited: float
    clamped: bool