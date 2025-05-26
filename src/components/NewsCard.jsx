import React, { useState, forwardRef, useEffect } from "react";

import "./NewsCard.css";

// todo: import icons together
import saveIconLight from "../assets/icons/icon-like-light.svg";
import saveIconDark from "../assets/icons/icon-like-dark.svg";
import saveIconMarked from "../assets/icons/icon-like-marked.svg";

import deleteIconActive from "../assets/icons/icon-trash-active.svg";
import deleteIconInactive from "../assets/icons/icon-trash-inactive.svg";
const NewsCard = forwardRef(
  (
    {
      title,
      description,
      date,
      source,
      image,
      url,
      onClick,
      style,
      onSave,
      isSaved,
      isLoggedIn,
      isSavedView,
      extraClass,
    },

    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // const getIcon = () => {
    //   if (isSaved && isLoggedIn) return saveIconMarked;
    //   return isHovered ? saveIconDark : saveIconLight;
    // };
    // test
    const getIcon = () => {
      if (isSavedView) return isHovered ? deleteIconActive : deleteIconInactive;
      if (isSaved && isLoggedIn) return saveIconMarked;
      return isHovered ? saveIconDark : saveIconLight;
    };

    return (
      <article
        className={`news-card ${mounted ? "news-card__fade-in" : ""} ${
          extraClass || ""
        }`}
        style={style}
        onClick={onClick}
        ref={ref}
      >
        <div className="news-card__image-container">
          <img className="news-card__image" src={image} alt={title} />
          <div
            className="news-card__save-wrapper"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* <span className="news-card__tooltip">
              {!isLoggedIn
                ? "Sign in to save articles"
                : isSaved
                ? "Remove from saved"
                : "Save to favorites"}
            </span> */}

            {/* test */}
            <span className="news-card__tooltip">
              {!isLoggedIn
                ? "Sign in to save articles"
                : isSavedView
                ? "Remove from saved"
                : isSaved
                ? "Remove from saved"
                : "Save to favorites"}
            </span>

            <img
              src={getIcon()}
              alt={isSaved ? "Saved" : "Save article"}
              className={`news-card__save-icon ${
                isSaved ? "news-card__save-icon--active" : ""
              }`}
            />
            {/* <img
  src={getIcon()}
  alt={isSaved && isLoggedIn ? "Saved" : "Save article"}
  className={`news-card__save-icon ${
    isSaved && isLoggedIn ? "news-card__save-icon--active" : ""
  }`}
/> */}
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
