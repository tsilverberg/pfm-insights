import React from 'react';

interface CategoryBadgeProps {
  category: 'needs' | 'wants';
  label: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, label }) => {
  return (
    <span className={`category-badge category-badge--${category}`}>
      {label}
    </span>
  );
};

export default CategoryBadge;
