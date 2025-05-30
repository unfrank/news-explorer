// import React, { useState, useEffect } from "react";
// import "./App.css";
// import "./components/Hero.css";
// import Main from "./components/Main";
// import About from "./components/About";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import LoginModal from "./components/LoginModal";
// import RegisterModal from "./components/RegisterModal";
// import ProtectedRoute from "./authorization/ProtectedRoute";
// import RegisterSuccessModal from "./components/RegisterSuccessModal";
// import SavedNews from "./components/SavedNews";

// import { fetchNewsArticles } from "./utils/newsApi";
// import { checkToken, register, login } from "./authorization/auth";
// import CurrentUserContext from "./contexts/CurrentUserContext";

// import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// function App() {
//   const [activeModal, setActiveModal] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [savedArticles, setSavedArticles] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [fetchError, setFetchError] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const location = useLocation();
//   const isHome = location.pathname === "/";

//   useEffect(() => {
//     window.history.scrollRestoration = "manual";
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("jwt");

//     if (!token) {
//       setIsLoggedIn(false);
//       setCurrentUser(null);
//       return;
//     }

//     setIsLoggedIn(true);

//     checkToken(token)
//       .then((res) => {
//         setCurrentUser({ email: res.email, username: res.username });
//         return fetch("http://localhost:3000/articles", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       })
//       .then((res) => res.json())
//       .then((data) => setSavedArticles(data))
//       .catch((err) => {
//         console.warn("Auth/token error:", err);
//         localStorage.removeItem("jwt");
//         setIsLoggedIn(false);
//         setCurrentUser(null);
//       });
//   }, []);

//   const handleSearch = (query) => {
//     setFetchError(false);
//     setIsLoading(true);
//     setHasSearched(true);
//     setVisibleCount(3);
//     setSearchTerm(query);
//     sessionStorage.setItem("justSearched", "true");

//     const today = new Date().toISOString().slice(0, 10);
//     const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .slice(0, 10);

//     fetchNewsArticles({ query, from: lastWeek, to: today })
//       .then(async (data) => {
//         const articles = data.articles.slice(0, 18);
//         const validated = [];

//         const validateImage = (url) =>
//           new Promise((resolve) => {
//             const img = new Image();
//             img.onload = () => resolve(true);
//             img.onerror = () => resolve(false);
//             img.src = url;
//           });

//         for (let article of articles) {
//           const imageUrl = article.urlToImage || article.image || "";
//           const isValid = await validateImage(imageUrl);
//           if (isValid) validated.push(article);
//           if (validated.length === 9) break;
//         }

//         setArticles(validated);
//       })
//       .catch((err) => {
//         console.error("Search failed:", err);
//         setArticles([]);
//         setFetchError(true);
//       })
//       .finally(() => setIsLoading(false));
//   };

//   const handleSaveArticle = (articleData) => {
//     const token = localStorage.getItem("jwt");
//     if (!token) return;

//     const isAlreadySaved = savedArticles.some(
//       (a) => a.link === articleData.url
//     );

//     if (isAlreadySaved) {
//       const saved = savedArticles.find((a) => a.link === articleData.url);
//       fetch(`http://localhost:3000/articles/${saved._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => {
//           if (!res.ok) throw new Error("Failed to delete article");
//           setSavedArticles((prev) => prev.filter((a) => a._id !== saved._id));
//         })
//         .catch((err) => console.error("Delete failed:", err));
//     } else {
//       const normalized = {
//         keyword: articleData.keyword || searchTerm || "news",
//         title: articleData.title,
//         text: articleData.description || "No description provided.",
//         date: articleData.publishedAt || articleData.date || "Unknown date",
//         source:
//           articleData.source?.name || articleData.source || "Unknown source",
//         link: articleData.url,
//         image: articleData.urlToImage || articleData.image || "",
//       };

