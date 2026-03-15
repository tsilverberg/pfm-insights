import React from 'react';
import type { Notification } from '../../data/types';
import './NotificationItem.css';

interface NotificationItemProps {
  notification: Notification;
}

const typeIcons: Record<string, string> = {
  info: 'info',
  coach: 'auto_awesome',
  warning: 'warning',
  error: 'error',
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => (
  <div className="notification-item">
    <div className="notification-item__icon-wrap">
      <div className={`notification-item__icon notification-item__icon--${notification.type}`}>
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
          {typeIcons[notification.type] || 'info'}
        </span>
      </div>
      {!notification.read && <div className="notification-item__dot" />}
    </div>
    <div className="list-row__text">
      <span className="typo-subhead-semibold">{notification.title}</span>
      <span className="typo-footnote color-secondary mt-2">{notification.description}</span>
    </div>
  </div>
);

export default NotificationItem;
