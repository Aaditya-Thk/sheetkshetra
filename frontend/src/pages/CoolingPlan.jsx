import { useState } from "react";

function CoolingPlan({ setActivePage }) {
  const [budget, setBudget] = useState("250000000");
  const [planGenerated, setPlanGenerated] = useState(false);

  const interventions = [
    {
      name: "Urban Forestry",
      description:
        "Increase tree canopy and vegetation in high-risk, low-green-cover locations.",
      allocation: "₹8.40 Cr",
      coverage: "Priority corridors",
      impact: "High",
    },
    {
      name: "Cool Roofs",
      description:
        "Reduce heat absorption across exposed high-density built-up areas.",
      allocation: "₹6.20 Cr",
      coverage: "28,000 buildings",
      impact: "High",
    },
    {
      name: "Reflective Surfaces",
      description:
        "Target heat-absorbing roads and exposed urban surfaces.",
      allocation: "₹4.10 Cr",
      coverage: "Priority road network",
      impact: "Medium",
    },
    {
      name: "Cooling & Water Centres",
      description:
        "Provide accessible heat-relief locations for vulnerable populations.",
      allocation: "₹3.30 Cr",
      coverage: "18 priority zones",
      impact: "High",
    },
    {
      name: "Shade Infrastructure",
      description:
        "Add shaded pedestrian and public-space infrastructure in exposed areas.",
      allocation: "₹2.00 Cr",
      coverage: "High-exposure corridors",
      impact: "Medium",
    },
  ];

  const priorityLocations = [
    {
      name: "Patia",
      score: 92,
      reason:
        "Highest combined thermal risk and population exposure.",
      action: "Urban forestry + cool roofs",
    },
    {
      name: "Khandagiri",
      score: 74,
      reason:
        "High built-up intensity with limited vegetation.",
      action: "Cool roofs + reflective surfaces",
    },
    {
      name: "Saheed Nagar",
      score: 61,
      reason:
        "Moderate-high thermal exposure in dense urban areas.",
      action: "Shade infrastructure + vegetation",
    },
    {
      name: "Old Town",
      score: 47,
      reason:
        "Lower current risk with comparatively better vegetation.",
      action: "Maintain existing cooling assets",
    },
  ];

  const generatePlan = () => {
    setPlanGenerated(true);
  };

  const formatBudget = (value) => {
    const number = Number(value);

    if (!number || number < 0) {
      return "₹0";
    }

    return `₹${(number / 10000000).toFixed(1)} Cr`;
  };

  return (
    <div className="cooling-plan-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="page-header">

        <div className="page-header-copy">

          <div className="page-eyebrow">
            AI COOLING OPTIMIZATION
          </div>

          <h1 className="page-title">
            AI Cooling Plan
          </h1>

          <p className="page-description">
            Tell SheetKshetra the available budget. The
            system identifies where cooling action should
            happen, which interventions should be used and
            how the budget can be allocated.
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
          BUDGET INPUT
          ===================================================== */}

      <section className="cooling-budget-card">

        <div className="cooling-budget-copy">

          <div className="page-eyebrow">
            STEP 01
          </div>

          <h2>
            What is your available budget?
          </h2>

          <p>
            Enter the amount available for urban cooling.
            SheetKshetra will optimise the intervention mix
            around human protection, heat reduction and
            available resources.
          </p>

        </div>


        <div className="cooling-budget-input-area">

          <label htmlFor="cooling-budget">
            AVAILABLE CITY BUDGET
          </label>

          <div className="cooling-budget-input">

            <span>
              ₹
            </span>

            <input
              id="cooling-budget"
              type="number"
              min="0"
              value={budget}
              onChange={(event) =>
                setBudget(event.target.value)
              }
              placeholder="Enter budget"
            />

          </div>

          <div className="cooling-budget-preview">
            {formatBudget(budget)}
          </div>

          <button
            type="button"
            className="primary-button cooling-generate-button"
            onClick={generatePlan}
          >
            Generate AI Cooling Plan
            <span>
              →
            </span>
          </button>

        </div>

      </section>


      {/* =====================================================
          OPTIMIZATION TARGET
          ===================================================== */}

      <section className="cooling-objective-card">

        <div className="cooling-objective-title">
          OPTIMIZATION OBJECTIVE
        </div>

        <div className="cooling-objective-main">

          <div className="cooling-objective-item">

            <strong>
              Protect people
            </strong>

            <span>
              Prioritise vulnerable and highly exposed
              populations.
            </span>

          </div>

          <div className="cooling-objective-divider"></div>

          <div className="cooling-objective-item">

            <strong>
              Reduce heat
            </strong>

            <span>
              Target locations where interventions can
              meaningfully reduce thermal stress.
            </span>

          </div>

          <div className="cooling-objective-divider"></div>

          <div className="cooling-objective-item">

            <strong>
              Stay within budget
            </strong>

            <span>
              Select an intervention mix that fits the
              available resources.
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          GENERATED PLAN
          ===================================================== */}

      {planGenerated && (

        <section className="cooling-generated-card">

          <div className="dashboard-card-header">

            <div>

              <div className="dashboard-card-title">
                AI-Generated Cooling Strategy
              </div>

              <div className="dashboard-card-subtitle">
                Demonstration optimisation for the entered
                city budget
              </div>

            </div>

            <div className="cooling-plan-status">
              PLAN READY
            </div>

          </div>


          <div className="cooling-plan-summary">

            <div>

              <span>
                AVAILABLE BUDGET
              </span>

              <strong>
                {formatBudget(budget)}
              </strong>

            </div>

            <div>

              <span>
                PRIORITY ZONES
              </span>

              <strong>
                18
              </strong>

            </div>

            <div>

              <span>
                INTERVENTION TYPES
              </span>

              <strong>
                5
              </strong>

            </div>

            <div>

              <span>
                OPTIMIZATION MODE
              </span>

              <strong>
                HUMAN PROTECTION
              </strong>

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          PRIORITY LOCATIONS
          ===================================================== */}

      <section className="dashboard-card cooling-priority-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Priority Locations
            </div>

            <div className="dashboard-card-subtitle">
              AI-ranked areas for cooling intervention
            </div>

          </div>

          <button
            type="button"
            className="text-button"
            onClick={() =>
              setActivePage("Risk Analysis")
            }
          >
            Review risk →
          </button>

        </div>


        <div className="cooling-priority-list">

          {priorityLocations.map((location, index) => (

            <div
              className="cooling-priority-row"
              key={location.name}
            >

              <div className="cooling-priority-rank">
                0{index + 1}
              </div>

              <div className="cooling-priority-location">

                <strong>
                  {location.name}
                </strong>

                <span>
                  {location.reason}
                </span>

              </div>

              <div className="cooling-priority-score">

                <span>
                  RISK
                </span>

                <strong>
                  {location.score}
                </strong>

              </div>

              <div className="cooling-priority-action">

                <span>
                  RECOMMENDED ACTION
                </span>

                <strong>
                  {location.action}
                </strong>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          INTERVENTION MIX
          ===================================================== */}

      <section className="dashboard-card intervention-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Recommended Intervention Mix
            </div>

            <div className="dashboard-card-subtitle">
              Example allocation across cooling strategies
            </div>

          </div>

          <div className="intervention-total">
            100%
          </div>

        </div>


        <div className="intervention-list">

          {interventions.map((item, index) => (

            <div
              className="intervention-row"
              key={item.name}
            >

              <div className="intervention-number">
                0{index + 1}
              </div>

              <div className="intervention-content">

                <strong>
                  {item.name}
                </strong>

                <p>
                  {item.description}
                </p>

              </div>

              <div className="intervention-coverage">

                <span>
                  COVERAGE
                </span>

                <strong>
                  {item.coverage}
                </strong>

              </div>

              <div className="intervention-allocation">

                <span>
                  ALLOCATION
                </span>

                <strong>
                  {item.allocation}
                </strong>

              </div>

              <div
                className={`intervention-impact ${item.impact.toLowerCase()}`}
              >
                {item.impact}
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          AI DECISION FRAMEWORK
          ===================================================== */}

      <section className="cooling-decision-card">

        <div className="cooling-decision-copy">

          <div className="page-eyebrow">
            AI DECISION FRAMEWORK
          </div>

          <h2>
            WHERE → WHY → WHAT → HOW MUCH
          </h2>

          <p>
            SheetKshetra is designed to move beyond
            identifying hot locations. The optimization
            engine connects risk, causes, interventions,
            cost and expected impact into one decision
            workflow.
          </p>

        </div>


        <div className="cooling-decision-steps">

          <div className="cooling-decision-step">

            <span>
              01
            </span>

            <strong>
              WHERE
            </strong>

            <small>
              Identify priority locations
            </small>

          </div>

          <div className="cooling-decision-step">

            <span>
              02
            </span>

            <strong>
              WHY
            </strong>

            <small>
              Explain the heat drivers
            </small>

          </div>

          <div className="cooling-decision-step">

            <span>
              03
            </span>

            <strong>
              WHAT
            </strong>

            <small>
              Select cooling interventions
            </small>

          </div>

          <div className="cooling-decision-step">

            <span>
              04
            </span>

            <strong>
              HOW MUCH
            </strong>

            <small>
              Allocate budget and quantities
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          NEXT STEP
          ===================================================== */}

      <section className="cooling-next-step">

        <div>

          <div className="page-eyebrow">
            NEXT
          </div>

          <h2>
            Simulate the proposed city.
          </h2>

          <p>
            Use the Digital Twin to compare the current
            heat profile with the proposed intervention
            scenario.
          </p>

        </div>

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

      </section>


      {/* =====================================================
          DATA NOTE
          ===================================================== */}

      <div className="forecast-data-note">

        <span className="data-note-mark">
          i
        </span>

        <p>
          Intervention quantities, costs and impact values
          shown here are demonstration values. Production
          recommendations should be generated from the
          calibrated optimization model, intervention cost
          database and validated cooling simulations.
        </p>

      </div>

    </div>
  );
}

export default CoolingPlan;