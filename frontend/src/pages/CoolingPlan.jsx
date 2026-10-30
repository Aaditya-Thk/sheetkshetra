
import { useMemo, useState, useEffect, useRef } from "react";

const INTERVENTIONS = [
  {
    id: "forestry",
    name: "Urban Forestry",
    description: "Increase tree canopy in high-heat locations.",
    weight: 30,
    impact: "High",
    coverage: "Green corridors",
  },
  {
    id: "roofs",
    name: "Cool Roofs",
    description: "Reduce heat absorption across exposed buildings.",
    weight: 25,
    impact: "High",
    coverage: "Exposed buildings",
  },
  {
    id: "reflective",
    name: "Reflective Surfaces",
    description: "Reduce heat absorption from roads and paved areas.",
    weight: 15,
    impact: "Medium",
    coverage: "Priority roads",
  },
  {
    id: "water",
    name: "Cooling & Water Centres",
    description: "Create accessible heat-relief locations.",
    weight: 15,
    impact: "High",
    coverage: "Vulnerable communities",
  },
  {
    id: "shade",
    name: "Shade Infrastructure",
    description: "Add shaded pedestrian routes and public spaces.",
    weight: 15,
    impact: "Medium",
    coverage: "Exposed corridors",
  },
];

const PRIORITY_LOCATIONS = [
  {
    name: "Patia",
    score: 92,
    reason: "Illustrative high thermal-risk and exposure scenario.",
    action: "Urban forestry + cool roofs",
  },
  {
    name: "Khandagiri",
    score: 74,
    reason: "Illustrative high built-up and low-vegetation scenario.",
    action: "Cool roofs + reflective surfaces",
  },
  {
    name: "Saheed Nagar",
    score: 61,
    reason: "Illustrative moderate-high exposure scenario.",
    action: "Shade infrastructure + vegetation",
  },
  {
    name: "Old Town",
    score: 47,
    reason: "Illustrative comparatively lower-risk scenario.",
    action: "Maintain existing cooling assets",
  },
];

const formatINR = (value) => {
  if (!Number.isFinite(value)) return "₹0";
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
};

