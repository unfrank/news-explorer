import React, { useContext } from "react";
import Navigation from "./Navigation";
import "./Header.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({ onSignInClick, setActiveModal, handleLogout }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <div className="section-inner">
        <div className="header__container">
          <div className="header__logo">NewsExplorer</div>
          <Navigation
            isLoggedIn={isLoggedIn}
            userEmail={currentUser?.email}
            onSignInClick={() => setActiveModal("login")}
            onLogoutClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
