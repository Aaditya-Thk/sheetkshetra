
import { useMemo, useState } from "react";

const forecastDays = [
  {
    day: "TODAY",
    date: "05 OCT",
    temperature: 37.8,
    feelsLike: 42.1,
    humidity: 68,
    wind: 11,
    radiation: "High",
    wbgt: 31.6,
    utci: 40.2,
    heatIndex: 42.1,
    risk: "HIGH",
    riskClass: "high",
    description:
      "Elevated thermal stress across dense built-up areas.",
  },
  {
    day: "TUE",
    date: "06 OCT",
    temperature: 39.2,
    feelsLike: 44.0,
    humidity: 64,
    wind: 9,
    radiation: "Very High",
    wbgt: 32.8,
    utci: 42.5,
    heatIndex: 44.0,
    risk: "HIGH",
    riskClass: "high",
    description:
      "Heat stress is expected to increase during afternoon hours.",
  },
  {
    day: "WED",
    date: "07 OCT",
    temperature: 40.1,
    feelsLike: 45.3,
    humidity: 61,
    wind: 7,
    radiation: "Extreme",
    wbgt: 34.1,
    utci: 44.1,
    heatIndex: 45.3,
    risk: "CRITICAL",
    riskClass: "critical",
    description:
      "Peak heat conditions with critical thermal stress potential.",
  },
  {
    day: "THU",
    date: "08 OCT",
    temperature: 38.6,
    feelsLike: 43.0,
    humidity: 66,
    wind: 10,
    radiation: "Very High",
    wbgt: 32.4,
    utci: 41.7,
    heatIndex: 43.0,
    risk: "HIGH",
    riskClass: "high",
    description:
      "High heat remains concentrated around exposed urban surfaces.",
  },
  {
    day: "FRI",
    date: "09 OCT",
    temperature: 36.9,
    feelsLike: 40.5,
    humidity: 70,
    wind: 14,
    radiation: "High",
    wbgt: 30.4,
    utci: 38.8,
    heatIndex: 40.5,
    risk: "MEDIUM",
    riskClass: "medium",
    description:
      "Thermal conditions begin to moderate but remain elevated.",
  },
];

const formatTemp = (value) => `${value.toFixed(1)}°C`;

