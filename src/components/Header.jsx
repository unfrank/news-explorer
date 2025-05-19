// import React from "react";
// import Navigation from "./Navigation";
// import "./Header.css";

// function Header({ onSignInClick }) {
//   return (
//     <header className="header">
//       <div className="header__container">
//         <div className="header__logo">NewsExplorer</div>
//         <Navigation onSignInClick={onSignInClick} />
//       </div>
//     </header>
//   );
// }

// export default Header;

import React from "react";
import Navigation from "./Navigation";
import "./Header.css";

function Header({
  onSignInClick,
  isLoggedIn,
  currentUser,
  setActiveModal,
  handleLogout,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">NewsExplorer</div>
        <Navigation
          isLoggedIn={isLoggedIn}
          userEmail={currentUser?.email}
          onSignInClick={() => setActiveModal("login")}
          onLogoutClick={handleLogout}
        />
      </div>
    </header>
  );
}

export default Header;
