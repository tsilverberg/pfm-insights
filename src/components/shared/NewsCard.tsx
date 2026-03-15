import React from 'react';
import type { NewsArticle } from '../../data/types';
import './NewsCard.css';

interface NewsCardProps {
  article: NewsArticle;
  onReadMore?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onReadMore }) => {
  return (
    <div className="news-card">
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={article.imageUrl}
          alt={article.title}
        />
      </div>
      <div className="news-card__body">
        <h3 className="typo-body-semibold news-card__title">{article.title}</h3>
        <p className="typo-subhead-regular news-card__desc">{article.description}</p>
        <button className="news-card__read-more typo-subhead-semibold" onClick={onReadMore}>Read more</button>
      </div>
    </div>
  );
};

export default NewsCard;
