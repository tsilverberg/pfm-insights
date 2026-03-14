import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AppHeader from '../components/layout/AppHeader';
import SubNavTabs, { SubTab } from '../components/layout/SubNavTabs';
import OverviewTab from './tabs/OverviewTab';
import MonthlyGoalsTab from './tabs/MonthlyGoalsTab';
import MyPathTab from './tabs/MyPathTab';

const InsightsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('overview');

  return (
    <IonPage>
      <AppHeader />
      <IonContent className="page-content" fullscreen>
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
