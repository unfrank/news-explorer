import React, { useState, useEffect } from "react";
import "./App.css";

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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [fetchError, setFetchError] = useState(false);

  // force scroll to top on page load
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log("CURRENT USER STATE:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser({ email: res.email });

          // 🆕 Fetch saved articles
          fetch("http://localhost:3000/articles", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => setSavedArticles(data))
            .catch((err) =>
              console.error("Failed to load saved articles:", err)
            );
        })
        .catch((err) => {
          console.warn("Invalid or expired token:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  const handleSearch = (query) => {
    setFetchError(false);
    setIsLoading(true);
    setHasSearched(true);
    setVisibleCount(3);

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
        setFetchError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSaveArticle = (articleData) => {
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:3000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    })
      .then((res) => res.json())
      .then((saved) => {
        setSavedArticles((prev) => [...prev, saved]);
      })
      .catch((err) => console.error("Save failed:", err));
  };

  const handleDeleteArticle = (id) => {
    const token = localStorage.getItem("jwt");

    fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  const handleRegister = ({ email, password }) => {
    setIsLoading(true);
    register(email, password)
      .then(() => {
        return login(email, password);
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser({ email: res.email });
        setIsLoggedIn(true);
        setActiveModal("");
        console.log("Registered user:", res.email);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
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

        <Routes>
          <Route element={<ProtectedRoute />}>
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
    </Router>
  );
}

export default App;
