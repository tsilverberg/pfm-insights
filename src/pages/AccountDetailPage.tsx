import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import AccountBalanceCard from '../components/shared/AccountBalanceCard';
import DetailRow from '../components/shared/DetailRow';
import SearchBar from '../components/shared/SearchBar';
import TransactionList from '../components/shared/TransactionList';
import EditPermissionsSheet from '../components/shared/EditPermissionsSheet';
import { accountDetailsData, accountTransactionsData } from '../data/mockData';
import type { TransactionGroup } from '../data/types';

const GearIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="var(--pfm-text-secondary)" />
  </svg>
);

const AccountDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const account = accountDetailsData.find((a) => a.id === id) || accountDetailsData[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [showPermissions, setShowPermissions] = useState(false);

  const filteredGroups: TransactionGroup[] = searchQuery
    ? accountTransactionsData
        .map((g) => ({
          ...g,
          transactions: g.transactions.filter(
            (tx) =>
              tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              tx.category.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((g) => g.transactions.length > 0)
    : accountTransactionsData;

  return (
    <IonPage>
      <ScreenHeader
        title="Account"
        onBackAction={() => history.goBack()}
        rightIcon={GearIcon}
        onRightAction={() => history.push(`/account/${id}/settings`)}
      />
      <IonContent className="page-content">
        <div>

          {/* Balance */}
          <div className="section-module" style={{ textAlign: 'center' }}>
            <AccountBalanceCard account={account} />
          </div>

          {/* Account Details */}
          <div className="section-module">
            <div className="card-bordered">
              <DetailRow label="IBAN" value={account.iban || 'NL60 BASE 9832 7482 33'} />
              <DetailRow label="BIC" value={account.bic || 'BASENL6B'} />
              <DetailRow
                label="Shared access"
                value="No one"
                hasChevron
                onClick={() => setShowPermissions(true)}
              />
            </div>
          </div>

          {/* Search & Transactions */}
          <div className="section-module" style={{ borderBottom: 'none' }}>
            <div style={{ marginBottom: 16 }}>
              <SearchBar placeholder="Search" onSearch={setSearchQuery} />
            </div>
            <TransactionList groups={filteredGroups} />
          </div>

          <div className="bottom-spacer" />
        </div>

        <EditPermissionsSheet isOpen={showPermissions} onClose={() => setShowPermissions(false)} />
      </IonContent>
    </IonPage>
  );
};

export default AccountDetailPage;
