import React, { useRef, useState } from 'react';
import type { CreditCard } from '../../data/types';
import CreditCardDisplay from './CreditCardDisplay';
import DotIndicator from './DotIndicator';
import './CardCarousel.css';

interface CardCarouselProps {
  cards: CreditCard[];
  onCardChange?: (index: number) => void;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards, onCardChange }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = 288; // 280 + 8 gap
    const idx = Math.round(el.scrollLeft / cardWidth);
    const clamped = Math.min(idx, cards.length - 1);
    if (clamped !== activeIdx) {
      setActiveIdx(clamped);
      onCardChange?.(clamped);
    }
  };

  return (
    <div className="card-carousel">
      <div className="card-carousel__scroll" ref={scrollRef} onScroll={handleScroll}>
        {cards.map((card) => (
          <CreditCardDisplay key={card.id} card={card} />
        ))}
      </div>
      <DotIndicator count={cards.length} active={activeIdx} />
    </div>
  );
};

export default CardCarousel;
