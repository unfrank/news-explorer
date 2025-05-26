import React from "react";
import "./SavedNews.css";
import NewsCard from "./NewsCard";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function SavedNews({ savedArticles, onDeleteArticle }) {
  console.log("🔥 SavedNews mounted");

  const { currentUser } = useContext(CurrentUserContext);
  const displayName =
    currentUser?.username?.charAt(0).toUpperCase() +
      currentUser?.username?.slice(1) || "You";

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
              onSave={() => onDeleteArticle(article._id)}
              style={{ animationDelay: `${index * 0.25}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
