import React from 'react';
import './SkeletonLoader.css';

interface SkeletonLoaderProps {
  variant: 'text' | 'circle' | 'card' | 'chart' | 'list-row';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

const CHART_GRID_LINES = 5;

const toStyleValue = (value: string | number): string =>
  typeof value === 'number' ? `${value}px` : value;

const SkeletonText: React.FC<{ width?: string | number; height?: string | number; className?: string }> = ({
  width,
  height,
  className,
}) => (
  <div
    className={`skeleton skeleton--text ${className || ''}`}
    style={{
      ...(width != null && { width: toStyleValue(width) }),
      ...(height != null && { height: toStyleValue(height) }),
    }}
  />
);

const SkeletonCircle: React.FC<{ width?: string | number; height?: string | number; className?: string }> = ({
  width,
  height,
  className,
}) => {
  const size = width ?? height;
  return (
    <div
      className={`skeleton skeleton--circle ${className || ''}`}
      style={{
        ...(size != null && { width: toStyleValue(size), height: toStyleValue(size) }),
      }}
    />
  );
};

const SkeletonCard: React.FC<{ width?: string | number; height?: string | number; className?: string }> = ({
  width,
  height,
  className,
}) => (
  <div
    className={`skeleton skeleton--card ${className || ''}`}
    style={{
      ...(width != null && { width: toStyleValue(width) }),
      ...(height != null && { height: toStyleValue(height) }),
    }}
  />
);

const SkeletonChart: React.FC<{ width?: string | number; height?: string | number; className?: string }> = ({
  width,
  height,
  className,
}) => (
  <div
    className={`skeleton skeleton--chart ${className || ''}`}
    style={{
      ...(width != null && { width: toStyleValue(width) }),
      ...(height != null && { height: toStyleValue(height) }),
    }}
  >
    <div className="skeleton--chart__grid">
      {Array.from({ length: CHART_GRID_LINES }).map((_, i) => (
        <div key={i} className="skeleton--chart__grid-line" />
      ))}
    </div>
  </div>
);

const SkeletonListRow: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`skeleton--list-row ${className || ''}`}>
    <div className="skeleton skeleton--circle" />
    <div className="skeleton--list-row__text">
      <div className="skeleton skeleton--list-row__line-primary" />
      <div className="skeleton skeleton--list-row__line-secondary" />
    </div>
    <div className="skeleton skeleton--list-row__value" />
  </div>
);

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant,
  width,
  height,
  count = 1,
  className,
}) => {
  const renderSingle = (key?: number) => {
    switch (variant) {
      case 'text':
        return <SkeletonText key={key} width={width} height={height} className={className} />;
      case 'circle':
        return <SkeletonCircle key={key} width={width} height={height} className={className} />;
      case 'card':
        return <SkeletonCard key={key} width={width} height={height} className={className} />;
      case 'chart':
        return <SkeletonChart key={key} width={width} height={height} className={className} />;
      case 'list-row':
        return <SkeletonListRow key={key} className={className} />;
      default:
        return null;
    }
  };

  if (count <= 1) {
    return renderSingle();
  }

  return (
    <div className="skeleton-group">
      {Array.from({ length: count }).map((_, i) => renderSingle(i))}
    </div>
  );
};

export default SkeletonLoader;
