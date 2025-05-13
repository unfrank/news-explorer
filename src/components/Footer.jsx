import React from "react";
import githubIcon from "../assets/icons/icon-github.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          © {new Date().getFullYear()} NewsExplorer, by James Unthank
        </p>
        <nav className="footer__nav">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            TripleTen
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="footer__icon"
          >
            <img src={githubIcon} alt="GitHub" className="footer__icon" />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
