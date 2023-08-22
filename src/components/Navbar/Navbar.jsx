import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signout } from "../../api/userApi";
import { CgUserList } from "react-icons/cg";
function Navbar() {
  const [auth, setAuth] = useAuth();

  const handleSignOut = async () => {
    await signout();
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-light navbar__nav`}
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <span className="navbar-brand__text">SolarCalculite</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link hover__links">
                  Home
                </NavLink>
              </li>

              {!auth.token ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="signin">
                      Sign In {""}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="signup">
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/projects" className="nav-link hover__links">
                      Projects
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="profile">
                      <CgUserList style={{ fontSize: "1.5rem" }} />{" "}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={handleSignOut}
                      className="nav-link signOutButton"
                      to="signin"
                    >
                      Sign Out {""}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
