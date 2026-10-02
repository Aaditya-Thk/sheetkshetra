import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";
import RealHeatMap from "./components/HeatMap";
import VulnerabilityPage from "./components/Vulnerability";
function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app">

      {/* Background */}
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="ambient ambient-three"></div>

      <div className="background-grid"></div>

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main */}
      <main className="main-content">

        <Navbar activePage={activePage} />

        <div className="dashboard">

          {activePage === "Dashboard" && (
            <Dashboard
              setActivePage={setActivePage}
            />
          )}

          {activePage === "Heat Map" && (
  <RealHeatMap />
)}

          {activePage === "Simulator" && (
            <Simulator />
          )}

          {activePage === "Vulnerability" && (
<VulnerabilityPage />          )}

          {activePage === "Reports" && (
            <Reports />
          )}

        </div>

      </main>

    </div>
  );
}


/* ================================= */
/* DASHBOARD */
/* ================================= */

function Dashboard({ setActivePage }) {

  return (
    <>

      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <div className="system-badge">
            <span></span>
            URBAN INTELLIGENCE SYSTEM
          </div>

          <h1>
            Understand Heat.
            <br />
            <span>Predict the Future.</span>
          </h1>

          <p>
            AI-powered urban heat intelligence for
            smarter cooling decisions.
          </p>

        </div>


        <LocationCard />

      </section>


      {/* STATS */}

      <section className="stats">

        <StatCard
          title="Surface Temperature"
          value="37.8°C"
          change="+2.4°C"
          icon="°"
          accent="lime"
        />

        <StatCard
          title="Critical Heat Zones"
          value="18"
          change="+4 zones"
          icon="◉"
          accent="red"
        />

        <StatCard
          title="Green Cover"
          value="23.7%"
          change="-3.2%"
          icon="⌁"
          accent="green"
        />

        <StatCard
          title="Population at Risk"
          value="2.4L"
          change="HIGH"
          icon="◌"
          accent="purple"
        />

      </section>


      {/* MAIN */}

      <section className="content-grid">

        <HeatMapPreview
          setActivePage={setActivePage}
        />

        <VulnerabilityPreview
          setActivePage={setActivePage}
        />

      </section>


      {/* SIMULATOR PREVIEW */}

      <SimulatorPreview
        setActivePage={setActivePage}
      />


      {/* AI INSIGHT */}

      <AIInsight />

    </>
  );
}


/* ================================= */
/* LOCATION */
/* ================================= */

function LocationCard() {

  return (

    <div className="location-panel">

      <div className="location-symbol">
        ◎
      </div>

      <div>

        <small>
          CURRENT ANALYSIS
        </small>

        <h3>
          Bhubaneswar
        </h3>

        <p>
          Odisha · India
        </p>

      </div>

    </div>

  );
}


/* ================================= */
/* HEAT MAP PREVIEW */
/* ================================= */

function HeatMapPreview({ setActivePage }) {

  return (

    <div className="panel heat-panel">

      <div className="panel-header">

        <div>

          <span className="section-label">
            SATELLITE INTELLIGENCE
          </span>

          <h2>
            Urban Heat Map
          </h2>

          <p>
            Land Surface Temperature · 30m resolution
          </p>

        </div>

        <button
          className="ghost-button"
          onClick={() => setActivePage("Heat Map")}
        >
          EXPLORE MAP →
        </button>

      </div>

<RealHeatMap />
    </div>

  );
}




/* ================================= */
/* VULNERABILITY PREVIEW */
/* ================================= */

function VulnerabilityPreview({ setActivePage }) {

  return (

    <div className="panel vulnerability-panel">

      <div className="panel-header">

        <div>

          <span className="section-label">
            AI ANALYSIS
          </span>

          <h2>
            Vulnerability
          </h2>

          <p>
            Highest-risk zones
          </p>

        </div>

        <div className="ai-tag">
          AI
        </div>

      </div>


      <div className="wards">

        <Ward
          name="Patia"
          score="92"
          level="CRITICAL"
        />

        <Ward
          name="Khandagiri"
          score="74"
          level="HIGH"
        />

        <Ward
          name="Saheed Nagar"
          score="61"
          level="MEDIUM"
        />

        <Ward
          name="Old Town"
          score="47"
          level="LOW"
        />

        <Ward
          name="Jayadev Vihar"
          score="39"
          level="LOW"
        />

      </div>


      <button
        className="view-zones"
        onClick={() => setActivePage("Vulnerability")}
      >
        VIEW ALL ZONES →
      </button>

    </div>

  );
}


/* ================================= */
/* VULNERABILITY PAGE */
/* ================================= */

function Vulnerability() {

  return (

    <PageContainer
      label="AI ANALYSIS"
      title="Heat Vulnerability"
      description="Identify populations and areas most vulnerable to urban heat."
    >

      <div className="vulnerability-page">

        <Ward
          name="Patia"
          score="92"
          level="CRITICAL"
        />

        <Ward
          name="Khandagiri"
          score="74"
          level="HIGH"
        />

        <Ward
          name="Saheed Nagar"
          score="61"
          level="MEDIUM"
        />

        <Ward
          name="Old Town"
          score="47"
          level="LOW"
        />

        <Ward
          name="Jayadev Vihar"
          score="39"
          level="LOW"
        />

      </div>

    </PageContainer>

  );
}


/* ================================= */
/* SIMULATOR PREVIEW */
/* ================================= */

