import React, { useState } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import CoachIcon from '../components/shared/CoachIcon';
import SubNavTabs, { SubTab } from '../components/layout/SubNavTabs';
import OverviewTab from './tabs/OverviewTab';
import MonthlyGoalsTab from './tabs/MonthlyGoalsTab';
import MyPathTab from './tabs/MyPathTab';
import { useToast } from '../hooks/useToast';

const InsightsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('overview');
  const history = useHistory();
  const { showToast } = useToast();

  const headerActions = [
    { label: 'Cards', icon: <span className="material-symbols-rounded" style={{ fontSize: 22 }}>credit_card</span>, onClick: () => history.push('/cards') },
    { label: 'Coach', icon: <CoachIcon size={22} />, onClick: () => showToast({ type: 'info', message: 'Coach coming soon' }) },
  ];

  return (
    <IonPage>
      <AppHeader actions={headerActions} />
      <IonContent className="page-content" fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={(e) => setTimeout(() => e.detail.complete(), 800)}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="insights-sub-nav-sticky">
          <SubNavTabs active={activeTab} onChange={setActiveTab} />
        </div>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'goals' && <MonthlyGoalsTab />}
        {activeTab === 'path' && <MyPathTab />}
      </IonContent>
    </IonPage>
  );
};

export default InsightsPage;
