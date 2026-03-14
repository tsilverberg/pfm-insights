import React from 'react';
import type { QuickAction } from '../../data/types';

const iconMap: Record<string, React.ReactNode> = {
  transfer: (
    <svg width="24" height="24" viewBox="0 0 18 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.99 6L0 10L3.99 14V11H11V9H3.99V6ZM18 4L14.01 0V3H7V5H14.01V8L18 4Z" />
    </svg>
  ),
  receive: (
    <svg width="24" height="24" viewBox="0 0 14 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z" />
    </svg>
  ),
  qr_code: (
    <svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8H8V0H0V8ZM2 2H6V6H2V2Z" />
      <path d="M0 18H8V10H0V18ZM2 12H6V16H2V12Z" />
      <path d="M10 0V8H18V0H10ZM16 6H12V2H16V6Z" />
      <path d="M18 16H16V18H18V16Z" />
      <path d="M12 10H10V12H12V10Z" />
      <path d="M14 12H12V14H14V12Z" />
      <path d="M12 14H10V16H12V14Z" />
      <path d="M14 16H12V18H14V16Z" />
      <path d="M16 14H14V16H16V14Z" />
      <path d="M16 10H14V12H16V10Z" />
      <path d="M18 12H16V14H18V12Z" />
    </svg>
  ),
  more: (
    <svg width="24" height="24" viewBox="0 0 16 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z" />
    </svg>
  ),
};

interface QuickActionButtonProps {
  action: QuickAction;
  onClick?: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action, onClick }) => {
  const bgClass =
    action.variant === 'primary'
      ? 'quick-action__circle--primary'
      : action.variant === 'secondary'
        ? 'quick-action__circle--secondary'
        : 'quick-action__circle--outlined';

  return (
    <button className="quick-action" onClick={onClick}>
      <div className={`quick-action__circle ${bgClass}`}>
        {iconMap[action.icon]}
      </div>
      <span className="quick-action__label">{action.label}</span>
    </button>
  );
};

export default QuickActionButton;
