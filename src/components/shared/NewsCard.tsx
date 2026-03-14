import React from 'react';
import type { NewsArticle } from '../../data/types';
import './NewsCard.css';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="news-card">
      <div className="news-card__image-wrapper">
        <div
          className="news-card__image"
          style={{ backgroundImage: `url(${article.imageUrl})` }}
        />
      </div>
      <div className="news-card__body">
        <p className="typo-body-semibold news-card__title">{article.title}</p>
        <p className="typo-subhead-regular news-card__desc">{article.description}</p>
        <button className="news-card__read-more typo-subhead-semibold">Read more</button>
      </div>
    </div>
  );
};

export default NewsCard;
