import "./NothingFound.css";
import notFoundImage from "../../assets/images/not-found.png";

function NothingFound() {
  return (
    <section className="nothing-found">
      <img
        className="nothing-found__image"
        src={notFoundImage}
        alt="Nothing found"
      />
      <h2 className="nothing-found__title">Nothing found</h2>
      <p className="nothing-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}

export default NothingFound;
