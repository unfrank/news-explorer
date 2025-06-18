import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./fonts/fonts.css";

import "./components/Hero/Hero.css";
import "./components/Layout/Layout.css";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import RegisterSuccessModal from "./components/RegisterSuccessModal/RegisterSuccessModal";
import SavedNews from "./components/SavedNews/SavedNews";

import ProtectedRoute from "./authorization/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import CurrentUserContext from "./contexts/CurrentUserContext";

import { fetchNewsArticles } from "./utils/newsApi";
import { checkToken, register, login as apiLogin } from "./authorization/auth";

const BASE_ARTICLES_URL =
  "https://news-explorer-api-n5y3.onrender.com/articles";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [fetchError, setFetchError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingLogin, setPendingLogin] = useState(null);
  const [articles, setArticles] = useState([]);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        return;
      }
      try {
        setIsLoggedIn(true);
        const res = await checkToken(token);
        setCurrentUser({ email: res.email, username: res.username });
        const articlesRes = await fetch(BASE_ARTICLES_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await articlesRes.json();
        setSavedArticles(data);
      } catch (err) {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };
    checkUser();
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = async (query) => {
    setFetchError(false);
    setIsLoading(true);
    setHasSearched(true);
    setVisibleCount(3);
    setSearchTerm(query);
    sessionStorage.setItem("justSearched", "true");

    const MIN_SPINNER_TIME = 1500;
    const startTime = Date.now();

    const today = new Date().toISOString().slice(0, 10);
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    try {
      const data = await fetchNewsArticles({
        query,
        from: lastWeek,
        to: today,
      });
      const results = data.articles.slice(0, 12);
      const validated = [];

      const validateImage = (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = url;
        });

      for (let article of results) {
        const imageUrl = article.urlToImage || article.image || "";
        const isValid = await validateImage(imageUrl);
        if (isValid) validated.push(article);
        if (validated.length === 9) break;
      }

      setArticles(validated);
    } catch (err) {
      console.error("Search error:", err);
      setArticles([]);
      setFetchError(true);
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1500 - elapsed);
      setTimeout(() => setIsLoading(false), delay);
    }
  };

  const handleSaveArticle = async (articleData) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const alreadySaved = savedArticles.some((a) => a.link === articleData.url);
    try {
      if (alreadySaved) {
        const saved = savedArticles.find((a) => a.link === articleData.url);
        const res = await fetch(`${BASE_ARTICLES_URL}/${saved._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to delete article");
        setSavedArticles((prev) => prev.filter((a) => a._id !== saved._id));
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

        const res = await fetch(BASE_ARTICLES_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(normalized),
        });

        if (!res.ok) throw new Error("Failed to save article");
        const saved = await res.json();
        setSavedArticles((prev) => [saved, ...prev]);
      }
    } catch (err) {
      console.error("Save/Delete error:", err);
    }
  };

  const handleDeleteArticle = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await fetch(`${BASE_ARTICLES_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSavedArticles((prev) => prev.filter((a) => a._id !== id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleRegister = async (data, setEmailError, onClose) => {
    const { email, username, password } = data;
    setIsLoading(true);
    try {
      const { token } = await register({ name: username, email, password });
      localStorage.setItem("jwt", token);
      setPendingLogin({ email, password });
      setEmailError("");
      onClose();
      setActiveModal("register-success");
    } catch (err) {
      if (err.data?.error === "User already exists") {
        setEmailError("Email already registered.");
      } else {
        setEmailError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data, setAuthError, onClose) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const {
        token,
        email: userEmail,
        username,
      } = await apiLogin({ email, password });
      localStorage.setItem("jwt", token);
      setIsLoggedIn(true);
      setCurrentUser({ email: userEmail, username });
      setAuthError("");
      onClose();

      const res = await fetch(BASE_ARTICLES_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const articles = await res.json();
      setSavedArticles(articles);
    } catch {
      setAuthError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, handleLogin }}
    >
      {isHome ? (
        <>
          <main className="hero">
            <Header
              isHome={isHome}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              setActiveModal={setActiveModal}
              activeModal={activeModal}
              handleLogout={handleLogout}
            />
            <Main
              onSearch={handleSearch}
              articles={articles}
              isLoading={isLoading}
              hasSearched={hasSearched}
              visibleCount={visibleCount}
              isLoggedIn={isLoggedIn}
              onShowMore={() =>
                setVisibleCount((prev) => Math.min(prev + 3, 12))
              }
              fetchError={fetchError}
              onSaveArticle={handleSaveArticle}
              onDeleteArticle={handleDeleteArticle}
              savedArticles={savedArticles}
            />
            <About />
          </main>
        </>
      ) : (
        <>
          <Header
            isHome={isHome}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            setActiveModal={setActiveModal}
            activeModal={activeModal}
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
        onLogin={(data, setAuthError, onClose) =>
          handleLogin(data, setAuthError, onClose)
        }
        isLoading={isLoading}
        buttonText="Sign In"
        setActiveModal={setActiveModal}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal("")}
        onRegister={(data, setEmailError) =>
          handleRegister(data, setEmailError, () => setActiveModal(""))
        }
        isLoading={isLoading}
        pendingLogin={pendingLogin}
        setActiveModal={setActiveModal}
      />
      <RegisterSuccessModal
        isOpen={activeModal === "register-success"}
        onClose={() => setActiveModal("")}
        onAuthSuccess={handleLogin}
        pendingLogin={pendingLogin}
        setActiveModal={setActiveModal}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
