// // todo: @import url(./vendor/normalize.css); @import url(./vendor/fonts.css) to index.css.

// import React, { useState } from "react";
// import "./App.css";

// import Header from "./components/Header";
// import Main from "./components/Main";
// import About from "./components/About";
// import Footer from "./components/Footer";
// import LoginModal from "./components/LoginModal";
// import RegisterModal from "./components/RegisterModal";
// import RegisterSuccessModal from "./components/RegisterSuccessModal";

// import { fetchNewsArticles } from "./utils/newsApi";

// function App() {
//   const [activeModal, setActiveModal] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(3);

//   const handleSearch = (query) => {
//     setIsLoading(true);
//     setHasSearched(true);

//     const today = new Date().toISOString().slice(0, 10);
//     const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .slice(0, 10);

//     fetchNewsArticles({ query, from: lastWeek, to: today })
//       .then((data) => {
//         setArticles(data.articles);
//       })
//       .catch((err) => {
//         console.error("Search failed:", err);
//         setArticles([]);
//       })
//       .finally(() => setIsLoading(false));
//   };

//   const handleRegister = async (userData) => {
//     console.log("Registering:", userData);
//     return Promise.resolve();
//   };

//   return (
//     <div className="hero">
//       <Header onSignInClick={() => setActiveModal("login")} />
//       <Main
//         onSearch={handleSearch}
//         articles={articles}
//         isLoading={isLoading}
//         hasSearched={hasSearched}
//         visibleCount={visibleCount}
//         onShowMore={() => setVisibleCount((prev) => Math.min(prev + 3, 12))}
//       />
//       <About />
//       <Footer />

//       <LoginModal
//         isOpen={activeModal === "login"}
//         onClose={() => setActiveModal("")}
//         setActiveModal={setActiveModal}
//         onAuthSuccess={(credentials) => {
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

// redo

// todo: @import url(./vendor/normalize.css); @import url(./vendor/fonts.css) to index.css.

import React, { useState } from "react";
import "./App.css";

import Main from "./components/Main";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
// test
import TestModal from "./components/TestModal";
import LoginModal from "./components/LoginModal";

import RegisterModal from "./components/RegisterModal";
import RegisterSuccessModal from "./components/RegisterSuccessModal";

import { fetchNewsArticles } from "./utils/newsApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // inside App component:
  const [showTestModal, setShowTestModal] = useState(false);
  const [testDescription, setTestDescription] = useState("");

  // test

  const handleCardClick = (description) => {
    setTestDescription(description);
    setShowTestModal(true);
  };

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
    console.log("Registering:", userData);
    return Promise.resolve();
  };

  return (
    <div className="hero">
      <Header onSignInClick={() => setActiveModal("login")} />
      <Main
        onSearch={handleSearch}
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        visibleCount={visibleCount}
        onShowMore={() => setVisibleCount((prev) => Math.min(prev + 3, 12))}
        handleCardClick={handleCardClick} // test
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

      {/* test */}
      {/* <TestModal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        description={testDescription}
      /> */}
    </div>
  );
}

export default App;
