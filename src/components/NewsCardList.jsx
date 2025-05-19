import React, { useEffect, useRef } from "react";
import NewsCard from "./NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles, onCardClick }) {
  return (
    <section className="news-results__list">
      <h2 className="news-results__title">Search results</h2>
      <div className="news-results__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.url}-${index}`}
            title={article.title}
            description={article.description}
            date={new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            source={article.source.name}
            image={article.urlToImage}
            url={article.url}
            style={{ animationDelay: `${index * 0.33}s` }}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsCardList;
