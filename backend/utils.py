FEATURE_DISPLAY_NAMES = {
    "population": "Population density",
    "NDBI": "Concrete/built-up density",
    "NDVI": "Vegetation cover",
    "NDWI": "Water presence",
    "albedo": "Surface reflectivity",
    "building_density": "Building density",
    "road_density": "Road density",
    "impervious_fraction": "Paved/impervious surface",
    "dist_to_water": "Distance to water",
    "dist_to_green": "Distance to green space",
    "elevation": "Elevation",
    "slope": "Terrain slope",
    "air_temp": "Regional air temperature",
    "wind_speed": "Wind speed",
    "humidity": "Humidity",
    "lulc_Built-up": "Built-up land cover",
    "lulc_Tree cover": "Tree cover",
    "lulc_Cropland": "Cropland",
    "lulc_Grassland": "Grassland",
    "lulc_Bare/sparse vegetation": "Bare/sparse vegetation",
    "lulc_Water": "Water body",
    "lulc_Shrubland": "Shrubland",
    "lulc_Wetland": "Wetland",
}


def format_shap_insights(raw_shap_list):
    insights = []
    warming_factors = []
    cooling_factors = []

    for item in raw_shap_list:
        raw_feat = item.get("feature")
        name = FEATURE_DISPLAY_NAMES.get(raw_feat, raw_feat)
        val = item.get("shap_value", 0.0)
        pct = item.get("contribution_pct", 0.0)
        if val > 0:
            impact = "Warming"
        else:
            impact = "Cooling"
        if val > 0:
            warming_factors.append(name)
        else:
            cooling_factors.append(name)

    insights.append(
                {
                    "feature": raw_feat,
                    "display_name": name,
                    "impact": impact,
                    "contribution_pct": pct,
                }
            )

    narrative_parts = []
    if warming_factors:
        narrative_parts.append(
            f"Warmer than expected primarily due to high {', '.join(warming_factors)}"
        )
    if cooling_factors:
        narrative_parts.append(f"cooled partially by {', '.join(cooling_factors)}")

    narrative = (
        ". However, it is ".join(narrative_parts) + "."
        if narrative_parts
        else "Temperature is within expected baseline range."
    )
    return narrative, insights
