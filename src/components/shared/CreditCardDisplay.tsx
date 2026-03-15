import React from 'react';
import type { CreditCard } from '../../data/types';
import './CreditCardDisplay.css';

interface CreditCardDisplayProps {
  card: CreditCard;
}

const CardIcon: React.FC<{ icon?: string }> = ({ icon }) => {
  switch (icon) {
    case 'shopping_cart':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="rgba(255,255,255,0.9)" />
        </svg>
      );
    case 'home':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="rgba(255,255,255,0.9)" />
        </svg>
      );
    case 'flight':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="rgba(255,255,255,0.9)" />
        </svg>
      );
    default:
      return null;
  }
};

const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({ card }) => (
  <div
    className="credit-card"
    style={{ background: `linear-gradient(135deg, ${card.gradient[0]} 0%, ${card.gradient[1]} 100%)` }}
    role="img"
    aria-label={`Credit card ending in ${card.lastFour}`}
  >
    {/* Decorative arc */}
    <div className="credit-card__arc" />

    <div className="credit-card__top">
      <span className="credit-card__bank">Backbase</span>
      {card.cardIcon && (
        <div className="credit-card__icon-badge">
          <CardIcon icon={card.cardIcon} />
        </div>
      )}
    </div>

    <div className="credit-card__middle">
      {card.cardType && (
        <span className="credit-card__type">{card.cardType}</span>
      )}
      {card.cardLabel && (
        <span className="credit-card__label">{card.cardLabel}</span>
      )}
    </div>

    <div className="credit-card__bottom">
      <span className="credit-card__number">.... {card.lastFour}</span>
      {card.brand === 'mastercard' ? (
        <div className="credit-card__brand">
          <svg width="32" height="20" viewBox="0 0 32 20">
            <circle cx="11" cy="10" r="9" fill="#EB001B" opacity="0.8" />
            <circle cx="21" cy="10" r="9" fill="#F79E1B" opacity="0.8" />
          </svg>
        </div>
      ) : (
        <span className="credit-card__brand-text">VISA</span>
      )}
    </div>
  </div>
);

export default CreditCardDisplay;