function CoolingPlan({ setActivePage }) {
  const [budget, setBudget] = useState("250000000");
  const [planGenerated, setPlanGenerated] = useState(false);

  const [selectedInterventions, setSelectedInterventions] = useState(
    INTERVENTIONS.map((item) => item.id)
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const budgetValue = Number(budget);
  const validBudget = Number.isFinite(budgetValue) && budgetValue > 0;

  const activeInterventions = useMemo(
    () =>
      INTERVENTIONS.filter((item) =>
        selectedInterventions.includes(item.id)
      ),
    [selectedInterventions]
  );

  const totalWeight = activeInterventions.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  const allocations = activeInterventions.map((item) => {
    const percentage =
      totalWeight > 0 ? (item.weight / totalWeight) * 100 : 0;

    return {
      ...item,
      percentage,
      amount: validBudget ? (budgetValue * percentage) / 100 : 0,
    };
  });

  const totalAllocated = allocations.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const remainingBudget = Math.max(0, budgetValue - totalAllocated);

  const utilization = validBudget
    ? Math.min(100, (totalAllocated / budgetValue) * 100)
    : 0;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleIntervention = (id) => {
    setSelectedInterventions((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
    setPlanGenerated(false);
  };

  const selectAll = () => {
    setSelectedInterventions(INTERVENTIONS.map((item) => item.id));
    setPlanGenerated(false);
  };

  const clearAll = () => {
    setSelectedInterventions([]);
    setPlanGenerated(false);
  };

  const generatePlan = () => {
    if (!validBudget) {
      alert("Please enter a valid budget greater than zero.");
      return;
    }

    if (activeInterventions.length === 0) {
      alert("Please select at least one cooling intervention.");
      setDropdownOpen(true);
      return;
    }

    setPlanGenerated(true);
    setDropdownOpen(false);
  };

  return (
    <div className="cooling-plan-page">

      {/* HEADER */}

      <section className="page-header">
        <div className="page-header-copy">
          <div className="page-eyebrow">
            COOLING BUDGET OPTIMIZATION
          </div>

          <h1 className="page-title">AI Cooling Plan</h1>

          <p className="page-description">
            Tell SheetKshetra your available city budget.
            Select cooling interventions and generate a
            budget allocation strategy.
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

      {/* BUDGET */}

      <section className="cooling-budget-card">
        <div className="cooling-budget-copy">
          <div className="page-eyebrow">STEP 01</div>

          <h2>What is your available budget?</h2>

          <p>
            Enter the total amount available for urban cooling.
            The planner will distribute the budget across your
            selected interventions.
          </p>
        </div>

        <div className="cooling-budget-input-area">
          <label htmlFor="cooling-budget">AVAILABLE CITY BUDGET</label>

          <div className="cooling-budget-input">
            <span>₹</span>
            <input
              id="cooling-budget"
              type="number"
              min="1"
              value={budget}
              onChange={(event) => {
                setBudget(event.target.value);
                setPlanGenerated(false);
              }}
              placeholder="Enter budget"
            />
          </div>

          <div className="cooling-budget-preview">
            {formatINR(validBudget ? budgetValue : 0)}
          </div>

          <button
            type="button"
            className="primary-button cooling-generate-button"
            onClick={generatePlan}
          >
            Generate Cooling Plan →
          </button>
        </div>
      </section>
      {/* MODERN MULTI-SELECT */}

      <section className="dashboard-card cooling-selector-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">
              Select Cooling Interventions
            </div>

            <div className="dashboard-card-subtitle">
              Choose which strategies should be included in your plan.
            </div>
          </div>
        </div>

        <div className="cooling-multiselect" ref={dropdownRef}>
          <button
            type="button"
            className={`cooling-multiselect-trigger ${
              dropdownOpen ? "active" : ""
            }`}
            onClick={() => setDropdownOpen((open) => !open)}
            aria-expanded={dropdownOpen}
          >
            <div className="cooling-trigger-content">
              <span className="cooling-trigger-label">
                COOLING STRATEGIES
              </span>

              <strong>
                {selectedInterventions.length === 0
                  ? "Select interventions"
                  : `${selectedInterventions.length} of ${INTERVENTIONS.length} selected`}
              </strong>
            </div>

            <span className="cooling-trigger-icon">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>

          {dropdownOpen && (
            <div className="cooling-multiselect-menu">
              <div className="cooling-menu-header">
                <div>
                  <strong>Available interventions</strong>
                  <span>Select one or more strategies</span>
                </div>

                <div className="cooling-menu-actions">
                  <button type="button" onClick={selectAll}>
                    Select all
                  </button>

                  <button type="button" onClick={clearAll}>
                    Clear
                  </button>
                </div>
              </div>

              <div className="cooling-menu-list">
                {INTERVENTIONS.map((item) => {
                  const checked = selectedInterventions.includes(item.id);

                  return (
                    <label
                      key={item.id}
                      className={`cooling-menu-item ${
                        checked ? "selected" : ""
                      }`}
                    >
                      <div className="cooling-menu-item-info">
                        <strong>{item.name}</strong>
                        <span>{item.description}</span>
                      </div>

                      <span className="cooling-custom-checkbox">
                        {checked && (
                          <svg
                            viewBox="0 0 16 16"
                            width="13"
                            height="13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m3 8 3 3 7-7" />
                          </svg>
                        )}
                      </span>

                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleIntervention(item.id)}
                      />
                    </label>
                  );
                })}
              </div>

              <div className="cooling-menu-footer">
                <span>
                  {selectedInterventions.length} selected
                </span>

                <button
                  type="button"
                  onClick={() => setDropdownOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="cooling-selection-summary">
          <span>
            {selectedInterventions.length === 0
              ? "No interventions selected"
              : activeInterventions.map((item) => item.name).join(" · ")}
          </span>
        </div>
      </section>

      {/* GENERATED PLAN */}

      {planGenerated && (
        <>
          
          {/* ALLOCATION BREAKDOWN */}

          <section className="dashboard-card intervention-card">
            <div className="dashboard-card-header">
              <div>
                <div className="dashboard-card-title">
                  Intervention-wise Budget Allocation
                </div>

                <div className="dashboard-card-subtitle">
                  Distribution based on demonstration weights.
                </div>
              </div>
            </div>

            <div className="intervention-list">
              {allocations.map((item, index) => (
                <div className="intervention-row" key={item.id}>
                  <div className="intervention-number">
                    0{index + 1}
                  </div>

                  <div className="intervention-content">
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>

                    <div className="cooling-mini-track">
                      <div
                        className="cooling-mini-fill"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="intervention-coverage">
                    <span>ALLOCATION SHARE</span>
                    <strong>{item.percentage.toFixed(1)}%</strong>
                  </div>

                  <div className="intervention-allocation">
                    <span>ALLOCATED AMOUNT</span>
                    <strong>{formatINR(item.amount)}</strong>
                  </div>

                  <div className={`intervention-impact ${item.impact.toLowerCase()}`}>
                    {item.impact}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* PRIORITY LOCATIONS */}

      <section className="dashboard-card cooling-priority-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">
              Priority Locations
            </div>

            <div className="dashboard-card-subtitle">
              Illustrative scenarios pending verified ward and grid data.
            </div>
          </div>

          <button
            type="button"
            className="text-button"
            onClick={() => setActivePage("Risk Analysis")}
          >
            Review risk →
          </button>
        </div>

        <div className="cooling-priority-list">
          {PRIORITY_LOCATIONS.map((location, index) => (
            <div className="cooling-priority-row" key={location.name}>
              <div className="cooling-priority-rank">
                0{index + 1}
              </div>

              <div className="cooling-priority-location">
                <strong>{location.name}</strong>
                <span>{location.reason}</span>
              </div>

              <div className="cooling-priority-score">
                <span>DEMO SCORE</span>
                <strong>{location.score}</strong>
              </div>

              <div className="cooling-priority-action">
                <span>ILLUSTRATIVE ACTION</span>
                <strong>{location.action}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DECISION FRAMEWORK */}

      <section className="cooling-decision-card">
        <div className="cooling-decision-copy">
          <div className="page-eyebrow">DECISION FRAMEWORK</div>

          <h2>WHERE → WHY → WHAT → HOW MUCH</h2>

          <p>
            Connect heat-risk identification, contributing factors,
            suitable interventions and budget allocation into one
            decision workflow.
          </p>
        </div>

        <div className="cooling-decision-steps">
          {[
            ["01", "WHERE", "Identify priority locations"],
            ["02", "WHY", "Understand heat drivers"],
            ["03", "WHAT", "Select cooling interventions"],
            ["04", "HOW MUCH", "Allocate available budget"],
          ].map(([number, title, description]) => (
            <div className="cooling-decision-step" key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <small>{description}</small>
            </div>
          ))}
        </div>
      </section>

      {/* DIGITAL TWIN */}

      <section className="cooling-next-step">
        <div>
          <div className="page-eyebrow">NEXT</div>

          <h2>Simulate the proposed city.</h2>

          <p>
            Compare the baseline heat profile with a proposed
            cooling intervention scenario.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => setActivePage("Digital Twin")}
        >
          Open Digital Twin →
        </button>
      </section>

      {/* DATA DISCLAIMER */}

      <div className="forecast-data-note">
        <span className="data-note-mark">i</span>

        <p>
          This version uses configurable demonstration weights for
          budget allocation. It is not yet a validated AI optimizer.
          Actual intervention costs, quantities, cooling effects and
          priority locations must be connected to verified project data.
        </p>
      </div>

    </div>
  );
}

export default CoolingPlan;
