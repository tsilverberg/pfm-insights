import React, { useRef, useEffect } from 'react';
import type { Portfolio } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './PortfolioListItem.css';

interface PortfolioListItemProps {
  portfolio: Portfolio;
  onClick?: () => void;
}

const PortfolioListItem: React.FC<PortfolioListItemProps> = ({ portfolio, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 89 * dpr;
    canvas.height = 24 * dpr;
    ctx.scale(dpr, dpr);

    const data = portfolio.sparklineData;
    if (!data || data.length < 2) return;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = 89;
    const h = 24;
    const pad = 2;

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((val - min) / range) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    // Canvas cannot use CSS variables directly; values match --pfm-change-positive / --pfm-change-negative
    ctx.strokeStyle = portfolio.change >= 0 ? '#0A5A2B' : '#BF2310';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [portfolio]);

  const isNegative = portfolio.change < 0;

  return (
    <div className="list-row portfolio-list-item" onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} style={onClick ? { cursor: 'pointer' } : undefined}>
      <div className="list-row__icon portfolio-list-item__icon">
        <span className="material-symbols-rounded portfolio-list-item__icon-symbol">trending_up</span>
      </div>
      <div className="list-row__text">
        <span className="typo-callout-semibold">{portfolio.name}</span>
        <span className="typo-footnote color-secondary">{portfolio.label}</span>
      </div>
      <div className="portfolio-list-item__right">
        <canvas
          ref={canvasRef}
          className="portfolio-list-item__sparkline"
          width={89}
          height={24}
        />
        <div className="portfolio-list-item__values">
          <span className="typo-callout-semibold">{formatEuro(portfolio.value)}</span>
          <span
            className={`portfolio-list-item__change-pill ${isNegative ? 'portfolio-list-item__change-pill--negative' : ''}`}
            aria-label={`${isNegative ? 'Loss' : 'Gain'}: €${Math.abs(portfolio.change).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          >
            {isNegative ? '▼' : '▲'} €{isNegative ? '' : '+'}{portfolio.change.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioListItem;