//       fetch("http://localhost:3000/articles", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(normalized),
//       })
//         .then((res) => {
//           if (!res.ok) throw new Error("Failed to save article");
//           return res.json();
//         })
//         .then((saved) => {
//           setSavedArticles((prev) => [saved, ...prev]);
//         })
//         .catch((err) => console.error("Save failed:", err));
//     }
//   };

//   const handleDeleteArticle = (id) => {
//     const token = localStorage.getItem("jwt");

//     fetch(`http://localhost:3000/articles/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (res.ok) {
//           setSavedArticles((prev) =>
//             prev.filter((article) => article._id !== id)
//           );
//         } else {
//           throw new Error("Failed to delete");
//         }
//       })
//       .catch((err) => console.error("Delete failed:", err));
//   };

//   const handleRegister = ({ email, username, password }) => {
//     setIsLoading(true);
//     register(email, username, password)
//       .then(handleLogin)
//       .catch((err) => console.error("Registration failed:", err))
//       .finally(() => setIsLoading(false));
//   };

//   const handleLogin = (credentials) => {
//     const token = credentials.token;
//     localStorage.setItem("jwt", token);
//     setIsLoggedIn(true);
//     setCurrentUser(credentials.user);
//     setActiveModal("");

//     checkToken(token)
//       .then((userInfo) => {
//         setCurrentUser({
//           email: userInfo.email,
//           username: userInfo.username,
//         });

//         return fetch("http://localhost:3000/articles", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch articles");
//         return res.json();
//       })
//       .then((articles) => setSavedArticles(articles))
//       .catch((err) => console.error("Post-login sync failed:", err));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("jwt");
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//   };

//   return (
//     <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
//       {isHome ? (
//         <div className="hero">
//           <Header
//             isLoggedIn={isLoggedIn}
//             currentUser={currentUser}
//             setActiveModal={setActiveModal}
//             handleLogout={handleLogout}
//           />
//           <Main
//             onSearch={handleSearch}
//             articles={articles}
//             isLoading={isLoading}
//             hasSearched={hasSearched}
//             visibleCount={visibleCount}
//             isLoggedIn={isLoggedIn}
//             onShowMore={() => setVisibleCount((prev) => Math.min(prev + 3, 12))}
//             fetchError={fetchError}
//             onSaveArticle={handleSaveArticle}
//             onDeleteArticle={handleDeleteArticle}
//             savedArticles={savedArticles}
//           />
//           <About />
//         </div>
//       ) : (
//         <>
//           <Header
//             isLoggedIn={isLoggedIn}
//             currentUser={currentUser}
//             setActiveModal={setActiveModal}
//             handleLogout={handleLogout}
//           />
//           <Routes>
//             <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
//               <Route
//                 path="/saved-news"
//                 element={
//                   <SavedNews
//                     savedArticles={savedArticles}
//                     onDeleteArticle={handleDeleteArticle}
//                   />
//                 }
//               />
//             </Route>
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </>
//       )}

//       <Footer />

//       <LoginModal
//         isOpen={activeModal === "login"}
//         onClose={() => setActiveModal("")}
//         setActiveModal={setActiveModal}
//         onAuthSuccess={handleLogin}
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
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;

//remake

import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/Hero.css";
import Main from "./components/Main";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ProtectedRoute from "./authorization/ProtectedRoute";
import RegisterSuccessModal from "./components/RegisterSuccessModal";
import SavedNews from "./components/SavedNews";

