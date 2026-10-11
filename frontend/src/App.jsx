import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import HeatMap from "./components/HeatMap";

import Overview from "./pages/Overview";
import Forecast from "./pages/Forecast";
import RiskAnalysis from "./pages/RiskAnalysis";
import CoolingPlan from "./pages/CoolingPlan";
import DigitalTwin from "./pages/DigitalTwin";
import Alerts from "./pages/Alerts";
import HeatActionPlan from "./pages/HeatActionPlan";
import Reports from "./pages/Reports";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Overview");

  const renderPage = () => {
    switch (activePage) {
      case "Overview":
        return (
          <Overview
            setActivePage={setActivePage}
          />
        );

      case "Heat Map":
        return (
          <HeatMap
            setActivePage={setActivePage}
          />
        );

      case "Forecast":
        return (
          <Forecast
            setActivePage={setActivePage}
          />
        );

      case "Risk Analysis":
        return (
          <RiskAnalysis
            setActivePage={setActivePage}
          />
        );

      case "AI Cooling Plan":
        return (
          <CoolingPlan
            setActivePage={setActivePage}
          />
        );

      case "Digital Twin":
        return (
          <DigitalTwin
            setActivePage={setActivePage}
          />
        );

      case "Alerts":
        return (
          <Alerts
            setActivePage={setActivePage}
          />
        );

      case "Heat Action Plan":
        return (
          <HeatActionPlan
            setActivePage={setActivePage}
          />
        );

      case "Reports":
        return (
          <Reports
            setActivePage={setActivePage}
          />
        );

      default:
        return (
          <Overview
            setActivePage={setActivePage}
          />
        );
    }
  };

  return (
    <div className="app-shell">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-area">

        <Navbar
          activePage={activePage}
        />

        <main className="page-content">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}

export default App;