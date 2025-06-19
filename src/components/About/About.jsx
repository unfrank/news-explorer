import "./About.css";
import authorImage from "../../assets/images/author.jpg";
import authorBio from "../../utils/bio.js";

function About() {
  return (
    <section className="about">
      <div className="layout-container">
        <article className="about__container">
          <img className="about__image" src={authorImage} alt="Author" />
          <div className="about__text">
            <h2 className="about__title">About the author</h2>
            {authorBio.map((paragraph, idx) => (
              <p className="about__paragraph" key={idx}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default About;
