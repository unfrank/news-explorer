import React from "react";

function SearchCard({ article }) {
  return (
    <article className="card">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="card__image"
      />
      <div className="card__content">
        <h3 className="card__title">{article.title}</h3>
        <p className="card__description">{article.description}</p>
        <a
          href={article.url}
          className="card__link"
          target="_blank"
          rel="noreferrer"
        >
          Read more
        </a>
      </div>
    </article>
  );
}

export default SearchCard;
