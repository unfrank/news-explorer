import "./About.css";
import React from "react";
import lolaImage from "../assets/images/lola.jpg";
import authorBio from "../utils/Bio.js";

function About() {
  return (
    <section className="about">
      <div className="section-inner">
        <div className="about__container">
          <img className="about__image" src={lolaImage} alt="Author" />
          <div className="about__text">
            <h2 className="about__title">About the author</h2>

            <p className="about__paragraph">
              {authorBio.map((paragraph, idx) => (
                <p className="about__paragraph" key={idx}>
                  {paragraph}
                </p>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
