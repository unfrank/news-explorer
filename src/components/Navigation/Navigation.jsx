// import { useContext, useEffect, useState } from "react";
// import "./Navigation.css";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import { Link, useLocation } from "react-router-dom";
// import logoutIconDark from "../../assets/icons/icon-logout-dark.svg";
// import logoutIconLight from "../../assets/icons/icon-logout-light.svg";
// import closeIcon from "../../assets/icons/icon-btn-close.svg";
// import hamburgerDark from "../../assets/icons/icon-hamburger-dark.svg";
// import hamburgerLight from "../../assets/icons/icon-hamburger-light.svg";
// import { useWindowWidth } from "../../hooks/useWindowWidth";

// export default function Navigation({
//   onSignInClick,
//   onLogoutClick,
//   isAnyModalOpen,
//   onModalClose,
//   animationTriggered,
// }) {
//   const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const isSaved = location.pathname === "/saved-news";

//   const [menuOpen, setMenuOpen] = useState(false);
//   const width = useWindowWidth();

//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth > 625 && menuOpen) {
//         setMenuOpen(false);
//       }
//     }
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [menuOpen]);

//   const rawUsername = currentUser?.username || "";
//   const displayName =
//     rawUsername.length > 0
//       ? rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1)
//       : "";

//   function handleLogoutClick() {
//     setMenuOpen(false);
//     onLogoutClick();
//   }

//   return (
//     <>
//       <nav className="navigation">
//         <div className="navigation__icon-wrapper">
//           {!isAnyModalOpen && (
//             <>
//               {!menuOpen && (
//                 <button
//                   className="navigation__hamburger"
//                   onClick={() => setMenuOpen(true)}
//                   aria-label="Open menu"
//                 >
//                   <img
//                     src={isHome ? hamburgerLight : hamburgerDark}
//                     alt="Open menu"
//                     className="navigation__hamburger-icon"
//                   />
//                 </button>
//               )}

//               {menuOpen && (
//                 <button
//                   className="navigation__hamburger--close"
//                   onClick={() => setMenuOpen(false)}
//                   aria-label="Close menu"
//                 >
//                   <img src={closeIcon} alt="Close menu" />
//                 </button>
//               )}
//             </>
//           )}

//           {isAnyModalOpen && width <= 512 && (
//             <button
//               className="navigation__modal-close"
//               onClick={onModalClose}
//               aria-label="Close modal"
//             >
//               <img src={closeIcon} alt="Close modal" />
//             </button>
//           )}
//         </div>

//         <div
//           className={`navigation__links ${
//             animationTriggered ? "navigation__links--animate" : ""
//           }`}
//         >
//           <Link
//             to="/"
//             className={`navigation__link-home ${
//               isHome ? "navigation__link--active" : ""
//             }`}
//             onClick={() => setMenuOpen(false)}
//           >
//             Home
//           </Link>

//           {isLoggedIn && (
//             <>
//               <Link
//                 to="/saved-news"
//                 className={`navigation__link-saved ${
//                   isSaved ? "navigation__link--active" : ""
//                 }`}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Saved Articles
//               </Link>

//               <button
//                 className="navigation__button-logout"
//                 onClick={handleLogoutClick}
//               >
//                 <span
//                   className={`navigation__username ${
//                     isHome
//                       ? "navigation__username--light"
//                       : "navigation__username--dark"
//                   }`}
//                 >
//                   {displayName}
//                 </span>
//                 <img
//                   src={isHome ? logoutIconLight : logoutIconDark}
//                   alt="Logout"
//                   className="navigation__logout-icon"
//                 />
//               </button>
//             </>
//           )}

//           {!isLoggedIn && (
//             <button
//               className="navigation__button-signin"
//               onClick={() => {
//                 setMenuOpen(false);
//                 onSignInClick();
//               }}
//             >
//               Sign In
//             </button>
//           )}
//         </div>
//       </nav>

//       {menuOpen && (
//         <div className="navigation__dropdown">
//           <div className="navigation__dropdown-header">
//             <h2 className="navigation__dropdown-logo">NewsExplorer</h2>
//             <button
//               className="navigation__dropdown-close"
//               onClick={() => setMenuOpen(false)}
//               aria-label="Close menu"
//             >
//               <img src={closeIcon} alt="Close menu" />
//             </button>
//           </div>

//           <hr className="navigation__dropdown-divider" />

//           {isHome && <div className="navigation__dropdown-item">Home</div>}
//           {isSaved && (
//             <div className="navigation__dropdown-item">Saved Articles</div>
//           )}

