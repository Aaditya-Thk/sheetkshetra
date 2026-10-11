import { useState } from "react";

function Alerts({ setActivePage }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const alerts = [
    {
      id: "AL-024",
      severity: "Critical",
      title: "Extreme heat conditions expected",
      location: "Patia",
      time: "12 min ago",
      status: "Active",
      message:
        "Very high thermal stress is expected during the afternoon period. Immediate attention is recommended for exposed and vulnerable populations.",
      affected: "48,200",
      channel: "Authority + Community",
    },
    {
      id: "AL-023",
      severity: "High",
      title: "Elevated thermal risk detected",
      location: "Khandagiri",
      time: "38 min ago",
      status: "Active",
      message:
        "High surface temperature and limited vegetation are contributing to elevated human thermal risk.",
      affected: "36,700",
      channel: "Authority",
    },
    {
      id: "AL-022",
      severity: "High",
      title: "Heat stress threshold exceeded",
      location: "Saheed Nagar",
      time: "1 hr ago",
      status: "Active",
      message:
        "Human thermal stress indicators have crossed the configured high-risk threshold.",
      affected: "29,400",
      channel: "Authority + Community",
    },
    {
      id: "AL-021",
      severity: "Medium",
      title: "Moderate heat exposure",
      location: "Old Town",
      time: "2 hrs ago",
      status: "Monitoring",
      message:
        "Thermal conditions remain elevated but are currently below the high-risk alert threshold.",
      affected: "21,800",
      channel: "Authority",
    },
  ];

  const filteredAlerts =
    activeFilter === "All"
      ? alerts
      : alerts.filter(
          (alert) => alert.severity === activeFilter
        );

  const getCount = (severity) => {
    return alerts.filter(
      (alert) => alert.severity === severity
    ).length;
  };

  return (
    <div className="alerts-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="page-header">

        <div className="page-header-copy">

          <div className="page-eyebrow">
            EARLY WARNING SYSTEM
          </div>

          <h1 className="page-title">
            Alerts
          </h1>

          <p className="page-description">
            Monitor automated heat warnings generated from
            forecast conditions and human thermal risk
            thresholds.
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
          ALERT STATUS
          ===================================================== */}

      <section className="alerts-status-grid">

        <div className="alert-status-card critical">

          <span>
            CRITICAL
          </span>

          <strong>
            {getCount("Critical")}
          </strong>

          <small>
            immediate attention
          </small>

        </div>


        <div className="alert-status-card high">

          <span>
            HIGH
          </span>

          <strong>
            {getCount("High")}
          </strong>

          <small>
            priority warnings
          </small>

        </div>


        <div className="alert-status-card medium">

          <span>
            MEDIUM
          </span>

          <strong>
            {getCount("Medium")}
          </strong>

          <small>
            monitoring required
          </small>

        </div>


        <div className="alert-status-card total">

          <span>
            ACTIVE ALERTS
          </span>

          <strong>
            {alerts.length}
          </strong>

          <small>
            across monitored zones
          </small>

        </div>

      </section>


      {/* =====================================================
          ALERT FILTER
          ===================================================== */}

      <section className="dashboard-card alerts-list-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Active Heat Alerts
            </div>

            <div className="dashboard-card-subtitle">
              Automated warnings requiring authority
              awareness or action
            </div>

          </div>

          <div className="alerts-filter">

            {[
              "All",
              "Critical",
              "High",
              "Medium",
            ].map((filter) => (

              <button
                type="button"
                key={filter}
                className={
                  activeFilter === filter
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>

            ))}

          </div>

        </div>


        {/* ALERT LIST */}

        <div className="alerts-list">

          {filteredAlerts.map((alert) => (

            <article
              className={`alert-item ${alert.severity.toLowerCase()}`}
              key={alert.id}
            >

              <div className="alert-severity-marker"></div>


              <div className="alert-item-main">

                <div className="alert-item-top">

                  <span className="alert-id">
                    {alert.id}
                  </span>

                  <span
                    className={`alert-severity-badge ${alert.severity.toLowerCase()}`}
                  >
                    {alert.severity}
                  </span>

                  <span className="alert-time">
                    {alert.time}
                  </span>

                </div>


                <h3>
                  {alert.title}
                </h3>


                <p>
                  {alert.message}
                </p>


                <div className="alert-item-meta">

                  <span>
                    LOCATION
                    <strong>
                      {alert.location}
                    </strong>
                  </span>

                  <span>
                    AFFECTED
                    <strong>
                      {alert.affected}
                    </strong>
                  </span>

                  <span>
                    CHANNEL
                    <strong>
                      {alert.channel}
                    </strong>
                  </span>

                </div>

              </div>


              <div className="alert-item-side">

                <span
                  className={`alert-status ${alert.status.toLowerCase()}`}
                >
                  {alert.status}
                </span>

                <button
                  type="button"
                  className="alert-view-button"
                  onClick={() =>
                    setActivePage("Heat Map")
                  }
                >
                  View location
                  <span>
                    →
                  </span>
                </button>

              </div>

            </article>

          ))}


          {filteredAlerts.length === 0 && (

            <div className="alerts-empty">

              <strong>
                No alerts in this category
              </strong>

              <p>
                There are currently no alerts matching
                the selected severity.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          ALERT WORKFLOW
          ===================================================== */}

      <section className="dashboard-card alert-workflow-card">

        <div className="dashboard-card-header">

          <div>

            <div className="dashboard-card-title">
              Automated Warning Workflow
            </div>

            <div className="dashboard-card-subtitle">
              From prediction to authority notification
            </div>

          </div>

        </div>


        <div className="alert-workflow">

          <div className="alert-workflow-step">

            <div className="alert-workflow-number">
              01
            </div>

            <strong>
              PREDICT
            </strong>

            <span>
              Upcoming heat conditions are identified.
            </span>

          </div>


          <div className="alert-workflow-connector">
            →
          </div>


          <div className="alert-workflow-step">

            <div className="alert-workflow-number">
              02
            </div>

            <strong>
              ASSESS
            </strong>

            <span>
              Human thermal risk is calculated.
            </span>

          </div>


          <div className="alert-workflow-connector">
            →
          </div>


          <div className="alert-workflow-step">

            <div className="alert-workflow-number">
              03
            </div>

            <strong>
              DETECT
            </strong>

            <span>
              Configured risk thresholds are checked.
            </span>

          </div>


          <div className="alert-workflow-connector">
            →
          </div>


          <div className="alert-workflow-step">

            <div className="alert-workflow-number">
              04
            </div>

            <strong>
              WARN
            </strong>

            <span>
              Alerts are routed to the relevant audience.
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          NOTIFICATION CHANNELS
          ===================================================== */}

      <section className="alert-channel-grid">

        <div className="dashboard-card">

          <div className="alert-channel-header">

            <div className="alert-channel-icon">
              SMS
            </div>

            <div>

              <strong>
                SMS Alerts
              </strong>

              <span>
                Direct warnings for registered recipients
              </span>

            </div>

          </div>

          <div className="alert-channel-status">
            CONFIGURED
          </div>

        </div>


        <div className="dashboard-card">

          <div className="alert-channel-header">

            <div className="alert-channel-icon">
              WA
            </div>

            <div>

              <strong>
                WhatsApp
              </strong>

              <span>
                Community-facing heat notifications
              </span>

            </div>

          </div>

          <div className="alert-channel-status">
            CONFIGURED
          </div>

        </div>


        <div className="dashboard-card">

          <div className="alert-channel-header">

            <div className="alert-channel-icon">
              API
            </div>

            <div>

              <strong>
                Authority API
              </strong>

              <span>
                Machine-readable warning integration
              </span>

            </div>

          </div>

          <div className="alert-channel-status">
            READY
          </div>

        </div>

      </section>


      {/* =====================================================
          AUTHORITY ACTION
          ===================================================== */}

      <section className="alerts-action-card">

        <div>

          <div className="page-eyebrow">
            AUTHORITY RESPONSE
          </div>

          <h2>
            An alert should lead to action.
          </h2>

          <p>
            Use the risk map and AI Cooling Plan to move
            from identifying a heat hotspot to deciding
            what intervention should happen there.
          </p>

        </div>


        <div className="alerts-action-buttons">

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setActivePage("Heat Map")
            }
          >
            Open heat map
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setActivePage("AI Cooling Plan")
            }
          >
            Plan response
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
          Alert entries shown here are demonstration
          records. Production alerts will be generated
          automatically from forecast outputs, thermal risk
          thresholds and configured notification channels.
        </p>

      </div>

    </div>
  );
}

export default Alerts;