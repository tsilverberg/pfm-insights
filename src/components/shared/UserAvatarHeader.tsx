import React from 'react';
import { useHistory } from 'react-router-dom';
import './UserAvatarHeader.css';

interface UserAvatarHeaderProps {
  avatarUrl?: string;
}

const UserAvatarHeader: React.FC<UserAvatarHeaderProps> = ({ avatarUrl }) => {
  const history = useHistory();

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
        <button className="user-header__icon-btn" aria-label="Cards" onClick={() => history.push('/cards')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--pfm-text-primary)">
            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        </button>
        <button className="user-header__icon-btn" aria-label="Coach">
          <svg width="24" height="26" viewBox="0 0 22.02 25.99" fill="var(--pfm-text-primary)">
            <path d="M21.6 6.69c-.77-1.5-2.52-2.23-4.78-2.23-.38 0-.77.02-1.17.07C14.53 1.76 12.86 0 11 0S7.48 1.76 6.36 4.53c-.4-.05-.79-.07-1.17-.07C2.93 4.46 1.18 5.19.41 6.69c-.87 1.68-.31 3.99 1.26 5.31C.1 14.31-.45 16.62.42 18.3c.77 1.49 2.52 2.23 4.78 2.23.38 0 .77-.02 1.17-.07 1.12 2.77 2.79 4.53 4.64 4.53s3.52-1.76 4.64-4.53c.4.05.79.07 1.17.07 2.25 0 4-1 4.77-2.23.87-1.68.31-3.99-1.26-5.31 1.58-2.32 2.13-4.63 1.26-6.31z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserAvatarHeader;
