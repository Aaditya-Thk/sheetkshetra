import { useEffect, useMemo, useRef, useState } from "react";

const SCENARIOS = {
  balanced: {
    name: "Balanced Cooling",
    budget: 25,
    temperature: 2.1,
    risk: 18,
    population: "1.42L",
    greenCover: 8.4,
    description: "A balanced combination of vegetation and infrastructure interventions.",
    interventions: [
      { name: "Urban Forestry", description: "Tree canopy and green corridors", status: "Included" },
      { name: "Cool Roofs", description: "Reduced heat absorption from buildings", status: "Included" },
      { name: "Reflective Surfaces", description: "Roads and exposed urban surfaces", status: "Included" },
      { name: "Shade Infrastructure", description: "Pedestrian and public-space shade", status: "Included" },
    ],
  },
  vegetation: {
    name: "Green Priority",
    budget: 25,
    temperature: 1.7,
    risk: 21,
    population: "1.31L",
    greenCover: 14.2,
    description: "Prioritise tree planting, green corridors and vegetation expansion.",
    interventions: [
      { name: "Urban Forestry", description: "Expanded tree canopy in high-heat locations", status: "High Priority" },
      { name: "Green Corridors", description: "Connected vegetation networks", status: "High Priority" },
      { name: "Green Roofs", description: "Vegetated rooftops on suitable buildings", status: "Included" },
      { name: "Urban Parks", description: "Additional public green spaces", status: "Included" },
    ],
  },
  infrastructure: {
    name: "Infrastructure Priority",
    budget: 25,
    temperature: 2.4,
    risk: 16,
    population: "1.56L",
    greenCover: 4.8,
    description: "Focus on built surfaces, reflective materials and public cooling infrastructure.",
    interventions: [
      { name: "Cool Roofs", description: "Reflective building rooftop surfaces", status: "High Priority" },
      { name: "Reflective Roads", description: "Heat-reflective road materials", status: "High Priority" },
      { name: "Cooling Centres", description: "Accessible public heat-relief locations", status: "Included" },
      { name: "Shade Infrastructure", description: "Shaded public spaces and pedestrian routes", status: "Included" },
    ],
  },
};

const INTERVENTIONS = [
  { id: "trees", name: "Urban Forestry", description: "Plant trees and expand urban canopy.", cost: 4.5, cooling: 0.65, green: 3.5, reach: 0.22 },
  { id: "cool-roofs", name: "Cool Roofs", description: "Use reflective coatings on suitable rooftops.", cost: 3.2, cooling: 0.55, green: 0, reach: 0.18 },
  { id: "green-roofs", name: "Green Roofs", description: "Introduce vegetation on suitable rooftops.", cost: 5, cooling: 0.45, green: 2, reach: 0.12 },
  { id: "roads", name: "Reflective Roads", description: "Use heat-reflective road materials.", cost: 6, cooling: 0.5, green: 0, reach: 0.15 },
  { id: "corridors", name: "Green Corridors", description: "Connect green spaces through the city.", cost: 7.5, cooling: 0.7, green: 4, reach: 0.2 },
  { id: "water", name: "Water Bodies", description: "Restore and introduce suitable urban water features.", cost: 8, cooling: 0.4, green: 1, reach: 0.1 },
];

const INITIAL_CUSTOM = {
  trees: { enabled: true, intensity: 70 },
  "cool-roofs": { enabled: true, intensity: 50 },
  "green-roofs": { enabled: false, intensity: 40 },
  roads: { enabled: false, intensity: 40 },
  corridors: { enabled: true, intensity: 60 },
  water: { enabled: false, intensity: 30 },
};

const formatBudget = (value) => `₹${Number(value).toFixed(1)} Cr`;

function temperatureColor(value) {
  if (!Number.isFinite(value)) return "#d1d5db";

  if (value < 28) return "#2563eb";
  if (value < 30) return "#38bdf8";
  if (value < 32) return "#34d399";
  if (value < 34) return "#a3e635";
  if (value < 36) return "#facc15";
  if (value < 38) return "#fb923c";
  if (value < 40) return "#f97316";
  return "#dc2626";
}

