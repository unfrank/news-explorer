import "./About.css";
// import lolaImage from "../../assets/images/lola.jpg";
import authorImage from "../../assets/images/author.jpg";
import authorBio from "../../utils/bio.js";

function About() {
  return (
    <section className="about">
      <div className="layout-container">
        <div className="about__container">
          <img className="about__image" src={authorImage} alt="Author" />
          <div className="about__text">
            <h2 className="about__title">About the author</h2>

            {authorBio.map((paragraph, idx) => (
              <p className="about__paragraph" key={idx}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
