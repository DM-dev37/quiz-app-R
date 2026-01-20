import React from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { Link } from "react-dom";

function Navbar(logoSrc) {
  return (
    <div>
      <nav className={navbarStyles.nav}>
        <div
          style={{
            backgroundImage: navbarStyles.decorativePatternBackground,
          }}
          className={navbarStyles.decorativePattern}
        ></div>

        <div className={navbarStyles.bubble1}>mamamama</div>
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
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
