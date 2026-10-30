
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./HeatMap.css";

const DATA_URL = "/data/sheetkshetra_ward_grid_data.json";
const BOUNDARY_URL = "/data/bmc_67_wards.geojson";

const LAYERS = [
  { value: "predicted_lst", label: "Predicted Temperature" },
  { value: "lst", label: "Actual LST" },
  { value: "ndvi", label: "Vegetation (NDVI)" },
  { value: "ndbi", label: "Built-up (NDBI)" },
  { value: "population", label: "Population" },
];

function tempColor(value) {
  if (!Number.isFinite(value)) return "#999999";
  if (value < 30) return "#313695";
  if (value < 33) return "#4575b4";
  if (value < 36) return "#74add1";
  if (value < 39) return "#fee090";
  if (value < 42) return "#f46d43";
  return "#a50026";
}

function valueColor(value, layer) {
  if (layer === "predicted_lst" || layer === "lst") {
    return tempColor(value);
  }

  if (!Number.isFinite(value)) return "#999999";

  if (layer === "ndvi") {
    if (value < 0) return "#8c510a";
    if (value < 0.2) return "#d8b365";
    if (value < 0.4) return "#a6d96a";
    if (value < 0.6) return "#66bd63";
    return "#1a9850";
  }

  if (layer === "ndbi") {
    if (value < -0.2) return "#2c7bb6";
    if (value < 0) return "#abd9e9";
    if (value < 0.2) return "#ffffbf";
    if (value < 0.4) return "#fdae61";
    return "#d7191c";
  }

  if (value < 100) return "#ffffb2";
  if (value < 500) return "#fecc5c";
  if (value < 1000) return "#fd8d3c";
  if (value < 2500) return "#f03b20";
  return "#bd0026";
}

function MapFit({ geoData, selectedWard }) {
  const map = useMap();

  useEffect(() => {
    if (!geoData) return;

    let bounds;

    if (selectedWard) {
      const feature = geoData.features.find(
        (f) => f.properties.wardno === selectedWard
      );
      if (feature) bounds = L.geoJSON(feature).getBounds();
    } else {
      bounds = L.geoJSON(geoData).getBounds();
    }

    if (bounds?.isValid()) {
      map.fitBounds(bounds, {
        padding: [30, 30],
        maxZoom: selectedWard ? 16 : 13,
      });
    }
  }, [map, geoData, selectedWard]);

  return null;
}