function Forecast({ setActivePage }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedDay = forecastDays[selectedIndex];

  const peakDay = useMemo(
    () =>
      forecastDays.reduce((peak, day) =>
        day.wbgt > peak.wbgt ? day : peak
      ),
    []
  );

  const peakIndex = forecastDays.findIndex(
    (day) => day.date === peakDay.date
  );

  const horizon = `${forecastDays[0].date} — ${
    forecastDays[forecastDays.length - 1].date
  }`;

  return (
    <div className="forecast-page">
      <section className="page-header">
        <div className="page-header-copy">
          <div className="page-eyebrow">
            PREDICTIVE HEAT INTELLIGENCE
          </div>

          <h1 className="page-title">Heat Forecast</h1>

          <p className="page-description">
            Explore the five-day urban heat outlook, compare
            environmental conditions and inspect human thermal
            stress for each forecast day.
          </p>
        </div>

        <div className="overview-header-location">
          <span className="overview-location-dot" />
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

      <section className="forecast-status-card">
        <div className="forecast-status-left">
          <div className="forecast-status-icon">5D</div>
          <div>
            <div className="forecast-status-title">
              Five-day heat outlook
            </div>
            <div className="forecast-status-description">
              Select any day below to inspect its forecast
              conditions and thermal indicators.
            </div>
          </div>
        </div>

        <div className="forecast-status-right">
          <span>FORECAST HORIZON</span>
          <strong>{horizon}</strong>
        </div>
      </section>

      <section className="dashboard-card forecast-detail-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">
              Five-Day Outlook
            </div>
            <div className="dashboard-card-subtitle">
              Select a day to view its detailed forecast
            </div>
          </div>

          <div className="forecast-source-label">
            DEMO MODEL DATA
          </div>
        </div>

        <div className="forecast-detail-grid">
          {forecastDays.map((item, index) => (
            <button
              type="button"
              key={item.date}
              aria-pressed={selectedIndex === index}
              aria-label={`${item.day}, ${formatTemp(
                item.temperature
              )}, ${item.risk} heat risk`}
              onClick={() => setSelectedIndex(index)}
              className={`forecast-detail-item forecast-day-button ${
                index === peakIndex ? "peak-day" : ""
              } ${selectedIndex === index ? "selected-day" : ""}`}
            >
              <div className="forecast-detail-day">
                {item.day}
                {index === peakIndex && (
                  <span className="forecast-peak-marker">
                    PEAK
                  </span>
                )}
              </div>

              <div className="forecast-detail-date">
                {item.date}
              </div>

              <div className="forecast-detail-temperature">
                {formatTemp(item.temperature)}
              </div>

              <div className="forecast-detail-feels">
                Feels like {formatTemp(item.feelsLike)}
              </div>

              <div className="forecast-temp-track">
                <div
                  className={`forecast-temp-fill ${item.riskClass}`}
                  style={{
                    "--bar-width": `${
                      Math.max(
                        0,
                        Math.min(
                          100,
                          ((item.temperature - 30) / 15) * 100
                        )
                      )
                    }%`,
                  }}
                />
              </div>

              <div
                className={`forecast-detail-risk ${item.riskClass}`}
              >
                {item.risk}
              </div>

              <div className="forecast-detail-condition">
                {item.description}
              </div>

              {selectedIndex === index && (
                <div className="forecast-selected-label">
                  SELECTED DAY
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="forecast-main-grid">
        <div className="dashboard-card peak-heat-card">
          <div className="dashboard-card-header">
            <div>
              <div className="dashboard-card-title">
                Peak Heat Day
              </div>
              <div className="dashboard-card-subtitle">
                Highest forecast WBGT in this five-day demo
              </div>
            </div>

            <div className="peak-heat-label">PEAK</div>
          </div>

          <div className="peak-heat-content">
            <div className="peak-heat-temperature">
              {formatTemp(peakDay.temperature)}
            </div>

            <div className="peak-heat-date">
              {peakDay.day} · {peakDay.date}
            </div>

            <p>{peakDay.description}</p>
          </div>

          <div className="peak-heat-metrics">
            <div>
              <span>WBGT</span>
              <strong>{formatTemp(peakDay.wbgt)}</strong>
            </div>
            <div>
              <span>UTCI</span>
              <strong>{formatTemp(peakDay.utci)}</strong>
            </div>
            <div>
              <span>HUMIDITY</span>
              <strong>{peakDay.humidity}%</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-card environmental-card">
          <div className="dashboard-card-header">
            <div>
              <div className="dashboard-card-title">
                Environmental Conditions
              </div>
              <div className="dashboard-card-subtitle">
                {selectedDay.day} · {selectedDay.date}
              </div>
            </div>

            <div className="forecast-source-label">
              SELECTED DAY
            </div>
          </div>

          <div className="environmental-grid">
            <div className="environmental-item">
              <span>AIR TEMPERATURE</span>
              <strong>{formatTemp(selectedDay.temperature)}</strong>
            </div>

            <div className="environmental-item">
              <span>FEELS LIKE</span>
              <strong>{formatTemp(selectedDay.feelsLike)}</strong>
            </div>

            <div className="environmental-item">
              <span>HUMIDITY</span>
              <strong>{selectedDay.humidity}%</strong>
            </div>

            <div className="environmental-item">
              <span>WIND SPEED</span>
              <strong>{selectedDay.wind} km/h</strong>
            </div>

            <div className="environmental-item">
              <span>SOLAR RADIATION</span>
              <strong>{selectedDay.radiation}</strong>
            </div>

            <div className="environmental-item">
              <span>HEAT RISK</span>
              <strong>{selectedDay.risk}</strong>
            </div>
          </div>

          <div className="environmental-note">
            <div className="environmental-note-label">
              DAILY INTERPRETATION
            </div>
            <p>
              {selectedDay.description} Temperature, humidity,
              wind and solar exposure together influence outdoor
              thermal comfort.
            </p>
          </div>
        </div>
      </section>

      <section className="dashboard-card thermal-stress-card">
        <div className="dashboard-card-header">
          <div>
            <div className="dashboard-card-title">
              Human Thermal Stress
            </div>
            <div className="dashboard-card-subtitle">
              Indicators for {selectedDay.day} · {selectedDay.date}
            </div>
          </div>

          <button
            type="button"
            className="text-button"
            onClick={() => setActivePage("Risk Analysis")}
          >
            Open risk analysis →
          </button>
        </div>

        <div className="thermal-stress-grid">
          <div className="thermal-indicator-card">
            <div className="thermal-indicator-header">
              <span>WBGT</span>
              <span className="thermal-indicator-tag">
                HEAT STRESS
              </span>
            </div>

            <div className="thermal-indicator-value">
              {formatTemp(selectedDay.wbgt)}
            </div>

            <div className="thermal-indicator-status">
              {selectedDay.risk}
            </div>

            <p>
              Wet-bulb globe temperature indicator for combined
              environmental heat exposure. Interpretation depends
              on exposure and activity.
            </p>
          </div>

          <div className="thermal-indicator-card">
            <div className="thermal-indicator-header">
              <span>UTCI</span>
              <span className="thermal-indicator-tag">
                THERMAL COMFORT
              </span>
            </div>

            <div className="thermal-indicator-value">
              {formatTemp(selectedDay.utci)}
            </div>

            <div className="thermal-indicator-status">
              {selectedDay.utci >= 38
                ? "VERY STRONG HEAT STRESS"
                : "HEAT STRESS"}
            </div>

            <p>
              Universal Thermal Climate Index estimates the
              thermal stress experienced by a person outdoors.
            </p>
          </div>

          <div className="thermal-indicator-card">
            <div className="thermal-indicator-header">
              <span>HEAT INDEX</span>
              <span className="thermal-indicator-tag">
                EXPOSURE
              </span>
            </div>

            <div className="thermal-indicator-value">
              {formatTemp(selectedDay.heatIndex)}
            </div>

            <div className="thermal-indicator-status">
              {selectedDay.risk}
            </div>

            <p>
              Demonstration heat-index value reflecting the
              combined effect of air temperature and humidity.
            </p>
          </div>
        </div>
      </section>

      <section className="forecast-interpretation">
        <div className="forecast-interpretation-copy">
          <div className="page-eyebrow">
            FORECAST INTERPRETATION
          </div>

          <h2>
            {selectedIndex === peakIndex
              ? `${selectedDay.day} requires the highest attention.`
              : `${selectedDay.day}: ${selectedDay.risk.toLowerCase()} heat risk.`}
          </h2>

          <p>
            {selectedDay.description} The highest-heat day in
            the current forecast is {peakDay.day} ({peakDay.date}),
            with a demo temperature of{" "}
            {formatTemp(peakDay.temperature)}. Use ward-level
            risk analysis to identify areas that may require
            priority assessment.
          </p>
        </div>

        <div className="forecast-interpretation-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => setActivePage("Risk Analysis")}
          >
            Analyse risk
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setActivePage("AI Cooling Plan")}
          >
            Plan cooling
          </button>
        </div>
      </section>

      <div className="forecast-data-note">
        <span className="data-note-mark">i</span>
        <p>
          All displayed forecast values are demonstration data,
          not live weather observations or validated model
          predictions. WBGT, UTCI and heat-index values are
          illustrative and should be replaced with appropriately
          calculated outputs when the SheetKshetra prediction
          pipeline is connected.
        </p>
      </div>
    </div>
  );
}

export default Forecast;
