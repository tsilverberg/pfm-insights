import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import SettingsMenuItem from '../components/shared/SettingsMenuItem';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import ThemeSelectorSheet from '../components/shared/ThemeSelectorSheet';
import { profileData, pocketsListData } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { useTheme } from '../hooks/useTheme';
import { useRhythm } from '../hooks/useRhythm';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const { theme } = useTheme();
  const { setRhythmTarget, setPriorities } = useRhythm();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showThemeSheet, setShowThemeSheet] = useState(false);

  const sections = [
    {
      title: 'Details',
      items: [
        { icon: 'person', title: 'Personal details', description: 'Manage your personal information', iconBg: 'var(--pfm-neutral-100)' },
        { icon: 'security', title: 'Security & login', description: 'Biometrics, password, trusted devices', iconBg: 'var(--pfm-palette-blue-extra-soft)' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'palette', title: 'Bank theme', description: theme.bankName, iconBg: 'var(--pfm-palette-blue-extra-soft)' },
        { icon: 'notifications', title: 'Notifications', description: 'Control how and when we notify you', iconBg: 'var(--pfm-category-pink-bg)' },
        { icon: 'dashboard', title: 'Dashboard view', description: 'Switch to dashboard layout', iconBg: 'var(--pfm-category-turquoise-bg)' },
      ],
    },
    {
      title: 'Connections',
      items: [
        { icon: 'devices', title: 'Connected services / devices', description: 'Manage integrations and devices', iconBg: 'var(--pfm-category-turquoise-bg)' },
      ],
    },
    {
      title: 'Support & legal',
      items: [
        { icon: 'help', title: 'Help & support', description: 'Get help or contact support', iconBg: '#e2f5ec' },
        { icon: 'gavel', title: 'Legal & privacy', description: 'Terms, privacy, data usage', iconBg: '#e2f5ec' },
      ],
    },
  ];

  return (
    <IonPage>
      <IonContent className="page-content">
        {/* Dark header area */}
        <div className="profile-hero">
          <button className="profile-hero__back" onClick={() => history.goBack()} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 7.41 12" fill="white">
              <path d="M7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z" />
            </svg>
          </button>
          <div className="profile-hero__avatar-wrap">
            <img src={profileData.avatarUrl} alt="Profile" className="profile-hero__avatar" />
            <button className="profile-hero__edit" onClick={() => showToast({ type: 'info', message: 'Photo picker coming soon' })} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="Edit profile photo">
              <svg width="14" height="14" viewBox="0 0 12.0017 12" fill="var(--pfm-text-primary)">
                <path d="M7.37333 4.01333L7.98667 4.62667L1.94667 10.6667H1.33333V10.0533L7.37333 4.01333ZM9.77333 0C9.60667 0 9.43333 0.0666666 9.30667 0.193333L8.08667 1.41333L10.5867 3.91333L11.8067 2.69333C12.0667 2.43333 12.0667 2.01333 11.8067 1.75333L10.2467 0.193333C10.1133 0.06 9.94667 0 9.77333 0ZM7.37333 2.12667L0 9.5V12H2.5L9.87333 4.62667L7.37333 2.12667Z" />
              </svg>
            </button>
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
                  onClick={() => {
                    if (item.title === 'Bank theme') {
                      setShowThemeSheet(true);
                    } else if (item.title === 'Dashboard view') {
                      history.push('/dashboard');
                    } else {
                      showToast({ type: 'info', message: `${item.title} coming soon` });
                    }
                  }}
                />
              ))}
            </div>
          ))}

          {/* Log out */}
          <button className="profile-logout" onClick={() => setShowLogoutConfirm(true)}>Log out</button>

          {/* Reset demo */}
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--pfm-divider-default)' }}>
            <div className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)', marginBottom: 8, fontWeight: 600 }}>
              Demo
            </div>
            <button
              className="profile-reset-demo"
              onClick={() => setShowResetConfirm(true)}
            >
              Reset demo
            </button>
          </div>
        </div>

        <div className="bottom-spacer" />

        <ThemeSelectorSheet isOpen={showThemeSheet} onClose={() => setShowThemeSheet(false)} />

        <ConfirmDialog
          isOpen={showLogoutConfirm}
          title="Log out"
          message="Are you sure you want to log out?"
          confirmLabel="Log out"
          cancelLabel="Cancel"
          destructive={true}
          onConfirm={() => {
            setShowLogoutConfirm(false);
            showToast({ type: 'success', message: 'Logged out successfully' });
            history.push('/home');
          }}
          onCancel={() => setShowLogoutConfirm(false)}
        />

        <ConfirmDialog
          isOpen={showResetConfirm}
          title="Reset demo"
          message="This will clear your rhythm targets and reset priorities to the default demo state."
          confirmLabel="Reset"
          cancelLabel="Cancel"
          onConfirm={() => {
            setShowResetConfirm(false);
            setRhythmTarget(null);
            const resetPriorities = [...pocketsListData];
            setPriorities(resetPriorities);
            try {
              localStorage.setItem('pfm-priorities', JSON.stringify(resetPriorities));
            } catch { /* ignore */ }
            showToast({ type: 'success', message: 'Demo reset successfully' });
            history.push('/insights?tab=plan');
          }}
          onCancel={() => setShowResetConfirm(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
