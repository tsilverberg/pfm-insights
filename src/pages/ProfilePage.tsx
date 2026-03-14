import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import SettingsMenuItem from '../components/shared/SettingsMenuItem';
import { profileData } from '../data/mockData';
import './ProfilePage.css';

const sections = [
  {
    title: 'Details',
    items: [
      { icon: 'person', title: 'Personal details', description: 'Manage your personal information', iconBg: '#ebf0f5' },
      { icon: 'shield', title: 'Security & login', description: 'Biometrics, password, trusted devices', iconBg: '#dfe7ff' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'palette', title: 'App preferences', description: 'Language, appearance, accessibility', iconBg: '#fce7f2' },
      { icon: 'notifications', title: 'Notifications', description: 'Control how and when we notify you', iconBg: '#fce7f2' },
    ],
  },
  {
    title: 'Connections',
    items: [
      { icon: 'connected', title: 'Connected services / devices', description: 'Manage integrations and devices', iconBg: '#ddf8f8' },
    ],
  },
  {
    title: 'Support & legal',
    items: [
      { icon: 'help', title: 'Help & support', description: 'Get help or contact support', iconBg: '#e2f5ec' },
      { icon: 'legal', title: 'Legal & privacy', description: 'Terms, privacy, data usage', iconBg: '#e2f5ec' },
    ],
  },
];

const ProfilePage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="page-content">
        {/* Dark header area */}
        <div className="profile-hero">
          <button className="profile-hero__back" onClick={() => history.goBack()}>
            <svg width="24" height="24" viewBox="0 0 7.41 12" fill="white">
              <path d="M7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z" />
            </svg>
          </button>
          <div className="profile-hero__avatar-wrap">
            <img src={profileData.avatarUrl} alt="Profile" className="profile-hero__avatar" />
            <div className="profile-hero__edit">
              <svg width="14" height="14" viewBox="0 0 12.0017 12" fill="var(--pfm-text-primary)">
                <path d="M7.37333 4.01333L7.98667 4.62667L1.94667 10.6667H1.33333V10.0533L7.37333 4.01333ZM9.77333 0C9.60667 0 9.43333 0.0666666 9.30667 0.193333L8.08667 1.41333L10.5867 3.91333L11.8067 2.69333C12.0667 2.43333 12.0667 2.01333 11.8067 1.75333L10.2467 0.193333C10.1133 0.06 9.94667 0 9.77333 0ZM7.37333 2.12667L0 9.5V12H2.5L9.87333 4.62667L7.37333 2.12667Z" />
              </svg>
            </div>
          </div>
          <div className="profile-hero__name">{profileData.name.replace('S.', 'Wallace')}</div>
        </div>

        {/* Settings sections */}
        <div style={{ padding: '0 var(--pfm-page-padding)' }}>
          {sections.map((section) => (
            <div key={section.title} style={{ marginBottom: 8 }}>
              <div className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)', padding: '16px 0 4px', fontWeight: 600 }}>
                {section.title}
              </div>
              {section.items.map((item) => (
                <SettingsMenuItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  iconBg={item.iconBg}
                />
              ))}
            </div>
          ))}

          {/* Log out */}
          <button className="profile-logout">Log out</button>
        </div>

        <div style={{ height: 120 }} />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