function SimulatorPreview({ setActivePage }) {

  return (

    <section className="simulator">

      <div className="simulator-left">

        <span className="section-label">
          AI COOLING SIMULATOR
        </span>

        <h2>
          What if we cool this area?
        </h2>

        <p>
          Describe an intervention and let
          SheetKshetra estimate the impact.
        </p>


        <div className="input-box">

          <span>✦</span>

          <input
            placeholder='Try: "Plant 500 trees near KIIT"'
          />

        </div>


        <button
          className="run-button"
          onClick={() => setActivePage("Simulator")}
        >
          OPEN SIMULATOR
          <b>→</b>
        </button>

      </div>


      <div className="simulation-result">

        <span>
          PREDICTED COOLING
        </span>

        <strong>
          −1.8°C
        </strong>

        <p>
          Estimated temperature reduction
        </p>


        <div className="result-grid">

          <div>
            <b>₹42L</b>
            <small>Estimated Cost</small>
          </div>

          <div>
            <b>1.2L</b>
            <small>People Benefited</small>
          </div>

          <div>
            <b>+14%</b>
            <small>Green Cover</small>
          </div>

        </div>

      </div>

    </section>

  );
}


/* ================================= */
/* SIMULATOR PAGE */
/* ================================= */

function Simulator() {

  const [result, setResult] = useState(false);

  return (

    <PageContainer
      label="AI DECISION ENGINE"
      title="Cooling Simulator"
      description="Test urban cooling interventions and estimate their impact."
    >

      <div className="full-simulator">

        <div className="simulation-input-section">

          <h3>
            Describe your intervention
          </h3>

          <p>
            Tell the system what you want to change.
          </p>

          <textarea
            placeholder="Example: Plant 500 trees around Patia..."
          />

          <button
            className="run-button"
            onClick={() => setResult(true)}
          >
            RUN AI SIMULATION →
          </button>

        </div>


        {result && (

          <div className="simulation-output">

            <span>
              SIMULATION RESULT
            </span>

            <h2>
              −1.8°C
            </h2>

            <p>
              Estimated temperature reduction
            </p>

            <div className="result-grid">

              <div>
                <b>₹42L</b>
                <small>Estimated Cost</small>
              </div>

              <div>
                <b>1.2L</b>
                <small>People Benefited</small>
              </div>

              <div>
                <b>+14%</b>
                <small>Green Cover</small>
              </div>

            </div>

          </div>

        )}

      </div>

    </PageContainer>

  );
}


/* ================================= */
/* REPORTS */
/* ================================= */

function Reports() {

  return (

    <PageContainer
      label="ANALYTICS"
      title="Reports"
      description="Urban heat intelligence reports and analysis."
    >

      <div className="reports-grid">

        <ReportCard
          title="Urban Heat Assessment"
          description="Current heat distribution across Bhubaneswar."
        />

        <ReportCard
          title="Vulnerability Report"
          description="Population and infrastructure heat vulnerability."
        />

        <ReportCard
          title="Cooling Strategy"
          description="AI-generated urban cooling recommendations."
        />

      </div>

    </PageContainer>

  );
}


/* ================================= */
/* REPORT CARD */
/* ================================= */

function ReportCard({
  title,
  description
}) {

  return (

    <div className="report-card">

      <div className="report-icon">
        ▤
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <button>
        VIEW REPORT →
      </button>

    </div>

  );
}


/* ================================= */
/* PAGE CONTAINER */
/* ================================= */

function PageContainer({
  label,
  title,
  description,
  children
}) {

  return (

    <div className="page-container">

      <div className="page-heading">

        <span className="section-label">
          {label}
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

      </div>

      {children}

    </div>

  );
}


/* ================================= */
/* AI INSIGHT */
/* ================================= */

function AIInsight() {

  return (

    <section className="ai-insight">

      <div className="ai-symbol">
        ✦
      </div>

      <div className="insight-content">

        <span>
          SHEETKSHETRA AI RECOMMENDS
        </span>

        <h3>
          Prioritize urban greening in Patia
        </h3>

        <p>
          High surface temperature combined with
          low vegetation makes this zone a priority
          for cooling intervention.
        </p>

      </div>

      <button>
        VIEW STRATEGY →
      </button>

    </section>

  );
}


/* ================================= */
/* STAT CARD */
/* ================================= */

function StatCard({
  title,
  value,
  change,
  icon,
  accent
}) {

  return (

    <div className={`stat-card ${accent}`}>

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span>
          {change}
        </span>

      </div>

      <p>
        {title}
      </p>

      <h2>
        {value}
      </h2>

      <div className="stat-progress">
        <div></div>
      </div>

    </div>
  );
}


/* ================================= */
/* MAP MARKER */
/* ================================= */

function MapMarker({
  className,
  temperature,
  type
}) {

  return (

    <div className={`map-marker ${className}`}>

      <span className={type}></span>

      {temperature}

    </div>

  );
}


/* ================================= */
/* WARD */
/* ================================= */

function Ward({
  name,
  score,
  level
}) {

  return (

    <div className="ward">

      <div className="ward-title">

        <span>
          {name}
        </span>

        <strong>
          {score}
        </strong>

      </div>

      <div className="ward-progress">

        <div
          style={{
            width: `${score}%`
          }}
        ></div>

      </div>

      <small>
        {level} VULNERABILITY
      </small>

    </div>
  );
}


export default App;