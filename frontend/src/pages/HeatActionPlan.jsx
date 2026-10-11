function HeatActionPlan({ setActivePage }) {
  const actions = [
    {
      priority: "01",
      location: "Patia",
      risk: "92",
      intervention: "Urban Forestry + Cool Roofs",
      reason:
        "Highest thermal risk with high built-up intensity and low vegetation.",
      population: "48,200",
      status: "Immediate",
    },
    {
      priority: "02",
      location: "Khandagiri",
      risk: "74",
      intervention: "Cool Roofs + Reflective Surfaces",
      reason:
        "High surface temperature combined with limited urban vegetation.",
      population: "36,700",
      status: "Immediate",
    },
    {
      priority: "03",
      location: "Saheed Nagar",
      risk: "61",
      intervention: "Shade Infrastructure + Vegetation",
      reason:
        "Moderate-high thermal exposure across dense urban areas.",
      population: "29,400",
      status: "Priority",
    },
    {
      priority: "04",
      location: "Old Town",
      risk: "47",
      intervention: "Maintain Cooling Assets",
      reason:
        "Lower current risk with comparatively stronger vegetation coverage.",
      population: "21,800",
      status: "Monitor",
    },
  ];

  const responsePhases = [
    {
      number: "01",
      title: "Prepare",
      description:
        "Review forecast conditions, vulnerable locations and expected heat stress before the peak heat period.",
    },
    {
      number: "02",
      title: "Warn",
      description:
        "Issue targeted warnings to authorities and vulnerable populations when configured thresholds are crossed.",
    },
    {
      number: "03",
      title: "Protect",
      description:
        "Activate cooling centres, shaded areas, water access and other immediate heat-protection measures.",
    },
    {
      number: "04",
      title: "Cool",
      description:
        "Deploy longer-term interventions identified through the AI cooling optimization workflow.",
    },
  ];

  return (
    <div className="heat-action-plan-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="page-header">

        <div className="page-header-copy">

          <div className="page-eyebrow">
            MUNICIPAL HEAT RESPONSE
          </div>

          <h1 className="page-title">
            Heat Action Plan
          </h1>

          <p className="page-description">
            Convert heat forecasts, human thermal risk and
            AI cooling recommendations into an
            implementation-ready city response plan.
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
          PLAN STATUS
          ===================================================== */}

      <section className="action-plan-status">

        <div className="action-plan-status-main">

          <div className="action-plan-status-mark">
            HAP
          </div>

          <div>

            <div className="action-plan-status-title">
              Bhubaneswar Heat Action Plan
            </div>

            <p>
              Prepared from current forecast and thermal
              risk assessment.
            </p>

          </div>

        </div>

        <div className="action-plan-status-right">

          <span>
            PLAN STATUS
          </span>

          <strong>
            REVIEW REQUIRED
          </strong>

        </div>

      </section>


      {/* =====================================================
          EXECUTIVE SUMMARY
          ===================================================== */}

      <section className="dashboard-card action-summary-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Executive Summary
            </div>

            <div className="dashboard-card-subtitle">
              Current heat situation requiring coordinated
              municipal response
            </div>

          </div>

          <div className="action-summary-severity">
            HIGH HEAT RISK
          </div>

        </div>


        <div className="action-summary-content">

          <div className="action-summary-text">

            <p>
              Bhubaneswar is expected to experience elevated
              heat conditions during the current forecast
              window, with the highest thermal stress
              concentrated in dense and low-vegetation
              urban areas.
            </p>

            <p>
              The response should combine immediate heat
              protection and warning measures with targeted
              cooling interventions for priority locations.
            </p>

          </div>


          <div className="action-summary-metrics">

            <div>

              <span>
                PEAK TEMPERATURE
              </span>

              <strong>
                40.1°C
              </strong>

            </div>

            <div>

              <span>
                PEAK WBGT
              </span>

              <strong>
                34.1°C
              </strong>

            </div>

            <div>

              <span>
                POPULATION AT RISK
              </span>

              <strong>
                2.4L
              </strong>

            </div>

            <div>

              <span>
                CRITICAL ZONES
              </span>

              <strong>
                18
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          RESPONSE FRAMEWORK
          ===================================================== */}

      <section className="dashboard-card response-framework-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Heat Response Framework
            </div>

            <div className="dashboard-card-subtitle">
              Recommended sequence from prediction to
              intervention
            </div>

          </div>

        </div>


        <div className="response-framework">

          {responsePhases.map((phase, index) => (

            <div
              className="response-phase"
              key={phase.number}
            >

              <div className="response-phase-number">
                {phase.number}
              </div>

              <div className="response-phase-content">

                <strong>
                  {phase.title}
                </strong>

                <p>
                  {phase.description}
                </p>

              </div>

              {index <
                responsePhases.length - 1 && (
                <div className="response-phase-arrow">
                  →
                </div>
              )}

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          PRIORITY ACTIONS
          ===================================================== */}

      <section className="dashboard-card action-priority-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Priority Actions
            </div>

            <div className="dashboard-card-subtitle">
              Location-specific interventions based on
              current thermal risk
            </div>

          </div>

          <button
            type="button"
            className="text-button"
            onClick={() =>
              setActivePage("AI Cooling Plan")
            }
          >
            Review AI plan →
          </button>

        </div>


        <div className="action-priority-table">

          <div className="action-priority-head">

            <span>
              PRIORITY
            </span>

            <span>
              LOCATION
            </span>

            <span>
              RISK
            </span>

            <span>
              RECOMMENDED ACTION
            </span>

            <span>
              POPULATION
            </span>

            <span>
              STATUS
            </span>

          </div>


          {actions.map((action) => (

            <div
              className="action-priority-row"
              key={action.priority}
            >

              <span className="action-priority-number">
                {action.priority}
              </span>

              <strong>
                {action.location}
              </strong>

              <span className="action-priority-score">
                {action.risk}
              </span>

              <div className="action-priority-intervention">

                <strong>
                  {action.intervention}
                </strong>

                <span>
                  {action.reason}
                </span>

              </div>

              <span>
                {action.population}
              </span>

              <span
                className={`action-priority-status ${action.status.toLowerCase()}`}
              >
                {action.status}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          IMMEDIATE PROTECTION
          ===================================================== */}

      <section className="action-protection-grid">

        <div className="dashboard-card">

          <div className="action-card-number">
            01
          </div>

          <div className="action-card-title">
            Cooling & Water Centres
          </div>

          <p>
            Activate accessible cooling and hydration
            locations in high-risk areas during peak heat
            periods.
          </p>

          <div className="action-card-status">
            PRIORITY
          </div>

        </div>


        <div className="dashboard-card">

          <div className="action-card-number">
            02
          </div>

          <div className="action-card-title">
            Vulnerable Population Outreach
          </div>

          <p>
            Prioritise heat warnings and support for
            populations with greater exposure or reduced
            ability to adapt.
          </p>

          <div className="action-card-status">
            PRIORITY
          </div>

        </div>


        <div className="dashboard-card">

          <div className="action-card-number">
            03
          </div>

          <div className="action-card-title">
            Public Heat Warning
          </div>

          <p>
            Coordinate authority and community
            notifications before forecast peak heat
            conditions.
          </p>

          <div className="action-card-status">
            READY
          </div>

        </div>

      </section>


      {/* =====================================================
          LONG TERM COOLING
          ===================================================== */}

      <section className="dashboard-card long-term-action-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Long-Term Cooling Programme
            </div>

            <div className="dashboard-card-subtitle">
              Structural interventions for reducing
              recurring urban heat
            </div>

          </div>

        </div>


        <div className="long-term-actions">

          <div className="long-term-action">

            <div className="long-term-action-icon">
              01
            </div>

            <div>

              <strong>
                Urban Forestry
              </strong>

              <span>
                Expand vegetation and connected green
                corridors in priority heat zones.
              </span>

            </div>

          </div>


          <div className="long-term-action">

            <div className="long-term-action-icon">
              02
            </div>

            <div>

              <strong>
                Cool Roofs
              </strong>

              <span>
                Reduce heat absorption from exposed
                buildings and rooftops.
              </span>

            </div>

          </div>


          <div className="long-term-action">

            <div className="long-term-action-icon">
              03
            </div>

            <div>

              <strong>
                Reflective Surfaces
              </strong>

              <span>
                Target heat-absorbing roads and exposed
                urban surfaces.
              </span>

            </div>

          </div>


          <div className="long-term-action">

            <div className="long-term-action-icon">
              04
            </div>

            <div>

              <strong>
                Shade Infrastructure
              </strong>

              <span>
                Improve thermal comfort across pedestrian
                and public-use areas.
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMPLEMENTATION TIMELINE
          ===================================================== */}

      <section className="dashboard-card implementation-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Implementation Timeline
            </div>

            <div className="dashboard-card-subtitle">
              Suggested sequence for municipal execution
            </div>

          </div>

        </div>


        <div className="implementation-timeline">

          <div className="timeline-item">

            <span>
              NOW
            </span>

            <strong>
              Activate alerts
            </strong>

            <p>
              Issue warnings and prepare response teams.
            </p>

          </div>


          <div className="timeline-item">

            <span>
              0–7 DAYS
            </span>

            <strong>
              Protect priority zones
            </strong>

            <p>
              Activate cooling centres, water access and
              shade measures.
            </p>

          </div>


          <div className="timeline-item">

            <span>
              1–3 MONTHS
            </span>

            <strong>
              Begin interventions
            </strong>

            <p>
              Deploy priority urban cooling measures.
            </p>

          </div>


          <div className="timeline-item">

            <span>
              3–12 MONTHS
            </span>

            <strong>
              Evaluate impact
            </strong>

            <p>
              Compare intervention outcomes through the
              Digital Twin.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL DECISION
          ===================================================== */}

      <section className="action-plan-final-card">

        <div>

          <div className="page-eyebrow">
            NEXT DECISION
          </div>

          <h2>
            Simulate before you implement.
          </h2>

          <p>
            Use the Digital Twin to compare the proposed
            cooling strategy against the current city
            condition before finalising implementation.
          </p>

        </div>


        <div className="action-plan-final-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setActivePage("AI Cooling Plan")
            }
          >
            Review cooling plan
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setActivePage("Digital Twin")
            }
          >
            Open Digital Twin
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
          This Heat Action Plan is a demonstration
          workflow. Production plans should be generated
          from calibrated forecasts, risk models, validated
          intervention simulations and authority-approved
          implementation data.
        </p>

      </div>

    </div>
  );
}

export default HeatActionPlan;