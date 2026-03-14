import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ScreenHeader from '../components/shared/ScreenHeader';
import SettingsMenuItem from '../components/shared/SettingsMenuItem';
import { accountSettingsSections } from '../data/mockData';
import './AccountSettingsPage.css';

const AccountSettingsPage: React.FC = () => {
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
                />
              ))}
            </div>
          ))}

          <div className="account-settings__footer">
            <button className="account-settings__close-btn">Close bank account</button>
          </div>

          <div style={{ height: 120 }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccountSettingsPage;