function WardGridCanvas({ cells, temperatureKey, coolingReduction = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, width, height);

      const valid = cells.filter(
        (cell) =>
          Number.isFinite(cell.longitude) &&
          Number.isFinite(cell.latitude) &&
          Number.isFinite(cell[temperatureKey])
      );

      if (!valid.length) {
        ctx.fillStyle = "#64748b";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("No grid temperature data available", width / 2, height / 2);
        return;
      }

      const meanLat = valid.reduce((sum, c) => sum + c.latitude, 0) / valid.length;
      const cosLat = Math.cos((meanLat * Math.PI) / 180);

      const projected = valid.map((cell) => ({
        x: cell.longitude * cosLat,
        y: cell.latitude,
        temperature: cell[temperatureKey] - coolingReduction,
      }));

      const minX = Math.min(...projected.map((p) => p.x));
      const maxX = Math.max(...projected.map((p) => p.x));
      const minY = Math.min(...projected.map((p) => p.y));
      const maxY = Math.max(...projected.map((p) => p.y));

      const rangeX = Math.max(maxX - minX, 0.00001);
      const rangeY = Math.max(maxY - minY, 0.00001);
      const padding = 18;

      const scale = Math.min(
        (width - padding * 2) / rangeX,
        (height - padding * 2) / rangeY
      );

      const mapWidth = rangeX * scale;
      const mapHeight = rangeY * scale;
      const offsetX = (width - mapWidth) / 2;
      const offsetY = (height - mapHeight) / 2;

      // Approximate square grid-cell display based on the source point spacing.
      const cellSize = Math.max(2, Math.min(8, scale * 0.00025));

      projected.forEach((point) => {
        const x = offsetX + (point.x - minX) * scale;
        const y = height - offsetY - (point.y - minY) * scale;

        ctx.fillStyle = temperatureColor(point.temperature);
        ctx.fillRect(
          x - cellSize / 2,
          y - cellSize / 2,
          cellSize,
          cellSize
        );
      });
    };

    draw();

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(draw);
      observer.observe(canvas);
    } else {
      window.addEventListener("resize", draw);
    }

    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener("resize", draw);
    };
  }, [cells, temperatureKey, coolingReduction]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "300px",
        borderRadius: "12px",
      }}
    />
  );
}

