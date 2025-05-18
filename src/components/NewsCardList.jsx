import React from "react";
import NewsCard from "./NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles, onCardClick }) {
  return (
    <section className="news-results__list">
      <div className="news-results__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
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
            // test
            onClick={() => onCardClick(article.description)}
            // onCardClick={() => console.log("Card clicked", article.title)}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsCardList;
