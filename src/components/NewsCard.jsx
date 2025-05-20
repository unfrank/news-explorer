import React, { useState, forwardRef } from "react";
import "./NewsCard.css";
import saveIconLight from "../assets/icons/icon-like-light.svg";
import saveIconDark from "../assets/icons/icon-like-dark.svg";

const NewsCard = forwardRef(
  ({ title, description, date, source, image, url, onClick, style }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <article className="news-card" style={style} onClick={onClick} ref={ref}>
        <div className="news-card__image-container">
          <img className="news-card__image" src={image} alt={title} />
          <div
            className="news-card__save-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="news-card__tooltip">Sign in to save articles</span>
            <img
              src={isHovered ? saveIconDark : saveIconLight}
              alt="Save article"
              className="news-card__save-icon"
            />
          </div>
        </div>

        <div className="news-card__info">
          <p className="news-card__date">{date}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description}</p>
          <div className="news-card__footer">
            <span className="news-card__source">{source}</span>
            <a
              className="news-card__read-more"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Read more →
            </a>
          </div>
        </div>
      </article>
    );
  }
);

export default NewsCard;
