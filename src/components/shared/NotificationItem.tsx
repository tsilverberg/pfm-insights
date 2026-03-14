import React from 'react';
import type { Notification } from '../../data/types';
import './NotificationItem.css';

interface NotificationItemProps {
  notification: Notification;
}

const iconSvgs: Record<string, React.ReactNode> = {
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  coach: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => (
  <div className="notification-item">
    <div className="notification-item__icon-wrap">
      <div className={`notification-item__icon notification-item__icon--${notification.type}`}>
        {iconSvgs[notification.type]}
      </div>
      {!notification.read && <div className="notification-item__dot" />}
    </div>
    <div className="notification-item__text">
      <div className="notification-item__title">{notification.title}</div>
      <div className="notification-item__desc">{notification.description}</div>
    </div>
  </div>
);

export default NotificationItem;
