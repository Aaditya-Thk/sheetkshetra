import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function HeatMap() {

  const [selectedZone, setSelectedZone] = useState(null);

  const bhubaneswar = [20.2961, 85.8245];

  const heatZones = [

    {
      name: "Patia",
      position: [20.3558, 85.8187],
      temperature: 41.2,
      vegetation: 12,
      builtUp: 78,
      population: "48,200",
      risk: 92,
      level: "Critical",
      radius: 900,
      color: "#ef4444"
    },

    {
      name: "Khandagiri",
      position: [20.2547, 85.7755],
      temperature: 39.4,
      vegetation: 18,
      builtUp: 69,
      population: "36,700",
      risk: 74,
      level: "High",
      radius: 750,
      color: "#f97316"
    },

    {
      name: "Saheed Nagar",
      position: [20.3008, 85.8424],
      temperature: 37.6,
      vegetation: 24,
      builtUp: 61,
      population: "29,400",
      risk: 61,
      level: "Medium",
      radius: 650,
      color: "#eab308"
    },

    {
      name: "Old Town",
      position: [20.2380, 85.8338],
      temperature: 34.8,
      vegetation: 36,
      builtUp: 47,
      population: "21,800",
      risk: 47,
      level: "Low",
      radius: 600,
      color: "#22c55e"
    }

  ];


  return (

    <div className="heat-map-system">

      {/* MAP */}

      <div className="real-map">

        <MapContainer
          center={bhuBaneswarSafe(bhubaneswar)}
          zoom={12}
          scrollWheelZoom={true}
          style={{
            height: "100%",
            width: "100%"
          }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {/* CITY */}

          <Circle
            center={bhubaneswar}
            radius={500}
            pathOptions={{
              color: "#b6ff00",
              fillColor: "#b6ff00",
              fillOpacity: 0.08,
              weight: 2
            }}
          >

            <Popup>

              <strong>
                Bhubaneswar
              </strong>

              <br />

              SheetKshetra analysis region

            </Popup>

          </Circle>


          {/* ZONES */}

          {heatZones.map((zone) => (

            <Circle
              key={zone.name}
              center={zone.position}
              radius={zone.radius}

              pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.25,
                weight: 2
              }}

              eventHandlers={{
                click: () => {
                  setSelectedZone(zone);
                }
              }}
            >

              <Popup>

                <strong>
                  {zone.name}
                </strong>

                <br />

                {zone.temperature}°C

                <br />

                {zone.level} Risk

              </Popup>

            </Circle>

          ))}

        </MapContainer>


        {/* MAP HEADER */}

        <div className="map-overlay-top">

          <div>

            <span>
              LIVE SATELLITE ANALYSIS
            </span>

            <strong>
              BHUBANESWAR
            </strong>

          </div>

          <div className="map-live">
            ● LIVE
          </div>

        </div>


        {/* LEGEND */}

        <div className="map-overlay-bottom">

          <div className="map-legend-real">

            <div>
              <i className="real-critical"></i>
              Critical
            </div>

            <div>
              <i className="real-high"></i>
              High
            </div>

            <div>
              <i className="real-medium"></i>
              Medium
            </div>

            <div>
              <i className="real-low"></i>
              Low
            </div>

          </div>

        </div>

      </div>


      {/* ZONE PANEL */}

      <div className="zone-intelligence">

        {!selectedZone ? (

          <div className="zone-empty">

            <div className="zone-empty-icon">
              ◎
            </div>

            <h3>
              Select a Heat Zone
            </h3>

            <p>
              Click any highlighted area on the map
              to inspect its urban heat profile.
            </p>

          </div>

        ) : (

          <ZoneDetails
            zone={selectedZone}
          />

        )}

      </div>

    </div>
  );
}


/* ================================= */
/* ZONE DETAILS */
/* ================================= */

function ZoneDetails({ zone }) {

  return (

    <div className="zone-details">

      <div className="zone-header">

        <div>

          <span>
            SELECTED ZONE
          </span>

          <h2>
            {zone.name}
          </h2>

        </div>

        <div
          className="zone-risk"
          style={{
            color: zone.color
          }}
        >
          {zone.level}
        </div>

      </div>


      {/* TEMPERATURE */}

      <div className="zone-temperature">

        <span>
          SURFACE TEMPERATURE
        </span>

        <strong>
          {zone.temperature}°C
        </strong>

        <div className="temperature-bar">

          <div
            style={{
              width: `${Math.min(
                ((zone.temperature - 30) / 15) * 100,
                100
              )}%`,
              background: zone.color
            }}
          />

        </div>

      </div>


      {/* METRICS */}

      <div className="zone-metrics">

        <Metric
          label="Vegetation"
          value={`${zone.vegetation}%`}
        />

        <Metric
          label="Built-up"
          value={`${zone.builtUp}%`}
        />

        <Metric
          label="Population"
          value={zone.population}
        />

        <Metric
          label="Risk Score"
          value={`${zone.risk}/100`}
        />

      </div>


      {/* AI RECOMMENDATION */}

      <div className="zone-recommendation">

        <span>
          ✦ AI RECOMMENDATION
        </span>

        <h3>
          Prioritize cooling intervention
        </h3>

        <p>
          High surface temperature and
          {zone.vegetation < 20
            ? " low vegetation"
            : " moderate vegetation"}
          {" "}make this zone suitable for
          targeted urban cooling.
        </p>

      </div>

    </div>

  );
}


/* ================================= */
/* METRIC */
/* ================================= */

function Metric({
  label,
  value
}) {

  return (

    <div className="zone-metric">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );
}


/* ================================= */
/* SAFETY */
/* ================================= */

function bhuBaneswarSafe(coords) {
  return coords;
}


export default HeatMap;