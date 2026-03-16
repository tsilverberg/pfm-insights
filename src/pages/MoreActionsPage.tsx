import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import SettingsMenuItem from '../components/shared/SettingsMenuItem';
import { useToast } from '../hooks/useToast';
import { moreActionsSections } from '../data/mockData';
import './MoreActionsPage.css';

const SearchIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="var(--pfm-text-secondary)" />
  </svg>
);

const MoreActionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { showToast } = useToast();

  return (
    <IonPage>
      <ScreenHeader
        title="More actions"
        rightIcon={SearchIcon}
        onBackAction={() => history.goBack()}
      />
      <IonContent className="page-content">
        <div className="more-actions">

          {moreActionsSections.map((section) => (
            <div key={section.section} className="more-actions__section">
              <div className="more-actions__section-title">{section.section}</div>
              {section.items.map((item) => (
                <SettingsMenuItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  iconBg={item.iconBg}
                  danger={item.danger}
                  onClick={() => {
                    if (item.route) {
                      history.push(item.route);
                    } else if (item.title === 'Account details') {
                      history.replace(`/account/${id}`);
                    } else if (item.title === 'Account settings') {
                      history.push(`/account/${id}/settings`);
                    } else if (item.title === 'Sharing & permissions') {
                      history.push(`/account/${id}/access`);
                    } else {
                      showToast({ type: 'info', message: `${item.title} coming soon` });
                    }
                  }}
                />
              ))}
            </div>
          ))}

          <div className="bottom-spacer" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MoreActionsPage;
