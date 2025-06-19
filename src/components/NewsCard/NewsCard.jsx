import { useState, forwardRef, useEffect } from "react";

import "./NewsCard.css";
import saveIconLight from "../../assets/icons/icon-like-light.svg";
import saveIconDark from "../../assets/icons/icon-like-dark.svg";
import saveIconMarked from "../../assets/icons/icon-like-marked.svg";
import deleteIconActive from "../../assets/icons/icon-trash-active.svg";
import deleteIconInactive from "../../assets/icons/icon-trash-inactive.svg";

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
      onRemove,
      style,
      onSave,
      isSaved,
      isLoggedIn,
      isSavedView,
      shouldFadeOut,
      keyword,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const getIcon = () => {
      if (isSavedView) {
        return isHovered ? deleteIconActive : deleteIconInactive;
      }
      if (isSaved && isLoggedIn) {
        return saveIconMarked;
      }
      return isHovered ? saveIconDark : saveIconLight;
    };

    const handleTitleClick = (e) => {
      e.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
      <div className="news-card__wrapper">
        <article
          className={`news-card ${mounted && !shouldFadeOut ? "fade-in" : ""} ${
            shouldFadeOut ? "news-card--fade-out" : ""
          }`}
          style={style}
          onClick={onClick}
          onAnimationEnd={(e) => {
            if (shouldFadeOut && e.animationName === "fadeOutDown") {
              onRemove();
            }
          }}
          ref={ref}
        >
          <div className="news-card__image-container">
            <img className="news-card__image" src={image} alt={title} />

            <div className="news-card__control-bar">
              {isSavedView && (
                <span className="news-card__keyword">
                  {keyword?.charAt(0).toUpperCase() + keyword?.slice(1)}
                </span>
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

          <div className="news-card__info">
            <div className="news-card__content">
              <p className="news-card__date">{date}</p>
              <h3
                className="news-card__title news-card__title--clickable"
                onClick={handleTitleClick}
              >
                {title}
              </h3>
              <p className="news-card__description">{description}</p>
            </div>

            <div className="news-card__footer">
              <span className="news-card__source">{source}</span>
            </div>
          </div>
        </article>
      </div>
    );
  }
);

export default NewsCard;
