import React, { useState } from 'react';
import { formatEuro } from '../../data/formatters';
import './BudgetAccordion.css';

interface BudgetItem {
  icon: string;
  name: string;
  amount: number;
  budget?: number;
}

interface BudgetSection {
  title: string;
  total: number;
  items: BudgetItem[];
}

interface BudgetAccordionProps {
  sections: BudgetSection[];
}

const BudgetAccordion: React.FC<BudgetAccordionProps> = ({ sections }) => {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="budget-accordion" role="list">
      {sections.map((section, sectionIndex) => {
        const isOpen = openSections.has(sectionIndex);
        return (
          <div key={section.title} className="budget-accordion__section" role="listitem">
            <button
              className="budget-accordion__header"
              onClick={() => toggleSection(sectionIndex)}
              aria-expanded={isOpen}
              aria-controls={`budget-section-${sectionIndex}`}
            >
              <div className="budget-accordion__header-left">
                <span className="budget-accordion__section-title">{section.title}</span>
              </div>
              <div className="budget-accordion__header-left gap-8">
                <span className="budget-accordion__section-total">{formatEuro(section.total)}</span>
                <span
                  className={`budget-accordion__chevron material-symbols-rounded ${isOpen ? 'budget-accordion__chevron--open' : ''}`}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </div>
            </button>
            {isOpen && (
              <div
                id={`budget-section-${sectionIndex}`}
                className="budget-accordion__items"
                role="list"
              >
                {section.items.map((item, itemIndex) => (
                  <React.Fragment key={item.name}>
                    <div className="budget-accordion__item" role="listitem">
                      <div className="budget-accordion__item-icon">
                        <span className="material-symbols-rounded" aria-hidden="true">
                          {item.icon}
                        </span>
                      </div>
                      <div className="budget-accordion__item-text">
                        <span className="budget-accordion__item-name">{item.name}</span>
                        {item.budget != null && (
                          <span className="budget-accordion__item-budget">
                            Budget: {formatEuro(item.budget)}
                          </span>
                        )}
                      </div>
                      <span className="budget-accordion__item-amount">{formatEuro(item.amount)}</span>
                    </div>
                    {itemIndex < section.items.length - 1 && (
                      <div className="budget-accordion__item-separator" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BudgetAccordion;