function WardPolygons({ geoData, stats, hottestWard, onWardClick }) {
  const layerRef = useRef(null);

  const style = (feature) => {
    const ward = feature.properties.wardno;
    const average = stats[ward]?.average;
    const hottest = ward === hottestWard;

    return {
      color: hottest ? "#ffffff" : "#202020",
      weight: hottest ? 4 : 1.6,
      opacity: 1,
      fillColor: tempColor(average),
      fillOpacity: hottest ? 0.95 : 0.68,
      dashArray: hottest ? "6 4" : null,
    };
  };

  const onEachFeature = (feature, layer) => {
    const ward = feature.properties.wardno;
    const zone = feature.properties.zone || "Unknown";
    const item = stats[ward];
    const hottest = ward === hottestWard;

    const average =
      item?.average == null ? "N/A" : `${item.average.toFixed(2)}°C`;

    const maximum =
      item?.maximum == null ? "N/A" : `${item.maximum.toFixed(2)}°C`;

    layer.bindTooltip(
      `<b>${ward}${hottest ? " ★ HOTTEST" : ""}</b><br/>Zone: ${zone}<br/>Average predicted LST: ${average}<br/>Maximum predicted LST: ${maximum}`,
      { sticky: true }
    );

    layer.on({
      click: () => onWardClick(ward),
      mouseover: (event) => {
        event.target.setStyle({
          weight: 4,
          color: "#ffffff",
          fillOpacity: 0.95,
        });
        event.target.bringToFront();
      },
      mouseout: (event) => {
        layerRef.current?.resetStyle(event.target);
      },
    });
  };

  if (!geoData) return null;

  return (
    <GeoJSON
      key={hottestWard || "all"}
      ref={layerRef}
      data={geoData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}

function GridCanvas({ cells, layer, selectedCell, onSelectCell }) {
  const map = useMap();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const size = map.getSize();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = size.x * dpr;
      canvas.height = size.y * dpr;
      canvas.style.width = `${size.x}px`;
      canvas.style.height = `${size.y}px`;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size.x, size.y);

      const zoom = map.getZoom();
      const latitude = map.getCenter().lat;
      const metersPerPixel =
        (156543.03392 * Math.cos(latitude * Math.PI / 180)) /
        Math.pow(2, zoom);

      const cellSize = Math.max(2, Math.min(60, 28.13 / metersPerPixel));
      const half = cellSize / 2;

      for (const cell of cells) {
        const point = map.latLngToContainerPoint([
          cell.latitude,
          cell.longitude,
        ]);

        if (
          point.x < -cellSize ||
          point.y < -cellSize ||
          point.x > size.x + cellSize ||
          point.y > size.y + cellSize
        ) continue;

        ctx.fillStyle = valueColor(cell[layer], layer);
        ctx.fillRect(
          point.x - half,
          point.y - half,
          cellSize,
          cellSize
        );

        if (selectedCell?.cell_id === cell.cell_id) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            point.x - half,
            point.y - half,
            cellSize,
            cellSize
          );
        }
      }
    };

    draw();
    map.on("move zoom resize", draw);

    return () => map.off("move zoom resize", draw);
  }, [map, cells, layer, selectedCell]);

  useEffect(() => {
    const handleClick = (event) => {
      const clickPoint = map.latLngToContainerPoint(event.latlng);
      let nearest = null;
      let minDistance = 14;

      for (const cell of cells) {
        const point = map.latLngToContainerPoint([
          cell.latitude,
          cell.longitude,
        ]);
        const distance = clickPoint.distanceTo(point);

        if (distance < minDistance) {
          minDistance = distance;
          nearest = cell;
        }
      }

      if (nearest) onSelectCell(nearest);
    };

    map.on("click", handleClick);
    return () => map.off("click", handleClick);
  }, [map, cells, onSelectCell]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 450,
        pointerEvents: "none",
      }}
    />
  );
}