import { fetchNewsArticles } from "./utils/newsApi";
import { checkToken, register, login } from "./authorization/auth";
import CurrentUserContext from "./contexts/CurrentUserContext";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Preloader from "./components/Preloader";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [fetchError, setFetchError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }

    setIsLoggedIn(true);

    checkToken(token)
      .then((res) => {
        setCurrentUser({ email: res.email, username: res.username });
        return fetch("http://localhost:3000/articles", {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => res.json())
      .then((data) => setSavedArticles(data))
      .catch((err) => {
        console.warn("Auth/token error:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  const handleSearch = (query) => {
    setFetchError(false);
    setIsLoading(true);
    setHasSearched(true);
    setVisibleCount(3);
    setSearchTerm(query);
    sessionStorage.setItem("justSearched", "true");

    const MIN_SPINNER_TIME = 2000;
    const startTime = Date.now();

    const today = new Date().toISOString().slice(0, 10);
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    fetchNewsArticles({ query, from: lastWeek, to: today })
      .then(async (data) => {
        const articles = data.articles.slice(0, 18);
        const validated = [];

        const validateImage = (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
          });

        for (let article of articles) {
          const imageUrl = article.urlToImage || article.image || "";
          const isValid = await validateImage(imageUrl);
          if (isValid) validated.push(article);
          if (validated.length === 9) break;
        }

        setArticles(validated);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        setArticles([]);
        setFetchError(true);
      })
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, MIN_SPINNER_TIME - elapsed);

        setTimeout(() => {
          setIsLoading(false);
        }, delay);
      });
  };

  const handleSaveArticle = (articleData) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const isAlreadySaved = savedArticles.some(
      (a) => a.link === articleData.url
    );

    if (isAlreadySaved) {
      const saved = savedArticles.find((a) => a.link === articleData.url);
      fetch(`http://localhost:3000/articles/${saved._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete article");
          setSavedArticles((prev) => prev.filter((a) => a._id !== saved._id));
        })
        .catch((err) => console.error("Delete failed:", err));
    } else {
      const normalized = {
        keyword: articleData.keyword || searchTerm || "news",
        title: articleData.title,
        text: articleData.description || "No description provided.",
        date: articleData.publishedAt || articleData.date || "Unknown date",
        source:
          articleData.source?.name || articleData.source || "Unknown source",
        link: articleData.url,
        image: articleData.urlToImage || articleData.image || "",
      };

      fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(normalized),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save article");
          return res.json();
        })
        .then((saved) => {
          setSavedArticles((prev) => [saved, ...prev]);
        })
        .catch((err) => console.error("Save failed:", err));
    }
  };

  const handleDeleteArticle = (id) => {
    const token = localStorage.getItem("jwt");

    fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setSavedArticles((prev) =>
            prev.filter((article) => article._id !== id)
          );
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleRegister = ({ email, username, password }) => {
    setIsLoading(true);
    register(email, username, password)
      .then(handleLogin)
      .catch((err) => console.error("Registration failed:", err))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (credentials) => {
    const token = credentials.token;
    localStorage.setItem("jwt", token);
    setIsLoggedIn(true);
    setCurrentUser(credentials.user);
    setActiveModal("");

    checkToken(token)
      .then((userInfo) => {
        setCurrentUser({
          email: userInfo.email,
          username: userInfo.username,
        });

        return fetch("http://localhost:3000/articles", {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((articles) => setSavedArticles(articles))
      .catch((err) => console.error("Post-login sync failed:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      {isHome ? (
        <div className="hero">
          <Header
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            setActiveModal={setActiveModal}
            handleLogout={handleLogout}
          />
          <Main
            onSearch={handleSearch}
            articles={articles}
            isLoading={isLoading}
            hasSearched={hasSearched}
            visibleCount={visibleCount}
            isLoggedIn={isLoggedIn}
            onShowMore={() => setVisibleCount((prev) => Math.min(prev + 3, 12))}
            fetchError={fetchError}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            savedArticles={savedArticles}
          />
          <About />
        </div>
      ) : (
        <>
          <Header
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            setActiveModal={setActiveModal}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
              <Route
                path="/saved-news"
                element={
                  <SavedNews
                    savedArticles={savedArticles}
                    onDeleteArticle={handleDeleteArticle}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("")}
        setActiveModal={setActiveModal}
        onAuthSuccess={handleLogin}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
