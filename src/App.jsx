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

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <div className="hero">
      <Header onSignInClick={() => setIsSignInOpen(true)} />
      <Main />
      <About />
      <Footer />

      <ModalWithForm
        title="Sign In"
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Sign in submitted");
        }}
      >
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
      </ModalWithForm>
    </div>
  );
}

export default App;
