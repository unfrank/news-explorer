// import React, { useContext, useEffect, useState } from "react";
// import "./Navigation.css";
// import logoutIconDark from "../assets/icons/icon-logout-dark.svg";
// import logoutIconLight from "../assets/icons/icon-logout-light.svg";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import { Link, useLocation } from "react-router-dom";
// import hamburgerDark from "../assets/icons/icon-hamburger-dark.svg";
// import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";

// function Navigation({ onSignInClick, onLogoutClick }) {
//   const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
//   const location = useLocation();
//   const [animate, setAnimate] = useState(false);

//   const isHome = location.pathname === "/";
//   const isSaved = location.pathname === "/saved-news";

//   useEffect(() => {
//     if (isLoggedIn) {
//       setAnimate(true);
//       const timeout = setTimeout(() => setAnimate(false), 1500);
//       return () => clearTimeout(timeout);
//     }
//   }, [isLoggedIn]);

//   return (
//     <nav className={`navigation ${animate ? "navigation--animate" : ""}`}>
//       {isHome && (
//         <img
//           src={hamburgerLight}
//           alt="Menu"
//           className="navigation__hamburger"
//         />
//       )}
//       {isSaved && (
//         <img src={hamburgerDark} alt="Menu" className="navigation__hamburger" />
//       )}

//       <div className="navigation__links">
//         <Link
//           to="/"
//           className={`navigation__link-home ${
//             isHome ? "navigation__link--active navigation__link--white" : ""
//           }`}
//         >
//           Home
//         </Link>

//         {isLoggedIn && (
//           <Link
//             to="/saved-news"
//             className={`navigation__link-saved ${
//               isSaved ? "navigation__link--active navigation__link--black" : ""
//             }`}
//           >
//             Saved Articles
//           </Link>
//         )}

//         {!isLoggedIn ? (
//           <button className="navigation__button" onClick={onSignInClick}>
//             Sign in
//           </button>
//         ) : (
//           <button
//             className={`navigation__button navigation__button--logout ${
//               isHome
//                 ? "navigation__button--logout-white"
//                 : "navigation__button--logout-black"
//             }`}
//             onClick={onLogoutClick}
//           >
//             <span className="navigation__username">
//               {currentUser?.username?.charAt(0).toUpperCase() +
//                 currentUser?.username?.slice(1)}
//             </span>

//             <img
//               src={isHome ? logoutIconLight : logoutIconDark}
//               alt="Logout"
//               className="navigation__logout-icon"
//             />
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navigation;

//! HAMBURGER NONSENSE !

import React, { useContext, useEffect, useState } from "react";
import "./Navigation.css";
import logoutIconDark from "../assets/icons/icon-logout-dark.svg";
import logoutIconLight from "../assets/icons/icon-logout-light.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";
import hamburgerDark from "../assets/icons/icon-hamburger-dark.svg";
import hamburgerLight from "../assets/icons/icon-hamburger-light.svg";
import closeIcon from "../assets/icons/icon-btn-close.svg";

function Navigation({ onSignInClick, onLogoutClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  useEffect(() => {
    if (isLoggedIn) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  return (
    <nav className={`navigation ${animate ? "navigation--animate" : ""}`}>
      {/* 1. Hamburger toggle (only on “/” when not logged in) */}
      {isHome && !isLoggedIn && (
        <img
          src={menuOpen ? closeIcon : hamburgerLight}
          alt={menuOpen ? "Close Menu" : "Menu"}
          className="navigation__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      )}

      {/* 2. Dark‐mode hamburger on /saved-news (you can leave this as before) */}
      {isSaved && (
        <img src={hamburgerDark} alt="Menu" className="navigation__hamburger" />
      )}

      {/* 3. Dropdown panel (only when menuOpen && isHome && not logged in) */}
      {menuOpen && isHome && !isLoggedIn && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <h2>NewsExplorer</h2>
            <img
              src={closeIcon}
              alt="Close Menu"
              className="navigation__hamburger"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <hr className="navigation__dropdown-divider" />

          <div className="navigation__dropdown-item">Home</div>

          <button
            className="navigation__button navigation__button--dropdown"
            onClick={onSignInClick}
          >
            Sign in
          </button>
        </div>
      )}

      {/* 4. Normal navigation links/buttons (always present except when hidden by CSS at ≤646px) */}
      <div className="navigation__links">
        <Link
          to="/"
          className={`navigation__link-home ${
            isHome ? "navigation__link--active navigation__link--white" : ""
          }`}
        >
          Home
        </Link>

        {isLoggedIn && (
          <Link
            to="/saved-news"
            className={`navigation__link-saved ${
              isSaved ? "navigation__link--active navigation__link--black" : ""
            }`}
          >
            Saved Articles
          </Link>
        )}

        {!isLoggedIn ? (
          <button className="navigation__button" onClick={onSignInClick}>
            Sign in
          </button>
        ) : (
          <button
            className={`navigation__button navigation__button--logout ${
              isHome
                ? "navigation__button--logout-white"
                : "navigation__button--logout-black"
            }`}
            onClick={onLogoutClick}
          >
            <span className="navigation__username">
              {currentUser?.username?.charAt(0).toUpperCase() +
                currentUser?.username?.slice(1)}
            </span>
            <img
              src={isHome ? logoutIconLight : logoutIconDark}
              alt="Logout"
              className="navigation__logout-icon"
            />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
