import React from "react";
import "./SavedNews.css";
import NewsCard from "./NewsCard";

function SavedNews({ savedArticles, onDeleteArticle }) {
  console.log("🔥 SavedNews mounted");

  return (
    <section className="saved-news">
      <div className="section-inner">
        <h1 className="saved-news__title">Saved Articles</h1>
        <p className="saved-news__subtitle">
          You have {savedArticles.length} saved article
          {savedArticles.length !== 1 ? "s" : ""}
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
