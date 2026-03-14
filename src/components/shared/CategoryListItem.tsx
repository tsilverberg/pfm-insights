import React from 'react';
import { formatEuro } from '../../data/formatters';

interface CategoryListItemProps {
  icon: string;
  label: string;
  amount: number;
  txCount: number;
  category: 'needs' | 'wants';
  showSeparator?: boolean;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({ icon, label, amount, txCount, category, showSeparator = true }) => {
  return (
    <>
      <div className="category-list-item">
        <div className={`category-list-item__icon-circle category-list-item__icon-circle--${category}`}>
          <span className="category-list-item__icon" role="img" aria-label={label}>{icon}</span>
        </div>
        <div className="category-list-item__text">
          <div className="category-list-item__label">{label}</div>
          <div className="category-list-item__count">{txCount} transactions</div>
        </div>
        <div className="category-list-item__amount">{formatEuro(amount)}</div>
      </div>
      {showSeparator && <div className="category-list-item__separator" />}
    </>
  );
};

export default CategoryListItem;
