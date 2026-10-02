function Navbar({
  activePage
}) {

  return (

    <header className="navbar">

      <div>

        <h2>
          {activePage}
        </h2>

        <p>
          SheetKshetra urban intelligence platform
        </p>

      </div>


      <div className="navbar-right">

        <div className="live">

          <span></span>

          LIVE

        </div>


        <button className="notification">
          ◌
        </button>


        <div className="profile">
          AT
        </div>

      </div>

    </header>

  );
}

export default Navbar;