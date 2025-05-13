import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";

import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Main />
      <About />
      <Footer />
    </>
  );
}

export default App;
