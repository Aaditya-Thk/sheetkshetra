
function Overview({ setActivePage }) {
  const forecastData = [
    { day: "TODAY", date: "05 OCT", temperature: 37.8, condition: "High Heat", risk: "HIGH" },
    { day: "TUE", date: "06 OCT", temperature: 39.2, condition: "Very Hot", risk: "HIGH" },
    { day: "WED", date: "07 OCT", temperature: 40.1, condition: "Extreme Heat", risk: "CRITICAL" },
    { day: "THU", date: "08 OCT", temperature: 38.6, condition: "High Heat", risk: "HIGH" },
    { day: "FRI", date: "09 OCT", temperature: 36.9, condition: "Moderate Heat", risk: "MEDIUM" },
  ];

  const riskZones = [
    { ward: "Patia", score: 92, temperature: "41.2°C", population: "48,200", status: "Critical" },
    { ward: "Khandagiri", score: 74, temperature: "39.4°C", population: "36,700", status: "High" },
    { ward: "Saheed Nagar", score: 61, temperature: "37.6°C", population: "29,400", status: "Medium" },
    { ward: "Old Town", score: 47, temperature: "34.8°C", population: "21,800", status: "Low" },
  ];

  const riskDistribution = [
    { label: "Critical", value: 18, color: "#c93b2d" },
    { label: "High", value: 34, color: "#e8751a" },
    { label: "Medium", value: 29, color: "#d7ad39" },
    { label: "Low", value: 19, color: "#439b78" },
  ];

  const navigateTo = (page) => setActivePage(page);
  const maxTemperature = Math.max(...forecastData.map((item) => item.temperature));

  return (
    <div className="overview-page">
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="page-header-copy">
          <div className="page-eyebrow">URBAN HEAT INTELLIGENCE</div>
          <h1 className="page-title">Protect the city.</h1>
          <p className="page-description">
            Predict urban heat, identify vulnerable locations and help
            authorities decide where cooling action is needed most.
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

      {/* CITY OVERVIEW */}
      <section className="overview-metrics">
        <div className="metric-card">
          <div className="metric-card-top">
            <span>CURRENT TEMPERATURE</span>
            <span className="metric-indicator orange"></span>
          </div>
          <div className="metric-value">37.8<span>°C</span></div>
          <div className="metric-footer">
            <strong>+2.4°C</strong>
            <span>above seasonal baseline</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span>HUMAN THERMAL STRESS</span>
            <span className="metric-indicator red"></span>
          </div>
          <div className="metric-value">31.6<span>°C WBGT</span></div>
          <div className="metric-footer">
            <strong>HIGH</strong>
            <span>heat stress condition</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span>POPULATION AT RISK</span>
            <span className="metric-indicator red"></span>
          </div>
          <div className="metric-value">2.4<span>L</span></div>
          <div className="metric-footer">
            <strong>18 wards</strong>
            <span>requiring attention</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span>ACTIVE ALERTS</span>
            <span className="metric-indicator orange"></span>
          </div>
          <div className="metric-value">06</div>
          <div className="metric-footer">
            <strong>03 high priority</strong>
            <span>authority notifications</span>
          </div>
        </div>
      </section>

      {/* FORECAST + THERMAL RISK */}
      <section className="overview-main-grid">
        <div className="dashboard-card forecast-card">
          <div className="dashboard-card-header">
            <div>
              <div className="dashboard-card-title">5-Day Heat Forecast</div>
              <div className="dashboard-card-subtitle">
                Daily temperature outlook · °C
              </div>
            </div>
            <button className="text-button" onClick={() => navigateTo("Forecast")}>
              View forecast →
            </button>
          </div>

          <div className="forecast-list animated-forecast">
            {forecastData.map((item, index) => (
              <div
                className={`forecast-item forecast-animated-item ${index === 0 ? "today" : ""}`}
                key={item.date}
                style={{ "--forecast-delay": `${index * 100}ms` }}
              >
                <div className="forecast-date">
                  <span>{item.day}</span>
                  <small>{item.date}</small>
                </div>

                <div className="forecast-temperature">
                  {item.temperature.toFixed(1)}°C
                </div>

                <div className="forecast-condition">
                  <div className="forecast-temp-track">
                    <div
                      className={`forecast-temp-fill ${item.risk.toLowerCase()}`}
                      style={{
                        "--bar-width": `${((item.temperature - 30) / (maxTemperature - 30)) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span>{item.condition}</span>
                </div>

                <div className={`forecast-risk ${item.risk.toLowerCase()}`}>
                  {item.risk}
                </div>
              </div>
            ))}
          </div>

          <div className="forecast-animation-note">
            <span className="forecast-live-dot"></span>
            Five-day temperature outlook
          </div>
        </div>

        <div className="dashboard-card risk-summary-card">
          <div className="dashboard-card-header">
            <div>
              <div className="dashboard-card-title">Human Thermal Risk</div>
              <div className="dashboard-card-subtitle">
                City-level risk assessment
              </div>
            </div>
            <button className="text-button" onClick={() => navigateTo("Risk Analysis")}>
              Analyse →
            </button>
          </div>

          <div className="thermal-risk-chart-content">
            <div className="thermal-risk-donut">
              <div className="thermal-risk-donut-hole">
                <strong>72</strong>
                <span>RISK SCORE</span>
                <small>HIGH RISK</small>
              </div>
            </div>

            <div className="thermal-risk-legend">
              {riskDistribution.map((item) => (
                <div className="thermal-risk-legend-row" key={item.label}>
                  <span
                    className="thermal-risk-legend-dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="thermal-risk-legend-name">{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="thermal-risk-insight">
            <span></span>
            <p>
              <strong>52%</strong> of the displayed risk distribution is
              classified as high or critical.
            </p>
          </div>
        </div>
      </section>

      {/* SIMPLE WARD COMPARISON */}
      <section className="dashboard-card ward-chart-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Ward-wise Risk Comparison</div>
            <div className="dashboard-card-subtitle">
              Risk scores across priority locations
            </div>
          </div>
          <button className="text-button" onClick={() => navigateTo("Heat Map")}>
            Open heat map →
          </button>
        </div>

        <div className="simple-ward-list">
          {riskZones.map((zone) => (
            <div className="simple-ward-row" key={zone.ward}>
              <div className="simple-ward-info">
                <strong>{zone.ward}</strong>
                <span>{zone.status} risk</span>
              </div>

              <div className="simple-ward-score">
                <strong>{zone.score}</strong>
                <span>/ 100</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chart-footnote">
          Risk scores are illustrative demo values.
        </div>
      </section>

      {/* HIGHEST-RISK WARDS */}
      <section className="dashboard-card risk-zones-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">Highest-Risk Wards</div>
            <div className="dashboard-card-subtitle">
              Locations requiring cooling assessment
            </div>
          </div>
          <button className="text-button" onClick={() => navigateTo("Heat Map")}>
            Open heat map →
          </button>
        </div>

        <div className="risk-zone-table">
          <div className="risk-zone-table-head">
            <span>WARD</span>
            <span>RISK SCORE</span>
            <span>SURFACE TEMP.</span>
            <span>POPULATION</span>
            <span>STATUS</span>
          </div>

          {riskZones.map((zone) => (
            <div className="risk-zone-table-row" key={zone.ward}>
              <strong>{zone.ward}</strong>
              <span className="risk-score-cell">{zone.score}</span>
              <span>{zone.temperature}</span>
              <span>{zone.population}</span>
              <span className={`status-badge ${zone.status.toLowerCase()}`}>
                {zone.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* AI COOLING PLAN */}
      <section className="cooling-action-card">
        <div className="cooling-action-copy">
          <div className="cooling-action-label">AI COOLING OPTIMIZATION</div>
          <h2>
            Give us the budget.
            <br />
            AI plans the cooling.
          </h2>
          <p>
            Enter the available city budget to identify priority locations,
            choose cooling interventions and estimate their potential impact.
          </p>
        </div>

        <div className="cooling-action-right">
          <div className="cooling-action-stat">
            <span>OPTIMIZATION TARGET</span>
            <strong>Human protection + temperature reduction</strong>
          </div>
          <button
            className="cooling-action-button"
            onClick={() => navigateTo("AI Cooling Plan")}
          >
            <span>Create AI Cooling Plan</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* QUICK INTELLIGENCE */}
      <section className="overview-bottom-grid">
        <div className="mini-intelligence-card">
          <div className="mini-card-number">23.7%</div>
          <div className="mini-card-title">Urban Green Cover</div>
          <div className="mini-card-text">
            Cooling opportunities in built-up areas.
          </div>
        </div>

        <div className="mini-intelligence-card">
          <div className="mini-card-number">06</div>
          <div className="mini-card-title">Automated Alerts</div>
          <div className="mini-card-text">
            Heat warnings for authorities and vulnerable communities.
          </div>
        </div>

        <div className="mini-intelligence-card">
          <div className="mini-card-number">01</div>
          <div className="mini-card-title">Digital Twin</div>
          <div className="mini-card-text">
            Explore potential urban cooling scenarios.
          </div>
        </div>
      </section>

      <p className="overview-demo-disclaimer">
        Dashboard figures are illustrative demo values, not live forecasts or
        validated model outputs.
      </p>
    </div>
  );
}

export default Overview;
