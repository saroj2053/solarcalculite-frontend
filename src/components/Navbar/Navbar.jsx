import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

// import { BsSun, BsMoon } from "react-icons/bs";
// import { useTheme, useThemeUpdate } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { signout } from "../../api/userApi";
import { CgUserList } from "react-icons/cg";
function Navbar() {
  const [auth, setAuth] = useAuth();
  // const darkMode = useTheme();
  // const toggleTheme = useThemeUpdate();
  // const bgNav = darkMode ? "dark" : "light";

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
            {/* <img src={logoImage} alt="" /> */}
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
              <li className="nav-item">
                <NavLink to="/projects" className="nav-link hover__links">
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/new-project" className="nav-link hover__links">
                  New Project
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
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="profile">
                      <CgUserList style={{ fontSize: "1.5rem" }} />
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
              {/* 
              {darkMode ? (
                <>
                  <li className="nav-item">
                    <NavLink onClick={toggleTheme} className="nav-link">
                      <BsSun className="darkModeIcon" />
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink onClick={toggleTheme} className="nav-link">
                    <BsMoon className="darkModeIcon" />
                  </NavLink>
                </li>
              )} */}
            </ul>
          </div>
        </div>
        {/* {darkMode ? (
          <div className="lightSeparator"></div>
        ) : (
          <div className="darkSeparator"></div>
        )} */}
      </nav>
    </>
  );
}

export default Navbar;
