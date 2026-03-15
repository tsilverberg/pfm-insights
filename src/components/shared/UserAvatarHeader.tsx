import React from 'react';
import { useHistory } from 'react-router-dom';
import CoachIcon from './CoachIcon';
import { useToast } from '../../hooks/useToast';
import './UserAvatarHeader.css';

interface UserAvatarHeaderProps {
  avatarUrl?: string;
}

const UserAvatarHeader: React.FC<UserAvatarHeaderProps> = ({ avatarUrl }) => {
  const history = useHistory();
  const { showToast } = useToast();

  return (
    <div className="user-header">
      <button className="user-header__avatar-btn" onClick={() => history.push('/profile')}>
        <img
          src={avatarUrl || '/assets/icons/avatar-user.png'}
          alt="Profile"
          className="user-header__avatar"
        />
      </button>
      <div className="user-header__actions">
        <button className="user-header__icon-btn" aria-label="Notifications" onClick={() => history.push('/notifications')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--pfm-text-primary)">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>
        <button className="user-header__icon-btn" aria-label="Cards" onClick={() => history.push('/cards')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--pfm-text-primary)">
            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        </button>
        <button className="user-header__icon-btn" aria-label="Coach" onClick={() => showToast({ type: 'info', message: 'Coach coming soon' })}>
          <CoachIcon size={24} />
        </button>
      </div>
    </div>
  );
};

export default UserAvatarHeader;
