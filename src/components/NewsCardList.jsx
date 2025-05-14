import React from "react";
import NewsCard from "./NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles }) {
  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            date={article.date}
            source={article.source}
            image={article.image}
          />
        ))}
      </div>
      {/* <button className="news-card-list__button">Show more</button> */}
    </section>
  );
}

export default NewsCardList;
