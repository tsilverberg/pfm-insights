import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CoachIcon from './CoachIcon';
import CoachSheet from './CoachSheet';
import './CoachFAB.css';

// Pages where FAB should NOT appear (coach button already in header, or transactional pages)
const HIDDEN_PATHS = [
  '/insights',
  '/explore',
  '/send-money',
  '/request-money',
  '/transfer',
  '/qr-scanner',
  '/review-summary',
  '/profile',
  '/select-permissions',
  '/share-access',
];

const CoachFAB: React.FC = () => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const path = location.pathname;
    const hidden = HIDDEN_PATHS.some(p => path.startsWith(p));
    setIsVisible(!hidden);
  }, [location.pathname]);

  const handleOpen = () => {
    setIsSheetOpen(true);
    setHasUnread(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <button
        className="coach-fab"
        onClick={handleOpen}
        aria-label="Open financial coach"
      >
        <CoachIcon size={24} color="var(--pfm-action-primary-text)" />
        {hasUnread && <span className="coach-fab__badge" />}
      </button>
      <CoachSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        context={location.pathname}
      />
    </>
  );
};

export default CoachFAB;
