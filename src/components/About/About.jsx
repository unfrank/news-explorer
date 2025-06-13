import "./About.css";
import lolaImage from "../../assets/images/lola.jpg";
import authorBio from "../../utils/bio.js";

function About() {
  return (
    <section className="about">
      <div className="app__layout-container">
        <div className="about__container">
          <img className="about__image" src={lolaImage} alt="Author" />
          <div className="about__text">
            <h2 className="about__title">About the author</h2>

            {/* replace the outer <p> with a <div> and map directly to <p> */}
            <div className="about__paragraphs">
              {authorBio.map((paragraph, idx) => (
                <p className="about__paragraph" key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
