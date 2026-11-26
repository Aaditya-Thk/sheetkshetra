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


def _join(names, limit=3):
    """Join up to `limit` names as 'A, B and C'."""
    names = names[:limit]
    if len(names) <= 1:
        return "".join(names)
    return ", ".join(names[:-1]) + " and " + names[-1]


def format_shap_insights(raw_shap_list):
    insights = []
    warming_factors = []
    cooling_factors = []

    for item in raw_shap_list:
        raw_feat = item.get("feature")
        name = FEATURE_DISPLAY_NAMES.get(raw_feat, raw_feat)
        # `or 0.0` also handles explicit None values, not just missing keys
        val = item.get("shap_value") or 0.0
        pct = item.get("contribution_pct") or 0.0

        if val > 0:
            impact = "Warming"
            warming_factors.append(name)
        elif val < 0:
            impact = "Cooling"
            cooling_factors.append(name)
        else:
            impact = "Neutral"

        insights.append(
            {
                "feature": raw_feat,
                "display_name": name,
                "impact": impact,
                "contribution_pct": pct,
            }
        )

    if warming_factors and cooling_factors:
        narrative = (
            f"Warmer than expected, mainly because of {_join(warming_factors)}. "
            f"However, it is partly cooled by {_join(cooling_factors)}."
        )
    elif warming_factors:
        narrative = f"Warmer than expected, mainly because of {_join(warming_factors)}."
    elif cooling_factors:
        narrative = f"Cooler than expected, helped by {_join(cooling_factors)}."
    else:
        narrative = "Temperature is within expected baseline range."

    return narrative, insights