export default function HeatMap() {
  const [cells, setCells] = useState([]);
  const [geoData, setGeoData] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [layer, setLayer] = useState("predicted_lst");
  const [selectedCell, setSelectedCell] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [gridResponse, boundaryResponse] = await Promise.all([
          fetch(DATA_URL),
          fetch(BOUNDARY_URL),
        ]);

        if (!gridResponse.ok) {
          throw new Error("Ward grid JSON file nahi mila.");
        }

        if (!boundaryResponse.ok) {
          throw new Error("67 ward boundary GeoJSON file nahi mila.");
        }

        const [json, boundaries] = await Promise.all([
          gridResponse.json(),
          boundaryResponse.json(),
        ]);

        const columns = json.columns || [];
        const index = Object.fromEntries(
          columns.map((name, i) => [name, i])
        );

        const required = [
          "cell_id",
          "longitude",
          "latitude",
          "wardno",
          "predicted_lst",
        ];

        const missing = required.filter(
          (name) => index[name] === undefined
        );

        if (missing.length) {
          throw new Error(
            `Grid data columns missing: ${missing.join(", ")}`
          );
        }

        const parsed = (json.data || [])
          .map((row) => ({
            cell_id: row[index.cell_id],
            longitude: Number(row[index.longitude]),
            latitude: Number(row[index.latitude]),
            wardno: row[index.wardno],
            zone:
              index.zone !== undefined ? row[index.zone] : "Unknown",
            predicted_lst: Number(row[index.predicted_lst]),
            lst: index.lst !== undefined ? Number(row[index.lst]) : NaN,
            ndvi: index.ndvi !== undefined ? Number(row[index.ndvi]) : NaN,
            ndbi: index.ndbi !== undefined ? Number(row[index.ndbi]) : NaN,
            population:
              index.population !== undefined
                ? Number(row[index.population])
                : NaN,
          }))
          .filter(
            (cell) =>
              Number.isFinite(cell.latitude) &&
              Number.isFinite(cell.longitude) &&
              cell.wardno &&
              cell.wardno !== "UNASSIGNED"
          );

        if (!Array.isArray(boundaries.features)) {
          throw new Error("Boundary GeoJSON format invalid hai.");
        }

        if (!cancelled) {
          setCells(parsed);
          setGeoData(boundaries);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const result = {};

    for (const cell of cells) {
      if (!result[cell.wardno]) {
        result[cell.wardno] = {
          total: 0,
          validCount: 0,
          maximum: -Infinity,
          gridCount: 0,
        };
      }

      const item = result[cell.wardno];
      item.gridCount += 1;

      if (Number.isFinite(cell.predicted_lst)) {
        item.total += cell.predicted_lst;
        item.validCount += 1;
        item.maximum = Math.max(item.maximum, cell.predicted_lst);
      }
    }

    for (const item of Object.values(result)) {
      item.average = item.validCount
        ? item.total / item.validCount
        : null;

      item.maximum = item.validCount
        ? item.maximum
        : null;
    }

    return result;
  }, [cells]);

  const hottestWard = useMemo(() => {
    let hottest = null;
    let highestAverage = -Infinity;

    for (const [ward, item] of Object.entries(stats)) {
      if (
        item.average !== null &&
        item.average > highestAverage
      ) {
        highestAverage = item.average;
        hottest = ward;
      }
    }

    return hottest;
  }, [stats]);

  const cityAverage = useMemo(() => {
    let total = 0;
    let count = 0;

    for (const cell of cells) {
      if (Number.isFinite(cell.predicted_lst)) {
        total += cell.predicted_lst;
        count += 1;
      }
    }

    return count ? total / count : null;
  }, [cells]);

  const wardList = useMemo(() => {
    return (geoData?.features || [])
      .map((feature) => ({
        wardno: feature.properties.wardno,
        zone: feature.properties.zone || "Unknown",
      }))
      .sort(
        (a, b) =>
          Number(a.wardno.replace("W", "")) -
          Number(b.wardno.replace("W", ""))
      );
  }, [geoData]);

  const wardCells = useMemo(
    () => cells.filter((cell) => cell.wardno === selectedWard),
    [cells, selectedWard]
  );

  const selectWard = (ward) => {
    setSelectedWard(ward || null);
    setSelectedCell(null);
  };

  if (loading) {
    return <div className="heatmap-message">Loading all 67 BMC wards...</div>;
  }

  if (error) {
    return (
      <div className="heatmap-message heatmap-error">
        <h3>Heatmap loading error</h3>
        <p>{error}</p>
        <p>
          Check these files inside frontend/public/data:
          <br />
          sheetkshetra_ward_grid_data.json
          <br />
          bmc_67_wards.geojson
        </p>
      </div>
    );
  }

  return (
    <div className="ward-heatmap">
      <div className="heatmap-header">
        <div>
          <h2>
            {selectedWard
              ? `${selectedWard} — Ward Heatmap`
              : "Bhubaneswar — All 67 Wards"}
          </h2>
          <p>
            {selectedWard
              ? "Detailed grid-level temperature view."
              : "All BMC wards with distinct boundaries and temperature-based colours."}
          </p>
        </div>

        <div className="heatmap-controls">
          <label>
            Select Ward
            <select
              value={selectedWard || ""}
              onChange={(e) => selectWard(e.target.value)}
            >
              <option value="">All 67 Wards — Overview</option>
              {wardList.map((ward) => (
                <option key={ward.wardno} value={ward.wardno}>
                  {ward.wardno} — {ward.zone}
                </option>
              ))}
            </select>
          </label>

          {selectedWard && (
            <button
              className="ward-back-button"
              onClick={() => selectWard(null)}
            >
              ← All 67 Wards
            </button>
          )}

          {selectedWard && (
            <label>
              Map Layer
              <select
                value={layer}
                onChange={(e) => setLayer(e.target.value)}
              >
                {LAYERS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      <div className="ward-stat-grid">
        <div className="ward-stat-card">
          <span>Total BMC Wards</span>
          <strong>{wardList.length}</strong>
        </div>

        <div className="ward-stat-card">
          <span>City Average Predicted LST</span>
          <strong>
            {cityAverage === null ? "N/A" : `${cityAverage.toFixed(2)}°C`}
          </strong>
        </div>

        <div className="ward-stat-card hottest-stat">
          <span>Hottest Ward — Average Predicted LST</span>
          <strong>{hottestWard || "N/A"}</strong>
          <small>
            {hottestWard
              ? `${stats[hottestWard].average.toFixed(2)}°C average`
              : "No valid temperature data"}
          </small>
        </div>

        <div className="ward-stat-card">
          <span>{selectedWard ? "Selected Ward Grid Cells" : "Total Grid Cells"}</span>
          <strong>
            {(selectedWard ? wardCells.length : cells.length).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="heatmap-map-wrapper">
        <MapContainer
          center={[20.2961, 85.8245]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "620px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapFit
            geoData={geoData}
            selectedWard={selectedWard}
          />

          {!selectedWard && (
            <WardPolygons
              geoData={geoData}
              stats={stats}
              hottestWard={hottestWard}
              onWardClick={selectWard}
            />
          )}

          {selectedWard && wardCells.length > 0 && (
            <GridCanvas
              cells={wardCells}
              layer={layer}
              selectedCell={selectedCell}
              onSelectCell={setSelectedCell}
            />
          )}
        </MapContainer>
      </div>

      {!selectedWard && (
        <div className="heatmap-legend">
          <strong>Average Predicted Temperature by Ward</strong>
          <div className="legend-items">
            <span><i style={{ background: "#313695" }} /> Below 30°C</span>
            <span><i style={{ background: "#4575b4" }} /> 30–33°C</span>
            <span><i style={{ background: "#74add1" }} /> 33–36°C</span>
            <span><i style={{ background: "#fee090" }} /> 36–39°C</span>
            <span><i style={{ background: "#f46d43" }} /> 39–42°C</span>
            <span><i style={{ background: "#a50026" }} /> Above 42°C</span>
          </div>
          <p className="heatmap-disclaimer">
            White dashed outline identifies the hottest ward by average
            predicted LST. Hover over a ward for details; click to open it.
          </p>
        </div>
      )}

      {selectedWard && (
        <>
          <div className="ward-stat-grid">
            <div className="ward-stat-card">
              <span>Ward Average Predicted LST</span>
              <strong>
                {stats[selectedWard]?.average == null
                  ? "N/A"
                  : `${stats[selectedWard].average.toFixed(2)}°C`}
              </strong>
            </div>

            <div className="ward-stat-card">
              <span>Ward Maximum Predicted LST</span>
              <strong>
                {stats[selectedWard]?.maximum == null
                  ? "N/A"
                  : `${stats[selectedWard].maximum.toFixed(2)}°C`}
              </strong>
            </div>
          </div>

          <div className="heatmap-legend">
            <strong>
              {LAYERS.find((item) => item.value === layer)?.label}
            </strong>
            <div className="legend-items">
              <span><i style={{ background: "#313695" }} /> Below 30</span>
              <span><i style={{ background: "#4575b4" }} /> 30–33</span>
              <span><i style={{ background: "#74add1" }} /> 33–36</span>
              <span><i style={{ background: "#fee090" }} /> 36–39</span>
              <span><i style={{ background: "#f46d43" }} /> 39–42</span>
              <span><i style={{ background: "#a50026" }} /> Above 42</span>
            </div>
          </div>

          {selectedCell && (
            <div className="selected-cell-panel">
              <h3>Selected Grid Cell: {selectedCell.cell_id}</h3>
              <div className="cell-details-grid">
                <span>Ward: <strong>{selectedCell.wardno}</strong></span>
                <span>Predicted LST: <strong>{Number.isFinite(selectedCell.predicted_lst) ? `${selectedCell.predicted_lst.toFixed(2)}°C` : "N/A"}</strong></span>
                <span>Actual LST: <strong>{Number.isFinite(selectedCell.lst) ? `${selectedCell.lst.toFixed(2)}°C` : "N/A"}</strong></span>
                <span>NDVI: <strong>{Number.isFinite(selectedCell.ndvi) ? selectedCell.ndvi.toFixed(3) : "N/A"}</strong></span>
                <span>NDBI: <strong>{Number.isFinite(selectedCell.ndbi) ? selectedCell.ndbi.toFixed(3) : "N/A"}</strong></span>
                <span>Population: <strong>{Number.isFinite(selectedCell.population) ? selectedCell.population.toLocaleString("en-IN") : "N/A"}</strong></span>
              </div>
            </div>
          )}
        </>
      )}

      <p className="heatmap-disclaimer">
        Official BMC ward polygons are used for the overview. Grid squares
        are approximate visual representations based on measured point
        spacing of about 28.13 metres, not verified cell-boundary polygons.
      </p>
    </div>
  );
}
