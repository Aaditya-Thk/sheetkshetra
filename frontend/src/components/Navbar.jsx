function Navbar({ activePage }) {
  return (
    <header className="top-navbar">

      {/* ==================================================
          LEFT SIDE
          ================================================== */}

      <div className="navbar-left">

        <div className="navbar-breadcrumb">

          <span className="navbar-breadcrumb-root">
            SheetKshetra
          </span>

          <span className="breadcrumb-separator">
            /
          </span>

          <strong>
            {activePage}
          </strong>

        </div>


        <div className="navbar-location">

          <span className="location-icon">
            ●
          </span>

          <span>
            Bhubaneswar, Odisha
          </span>

        </div>

      </div>


      {/* ==================================================
          RIGHT SIDE
          ================================================== */}

      <div className="navbar-right">

        {/* SYSTEM STATUS */}

        <div className="navbar-data-status">

          <span className="navbar-status-dot"></span>

          <span>
            AI SYSTEM OPERATIONAL
          </span>

        </div>


        {/* NOTIFICATION */}

        <button
          type="button"
          className="navbar-icon-button"
          aria-label="Notifications"
        >

          <span className="notification-icon">
            ♢
          </span>

          <span className="notification-indicator"></span>

        </button>


        <div className="navbar-divider"></div>


        {/* USER */}

        <button
          type="button"
          className="navbar-user"
        >

          <div className="navbar-user-avatar">
            AT
          </div>


          <div className="navbar-user-info">

            <span className="navbar-user-name">
              Authority
            </span>

            <span className="navbar-user-role">
              City Administration
            </span>

          </div>


          <span className="navbar-user-chevron">
            ▾
          </span>

        </button>

      </div>

    </header>
  );
}

export default Navbar;