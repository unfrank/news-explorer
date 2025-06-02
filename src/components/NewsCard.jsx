// NewsCard.jsx

import React, { useState, forwardRef, useEffect } from "react";
import "./NewsCard.css";

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
      keyword,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Determine which icon to show (save vs. delete)
    const getIcon = () => {
      if (isSavedView) {
        return isHovered ? deleteIconActive : deleteIconInactive;
      }
      if (isSaved && isLoggedIn) {
        return saveIconMarked;
      }
      return isHovered ? saveIconDark : saveIconLight;
    };

    // When the title is clicked, open the URL in a new tab
    const handleTitleClick = (e) => {
      e.stopPropagation(); // Prevent triggering any parent 'onClick'
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
      <div className="news-card__wrapper">
        <article
          className={`news-card ${mounted ? "fade-in" : ""} ${
            extraClass || ""
          }`}
          style={style}
          onClick={onClick}
          ref={ref}
        >
          {/* ===========================
              1) IMAGE + SAVE/DELETE ICON
              =========================== */}
          <div className="news-card__image-container">
            <img className="news-card__image" src={image} alt={title} />

            <div className="news-card__control-bar">
              {isSavedView && (
                <div className="news-card__keyword">
                  {keyword?.charAt(0).toUpperCase() + keyword?.slice(1)}
                </div>
              )}

              <div
                className="news-card__icon-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered && (
                  <div className="news-card__tooltip">
                    {!isLoggedIn
                      ? "Sign in to save articles"
                      : isSavedView || isSaved
                      ? "Remove from saved"
                      : "Save to favorites"}
                  </div>
                )}
                <img
                  src={getIcon()}
                  alt={isSaved ? "Saved" : "Save article"}
                  className={`news-card__save-icon ${
                    isSaved ? "news-card__save-icon--active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave();
                  }}
                />
              </div>
            </div>
          </div>

          {/* ===========================
              2) INFO BLOCK: date, title, description, footer
              =========================== */}
          <div className="news-card__info">
            <p className="news-card__date">{date}</p>

            {/* Title is now the clickable element */}
            <h3
              className="news-card__title news-card__title--clickable"
              onClick={handleTitleClick}
            >
              {title}
            </h3>

            <p className="news-card__description">{description}</p>

            <div className="news-card__footer">
              <span className="news-card__source">{source}</span>
              {/* Removed the old “Read more →” link entirely */}
            </div>
          </div>
        </article>
      </div>
    );
  }
);

export default NewsCard;
