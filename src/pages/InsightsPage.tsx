import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import CoachIcon from '../components/shared/CoachIcon';
import SubNavTabs, { SubTab } from '../components/layout/SubNavTabs';
import OverviewTab from './tabs/OverviewTab';
import SpendTab from './tabs/SpendTab';
import PlanTab from './tabs/PlanTab';
import WealthTab from './tabs/WealthTab';
import CoachSheet from '../components/shared/CoachSheet';

const VALID_TABS: SubTab[] = ['overview', 'spend', 'plan', 'wealth'];

const InsightsPage: React.FC = () => {
  const location = useLocation();
  const tabParam = new URLSearchParams(location.search).get('tab') as SubTab | null;
  const tabFromUrl = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'overview';
  const [activeTab, setActiveTab] = useState<SubTab>(tabFromUrl);

  useEffect(() => {
    const t = new URLSearchParams(location.search).get('tab') as SubTab | null;
    if (t && VALID_TABS.includes(t)) {
      setActiveTab(t);
    }
  }, [location.search]);
  const [coachOpen, setCoachOpen] = useState(false);
  const [coachQuestion, setCoachQuestion] = useState<string | undefined>();
  const history = useHistory();

  const openCoach = (starterText?: string) => {
    setCoachQuestion(starterText);
    setCoachOpen(true);
  };
  const closeCoach = () => {
    setCoachOpen(false);
    setCoachQuestion(undefined);
  };

  const headerActions = [
    { label: 'Cards', icon: <span className="material-symbols-rounded" style={{ fontSize: 22 }}>credit_card</span>, onClick: () => history.push('/cards') },
    { label: 'Coach', icon: <CoachIcon size={22} />, onClick: () => openCoach() },
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
        {activeTab === 'overview' && <OverviewTab onOpenCoach={() => openCoach()} />}
        {activeTab === 'spend' && <SpendTab onOpenCoach={() => openCoach()} />}
        {activeTab === 'plan' && <PlanTab onOpenCoach={() => openCoach()} />}
        {activeTab === 'wealth' && <WealthTab onOpenCoach={openCoach} />}
      </IonContent>
      <CoachSheet isOpen={coachOpen} onClose={closeCoach} context={`/insights?tab=${activeTab}`} initialQuestion={coachQuestion} />
    </IonPage>
  );
};

export default InsightsPage;
