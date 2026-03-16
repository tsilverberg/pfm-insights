import React from 'react';
import { IonContent, IonFooter, IonPage, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import { sharingCurrentMembers } from '../data/mockData';
import './AccessPage.css';

const AccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  return (
    <IonPage>
      <ScreenHeader title="Access" onBackAction={() => history.goBack()} />
      <IonContent className="page-content">
        <div className="access-page">

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

        </div>
      </IonContent>
      <IonFooter translucent className="access-page__footer-ionic">
        <IonToolbar>
          <div className="access-page__footer">
            <button
              className="access-page__share-btn"
              onClick={() => history.push(`/account/${id}/share`)}
            >
              + Share access
            </button>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default AccessPage;
