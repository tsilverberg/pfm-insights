import React from 'react';

interface CategoryFilter {
  id: string;
  label: string;
  percentage: number;
  color: string;
}

interface CategoryFilterPillsProps {
  categories: CategoryFilter[];
  active: string;
  onChange: (id: string) => void;
}

const CategoryFilterPills: React.FC<CategoryFilterPillsProps> = ({ categories, active, onChange }) => {
  return (
    <div className="category-filter-pills">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="category-filter-pill"
          onClick={() => onChange(cat.id)}
          style={active === cat.id ? { borderColor: 'var(--pfm-border-strong)' } : undefined}
        >
          <div className="category-filter-pill__header">
            <span className="category-filter-pill__dot" style={{ backgroundColor: cat.color }} />
            <span className="category-filter-pill__label">{cat.label}</span>
          </div>
          <div>
            <span className="category-filter-pill__value">{cat.percentage}%</span>
            <br />
            <span className="category-filter-pill__suffix">of income</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilterPills;
