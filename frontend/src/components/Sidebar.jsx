function Sidebar({ activePage, setActivePage }) {
  const monitoringItems = [
    {
      name: "Overview",
      icon: "▦",
    },
    {
      name: "Heat Map",
      icon: "◉",
    },
    {
      name: "Forecast",
      icon: "◷",
    },
    {
      name: "Risk Analysis",
      icon: "△",
    },
  ];

  const actionItems = [
    {
      name: "AI Cooling Plan",
      icon: "✦",
    },
    {
      name: "Digital Twin",
      icon: "◇",
    },
    {
      name: "Alerts",
      icon: "!",
    },
  ];

  const reportingItems = [
    {
      name: "Heat Action Plan",
      icon: "□",
    },
    {
      name: "Reports",
      icon: "▤",
    },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const renderNavigationItem = (item) => {
    const isActive = activePage === item.name;

    return (
      <button
        key={item.name}
        type="button"
        className={`sidebar-item ${
          isActive ? "active" : ""
        }`}
        onClick={() => handleNavigation(item.name)}
      >
        <span className="sidebar-item-icon">
          {item.icon}
        </span>

        <span className="sidebar-item-name">
          {item.name}
        </span>

        {isActive && (
          <span className="sidebar-active-arrow">
            ›
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="sidebar">

      {/* ==================================================
          BRAND
          ================================================== */}

      <div className="sidebar-brand">

        <div className="brand-mark">
          SK
        </div>

        <div className="brand-text">

          <div className="brand-name">
            SHEETKSHETRA
          </div>

          <div className="brand-subtitle">
            URBAN HEAT INTELLIGENCE
          </div>

        </div>

      </div>


      {/* ==================================================
          NAVIGATION
          ================================================== */}

      <nav
        className="sidebar-navigation"
        aria-label="Main navigation"
      >

        {/* MONITORING */}

        <section className="sidebar-section">

          <div className="sidebar-section-title">
            MONITORING
          </div>

          <div className="sidebar-menu">
            {monitoringItems.map(
              renderNavigationItem
            )}
          </div>

        </section>


        {/* ACTION CENTER */}

        <section className="sidebar-section">

          <div className="sidebar-section-title">
            ACTION CENTER
          </div>

          <div className="sidebar-menu">
            {actionItems.map(
              renderNavigationItem
            )}
          </div>

        </section>


        {/* REPORTING */}

        <section className="sidebar-section">

          <div className="sidebar-section-title">
            REPORTING
          </div>

          <div className="sidebar-menu">
            {reportingItems.map(
              renderNavigationItem
            )}
          </div>

        </section>

      </nav>


      {/* ==================================================
          SIDEBAR FOOTER
          ================================================== */}

      <div className="sidebar-bottom">

        {/* MONITORED CITY */}

        <div className="monitored-city">

          <div className="city-label">
            MONITORED CITY
          </div>

          <div className="city-name">
            Bhubaneswar
          </div>

          <div className="city-location">
            Odisha, India
          </div>

        </div>


        {/* SYSTEM STATUS */}

        <div className="system-status">

          <span className="status-dot"></span>

          <div className="system-status-content">

            <div className="status-title">
              System Operational
            </div>

            <div className="status-subtitle">
              AI monitoring active
            </div>

          </div>

        </div>


        {/* VERSION */}

        <div className="sidebar-version">
          SHEETKSHETRA v1.0
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;