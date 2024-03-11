import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signout } from "../../api/userApi";
import logo from "../../images/solarCalculiteLogo.png";
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
            <span className="navbar-brand__text">
              <img src={logo} alt="" />
            </span>
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
              {!auth.token ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Sign In {""}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="signup">
                      Sign Up
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
                      Welcome,
                      <span style={{ textDecoration: "underline" }}>
                        {auth.user.user.name}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={handleSignOut}
                      className="nav-link signOutButton"
                      to="/"
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
