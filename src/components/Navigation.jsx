// import React from "react";
// import "./Navigation.css";

// function Navigation({ onSignInClick, onLogoutClick }) {
//   return (
//     <nav className="navigation">
//       <a href="/" className="navigation__link">
//         Home
//       </a>
//       <button className="navigation__button" onClick={onSignInClick}>
//         Sign in
//       </button>

//       {/* Logout button, in protected route. render user first name */}
//       {/* <button className="navigation__button" onClick={onSignInClick}> */}
//       {/* {user.name} */}
//       {/* </button> */}
//     </nav>
//   );
// }

// export default Navigation;

import React from "react";
import "./Navigation.css";
import logoutIcon from "../assets/icons/icon-logout.svg";

function Navigation({ isLoggedIn, userEmail, onSignInClick, onLogoutClick }) {
  return (
    <nav className="navigation">
      <a href="/" className="navigation__link">
        Home
      </a>

      {!isLoggedIn ? (
        <button className="navigation__button" onClick={onSignInClick}>
          Sign in
        </button>
      ) : (
        <button
          className="navigation__button navigation__button--logout"
          onClick={onLogoutClick}
        >
          <span className="navigation__username">{userEmail}</span>
          <img
            src={logoutIcon}
            alt="Logout"
            className="navigation__logout-icon"
          />
        </button>
      )}
    </nav>
  );
}

export default Navigation;
