function Reports({ setActivePage }) {
  const reports = [
    {
      name: "Urban Heat Risk Assessment",
      type: "RISK ANALYSIS",
      date: "05 OCT 2026",
      status: "Ready",
      description:
        "Summary of spatial thermal risk, vulnerable population and priority heat zones.",
    },
    {
      name: "5-Day Heat Forecast",
      type: "FORECAST",
      date: "05 OCT 2026",
      status: "Ready",
      description:
        "Forecast overview including temperature, WBGT, UTCI and expected heat stress.",
    },
    {
      name: "AI Cooling Strategy",
      type: "OPTIMIZATION",
      date: "05 OCT 2026",
      status: "Draft",
      description:
        "Budget-based intervention strategy with priority locations and recommended cooling measures.",
    },
    {
      name: "Heat Action Plan",
      type: "ACTION PLAN",
      date: "05 OCT 2026",
      status: "Review",
      description:
        "Municipal response plan connecting warnings, immediate protection and long-term cooling.",
    },
  ];

  return (
    <div className="reports-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="page-header">

        <div className="page-header-copy">

          <div className="page-eyebrow">
            CITY INTELLIGENCE REPORTING
          </div>

          <h1 className="page-title">
            Reports
          </h1>

          <p className="page-description">
            Consolidated intelligence from SheetKshetra's
            forecast, risk analysis, cooling optimization
            and heat response workflows.
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
          REPORT OVERVIEW
          ===================================================== */}

      <section className="reports-overview-grid">

        <div className="report-overview-card">

          <span>
            TOTAL REPORTS
          </span>

          <strong>
            04
          </strong>

          <small>
            available in workspace
          </small>

        </div>


        <div className="report-overview-card">

          <span>
            DATA COVERAGE
          </span>

          <strong>
            CITY
          </strong>

          <small>
            Bhubaneswar monitoring area
          </small>

        </div>


        <div className="report-overview-card">

          <span>
            LAST ANALYSIS
          </span>

          <strong>
            05 OCT
          </strong>

          <small>
            latest workspace update
          </small>

        </div>


        <div className="report-overview-card">

          <span>
            SYSTEM STATUS
          </span>

          <strong>
            READY
          </strong>

          <small>
            reporting workspace operational
          </small>

        </div>

      </section>


      {/* =====================================================
          REPORT LIST
          ===================================================== */}

      <section className="dashboard-card reports-list-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Intelligence Reports
            </div>

            <div className="dashboard-card-subtitle">
              Generated outputs from the SheetKshetra
              decision-support workflow
            </div>

          </div>

          <div className="reports-header-label">
            BHUBANESWAR
          </div>

        </div>


        <div className="reports-list">

          {reports.map((report, index) => (

            <article
              className="report-row"
              key={report.name}
            >

              <div className="report-number">
                0{index + 1}
              </div>


              <div className="report-main">

                <div className="report-type">
                  {report.type}
                </div>

                <h3>
                  {report.name}
                </h3>

                <p>
                  {report.description}
                </p>

              </div>


              <div className="report-date">

                <span>
                  UPDATED
                </span>

                <strong>
                  {report.date}
                </strong>

              </div>


              <div
                className={`report-status ${report.status.toLowerCase()}`}
              >
                {report.status}
              </div>


              <button
                type="button"
                className="report-open-button"
                onClick={() => {
                  if (
                    report.type === "RISK ANALYSIS"
                  ) {
                    setActivePage("Risk Analysis");
                  }

                  if (
                    report.type === "FORECAST"
                  ) {
                    setActivePage("Forecast");
                  }

                  if (
                    report.type === "OPTIMIZATION"
                  ) {
                    setActivePage("AI Cooling Plan");
                  }

                  if (
                    report.type === "ACTION PLAN"
                  ) {
                    setActivePage("Heat Action Plan");
                  }
                }}
              >
                Open
                <span>
                  →
                </span>
              </button>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          REPORT CATEGORIES
          ===================================================== */}

      <section className="dashboard-card report-categories-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Reporting Modules
            </div>

            <div className="dashboard-card-subtitle">
              Explore the main intelligence outputs
            </div>

          </div>

        </div>


        <div className="report-categories">

          <button
            type="button"
            className="report-category"
            onClick={() =>
              setActivePage("Forecast")
            }
          >

            <span className="report-category-number">
              01
            </span>

            <div>

              <strong>
                Forecast Report
              </strong>

              <p>
                Upcoming heat conditions and human thermal
                stress.
              </p>

            </div>

            <span className="report-category-arrow">
              →
            </span>

          </button>


          <button
            type="button"
            className="report-category"
            onClick={() =>
              setActivePage("Risk Analysis")
            }
          >

            <span className="report-category-number">
              02
            </span>

            <div>

              <strong>
                Risk Assessment
              </strong>

              <p>
                Spatial risk, exposure and contributing
                factors.
              </p>

            </div>

            <span className="report-category-arrow">
              →
            </span>

          </button>


          <button
            type="button"
            className="report-category"
            onClick={() =>
              setActivePage("AI Cooling Plan")
            }
          >

            <span className="report-category-number">
              03
            </span>

            <div>

              <strong>
                Cooling Strategy
              </strong>

              <p>
                Budget-aware cooling interventions and
                priority locations.
              </p>

            </div>

            <span className="report-category-arrow">
              →
            </span>

          </button>


          <button
            type="button"
            className="report-category"
            onClick={() =>
              setActivePage("Heat Action Plan")
            }
          >

            <span className="report-category-number">
              04
            </span>

            <div>

              <strong>
                Heat Action Plan
              </strong>

              <p>
                Implementation-focused municipal response
                strategy.
              </p>

            </div>

            <span className="report-category-arrow">
              →
            </span>

          </button>

        </div>

      </section>


      {/* =====================================================
          REPORT SNAPSHOT
          ===================================================== */}

      <section className="report-snapshot-card">

        <div className="report-snapshot-copy">

          <div className="page-eyebrow">
            CITY SNAPSHOT
          </div>

          <h2>
            One view of the current heat situation.
          </h2>

          <p>
            SheetKshetra connects prediction, human thermal
            risk, spatial intelligence and cooling
            optimization so that reports can move from
            descriptive analysis toward actionable
            decisions.
          </p>

        </div>


        <div className="report-snapshot-metrics">

          <div>

            <span>
              CURRENT TEMP.
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
              PEOPLE AT RISK
            </span>

            <strong>
              2.4L
            </strong>

          </div>


          <div>

            <span>
              ACTIVE ALERTS
            </span>

            <strong>
              06
            </strong>

          </div>

        </div>

      </section>


      {/* =====================================================
          REPORT WORKFLOW
          ===================================================== */}

      <section className="dashboard-card report-workflow-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Decision-Support Workflow
            </div>

            <div className="dashboard-card-subtitle">
              How the reporting layer connects the platform
            </div>

          </div>

        </div>


        <div className="report-workflow">

          <div className="report-workflow-step">

            <span>
              01
            </span>

            <strong>
              PREDICT
            </strong>

            <small>
              Forecast upcoming heat
            </small>

          </div>


          <div className="report-workflow-arrow">
            →
          </div>


          <div className="report-workflow-step">

            <span>
              02
            </span>

            <strong>
              ASSESS
            </strong>

            <small>
              Measure human thermal risk
            </small>

          </div>


          <div className="report-workflow-arrow">
            →
          </div>


          <div className="report-workflow-step">

            <span>
              03
            </span>

            <strong>
              OPTIMIZE
            </strong>

            <small>
              Select cooling interventions
            </small>

          </div>


          <div className="report-workflow-arrow">
            →
          </div>


          <div className="report-workflow-step">

            <span>
              04
            </span>

            <strong>
              REPORT
            </strong>

            <small>
              Communicate the decision
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="reports-final-card">

        <div>

          <div className="page-eyebrow">
            CONTINUE ANALYSIS
          </div>

          <h2>
            Need to investigate a hotspot?
          </h2>

          <p>
            Open the spatial heat map to inspect risk
            locations and understand where cooling action
            may have the highest value.
          </p>

        </div>


        <div className="reports-final-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setActivePage("Heat Map")
            }
          >
            Open Heat Map
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setActivePage("AI Cooling Plan")
            }
          >
            Create Cooling Plan
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
          Report records shown here represent the frontend
          reporting workflow. Production reports can be
          generated from the connected forecast, risk,
          optimization and intervention-simulation APIs.
        </p>

      </div>

    </div>
  );
}

export default Reports;