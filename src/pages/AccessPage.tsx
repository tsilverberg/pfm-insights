import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import { sharingCurrentMembers } from '../data/mockData';
import './AccessPage.css';

const AccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="access-page">
          <ScreenHeader title="Access" />

          <div className="access-page__section">
            <div className="access-page__section-label">Owner</div>
            {sharingCurrentMembers.map((member) => (
              <div key={member.id} className="access-page__member">
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt={member.name} className="access-page__avatar" />
                ) : (
                  <div className="access-page__avatar--placeholder">{member.initials}</div>
                )}
                <span className="access-page__member-name">{member.name}</span>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <div className="access-page__footer">
            <button
              className="access-page__share-btn"
              onClick={() => history.push(`/account/${id}/share`)}
            >
              + Share access
            </button>
          </div>

          <div style={{ height: 32 }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AccessPage;
