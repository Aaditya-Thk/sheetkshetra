function Sidebar({
  activePage,
  setActivePage
}) {

  const menuItems = [
    {
      name: "Dashboard",
      icon: "◈"
    },
    {
      name: "Heat Map",
      icon: "◎"
    },
    {
      name: "Simulator",
      icon: "✦"
    },
    {
      name: "Vulnerability",
      icon: "△"
    },
    {
      name: "Reports",
      icon: "▤"
    }
  ];

  return (

    <aside className="sidebar">

      <div className="brand">

        <div className="brand-symbol">
          S
        </div>

        <div>

          <h2>
            SheetKshetra
          </h2>

          <span>
            URBAN COOLING AI
          </span>

        </div>

      </div>


      <div className="navigation">

        <p>
          WORKSPACE
        </p>


        {menuItems.map((item) => (

          <button
            key={item.name}
            className={`nav-button ${
              activePage === item.name
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(item.name)
            }
          >

            <span>
              {item.icon}
            </span>

            {item.name}

          </button>

        ))}

      </div>


      <div className="sidebar-footer">

        <button className="settings">
          ⚙ Settings
        </button>


        <div className="system-status">

          <span></span>

          <div>

            <strong>
              System Online
            </strong>

            <small>
              All systems operational
            </small>

          </div>

        </div>

      </div>

    </aside>

  );
}

export default Sidebar;