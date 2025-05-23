import "./About.css";
import React from "react";
import lolaImage from "../assets/images/lola.jpg";

function About() {
  return (
    <section className="about">
      <div className="section-inner">
        <div className="about__container">
          <img className="about__image" src={lolaImage} alt="Author" />
          <div className="about__text">
            <h2 className="about__title">About the author</h2>
            <p className="about__paragraph">
              descrivbe yourself here...blah blah blah
            </p>
            <p className="about__paragraph">
              talk about experience with tripleten, what i learnt and how i can
              appeal to customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
