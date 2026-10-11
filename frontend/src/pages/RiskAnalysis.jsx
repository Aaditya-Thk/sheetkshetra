function RiskAnalysis({ setActivePage }) {
  const riskDistribution = [
    {
      label: "Critical",
      percentage: 18,
      count: "18 zones",
      className: "critical",
    },
    {
      label: "High",
      percentage: 34,
      count: "34 zones",
      className: "high",
    },
    {
      label: "Medium",
      percentage: 29,
      count: "29 zones",
      className: "medium",
    },
    {
      label: "Low",
      percentage: 19,
      count: "19 zones",
      className: "low",
    },
  ];

  const priorityZones = [
    {
      name: "Patia",
      score: 92,
      temperature: "41.2°C",
      vegetation: "12%",
      builtUp: "78%",
      population: "48,200",
      status: "Critical",
    },
    {
      name: "Khandagiri",
      score: 74,
      temperature: "39.4°C",
      vegetation: "18%",
      builtUp: "69%",
      population: "36,700",
      status: "High",
    },
    {
      name: "Saheed Nagar",
      score: 61,
      temperature: "37.6°C",
      vegetation: "24%",
      builtUp: "61%",
      population: "29,400",
      status: "Medium",
    },
    {
      name: "Old Town",
      score: 47,
      temperature: "34.8°C",
      vegetation: "36%",
      builtUp: "47%",
      population: "21,800",
      status: "Low",
    },
  ];

  const factors = [
    {
      name: "Built-up intensity",
      value: 82,
      direction: "INCREASES RISK",
      className: "negative",
    },
    {
      name: "Surface temperature",
      value: 76,
      direction: "INCREASES RISK",
      className: "negative",
    },
    {
      name: "Low vegetation",
      value: 68,
      direction: "INCREASES RISK",
      className: "negative",
    },
    {
      name: "Population exposure",
      value: 61,
      direction: "INCREASES RISK",
      className: "negative",
    },
    {
      name: "Water proximity",
      value: 34,
      direction: "REDUCES RISK",
      className: "positive",
    },
  ];

  return (
    <div className="risk-analysis-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="page-header">

        <div className="page-header-copy">

          <div className="page-eyebrow">
            HUMAN THERMAL RISK
          </div>

          <h1 className="page-title">
            Risk Analysis
          </h1>

          <p className="page-description">
            Understand where people are most exposed to
            heat, why risk is elevated and which locations
            should receive priority attention.
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
          TOP RISK SUMMARY
          ===================================================== */}

      <section className="risk-top-summary">

        <div className="risk-summary-primary">

          <div className="risk-summary-primary-label">
            CITY HUMAN THERMAL RISK
          </div>

          <div className="risk-summary-primary-score">
            72
            <span>/100</span>
          </div>

          <div className="risk-summary-primary-status">
            HIGH RISK
          </div>

          <p>
            Current conditions indicate elevated human
            thermal stress, particularly across dense
            built-up and low-vegetation locations.
          </p>

        </div>


        <div className="risk-summary-stat">

          <span>
            CRITICAL ZONES
          </span>

          <strong>
            18
          </strong>

          <small>
            immediate attention
          </small>

        </div>


        <div className="risk-summary-stat">

          <span>
            PEOPLE AT RISK
          </span>

          <strong>
            2.4L
          </strong>

          <small>
            estimated exposure
          </small>

        </div>


        <div className="risk-summary-stat">

          <span>
            HIGH PRIORITY
          </span>

          <strong>
            34
          </strong>

          <small>
            zones requiring review
          </small>

        </div>

      </section>


      {/* =====================================================
          RISK DISTRIBUTION + THERMAL INDICATORS
          ===================================================== */}

      <section className="risk-analysis-grid">

        {/* DISTRIBUTION */}

        <div className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <div className="dashboard-card-title">
                Risk Distribution
              </div>

              <div className="dashboard-card-subtitle">
                Distribution of monitored locations by
                thermal risk category
              </div>

            </div>

          </div>


          <div className="risk-distribution-list">

            {riskDistribution.map((item) => (

              <div
                className="risk-distribution-row"
                key={item.label}
              >

                <div className="risk-distribution-name">

                  <span
                    className={`risk-distribution-dot ${item.className}`}
                  ></span>

                  <strong>
                    {item.label}
                  </strong>

                </div>

                <div className="risk-distribution-bar">

                  <div
                    className={`risk-distribution-fill ${item.className}`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  ></div>

                </div>

                <div className="risk-distribution-value">

                  <strong>
                    {item.percentage}%
                  </strong>

                  <span>
                    {item.count}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* THERMAL INDICATORS */}

        <div className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <div className="dashboard-card-title">
                Thermal Indicators
              </div>

              <div className="dashboard-card-subtitle">
                Human-centred heat exposure metrics
              </div>

            </div>

          </div>


          <div className="thermal-risk-indicators">

            <div className="thermal-risk-indicator">

              <div>

                <span>
                  WBGT
                </span>

                <small>
                  Wet Bulb Globe Temperature
                </small>

              </div>

              <strong>
                31.6°C
              </strong>

              <em>
                HIGH
              </em>

            </div>


            <div className="thermal-risk-indicator">

              <div>

                <span>
                  UTCI
                </span>

                <small>
                  Universal Thermal Climate Index
                </small>

              </div>

              <strong>
                40.2°C
              </strong>

              <em>
                VERY HIGH
              </em>

            </div>


            <div className="thermal-risk-indicator">

              <div>

                <span>
                  HEAT INDEX
                </span>

                <small>
                  Temperature + humidity
                </small>

              </div>

              <strong>
                42.1°C
              </strong>

              <em>
                HIGH
              </em>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY IS THIS AREA AT RISK?
          ===================================================== */}

      <section className="dashboard-card risk-explanation-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Why is the city at risk?
            </div>

            <div className="dashboard-card-subtitle">
              Model-derived contributing factors influencing
              thermal risk
            </div>

          </div>

          <div className="risk-explanation-badge">
            AI EXPLANATION
          </div>

        </div>


        <div className="risk-factors">

          {factors.map((factor) => (

            <div
              className="risk-factor-row"
              key={factor.name}
            >

              <div className="risk-factor-info">

                <strong>
                  {factor.name}
                </strong>

                <span className={factor.className}>
                  {factor.direction}
                </span>

              </div>

              <div className="risk-factor-bar">

                <div
                  className={`risk-factor-fill ${factor.className}`}
                  style={{
                    width: `${factor.value}%`,
                  }}
                ></div>

              </div>

              <strong className="risk-factor-score">
                {factor.value}
              </strong>

            </div>

          ))}

        </div>


        <div className="risk-explanation-note">

          <span>
            SHAP
          </span>

          <p>
            Positive contributions indicate factors that
            increase predicted heat risk, while negative
            contributions represent factors associated with
            lower predicted risk.
          </p>

        </div>

      </section>


      {/* =====================================================
          PRIORITY ZONES
          ===================================================== */}

      <section className="dashboard-card priority-zones-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Intervention Priority
            </div>

            <div className="dashboard-card-subtitle">
              Locations ranked by current thermal risk
              and exposure
            </div>

          </div>

          <button
            type="button"
            className="text-button"
            onClick={() =>
              setActivePage("Heat Map")
            }
          >
            View spatial map →
          </button>

        </div>


        <div className="priority-table">

          <div className="priority-table-head">

            <span>
              LOCATION
            </span>

            <span>
              RISK
            </span>

            <span>
              TEMP.
            </span>

            <span>
              VEGETATION
            </span>

            <span>
              BUILT-UP
            </span>

            <span>
              POPULATION
            </span>

            <span>
              STATUS
            </span>

          </div>


          {priorityZones.map((zone) => (

            <div
              className="priority-table-row"
              key={zone.name}
            >

              <strong>
                {zone.name}
              </strong>

              <span className="priority-score">
                {zone.score}
              </span>

              <span>
                {zone.temperature}
              </span>

              <span>
                {zone.vegetation}
              </span>

              <span>
                {zone.builtUp}
              </span>

              <span>
                {zone.population}
              </span>

              <span
                className={`status-badge ${zone.status.toLowerCase()}`}
              >
                {zone.status}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          AI INSIGHT
          ===================================================== */}

      <section className="risk-ai-insight">

        <div className="risk-ai-insight-mark">
          AI
        </div>

        <div className="risk-ai-insight-content">

          <div className="page-eyebrow">
            SHEETKSHETRA INSIGHT
          </div>

          <h2>
            Focus cooling where heat and human exposure
            overlap.
          </h2>

          <p>
            The highest-risk locations are not determined
            by temperature alone. Built-up intensity,
            vegetation availability, environmental
            conditions and population exposure should be
            considered together when deciding where
            intervention can protect the most people.
          </p>

        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            setActivePage("AI Cooling Plan")
          }
        >
          Build cooling plan
        </button>

      </section>


      {/* =====================================================
          DATA NOTE
          ===================================================== */}

      <div className="forecast-data-note">

        <span className="data-note-mark">
          i
        </span>

        <p>
          Risk values shown in this interface are
          demonstration values until the calibrated
          SheetKshetra prediction and risk APIs are
          connected. Production risk scores will be
          generated from model outputs and supporting
          spatial datasets.
        </p>

      </div>

    </div>
  );
}

export default RiskAnalysis;