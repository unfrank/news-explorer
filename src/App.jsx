// todo: @import url(./vendor/normalize.css); @import url(./vendor/fonts.css)  to index.css.

// import { useState } from "react";
// import { useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";

// import "./components/Hero.css";
// import "./App.css";

// import Header from "./components/Header";
// import Main from "./components/Main";
// import About from "./components/About";
// import Footer from "./components/Footer";
// import ModalWithForm from "./components/ModalWithForm";
// import LoginModal from "./components/LoginModal";
// import RegisterModal from "./components/RegisterModal";
// import RegisterSuccessModal from "./components/RegisterSuccessModal";
// import { fetchNewsArticles } from "./utils/newsApi";
// import { useFormAndValidation } from "./hooks/useFormValidation";

// function App() {
//   const [activeModal, setActiveModal] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);

//   const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

//   const handleRegister = (userData) => {
//     return api.register(userData);
//   };

//  const handleSearch = (query) => {
//   setIsLoading(true);
//   setHasSearched(true);

//   const today = new Date().toISOString().slice(0, 10);
//   const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//     .toISOString()
//     .slice(0, 10);

//   fetchNewsArticles({ query, from: lastWeek, to: today })
//     .then((data) => {
//       setArticles(data.articles);
//     })
//     .catch((err) => {
//       console.error("Search failed:", err);
//       setArticles([]);
//     })
//     .finally(() => setIsLoading(false));
// };

//     fetchNewsArticles({ query, from: lastWeek, to: today })
//       .then((data) => {
//         console.log("Fetched Articles:", data.articles);
//         setArticles(data.articles);
//       })
//       .catch((err) => console.error("Search failed:", err));
//   };

//   useEffect(() => {
//     const today = new Date().toISOString().slice(0, 10);
//     const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .slice(0, 10);

//     fetchNewsArticles({ query: "climate", from: lastWeek, to: today })
//       .then((data) => console.log(data.articles))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="hero">
//       <Header
//         onSignInClick={() => {
//           console.log("Clicked Sign In");
//           setActiveModal("login");
//         }}
//       />
//      <Main
//   onSearch={handleSearch}
//   articles={articles}
//   isLoading={isLoading}
//   hasSearched={hasSearched}
// />
//       <About />
//       <Footer />

//       <LoginModal
//         isOpen={activeModal === "login"}
//         onClose={() => setActiveModal("")}
//         setActiveModal={setActiveModal}
//         onAuthSuccess={(credentials) => {
//           console.log("Logged in:", credentials);
//           setIsLoggedIn(true);
//           setCurrentUser(credentials.user);
//           setActiveModal("");
//         }}
//         isLoading={false}
//         buttonText="Sign In"
//       />
//       <RegisterModal
//         isOpen={activeModal === "register"}
//         onClose={() => setActiveModal("")}
//         onRegister={handleRegister}
//         isLoading={isLoading}
//         setActiveModal={setActiveModal}
//       />
//       <RegisterSuccessModal
//         isOpen={activeModal === "register-success"}
//         onClose={() => setActiveModal("")}
//         setActiveModal={setActiveModal}
//       />
//     </div>
//   );
// }

// export default App;

// todo: @import url(./vendor/normalize.css); @import url(./vendor/fonts.css) to index.css.

import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import RegisterSuccessModal from "./components/RegisterSuccessModal";

import { fetchNewsArticles } from "./utils/newsApi";
// import { register as apiRegister } if using real backend
// import { useFormAndValidation } from "./hooks/useFormValidation"; // not needed here unless reused

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSearch = (query) => {
    setIsLoading(true);
    setHasSearched(true);

    const today = new Date().toISOString().slice(0, 10);
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    fetchNewsArticles({ query, from: lastWeek, to: today })
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        setArticles([]);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = async (userData) => {
    // Replace this stub with real logic if needed
    console.log("Registering:", userData);
    return Promise.resolve();
  };

  return (
    <div className="hero">
      <Header onSignInClick={() => setActiveModal("login")} />
      {/* <Main
        onSearch={handleSearch}
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
      /> */}
      <Main
        onSearch={handleSearch}
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        visibleCount={visibleCount}
        onShowMore={() => setVisibleCount((prev) => Math.min(prev + 3, 12))}
      />
      <About />
      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("")}
        setActiveModal={setActiveModal}
        onAuthSuccess={(credentials) => {
          setIsLoggedIn(true);
          setCurrentUser(credentials.user);
          setActiveModal("");
        }}
        isLoading={false}
        buttonText="Sign In"
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal("")}
        onRegister={handleRegister}
        isLoading={isLoading}
        setActiveModal={setActiveModal}
      />

      <RegisterSuccessModal
        isOpen={activeModal === "register-success"}
        onClose={() => setActiveModal("")}
        setActiveModal={setActiveModal}
      />
    </div>
  );
}

export default App;
