import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import ToggleRow from '../components/shared/ToggleRow';
import { defaultSharingPermissions, relationshipTypes } from '../data/mockData';
import type { SharingPermissionConfig } from '../data/types';
import './SelectPermissionsPage.css';

const SelectPermissionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contactName = decodeURIComponent(params.get('contactName') || '');
  const contactId = params.get('contactId') || '';

  const [relationship, setRelationship] = useState('');
  const [showRelDropdown, setShowRelDropdown] = useState(false);
  const [permissions, setPermissions] = useState<SharingPermissionConfig[]>(defaultSharingPermissions);
  const [spendingMode, setSpendingMode] = useState<'full' | 'limit'>('limit');
  const [spendingAmount, setSpendingAmount] = useState(250);

  const [accessLevel, setAccessLevel] = useState<'view' | 'full'>('full');

  const handleToggle = (permId: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === permId ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const permissionsAsPermType = permissions.map((p) => ({
    id: p.id,
    icon: p.icon,
    title: p.title,
    description: p.description,
    enabled: p.enabled,
    subOptions: p.hasSpendingLimit
      ? [
          { label: 'Allow full spending', selected: spendingMode === 'full' },
          { label: 'Limit spending', selected: spendingMode === 'limit' },
        ]
      : undefined,
  }));

  const handleSubOptionChange = (_permId: string, optionLabel: string) => {
    setSpendingMode(optionLabel === 'Allow full spending' ? 'full' : 'limit');
  };

  const canContinue = relationship.length > 0;

  const handleContinue = () => {
    const enabledPerms = permissions.filter((p) => p.enabled).map((p) => ({
      title: p.title,
      detail: p.hasSpendingLimit && p.enabled
        ? (spendingMode === 'limit' ? `€${spendingAmount}/ Per day` : 'Full access')
        : 'On',
    }));

    history.push(`/account/${id}/share/review?contactId=${contactId}&contactName=${encodeURIComponent(contactName)}&relationship=${encodeURIComponent(relationship)}&permissions=${encodeURIComponent(JSON.stringify(enabledPerms))}`);
  };

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="select-perms">
          <div className="select-perms__header">
            <button className="select-perms__close" onClick={() => history.goBack()} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="var(--pfm-text-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <h1 className="select-perms__title">Select permissions</h1>
            <div style={{ width: 24 }} />
          </div>

          {/* Relationship Section */}
          <div className="select-perms__section">
            <p className="select-perms__question">How is {contactName} related to you?</p>
            <div className="select-perms__dropdown-wrapper">
              <button
                className="select-perms__dropdown"
                onClick={() => setShowRelDropdown(!showRelDropdown)}
              >
                <span className={relationship ? '' : 'select-perms__placeholder'}>
                  {relationship || 'Relationship type'}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="var(--pfm-text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {showRelDropdown && (
                <div className="select-perms__dropdown-menu">
                  {relationshipTypes.map((type) => (
                    <button
                      key={type}
                      className={`select-perms__dropdown-item ${relationship === type ? 'select-perms__dropdown-item--selected' : ''}`}
                      onClick={() => { setRelationship(type); setShowRelDropdown(false); }}
                    >
                      <div className={`select-perms__radio ${relationship === type ? 'select-perms__radio--selected' : ''}`} />
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Access Level Section */}
          {relationship && (
            <div className="select-perms__section">
              <p className="select-perms__question-sm">
                Select how your {contactName} can access the account(s) in their app
              </p>

              <button
                className="select-perms__access-option"
                onClick={() => setAccessLevel('view')}
              >
                <div className={`select-perms__radio ${accessLevel === 'view' ? 'select-perms__radio--selected' : ''}`} />
                <div>
                  <div className="select-perms__access-title">View transactions and balances</div>
                  <div className="select-perms__access-desc">They will see the account in Accounts list and Insights</div>
                </div>
              </button>

              <button
                className="select-perms__access-option"
                onClick={() => setAccessLevel('full')}
              >
                <div className={`select-perms__radio ${accessLevel === 'full' ? 'select-perms__radio--selected' : ''}`} />
                <div>
                  <div className="select-perms__access-title">Full access</div>
                  <div className="select-perms__access-desc">They can view the account and make transfers using it</div>
                </div>
              </button>
            </div>
          )}

          {/* Detailed Permissions (when full access) */}
          {relationship && accessLevel === 'full' && (
            <div className="select-perms__section select-perms__toggles">
              {permissionsAsPermType.map((perm) => (
                <React.Fragment key={perm.id}>
                  <ToggleRow
                    permission={perm}
                    onToggle={handleToggle}
                    onSubOptionChange={handleSubOptionChange}
                  />
                  {perm.id === 'sp-2' && permissions.find(p => p.id === 'sp-2')?.enabled && spendingMode === 'limit' && (
                    <div className="select-perms__limit-input">
                      <label className="select-perms__limit-label">Amount</label>
                      <div className="select-perms__limit-field">
                        <input
                          type="text"
                          value={`€${spendingAmount.toFixed(2)}`}
                          onChange={(e) => {
                            const num = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                            if (!isNaN(num)) setSpendingAmount(num);
                          }}
                          className="select-perms__limit-value"
                        />
                      </div>
                      <span className="select-perms__limit-period">Per day</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="select-perms__footer">
            <button
              className="select-perms__continue-btn"
              disabled={!canContinue}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectPermissionsPage;
