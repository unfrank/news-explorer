// todo: @import url(./vendor/normalize.css); @import url(./vendor/fonts.css)  to index.css.

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";

import "./components/Hero.css";
import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import Footer from "./components/Footer";
import ModalWithForm from "./components/ModalWithForm";
import LoginModal from "./components/LoginModal";

function App() {
  // const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  return (
    <div className="hero">
      {/* <Header onSignInClick={() => setIsSignInOpen(true)} /> */}
      <Header
        onSignInClick={() => {
          console.log("Clicked Sign In");
          setActiveModal("login");
          // setIsSignInOpen(true);
        }}
      />
      <Main />
      <About />
      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("")}
        setActiveModal={setActiveModal}
        onAuthSuccess={(credentials) => {
          console.log("Logged in:", credentials);
          setIsLoggedIn(true);
          setCurrentUser(credentials.user);
          setActiveModal("");
        }}
        isLoading={false}
        buttonText="Sign In"
      />
    </div>
  );
}

export default App;
