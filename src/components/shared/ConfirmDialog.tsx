import React from 'react';
import { IonModal } from '@ionic/react';
import './ConfirmDialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onCancel}
      className="confirm-dialog"
      role="dialog"
      aria-modal={true}
      aria-label={title}
    >
      <div className="confirm-dialog__content">
        <div className="confirm-dialog__title typo-headline">{title}</div>
        <div className="confirm-dialog__message typo-subhead-regular color-secondary">
          {message}
        </div>
        <div className="confirm-dialog__buttons">
          <button className="confirm-dialog__btn-cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className={`confirm-dialog__btn-confirm${destructive ? ' confirm-dialog__btn-confirm--destructive' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </IonModal>
  );
};

export default ConfirmDialog;
