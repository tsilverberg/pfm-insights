import React, { useState, useMemo } from 'react';
import { IonContent, IonFooter, IonPage, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import { sharingContacts } from '../data/mockData';
import './ShareAccessPage.css';

const ShareAccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const recents = sharingContacts.slice(0, 1);
  const addressBook = sharingContacts.slice(1);

  const filteredAddressBook = useMemo(() => {
    if (!search) return addressBook;
    const q = search.toLowerCase();
    return addressBook.filter((c) => c.name.toLowerCase().includes(q));
  }, [search, addressBook]);

  const handleContinue = () => {
    if (!selectedId) return;
    const contact = sharingContacts.find((c) => c.id === selectedId);
    if (contact) {
      history.push(`/account/${id}/share/permissions?contactId=${contact.id}&contactName=${encodeURIComponent(contact.name)}`);
    }
  };

  return (
    <IonPage>
      <ScreenHeader title="Shared access" closeButton onBackAction={() => history.push(`/account/${id}/access`)} />
      <IonContent className="page-content">
        <div className="share-access">

          <div className="share-access__search">
            <input
              type="text"
              placeholder="To: phone or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="share-access__search-input"
            />
          </div>

          {!search && recents.length > 0 && (
            <div className="share-access__section">
              <div className="share-access__section-label">Recents</div>
              {recents.map((contact) => (
                <button
                  key={contact.id}
                  className={`share-access__contact ${selectedId === contact.id ? 'share-access__contact--selected' : ''}`}
                  onClick={() => setSelectedId(selectedId === contact.id ? null : contact.id)}
                >
                  {contact.avatarUrl ? (
                    <img src={contact.avatarUrl} alt={contact.name} className="share-access__avatar" />
                  ) : (
                    <div className="share-access__avatar--placeholder">{contact.initials}</div>
                  )}
                  <div className="share-access__contact-info">
                    <span className="share-access__contact-name">{contact.name}</span>
                    {contact.subtitle && <span className="share-access__contact-sub">{contact.subtitle}</span>}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="share-access__section">
            <div className="share-access__section-label">Address book</div>
            {filteredAddressBook.map((contact) => (
              <button
                key={contact.id}
                className={`share-access__contact ${selectedId === contact.id ? 'share-access__contact--selected' : ''}`}
                onClick={() => setSelectedId(selectedId === contact.id ? null : contact.id)}
              >
                {contact.avatarUrl ? (
                  <img src={contact.avatarUrl} alt={contact.name} className="share-access__avatar" />
                ) : (
                  <div className="share-access__avatar--placeholder">{contact.initials}</div>
                )}
                <div className="share-access__contact-info">
                  <span className="share-access__contact-name">{contact.name}</span>
                  {contact.subtitle && <span className="share-access__contact-sub">{contact.subtitle}</span>}
                </div>
              </button>
            ))}
          </div>

        </div>
      </IonContent>
      <IonFooter translucent className="share-access__footer-ionic">
        <IonToolbar>
          <div className="share-access__footer">
            <button
              className="share-access__continue-btn"
              disabled={!selectedId}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ShareAccessPage;