function HeatLegend() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "14px" }}>
      {[
        ["< 30°C", "#38bdf8"],
        ["30–32°C", "#34d399"],
        ["32–34°C", "#a3e635"],
        ["34–36°C", "#facc15"],
        ["36–38°C", "#fb923c"],
        ["38°C+", "#dc2626"],
      ].map(([label, color]) => (
        <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#64748b" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

function DigitalTwin({ setActivePage }) {
  const [scenario, setScenario] = useState("balanced");
  const [custom, setCustom] = useState(INITIAL_CUSTOM);
  const [wardData, setWardData] = useState([]);
  const [selectedWard, setSelectedWard] = useState("W1");
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");

  const activeScenario = SCENARIOS[scenario];

  useEffect(() => {
    let cancelled = false;

    async function loadWardData() {
      try {
        setDataLoading(true);
        setDataError("");

        const response = await fetch("/data/sheetkshetra_ward_grid_data.json");

        if (!response.ok) {
          throw new Error(`Could not load grid data (HTTP ${response.status}).`);
        }

        const json = await response.json();

        if (!Array.isArray(json.columns) || !Array.isArray(json.data)) {
          throw new Error("The ward-grid JSON format is not recognised.");
        }

        const index = Object.fromEntries(
          json.columns.map((column, i) => [column, i])
        );

        const required = [
          "longitude",
          "latitude",
          "predicted_lst",
          "wardno",
        ];

        const missing = required.filter((key) => index[key] === undefined);

        if (missing.length) {
          throw new Error(`Missing required columns: ${missing.join(", ")}`);
        }

        const parsed = json.data.map((row) => ({
          cell_id: row[index.cell_id],
          longitude: Number(row[index.longitude]),
          latitude: Number(row[index.latitude]),
          lst: Number(row[index.lst]),
          predicted_lst: Number(row[index.predicted_lst]),
          ndvi: Number(row[index.ndvi]),
          ndbi: Number(row[index.ndbi]),
          population: Number(row[index.population]),
          wardno: String(row[index.wardno] ?? "UNASSIGNED"),
          zone: row[index.zone] ?? "",
        }));

        if (!cancelled) {
          setWardData(parsed);
          const firstWard = parsed.find((row) => row.wardno !== "UNASSIGNED")?.wardno;
          if (firstWard) setSelectedWard(firstWard);
        }
      } catch (error) {
        if (!cancelled) setDataError(error.message || "Unable to load ward data.");
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    }

    loadWardData();

    return () => {
      cancelled = true;
    };
  }, []);

  const wardOptions = useMemo(() => {
    return [...new Set(
      wardData
        .map((cell) => cell.wardno)
        .filter((ward) => /^W\d+$/.test(ward))
    )].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
  }, [wardData]);

  const selectedCells = useMemo(
    () => wardData.filter((cell) => cell.wardno === selectedWard),
    [wardData, selectedWard]
  );

  const wardStats = useMemo(() => {
    const average = (key) => {
      const values = selectedCells
        .map((cell) => cell[key])
        .filter(Number.isFinite);

      return values.length
        ? values.reduce((sum, value) => sum + value, 0) / values.length
        : null;
    };

    return {
      count: selectedCells.length,
      predicted: average("predicted_lst"),
      observed: average("lst"),
      ndvi: average("ndvi"),
      ndbi: average("ndbi"),
    };
  }, [selectedCells]);

  const selectedInterventions = INTERVENTIONS.filter(
    (item) => custom[item.id].enabled
  );

  const customResults = selectedInterventions.reduce(
    (result, item) => {
      const intensity = custom[item.id].intensity / 100;
      result.budget += item.cost * intensity;
      result.cooling += item.cooling * intensity;
      result.green += item.green * intensity;
      result.reach += item.reach * intensity;
      return result;
    },
    { budget: 0, cooling: 0, green: 0, reach: 0 }
  );

  const customTemperatureReduction = Math.min(3.5, customResults.cooling);
  const customRiskReduction = Math.min(35, customTemperatureReduction * 8);
  const customPopulation = Math.min(2.4, 2.4 * customResults.reach);
  const customGreenCover = Math.min(20, customResults.green);

  const simulatedTemperature =
    wardStats.predicted === null
      ? null
      : wardStats.predicted - activeScenario.temperature;

  const simulatedRisk = 72 * (1 - activeScenario.risk / 100);

  const updateIntervention = (id, changes) => {
    setCustom((previous) => ({
      ...previous,
      [id]: { ...previous[id], ...changes },
    }));
  };

  const formatTemperature = (value) =>
    Number.isFinite(value) ? `${value.toFixed(1)}°C` : "N/A";

  const scenarioButtons = [
    { id: "balanced", number: "01", name: "Balanced Cooling", subtitle: "Mixed intervention strategy" },
    { id: "vegetation", number: "02", name: "Green Priority", subtitle: "Maximum vegetation focus" },
    { id: "infrastructure", number: "03", name: "Infrastructure Priority", subtitle: "Built-surface interventions" },
  ];

  return (
    <div className="digital-twin-page">
      <section className="page-header">
        <div className="page-header-copy">
          <div className="page-eyebrow">URBAN COOLING SIMULATION</div>
          <h1 className="page-title">Digital Twin</h1>
          <p className="page-description">
            Explore ward-level heat conditions and compare illustrative cooling scenarios.
          </p>
        </div>

        <div className="overview-header-location">
          <span className="overview-location-dot"></span>
          <div>
            <div className="overview-location-city">Bhubaneswar</div>
            <div className="overview-location-state">Odisha, India</div>
          </div>
        </div>
      </section>

      <section className="digital-twin-status">
        <div className="digital-twin-status-main">
          <div className="digital-twin-status-mark">DT</div>
          <div>
            <div className="digital-twin-status-title">Bhubaneswar Urban Heat Twin</div>
            <p>Ward-wise grid visualisation and cooling scenario comparison.</p>
          </div>
        </div>
        <div className="digital-twin-status-badge">WARD GRID MODE</div>
      </section>

      {/* WARD SELECTION */}
      <section className="dashboard-card" style={{ marginBottom: "20px" }}>
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Select BMC Ward</div>
            <div className="dashboard-card-subtitle">
              Explore the actual grid records assigned to an individual ward.
            </div>
          </div>

          <select
            value={selectedWard}
            onChange={(event) => setSelectedWard(event.target.value)}
            disabled={!wardOptions.length}
            style={{
              minWidth: "130px",
              padding: "10px 14px",
              border: "1px solid #dbe3ed",
              borderRadius: "9px",
              background: "#fff",
              color: "#263449",
              fontWeight: 600,
            }}
          >
            {wardOptions.map((ward) => (
              <option key={ward} value={ward}>{ward}</option>
            ))}
          </select>
        </div>

        {dataLoading ? (
          <p style={{ color: "#64748b", padding: "16px 0" }}>Loading ward grid data…</p>
        ) : dataError ? (
          <div style={{ padding: "14px", background: "#fff1f2", color: "#be123c", borderRadius: "10px" }}>
            **Grid data could not be loaded:** {dataError}
            <p style={{ marginBottom: 0, fontSize: "13px" }}>
              Check that the JSON file is inside `frontend/public/data/`.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))", gap: "12px" }}>
            <div><span style={{ color: "#64748b", fontSize: "11px" }}>GRID CELLS</span><strong style={{ display: "block", fontSize: "20px" }}>{wardStats.count.toLocaleString("en-IN")}</strong></div>
            <div><span style={{ color: "#64748b", fontSize: "11px" }}>AVG. MODELLED LST</span><strong style={{ display: "block", fontSize: "20px" }}>{formatTemperature(wardStats.predicted)}</strong></div>
            <div><span style={{ color: "#64748b", fontSize: "11px" }}>AVG. OBSERVED LST</span><strong style={{ display: "block", fontSize: "20px" }}>{formatTemperature(wardStats.observed)}</strong></div>
            <div><span style={{ color: "#64748b", fontSize: "11px" }}>AVG. NDVI</span><strong style={{ display: "block", fontSize: "20px" }}>{Number.isFinite(wardStats.ndvi) ? wardStats.ndvi.toFixed(3) : "N/A"}</strong></div>
            <div><span style={{ color: "#64748b", fontSize: "11px" }}>AVG. NDBI</span><strong style={{ display: "block", fontSize: "20px" }}>{Number.isFinite(wardStats.ndbi) ? wardStats.ndbi.toFixed(3) : "N/A"}</strong></div>
          </div>
        )}
      </section>

      {/* PREDEFINED SCENARIOS */}
      <section className="dashboard-card twin-scenario-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Choose Cooling Scenario</div>
            <div className="dashboard-card-subtitle">Select a strategy to explore its illustrative impact.</div>
          </div>
          <div className="twin-budget">{formatBudget(activeScenario.budget)}</div>
        </div>

        <div className="twin-scenario-buttons">
          {scenarioButtons.map((item) => (
            <button
              type="button"
              key={item.id}
              className={scenario === item.id ? "active" : ""}
              onClick={() => setScenario(item.id)}
            >
              <span>{item.number}</span>
              <strong>{item.name}</strong>
              <small>{item.subtitle}</small>
            </button>
          ))}
        </div>

        <div className="twin-active-description">
          <strong>{activeScenario.name}</strong>
          <span>{activeScenario.description}</span>
        </div>
      </section>

      {/* CUSTOM INTERVENTION SIMULATOR */}
      <section className="dashboard-card custom-twin-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Custom Intervention Simulator</div>
            <div className="dashboard-card-subtitle">
              Build a cooling strategy by selecting interventions and adjusting intensity.
            </div>
          </div>
          <button type="button" className="custom-reset-button" onClick={() => setCustom(INITIAL_CUSTOM)}>
            Reset selection
          </button>
        </div>

        <div className="custom-twin-layout">
          <div className="custom-intervention-list">
            {INTERVENTIONS.map((item) => {
              const selected = custom[item.id].enabled;
              const intensity = custom[item.id].intensity;

              return (
                <div className={`custom-intervention-item ${selected ? "selected" : ""}`} key={item.id}>
                  <div className="custom-intervention-top">
                    <label className="custom-intervention-toggle">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(event) => updateIntervention(item.id, { enabled: event.target.checked })}
                      />
                      <span className="custom-toggle-box"></span>
                    </label>

                    <div className="custom-intervention-copy">
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                    </div>

                    <span className={`custom-selected-label ${selected ? "on" : ""}`}>
                      {selected ? "SELECTED" : "NOT SELECTED"}
                    </span>
                  </div>

                  {selected && (
                    <div className="custom-intensity-control">
                      <div className="custom-intensity-heading">
                        <span>Implementation intensity</span>
                        <strong>{intensity}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={intensity}
                        onChange={(event) => updateIntervention(item.id, { intensity: Number(event.target.value) })}
                      />
                      <div className="custom-range-labels">
                        <span>Low</span><span>Medium</span><span>High</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <aside className="custom-results-panel">
            <div className="custom-results-heading">
              <span>YOUR CUSTOM STRATEGY</span>
              <strong>{selectedInterventions.length} interventions selected</strong>
            </div>

            <div className="custom-result-budget">
              <span>Estimated implementation budget</span>
              <strong>{formatBudget(customResults.budget)}</strong>
              <small>Illustrative cost estimate</small>
            </div>

            <div className="custom-result-metrics">
              <div><span>Temperature reduction</span><strong>−{customTemperatureReduction.toFixed(2)}°C</strong></div>
              <div><span>Thermal risk reduction</span><strong>{customRiskReduction.toFixed(1)}%</strong></div>
              <div><span>Population potentially benefited</span><strong>{(customPopulation * 100).toFixed(1)}K</strong></div>
              <div><span>Green cover improvement</span><strong>+{customGreenCover.toFixed(1)}%</strong></div>
            </div>

            <div className="custom-result-note">
              These are illustrative demonstration estimates, not validated model outputs.
            </div>
          </aside>
        </div>
      </section>

      {/* ACTUAL WARD GRID: BEFORE AND SIMULATED AFTER */}
      <section className="dashboard-card" style={{ marginTop: "20px" }}>
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Ward-Level Digital Twin</div>
            <div className="dashboard-card-subtitle">
              {selectedWard} · Actual grid locations coloured by modelled land-surface temperature.
            </div>
          </div>
          <div className="twin-scenario-name">{selectedCells.length.toLocaleString("en-IN")} GRID POINTS</div>
        </div>

        {dataLoading || dataError ? (
          <p style={{ color: "#64748b" }}>The ward grid map will appear when the data is available.</p>
        ) : selectedCells.length === 0 ? (
          <p style={{ color: "#64748b" }}>No grid points were found for this ward.</p>
        ) : (
          <>
            <div
  className="twin-comparison"
  style={{
    alignItems: "stretch",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
  }}
>
              <div className="twin-city-card current" style={{ minWidth: 0, flex: 1 }}>
                <div className="twin-city-header">
                  <div><span>CURRENT CONDITION</span><h2>{selectedWard} · Baseline</h2></div>
                  <div className="twin-city-tag">MODELLED GRID</div>
                </div>

                <div style={{ padding: "10px" }}>
                  <WardGridCanvas cells={selectedCells} temperatureKey="predicted_lst" />
                  <HeatLegend />
                </div>

                <div className="twin-metrics">
                  <div><span>AVG. MODELLED LST</span><strong>{formatTemperature(wardStats.predicted)}</strong></div>
                  <div><span>GRID CELLS</span><strong>{wardStats.count.toLocaleString("en-IN")}</strong></div>
                </div>
              </div>

              <div className="twin-city-card simulated" style={{ minWidth: 0, flex: 1 }}>
                <div className="twin-city-header">
                  <div><span>SIMULATED CONDITION</span><h2>{selectedWard} · After</h2></div>
                  <div className="twin-city-tag">SCENARIO ESTIMATE</div>
                </div>

                <div style={{ padding: "10px" }}>
                  <WardGridCanvas
                    cells={selectedCells}
                    temperatureKey="predicted_lst"
                    coolingReduction={activeScenario.temperature}
                  />
                  <HeatLegend />
                </div>

                <div className="twin-metrics">
                  <div><span>SIMULATED AVG. LST</span><strong className="positive">{formatTemperature(simulatedTemperature)}</strong></div>
                  <div><span>SCENARIO CHANGE</span><strong className="positive">−{activeScenario.temperature.toFixed(1)}°C</strong></div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "#64748b", margin: "14px 0 0" }}>
              Each square represents an approximate grid location from the ward dataset. The simulated view applies the selected scenario's illustrative temperature reduction uniformly; it is not yet a spatially calibrated intervention prediction.
            </p>
          </>
        )}
      </section>

      {/* SCENARIO IMPACT */}
      <section className="dashboard-card twin-impact-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Scenario Impact</div>
            <div className="dashboard-card-subtitle">Illustrative change relative to the selected ward's modelled baseline.</div>
          </div>
          <div className="twin-scenario-name">{activeScenario.name}</div>
        </div>

        <div className="twin-impact-grid">
          <div className="twin-impact-item"><span>TEMPERATURE CHANGE</span><strong className="positive">−{activeScenario.temperature.toFixed(1)}°C</strong><small>Illustrative reduction</small></div>
          <div className="twin-impact-item"><span>THERMAL RISK CHANGE</span><strong className="positive">−{activeScenario.risk}%</strong><small>Illustrative reduction</small></div>
          <div className="twin-impact-item"><span>POPULATION BENEFITED</span><strong className="positive">{activeScenario.population}</strong><small>Illustrative estimate</small></div>
          <div className="twin-impact-item"><span>GREEN COVER CHANGE</span><strong className="positive">+{activeScenario.greenCover}%</strong><small>Illustrative increase</small></div>
        </div>
      </section>

      {/* SCENARIO INTERVENTIONS */}
      <section className="dashboard-card twin-intervention-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Simulated Intervention Mix</div>
            <div className="dashboard-card-subtitle">Actions included in the selected predefined scenario.</div>
          </div>
          <div className="twin-scenario-name">{activeScenario.interventions.length} ACTIONS</div>
        </div>

        <div className="twin-intervention-list">
          {activeScenario.interventions.map((item, index) => (
            <div className="twin-intervention-row" key={item.name}>
              <div className="twin-intervention-number">0{index + 1}</div>
              <div className="twin-intervention-info"><strong>{item.name}</strong><span>{item.description}</span></div>
              <div className={`twin-intervention-status ${item.status === "High Priority" ? "priority" : ""}`}>{item.status.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DECISION CTA */}
      <section className="twin-decision-card">
        <div>
          <div className="page-eyebrow">DECISION SUPPORT</div>
          <h2>Ready to turn the scenario into an action plan?</h2>
          <p>Review the selected scenario and continue to the Heat Action Plan for implementation recommendations.</p>
        </div>
        <div className="twin-decision-actions">
          <button type="button" className="secondary-button" onClick={() => setActivePage("AI Cooling Plan")}>Change Plan</button>
          <button type="button" className="primary-button" onClick={() => setActivePage("Heat Action Plan")}>Create Heat Action Plan →</button>
        </div>
      </section>

      <div className="forecast-data-note">
        <span className="data-note-mark">i</span>
        <p>
          Ward grid locations and baseline modelled temperatures are loaded from the supplied ward-grid dataset. Scenario cooling reductions, risk changes, budget and population-benefit values remain illustrative and are not validated intervention predictions. Grid points are displayed as approximate square cells; the source data does not establish exact cell polygon boundaries.
        </p>
      </div>
    </div>
  );
}

export default DigitalTwin;