import React, { useState } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import CoachIcon from '../components/shared/CoachIcon';
import SubNavTabs, { SubTab } from '../components/layout/SubNavTabs';
import OverviewTab from './tabs/OverviewTab';
import SpendTab from './tabs/SpendTab';
import PlanTab from './tabs/PlanTab';
import WealthTab from './tabs/WealthTab';
import CoachSheet from '../components/shared/CoachSheet';

const InsightsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('overview');
  const [coachOpen, setCoachOpen] = useState(false);
  const history = useHistory();

  const headerActions = [
    { label: 'Cards', icon: <span className="material-symbols-rounded" style={{ fontSize: 22 }}>credit_card</span>, onClick: () => history.push('/cards') },
    { label: 'Coach', icon: <CoachIcon size={22} />, onClick: () => setCoachOpen(true) },
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
        {activeTab === 'spend' && <SpendTab />}
        {activeTab === 'plan' && <PlanTab />}
        {activeTab === 'wealth' && <WealthTab />}
      </IonContent>
      <CoachSheet isOpen={coachOpen} onClose={() => setCoachOpen(false)} />
    </IonPage>
  );
};

export default InsightsPage;
