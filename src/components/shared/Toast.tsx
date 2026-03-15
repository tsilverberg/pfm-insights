import React from 'react';
import type { ToastMessage } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
  exiting?: boolean;
}

const ICON_MAP: Record<ToastMessage['type'], string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

const COLOR_MAP: Record<ToastMessage['type'], string> = {
  success: 'var(--pfm-status-success)',
  error: 'var(--pfm-status-error)',
  warning: 'var(--pfm-status-warning)',
  info: 'var(--pfm-action-primary-bg)',
};

function Toast({ toast, onDismiss, exiting }: ToastProps) {
  const iconName = ICON_MAP[toast.type];
  const iconColor = COLOR_MAP[toast.type];

  const className = [
    'toast',
    exiting ? 'toast--exiting' : 'toast--entering',
  ].join(' ');

  return (
    <div className={className} role="alert" aria-live="assertive">
      <span
        className="material-symbols-rounded toast__icon"
        style={{ color: iconColor, fontSize: 24 }}
      >
        {iconName}
      </span>
      <span className="toast__message">{toast.message}</span>
      {toast.action && (
        <button className="toast__action" onClick={toast.action.onClick}>
          {toast.action.label}
        </button>
      )}
      <button className="toast__close" onClick={() => onDismiss(toast.id)}>
        <span className="material-symbols-rounded" style={{ fontSize: 24 }}>
          close
        </span>
      </button>
    </div>
  );
}

export default Toast;
