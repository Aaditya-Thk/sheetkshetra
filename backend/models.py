from pydantic import BaseModel, Field
from typing import List, Optional

# GET /api/cell-info
class ShapFeatureInsight(BaseModel):
    feature: str
    display_name: str
    impact: str #"Warming"/"Cooling"
    contribution_pct: float

class CellInfoResponse(BaseModel):
    cell_id: str
    actual_lst: float
    predicted_lst: float
    lulc_class: str
    narrative: str
    top_features: List[ShapFeatureInsight]

#POST /api/simulate
class SimulationRequest(BaseModel):
    lat: float
    lon: float
    intervention_type: str = Field(..., description="One of: plant_trees," \
    " cool_roofs,green_roofs, reflective_roads, green_corridors, water_bodies")
    quantity: float = 1.0

class SimulationResponse(BaseModel):
    cell_id: str
    intervention_type: str
    baseline_lst: float
    new_lst: float
    temp_drop_celsius: float
    estimated_cost_inr: float
    population_benefited: float
    clamped: bool