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
      <div className="list-row">
        <div className={`list-row__icon list-row__icon--round category-list-item__icon-circle category-list-item__icon-circle--${category}`}>
          <span className="category-list-item__icon" role="img" aria-label={label}>{icon}</span>
        </div>
        <div className="list-row__text">
          <span className="typo-callout-regular">{label}</span>
          <span className="typo-footnote color-tertiary">{txCount} transactions</span>
        </div>
        <span className="list-row__value typo-callout-semibold">{formatEuro(amount)}</span>
      </div>
      {showSeparator && <div className="category-list-item__separator" />}
    </>
  );
};

export default CategoryListItem;
