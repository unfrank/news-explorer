import React from "react";
import "./NewsCard.css";
import saveIcon from "../assets/icons/icon-save-disabled.svg"; // placeholder

function NewsCard({ title, description, date, source, image }) {
  return (
    <article className="news-card">
      <img className="news-card__image" src={image} alt={title} />
      <div className="news-card__info">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <div className="news-card__footer">
          <span className="news-card__source">{source}</span>
          <div className="news-card__save" title="Sign in to save">
            <img
              src={saveIcon}
              alt="Save article"
              className="news-card__save-icon"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
