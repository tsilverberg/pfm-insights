import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Toast from '../components/shared/Toast';
import { useHaptics } from './useHaptics';
import '../components/shared/Toast.css';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const MAX_TOASTS = 3;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const haptics = useHaptics();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const timeoutMap = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const map = timeoutMap.current;
    return () => { map.forEach(t => clearTimeout(t)); map.clear(); };
  }, []);

  const dismissToast = useCallback((id: string) => {
    const existingTimer = timeoutMap.current.get(id);
    if (existingTimer) clearTimeout(existingTimer);
    timeoutMap.current.delete(id);

    setExitingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      setExitingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = Date.now().toString(36);
      const duration = toast.duration ?? 3000;
      const newToast: ToastMessage = { ...toast, id, duration };

      // Fire haptic based on toast type
      const hapticMap = { success: haptics.success, error: haptics.error, warning: haptics.warning, info: haptics.light };
      hapticMap[toast.type]();

      setToasts((prev) => {
        const next = [...prev, newToast];
        if (next.length > MAX_TOASTS) {
          const oldest = next[0];
          dismissToast(oldest.id);
        }
        return next;
      });

      const timerId = setTimeout(() => {
        dismissToast(id);
      }, duration);
      timeoutMap.current.set(id, timerId);
    },
    [dismissToast, haptics]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={dismissToast}
            exiting={exitingIds.has(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
