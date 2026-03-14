import React, { useRef, useEffect } from 'react';
import type { Portfolio } from '../../data/types';
import { formatEuro } from '../../data/formatters';
import './PortfolioListItem.css';

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

const PortfolioListItem: React.FC<PortfolioListItemProps> = ({ portfolio }) => {
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
    ctx.strokeStyle = portfolio.change >= 0 ? '#0A5A2B' : '#BF2310';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [portfolio]);

  const isNegative = portfolio.change < 0;

  return (
    <div className="portfolio-list-item">
      <div className="portfolio-list-item__icon">
        <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--pfm-text-secondary)' }}>trending_up</span>
      </div>
      <div className="portfolio-list-item__info">
        <span className="typo-callout-semibold">{portfolio.name}</span>
        <span className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)' }}>{portfolio.label}</span>
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
            className="portfolio-list-item__change-pill"
            style={{
              backgroundColor: isNegative ? '#BF2310' : '#0A5A2B',
            }}
          >
            €{isNegative ? '' : '+'}{portfolio.change.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioListItem;
