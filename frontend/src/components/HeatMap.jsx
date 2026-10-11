import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function HeatMap({ setActivePage }) {
  const [activeLayer, setActiveLayer] = useState("Thermal Risk");
  const [selectedZone, setSelectedZone] = useState(null);

  const mapCenter = [20.2961, 85.8245];

  const zones = [
    {
      id: 1,
      name: "Patia",
      position: [20.354, 85.819],
      temperature: "41.2°C",
      vegetation: "12%",
      builtUp: "78%",
      population: "48,200",
      risk: 92,
      status: "Critical",
      radius: 900,
      recommendation:
        "Prioritize urban forestry, cool roofs and shaded pedestrian corridors.",
    },
    {
      id: 2,
      name: "Khandagiri",
      position: [20.257, 85.776],
      temperature: "39.4°C",
      vegetation: "18%",
      builtUp: "69%",
      population: "36,700",
      risk: 74,
      status: "High",
      radius: 750,
      recommendation:
        "Increase vegetation coverage and target exposed built-up surfaces.",
    },
    {
      id: 3,
      name: "Saheed Nagar",
      position: [20.296, 85.846],
      temperature: "37.6°C",
      vegetation: "24%",
      builtUp: "61%",
      population: "29,400",
      risk: 61,
      status: "Medium",
      radius: 650,
      recommendation:
        "Improve shade coverage and identify high-exposure public areas.",
    },
    {
      id: 4,
      name: "Old Town",
      position: [20.238, 85.834],
      temperature: "34.8°C",
      vegetation: "36%",
      builtUp: "47%",
      population: "21,800",
      risk: 47,
      status: "Low",
      radius: 600,
      recommendation:
        "Maintain existing vegetation and protect current cooling assets.",
    },
  ];

  const getZoneColor = (risk) => {
    if (risk >= 80) {
      return "#c93b2d";
    }

    if (risk >= 65) {
      return "#e8751a";
    }

    if (risk >= 50) {
      return "#d4a72c";
    }

    return "#4d8a67";
  };

  const getLayerValue = (zone) => {
    if (activeLayer === "Temperature") {
      return zone.temperature;
    }

    if (activeLayer === "WBGT") {
      const wbgtValues = {
        Patia: "33.8°C",
        Khandagiri: "32.1°C",
        "Saheed Nagar": "30.7°C",
        "Old Town": "28.9°C",
      };

      return wbgtValues[zone.name];
    }

    if (activeLayer === "Population") {
      return zone.population;
    }

    return zone.risk;
  };

  const selectZone = (zone) => {
    setSelectedZone(zone);
  };

  return (
    <div className="heatmap-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="page-header">

        <div className="page-header-copy">

          <div className="page-eyebrow">
            SPATIAL HEAT INTELLIGENCE
          </div>

          <h1 className="page-title">
            Heat Map
          </h1>

          <p className="page-description">
            Explore ward-level thermal conditions,
            human heat risk and population exposure
            across Bhubaneswar.
          </p>

        </div>

        <div className="overview-header-location">

          <span className="overview-location-dot"></span>

          <div>

            <div className="overview-location-city">
              Bhubaneswar
            </div>

            <div className="overview-location-state">
              Odisha, India
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAP WORKSPACE
          ===================================================== */}

      <section className="heatmap-workspace">

        {/* ===================================================
            MAP AREA
            =================================================== */}

        <div className="heatmap-map-container">

          <div className="heatmap-layer-control">

            <div className="heatmap-layer-label">
              MAP LAYER
            </div>

            <div className="heatmap-layer-buttons">

              {[
                "Thermal Risk",
                "Temperature",
                "WBGT",
                "Population",
              ].map((layer) => (
                <button
                  type="button"
                  key={layer}
                  className={
                    activeLayer === layer
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveLayer(layer)
                  }
                >
                  {layer}
                </button>
              ))}

            </div>

          </div>


          <MapContainer
            center={mapCenter}
            zoom={12}
            scrollWheelZoom={true}
            className="heatmap-map"
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {zones.map((zone) => (
              <Circle
                key={zone.id}
                center={zone.position}
                radius={zone.radius}
                pathOptions={{
                  color: getZoneColor(zone.risk),
                  fillColor: getZoneColor(zone.risk),
                  fillOpacity:
                    selectedZone?.id === zone.id
                      ? 0.48
                      : 0.28,
                  weight:
                    selectedZone?.id === zone.id
                      ? 3
                      : 1.5,
                }}
                eventHandlers={{
                  click: () => selectZone(zone),
                }}
              >

                <Popup>

                  <div className="map-popup">

                    <div className="map-popup-title">
                      {zone.name}
                    </div>

                    <div className="map-popup-status">
                      {zone.status} Risk
                    </div>

                    <div className="map-popup-grid">

                      <span>
                        Surface temperature
                      </span>

                      <strong>
                        {zone.temperature}
                      </strong>

                      <span>
                        Risk score
                      </span>

                      <strong>
                        {zone.risk}
                      </strong>

                      <span>
                        Population
                      </span>

                      <strong>
                        {zone.population}
                      </strong>

                    </div>

                  </div>

                </Popup>

              </Circle>
            ))}

          </MapContainer>


          {/* HISTORICAL DATA LABEL */}

          <div className="heatmap-data-label">

            <span className="data-label-dot"></span>

            <div>

              <strong>
                SATELLITE-DERIVED ANALYSIS
              </strong>

              <span>
                Bhubaneswar · Pre-monsoon 2024
              </span>

            </div>

          </div>


          {/* MAP LEGEND */}

          <div className="heatmap-legend">

            <div className="heatmap-legend-title">
              THERMAL RISK
            </div>

            <div className="heatmap-legend-scale">

              <span className="legend-item critical">
                <i></i>
                Critical
              </span>

              <span className="legend-item high">
                <i></i>
                High
              </span>

              <span className="legend-item medium">
                <i></i>
                Medium
              </span>

              <span className="legend-item low">
                <i></i>
                Low
              </span>

            </div>

          </div>

        </div>


        {/* ===================================================
            INTELLIGENCE PANEL
            =================================================== */}

        <aside className="heatmap-intelligence">

          <div className="heatmap-panel-header">

            <div>

              <div className="dashboard-card-title">
                Risk Hotspots
              </div>

              <div className="dashboard-card-subtitle">
                Priority locations across the city
              </div>

            </div>

            <div className="heatmap-hotspot-count">
              {zones.length}
            </div>

          </div>


          {/* ZONE LIST */}

          <div className="heatmap-zone-list">

            {zones.map((zone) => (

              <button
                type="button"
                key={zone.id}
                className={`heatmap-zone-item ${
                  selectedZone?.id === zone.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => selectZone(zone)}
              >

                <div className="heatmap-zone-main">

                  <div>

                    <strong>
                      {zone.name}
                    </strong>

                    <span>
                      {zone.temperature}
                    </span>

                  </div>

                  <div
                    className={`heatmap-zone-status ${
                      zone.status.toLowerCase()
                    }`}
                  >
                    {zone.status}
                  </div>

                </div>


                <div className="heatmap-zone-bottom">

                  <span>
                    Risk score
                  </span>

                  <strong>
                    {zone.risk}
                  </strong>

                  <span className="heatmap-zone-population">
                    {zone.population} exposed
                  </span>

                </div>

              </button>

            ))}

          </div>


          {/* =================================================
              SELECTED ZONE
              ================================================= */}

          {selectedZone ? (

            <div className="heatmap-selected-zone">

              <div className="selected-zone-header">

                <div>

                  <span>
                    SELECTED HOTSPOT
                  </span>

                  <h3>
                    {selectedZone.name}
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedZone(null)
                  }
                  aria-label="Close selected zone"
                >
                  ×
                </button>

              </div>


              <div className="selected-zone-metrics">

                <div>

                  <span>
                    SURFACE TEMP.
                  </span>

                  <strong>
                    {selectedZone.temperature}
                  </strong>

                </div>

                <div>

                  <span>
                    VEGETATION
                  </span>

                  <strong>
                    {selectedZone.vegetation}
                  </strong>

                </div>

                <div>

                  <span>
                    BUILT-UP
                  </span>

                  <strong>
                    {selectedZone.builtUp}
                  </strong>

                </div>

                <div>

                  <span>
                    RISK SCORE
                  </span>

                  <strong>
                    {selectedZone.risk}
                  </strong>

                </div>

              </div>


              <div className="selected-zone-population">

                <span>
                  POPULATION EXPOSURE
                </span>

                <strong>
                  {selectedZone.population}
                </strong>

              </div>


              <div className="selected-zone-insight">

                <div className="selected-zone-insight-label">
                  AI RECOMMENDATION
                </div>

                <p>
                  {selectedZone.recommendation}
                </p>

              </div>


              <button
                type="button"
                className="selected-zone-action"
                onClick={() =>
                  setActivePage("AI Cooling Plan")
                }
              >
                Create cooling plan
                <span>→</span>
              </button>

            </div>

          ) : (

            <div className="heatmap-empty-selection">

              <div className="empty-selection-mark">
                +
              </div>

              <strong>
                Select a hotspot
              </strong>

              <p>
                Click a risk zone on the map or select
                a location from the list to inspect its
                thermal intelligence.
              </p>

            </div>

          )}

        </aside>

      </section>


      {/* =====================================================
          MAP SUMMARY
          ===================================================== */}

      <section className="heatmap-summary-grid">

        <div className="dashboard-card">

          <div className="summary-card-label">
            THERMAL HOTSPOT
          </div>

          <div className="summary-card-value">
            18
          </div>

          <div className="summary-card-description">
            high-risk areas identified across the
            monitored city region.
          </div>

        </div>


        <div className="dashboard-card">

          <div className="summary-card-label">
            VULNERABLE POPULATION
          </div>

          <div className="summary-card-value">
            2.4L
          </div>

          <div className="summary-card-description">
            estimated population exposed to elevated
            human thermal stress.
          </div>

        </div>


        <div className="dashboard-card">

          <div className="summary-card-label">
            COOLING OPPORTUNITY
          </div>

          <div className="summary-card-value">
            HIGH
          </div>

          <div className="summary-card-description">
            multiple priority zones have strong
            intervention potential.
          </div>

        </div>


        <div className="dashboard-card">

          <div className="summary-card-label">
            ACTIVE LAYER
          </div>

          <div className="summary-card-value summary-layer-value">
            {getLayerValue(
              selectedZone || zones[0]
            )}
          </div>

          <div className="summary-card-description">
            {activeLayer} view currently selected.
          </div>

        </div>

      </section>

    </div>
  );
}

export default HeatMap;