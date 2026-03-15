import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ScreenHeader from '../components/shared/ScreenHeader';
import SettingsMenuItem from '../components/shared/SettingsMenuItem';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { accountSettingsSections } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import './AccountSettingsPage.css';

const AccountSettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  return (
    <IonPage>
      <ScreenHeader title="Settings" />
      <IonContent className="page-content">
        <div className="account-settings">

          {accountSettingsSections.map((section) => (
            <div key={section.section} className="account-settings__section">
              <div className="account-settings__section-title">{section.section}</div>
              {section.items.map((item) => (
                <SettingsMenuItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  iconBg={item.iconBg}
                  value={item.value}
                  onClick={() => showToast({ type: 'info', message: 'Setting updated' })}
                />
              ))}
            </div>
          ))}

          <div className="account-settings__footer">
            <button className="account-settings__close-btn" onClick={() => setShowCloseConfirm(true)}>Close bank account</button>
          </div>

          <div className="bottom-spacer" />
        </div>

        <ConfirmDialog
          isOpen={showCloseConfirm}
          title="Close account"
          message="Are you sure you want to close this account? This action cannot be undone. Please contact support to proceed."
          confirmLabel="Contact support"
          cancelLabel="Cancel"
          destructive={true}
          onConfirm={() => {
            setShowCloseConfirm(false);
            showToast({ type: 'success', message: 'Support request submitted' });
          }}
          onCancel={() => setShowCloseConfirm(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default AccountSettingsPage;
