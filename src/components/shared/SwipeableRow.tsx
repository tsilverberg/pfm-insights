import React, { useRef, useState } from 'react';
import { useHaptics } from '../../hooks/useHaptics';
import './SwipeableRow.css';

interface SwipeAction {
  icon: string;
  label: string;
  color: string;
  onAction: () => void;
}

interface SwipeableRowProps {
  children: React.ReactNode;
  leftAction?: SwipeAction;
  rightAction?: SwipeAction;
}

const REVEAL_THRESHOLD = 60;
const TRIGGER_THRESHOLD = 120;
const ACTION_WIDTH = 80;

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, leftAction, rightAction }) => {
  const haptics = useHaptics();
  const [translateX, setTranslateX] = useState(0);
  const touchRef = useRef({ startX: 0, currentX: 0, swiping: false });
  const hapticFiredRef = useRef({ reveal: false, trigger: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.currentX = e.touches[0].clientX;
    touchRef.current.swiping = true;
    hapticFiredRef.current = { reveal: false, trigger: false };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current.swiping) return;

    touchRef.current.currentX = e.touches[0].clientX;
    const delta = touchRef.current.currentX - touchRef.current.startX;

    // Only allow swiping in directions that have actions
    if (delta > 0 && !leftAction) return;
    if (delta < 0 && !rightAction) return;

    const absDelta = Math.abs(delta);

    // Fire haptic when crossing reveal threshold
    if (absDelta >= REVEAL_THRESHOLD && !hapticFiredRef.current.reveal) {
      hapticFiredRef.current.reveal = true;
      haptics.light();
    }

    // Fire haptic when crossing trigger threshold
    if (absDelta >= TRIGGER_THRESHOLD && !hapticFiredRef.current.trigger) {
      hapticFiredRef.current.trigger = true;
      haptics.medium();
    }

    // Clamp to action width with some resistance beyond
    const maxDelta = ACTION_WIDTH + 20;
    const clamped = Math.max(-maxDelta, Math.min(maxDelta, delta));
    setTranslateX(clamped);
  };

  const handleTouchEnd = () => {
    if (!touchRef.current.swiping) return;
    touchRef.current.swiping = false;

    const delta = touchRef.current.currentX - touchRef.current.startX;

    // Auto-trigger if past trigger threshold
    if (delta >= TRIGGER_THRESHOLD && leftAction) {
      leftAction.onAction();
      setTranslateX(0);
      return;
    }
    if (delta <= -TRIGGER_THRESHOLD && rightAction) {
      rightAction.onAction();
      setTranslateX(0);
      return;
    }

    // Snap open if past reveal threshold, otherwise spring back
    if (delta >= REVEAL_THRESHOLD && leftAction) {
      setTranslateX(ACTION_WIDTH);
    } else if (delta <= -REVEAL_THRESHOLD && rightAction) {
      setTranslateX(-ACTION_WIDTH);
    } else {
      setTranslateX(0);
    }
  };

  const handleActionClick = (action: SwipeAction) => {
    action.onAction();
    setTranslateX(0);
  };

  return (
    <div className="swipeable-row">
      {leftAction && (
        <div
          className="swipeable-row__actions swipeable-row__actions--left"
          style={{ backgroundColor: leftAction.color }}
          onClick={() => handleActionClick(leftAction)}
        >
          <div className="swipeable-row__action-content">
            <span className="material-symbols-rounded">{leftAction.icon}</span>
            <span>{leftAction.label}</span>
          </div>
        </div>
      )}

      {rightAction && (
        <div
          className="swipeable-row__actions swipeable-row__actions--right"
          style={{ backgroundColor: rightAction.color }}
          onClick={() => handleActionClick(rightAction)}
        >
          <div className="swipeable-row__action-content">
            <span className="material-symbols-rounded">{rightAction.icon}</span>
            <span>{rightAction.label}</span>
          </div>
        </div>
      )}

      <div
        className="swipeable-row__content"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: touchRef.current.swiping ? 'none' : 'transform 0.3s ease-out',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeableRow;
