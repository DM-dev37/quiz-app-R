import React, { useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Award, LogIn, LogOut, Menu, X } from "lucide-react";

function Navbar({ logoSrc }) {
  const navigate = useNavigate();
  const [loggedIn, setLoggeIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //LOGOUT FUNCTION
  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.clear();
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      //ignorer tous les erreures
    }

    window.dispatchEvent(
      new CustomEvent("authChanged", { detail: { user: null } })
    );
    setMenuOpen(false);
    try {
      navigate("/login");
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      window.location.href = "/login";
    }
  };
  return (
    <div>
      <nav className={navbarStyles.nav}>
        <div
          style={{
            backgroundImage: navbarStyles.decorativePatternBackground,
          }}
          className={navbarStyles.decorativePattern}
        ></div>

        <div className={navbarStyles.bubble1}></div>
        <div className={navbarStyles.bubble2}></div>
        <div className={navbarStyles.bubble3}></div>

        <div className={navbarStyles.container}>
          <div className={navbarStyles.logoContainer}>
            <Link to="/" className={navbarStyles.logoButton}>
              <div className={navbarStyles.logoInner}>
                <img
                  src={
                    logoSrc ||
                    "https://yt3.googleusercontent.com/eD5QJD-9uS--ekQcA-kDTCu1ZO4d7d7BTKLIVH-EySZtDVw3JZcc-bHHDOMvxys92F7rD8Kgfg=s900-c-k-c0x00ffffff-no-rj"
                  }
                  alt="QuizMaster logo"
                  className={navbarStyles.logoImage}
                />
              </div>
            </Link>
          </div>

          <div className={navbarStyles.titleContainer}>
            <div className={navbarStyles.titleBackground}>
              <h1 className={navbarStyles.titleText}>
                Hexagon Quiz Application
              </h1>
            </div>
          </div>

          <div className={navbarStyles.desktopButtonsContainer}>
            <div className={navbarStyles.spacer}>
              <NavLink to="/result" className={navbarStyles.resultsButton}>
                <Award className={navbarStyles.buttonIcon} />
                My Results
              </NavLink>

              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className={navbarStyles.logoutButton}
                >
                  <LogOut className={navbarStyles.buttonIcon} />
                </button>
              ) : (
                <NavLink to="/login" className={navbarStyles.loginButton}>
                  <LogIn className={navbarStyles.buttonIcon} />
                  Login
                </NavLink>
              )}
            </div>

            <div className={navbarStyles.mobileMenuContainer}>
              <button
                className={navbarStyles.menuToggleButton}
                onClick={() => setMenuOpen((s) => !s)}
              >
                {menuOpen ? (
                  <X className={navbarStyles.menuIcon} />
                ) : (
                  <Menu className={navbarStyles.menuIcon} />
                )}
              </button>

              {menuOpen && (
                <div className={navbarStyles.mobileMenuPanel}>
                  <ul>
                    <li>
                      <NavLink
                        to="/result"
                        className={navbarStyles.mobileMenuItem}
                        onClick={() => setMenuOpen(false)}
                      >
                        <Award className={navbarStyles.mobileMenuIcon} />
                      </NavLink>
                    </li>

                    {loggedIn ? (
                      <li>
                        <button
                          className={navbarStyles.mobileMenuItem}
                          onClick={handleLogout}
                        >
                          <LogOut className={navbarStyles.mobileMenuIcon} />
                          Logout
                        </button>
                      </li>
                    ) : (
                      <NavLink
                        to="/login"
                        className={navbarStyles.mobileMenuItem}
                        onClick={() => setLoggeIn(false)}
                      >
                        <LogIn className={navbarStyles.mobileMenuIcon} />
                      </NavLink>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <style>{navbarStyles.animations}</style>
      </nav>
    </div>
  );
}
export default Navbar;