//           {isLoggedIn && (
//             <>
//               {isHome && (
//                 <Link
//                   to="/saved-news"
//                   className="navigation__dropdown-item navigation__dropdown-link"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Saved Articles
//                 </Link>
//               )}
//               {isSaved && (
//                 <Link
//                   to="/"
//                   className="navigation__dropdown-item navigation__dropdown-link"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Home
//                 </Link>
//               )}
//               <button
//                 className="navigation__button navigation__button--dropdown"
//                 onClick={handleLogoutClick}
//               >
//                 Sign Out
//               </button>
//             </>
//           )}

//           {!isLoggedIn && (
//             <button
//               className="navigation__button navigation__button--dropdown"
//               onClick={() => {
//                 setMenuOpen(false);
//                 onSignInClick();
//               }}
//             >
//               Sign In
//             </button>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// redo

import { useContext, useEffect, useState } from "react";
import "./Navigation.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";
import logoutIconDark from "../../assets/icons/icon-logout-dark.svg";
import logoutIconLight from "../../assets/icons/icon-logout-light.svg";
import closeIcon from "../../assets/icons/icon-btn-close.svg";
import hamburgerDark from "../../assets/icons/icon-hamburger-dark.svg";
import hamburgerLight from "../../assets/icons/icon-hamburger-light.svg";
import { useWindowWidth } from "../../hooks/useWindowWidth";

export default function Navigation({
  onSignInClick,
  onLogoutClick,
  isAnyModalOpen,
  onModalClose,
  animationTriggered,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSaved = location.pathname === "/saved-news";

  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 625 && menuOpen) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const rawUsername = currentUser?.username || "";
  const displayName =
    rawUsername.length > 0
      ? rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1)
      : "";

  function handleLogoutClick() {
    setMenuOpen(false);
    onLogoutClick();
  }

  return (
    <>
      <nav className="navigation">
        <div className="navigation__icon-wrapper">
          {!isAnyModalOpen && (
            <>
              {!menuOpen && (
                <button
                  className="navigation__hamburger"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <img
                    src={isHome ? hamburgerLight : hamburgerDark}
                    alt="Open menu"
                    className="navigation__hamburger-icon"
                  />
                </button>
              )}

              {menuOpen && (
                <button
                  className="navigation__hamburger--close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <img src={closeIcon} alt="Close menu" />
                </button>
              )}
            </>
          )}

          {isAnyModalOpen && width <= 512 && (
            <button
              className="navigation__modal-close"
              onClick={onModalClose}
              aria-label="Close modal"
            >
              <img src={closeIcon} alt="Close modal" />
            </button>
          )}
        </div>

        <div
          className={`navigation__links ${
            animationTriggered ? "navigation__links--animate" : ""
          }`}
        >
          <Link
            to="/"
            className={`navigation__link-home ${
              isHome ? "navigation__link--active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/saved-news"
                className={`navigation__link-saved ${
                  isSaved ? "navigation__link--active" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Saved Articles
              </Link>

              <button
                className="navigation__button-logout"
                onClick={handleLogoutClick}
              >
                <span
                  className={`navigation__username ${
                    isHome
                      ? "navigation__username--light"
                      : "navigation__username--dark"
                  }`}
                >
                  {displayName}
                </span>
                <img
                  src={isHome ? logoutIconLight : logoutIconDark}
                  alt="Logout"
                  className="navigation__logout-icon"
                />
              </button>
            </>
          )}

          {!isLoggedIn && (
            <button
              className="navigation__button-signin"
              onClick={() => {
                setMenuOpen(false);
                onSignInClick();
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="navigation__dropdown">
          <div className="navigation__dropdown-header">
            <p className="navigation__dropdown-logo" aria-hidden="true">
              NewsExplorer
            </p>

            <button
              className="navigation__dropdown-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close menu" />
            </button>
          </div>

          <hr className="navigation__dropdown-divider" />

          <div className="navigation__dropdown-container">
            {isHome && <div className="navigation__dropdown-item">Home</div>}
            {isSaved && (
              <div className="navigation__dropdown-item">Saved Articles</div>
            )}

            {isLoggedIn && (
              <>
                {isHome && (
                  <Link
                    to="/saved-news"
                    className="navigation__dropdown-item navigation__dropdown-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Saved Articles
                  </Link>
                )}
                {isSaved && (
                  <Link
                    to="/"
                    className="navigation__dropdown-item navigation__dropdown-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                )}
                <button
                  className="navigation__button navigation__button--dropdown"
                  onClick={handleLogoutClick}
                >
                  Sign Out
                </button>
              </>
            )}

            {!isLoggedIn && (
              <button
                className="navigation__button navigation__button--dropdown"
                onClick={() => {
                  setMenuOpen(false);
                  onSignInClick();
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
