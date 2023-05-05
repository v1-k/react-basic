import { useLocation, NavLink } from "react-router-dom";

interface NavigationProps {
  loggedIn: boolean;
  userName: string;
}

const Navigation = ({ loggedIn, userName }: NavigationProps) => {
  const location = useLocation();

  const isActive = (pathname: string) => {
    return location.pathname === pathname;
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          React Basic
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            {!loggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${isActive("/login") ? "active" : ""}`}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {loggedIn && (
              <>
                <li
                  className={
                    isActive("/protected") ? "active nav-item" : "nav-item"
                  }
                >
                  <NavLink
                    className={`nav-link ${
                      isActive("/protected") ? "active" : ""
                    }`}
                    to="/protected"
                  >
                    Protected
                  </NavLink>
                </li>
                <li
                  className={
                    isActive("/backgroundtask") ? "active nav-item" : "nav-item"
                  }
                >
                  <NavLink
                    className={`nav-link ${
                      isActive("/backgroundtask") ? "active" : ""
                    }`}
                    to="/backgroundtask"
                  >
                    Background Task
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {loggedIn && (
            <>
              <div className="ms-auto " role="search">
                <span className="navbar-text  m-2 p-2">
                  Username - {userName}
                </span>
                <NavLink className="btn btn-primary" to="/logout">
                  Logout
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
