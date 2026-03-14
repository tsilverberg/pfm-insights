import React from 'react';
import { useHistory } from 'react-router-dom';
import './ScreenHeader.css';

interface ScreenHeaderProps {
  title: string;
  rightLabel?: string;
  rightVariant?: 'text' | 'pill';
  onRightAction?: () => void;
  showBack?: boolean;
  rightIcon?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  rightLabel,
  rightVariant = 'text',
  onRightAction,
  showBack = true,
  rightIcon,
}) => {
  const history = useHistory();

  return (
    <div className="screen-header">
      {showBack ? (
        <button className="screen-header__back" onClick={() => history.goBack()} aria-label="Back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="var(--pfm-text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <div className="screen-header__spacer" />
      )}
      <h1 className="screen-header__title">{title}</h1>
      {rightLabel ? (
        <button
          className={`screen-header__right ${rightVariant === 'pill' ? 'screen-header__right--pill' : ''}`}
          onClick={onRightAction}
        >
          {rightLabel}
        </button>
      ) : rightIcon ? (
        <button className="screen-header__right-icon" onClick={onRightAction}>
          {rightIcon}
        </button>
      ) : (
        <div className="screen-header__spacer" />
      )}
    </div>
  );
};

export default ScreenHeader;
