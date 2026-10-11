import { useState } from "react";

function DigitalTwin({ setActivePage }) {
  const [scenario, setScenario] = useState("balanced");

  const scenarios = {
    balanced: {
      name: "Balanced Cooling",
      budget: "₹25 Cr",
      temperature: "−2.1°C",
      risk: "−18%",
      population: "1.42L",
      greenCover: "+8.4%",
    },
    vegetation: {
      name: "Green Priority",
      budget: "₹25 Cr",
      temperature: "−1.7°C",
      risk: "−21%",
      population: "1.31L",
      greenCover: "+14.2%",
    },
    infrastructure: {
      name: "Infrastructure Priority",
      budget: "₹25 Cr",
      temperature: "−2.4°C",
      risk: "−16%",
      population: "1.56L",
      greenCover: "+4.8%",
    },
  };

  const activeScenario = scenarios[scenario];

  return (
    <div className="digital-twin-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="page-header">

        <div className="page-header-copy">

          <div className="page-eyebrow">
            URBAN COOLING SIMULATION
          </div>

          <h1 className="page-title">
            Digital Twin
          </h1>

          <p className="page-description">
            Compare the current heat profile of the city
            with an AI-generated intervention scenario
            before implementation.
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
          DIGITAL TWIN STATUS
          ===================================================== */}

      <section className="digital-twin-status">

        <div className="digital-twin-status-main">

          <div className="digital-twin-status-mark">
            DT
          </div>

          <div>

            <div className="digital-twin-status-title">
              Bhubaneswar Urban Heat Twin
            </div>

            <p>
              Scenario-based simulation of urban cooling
              interventions.
            </p>

          </div>

        </div>

        <div className="digital-twin-status-badge">
          SIMULATION READY
        </div>

      </section>


      {/* =====================================================
          SCENARIO SELECTOR
          ===================================================== */}

      <section className="dashboard-card twin-scenario-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Cooling Scenario
            </div>

            <div className="dashboard-card-subtitle">
              Select an intervention strategy to simulate
            </div>

          </div>

          <div className="twin-budget">
            {activeScenario.budget}
          </div>

        </div>


        <div className="twin-scenario-buttons">

          <button
            type="button"
            className={
              scenario === "balanced"
                ? "active"
                : ""
            }
            onClick={() =>
              setScenario("balanced")
            }
          >

            <span>
              01
            </span>

            <strong>
              Balanced Cooling
            </strong>

            <small>
              Mixed intervention strategy
            </small>

          </button>


          <button
            type="button"
            className={
              scenario === "vegetation"
                ? "active"
                : ""
            }
            onClick={() =>
              setScenario("vegetation")
            }
          >

            <span>
              02
            </span>

            <strong>
              Green Priority
            </strong>

            <small>
              Maximum vegetation focus
            </small>

          </button>


          <button
            type="button"
            className={
              scenario === "infrastructure"
                ? "active"
                : ""
            }
            onClick={() =>
              setScenario("infrastructure")
            }
          >

            <span>
              03
            </span>

            <strong>
              Infrastructure Priority
            </strong>

            <small>
              Built-surface interventions
            </small>

          </button>

        </div>

      </section>


      {/* =====================================================
          BEFORE / AFTER
          ===================================================== */}

      <section className="twin-comparison">

        {/* CURRENT CITY */}

        <div className="twin-city-card current">

          <div className="twin-city-header">

            <div>

              <span>
                CURRENT CITY
              </span>

              <h2>
                Existing Condition
              </h2>

            </div>

            <div className="twin-city-tag">
              BASELINE
            </div>

          </div>


          <div className="twin-city-visual">

            <div className="twin-map-placeholder">

              <div className="twin-grid-lines"></div>

              <div className="twin-hotspot hotspot-one"></div>
              <div className="twin-hotspot hotspot-two"></div>
              <div className="twin-hotspot hotspot-three"></div>

              <div className="twin-map-label">
                CURRENT HEAT PROFILE
              </div>

            </div>

          </div>


          <div className="twin-metrics">

            <div>

              <span>
                SURFACE TEMP.
              </span>

              <strong>
                37.8°C
              </strong>

            </div>

            <div>

              <span>
                RISK SCORE
              </span>

              <strong>
                72
              </strong>

            </div>

            <div>

              <span>
                GREEN COVER
              </span>

              <strong>
                23.7%
              </strong>

            </div>

            <div>

              <span>
                POP. AT RISK
              </span>

              <strong>
                2.4L
              </strong>

            </div>

          </div>

        </div>


        {/* TRANSITION */}

        <div className="twin-transition">

          <div className="twin-transition-line"></div>

          <div className="twin-transition-mark">
            →
          </div>

          <span>
            SIMULATE
          </span>

        </div>


        {/* FUTURE CITY */}

        <div className="twin-city-card simulated">

          <div className="twin-city-header">

            <div>

              <span>
                SIMULATED CITY
              </span>

              <h2>
                {activeScenario.name}
              </h2>

            </div>

            <div className="twin-city-tag">
              AI SCENARIO
            </div>

          </div>


          <div className="twin-city-visual">

            <div className="twin-map-placeholder future">

              <div className="twin-grid-lines"></div>

              <div className="twin-cooling-zone zone-one"></div>
              <div className="twin-cooling-zone zone-two"></div>
              <div className="twin-cooling-zone zone-three"></div>

              <div className="twin-map-label">
                SIMULATED COOLING PROFILE
              </div>

            </div>

          </div>


          <div className="twin-metrics">

            <div>

              <span>
                TEMP. CHANGE
              </span>

              <strong className="positive">
                {activeScenario.temperature}
              </strong>

            </div>

            <div>

              <span>
                RISK CHANGE
              </span>

              <strong className="positive">
                {activeScenario.risk}
              </strong>

            </div>

            <div>

              <span>
                GREEN COVER
              </span>

              <strong className="positive">
                {activeScenario.greenCover}
              </strong>

            </div>

            <div>

              <span>
                POP. BENEFITED
              </span>

              <strong className="positive">
                {activeScenario.population}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SCENARIO IMPACT
          ===================================================== */}

      <section className="dashboard-card twin-impact-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Scenario Impact
            </div>

            <div className="dashboard-card-subtitle">
              Estimated change relative to the current
              baseline
            </div>

          </div>

          <div className="twin-scenario-name">
            {activeScenario.name}
          </div>

        </div>


        <div className="twin-impact-grid">

          <div className="twin-impact-item">

            <span>
              TEMPERATURE
            </span>

            <strong className="positive">
              {activeScenario.temperature}
            </strong>

            <small>
              estimated reduction
            </small>

          </div>


          <div className="twin-impact-item">

            <span>
              THERMAL RISK
            </span>

            <strong className="positive">
              {activeScenario.risk}
            </strong>

            <small>
              estimated reduction
            </small>

          </div>


          <div className="twin-impact-item">

            <span>
              POPULATION
            </span>

            <strong className="positive">
              {activeScenario.population}
            </strong>

            <small>
              potentially benefited
            </small>

          </div>


          <div className="twin-impact-item">

            <span>
              GREEN COVER
            </span>

            <strong className="positive">
              {activeScenario.greenCover}
            </strong>

            <small>
              projected increase
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTERVENTION SCENARIO
          ===================================================== */}

      <section className="dashboard-card twin-intervention-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Simulated Intervention Mix
            </div>

            <div className="dashboard-card-subtitle">
              Measures represented in the selected scenario
            </div>

          </div>

        </div>


        <div className="twin-intervention-list">

          <div className="twin-intervention-row">

            <div className="twin-intervention-number">
              01
            </div>

            <div>

              <strong>
                Urban Forestry
              </strong>

              <span>
                Tree canopy and green corridors
              </span>

            </div>

            <div className="twin-intervention-status">
              INCLUDED
            </div>

          </div>


          <div className="twin-intervention-row">

            <div className="twin-intervention-number">
              02
            </div>

            <div>

              <strong>
                Cool Roofs
              </strong>

              <span>
                Reduced heat absorption from buildings
              </span>

            </div>

            <div className="twin-intervention-status">
              INCLUDED
            </div>

          </div>


          <div className="twin-intervention-row">

            <div className="twin-intervention-number">
              03
            </div>

            <div>

              <strong>
                Reflective Surfaces
              </strong>

              <span>
                Roads and exposed urban surfaces
              </span>

            </div>

            <div className="twin-intervention-status">
              INCLUDED
            </div>

          </div>


          <div className="twin-intervention-row">

            <div className="twin-intervention-number">
              04
            </div>

            <div>

              <strong>
                Shade Infrastructure
              </strong>

              <span>
                Pedestrian and public-space shade
              </span>

            </div>

            <div className="twin-intervention-status">
              INCLUDED
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DECISION CTA
          ===================================================== */}

      <section className="twin-decision-card">

        <div>

          <div className="page-eyebrow">
            DECISION SUPPORT
          </div>

          <h2>
            Ready to turn the scenario into an action plan?
          </h2>

          <p>
            Review the simulated outcome and continue to
            the Heat Action Plan for implementation-ready
            recommendations.
          </p>

        </div>


        <div className="twin-decision-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setActivePage("AI Cooling Plan")
            }
          >
            Change plan
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setActivePage("Heat Action Plan")
            }
          >
            Create Heat Action Plan
            <span>
              →
            </span>
          </button>

        </div>

      </section>


      {/* =====================================================
          DATA NOTE
          ===================================================== */}

      <div className="forecast-data-note">

        <span className="data-note-mark">
          i
        </span>

        <p>
          Simulation values shown here are demonstration
          values. Production Digital Twin results should be
          generated from the calibrated physics-informed
          baseline, AI model and validated intervention
          simulation.
        </p>

      </div>

    </div>
  );
}

export default DigitalTwin;