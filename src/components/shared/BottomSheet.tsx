import React, { useRef } from 'react';
import { IonModal } from '@ionic/react';
import './BottomSheet.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modalRef}
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.5, 0.85]}
      initialBreakpoint={0.85}
      backdropBreakpoint={0}
      className="bottom-sheet-modal"
      handle={true}
      handleBehavior="cycle"
      role="dialog"
      aria-modal={true}
      aria-label={title || 'Dialog'}
    >
      <div className="bottom-sheet__inner">
        {title && <div className="bottom-sheet__title">{title}</div>}
        <div className="bottom-sheet__content">
          {children}
        </div>
      </div>
    </IonModal>
  );
};

export default BottomSheet;
