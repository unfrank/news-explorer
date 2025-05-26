import "./SavedNews.css";
import NewsCard from "./NewsCard";
import React, { useContext, useState } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

function SavedNews({ savedArticles, onDeleteArticle }) {
  console.log("🔥 SavedNews mounted");

  const { currentUser } = useContext(CurrentUserContext);
  const displayName =
    currentUser?.username?.charAt(0).toUpperCase() +
      currentUser?.username?.slice(1) || "You";

  const [fadingCardIds, setFadingCardIds] = useState([]);

  return (
    <section className="saved-news">
      <div className="section-inner">
        <h1 className="saved-news__title">Saved Articles</h1>

        <p className="saved-news__subtitle">
          {displayName}, you have {savedArticles.length} saved article
          {savedArticles.length !== 1 ? "s" : ""}.
        </p>

        <div className="saved-news__grid">
          {savedArticles.map((article, index) => (
            <NewsCard
              key={article._id}
              title={article.title}
              description={article.text}
              date={article.date}
              source={article.source}
              image={article.image}
              url={article.link}
              isSaved={true}
              isSavedView={true}
              isLoggedIn={true}
              onSave={() => {
                if (!fadingCardIds.includes(article._id)) {
                  setFadingCardIds((prev) => [...prev, article._id]);
                  setTimeout(() => {
                    onDeleteArticle(article._id);
                  }, 600); // ⏱ increased delay to allow animation to complete
                }
              }}
              style={{ animationDelay: `${index * 0.25}s` }}
              extraClass={
                fadingCardIds.includes(article._id) ? "news-card--fade-out" : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
