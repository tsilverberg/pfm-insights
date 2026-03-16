import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import InsightsPage from './pages/InsightsPage';
import HomePage from './pages/HomePage';
import InvestPage from './pages/InvestPage';
import ExplorePage from './pages/ExplorePage';
import DashboardPage from './pages/DashboardPage';
import CardsPage from './pages/CardsPage';
import CardPointsPage from './pages/CardPointsPage';
import AccountDetailPage from './pages/AccountDetailPage';
import ProfilePage from './pages/ProfilePage';
import PocketsPage from './pages/PocketsPage';
import SendMoneyPage from './pages/SendMoneyPage';
import RequestMoneyPage from './pages/RequestMoneyPage';
import QRScannerPage from './pages/QRScannerPage';
import AccountSelectorPage from './pages/AccountSelectorPage';
import MoreActionsPage from './pages/MoreActionsPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import TransferPage from './pages/TransferPage';
import ChildAccountPage from './pages/ChildAccountPage';
import AccessPage from './pages/AccessPage';
import TransactionSearchPage from './pages/TransactionSearchPage';
import ShareAccessPage from './pages/ShareAccessPage';
import SelectPermissionsPage from './pages/SelectPermissionsPage';
import ReviewSummaryPage from './pages/ReviewSummaryPage';
import NwgDetailPage from './pages/NwgDetailPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import HealthOverviewPage from './pages/HealthOverviewPage';
import PillarDetailPage from './pages/PillarDetailPage';
import FloatingTabBar from './components/layout/FloatingTabBar';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { ToastProvider } from './hooks/useToast';
import { ThemeProvider } from './hooks/useTheme';
import { RhythmProvider } from './hooks/useRhythm';
import { DisplayModeProvider } from './hooks/useDisplayMode';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme */
import './theme/tokens.css';
import './theme/typography.css';
import './theme/variables.css';
import './theme/global.css';
import './theme/components.css';
import './theme/interactions.css';
import './theme/scroll-reveal.css';
import './theme/themes/danske-bank.css';
import './theme/themes/everbank.css';
import './theme/themes/td-bank.css';

setupIonicReact({
  mode: 'ios',
});

const App: React.FC = () => (
  <ErrorBoundary>
  <ThemeProvider>
  <DisplayModeProvider>
  <RhythmProvider>
  <ToastProvider>
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/insights" component={InsightsPage} />
        <Route exact path="/invest" component={InvestPage} />
        <Route exact path="/explore" component={ExplorePage} />
        <Route exact path="/cards" component={CardsPage} />
        <Route exact path="/cards/points" component={CardPointsPage} />
        <Route exact path="/account/:id" component={AccountDetailPage} />
        <Route exact path="/account/:id/more" component={MoreActionsPage} />
        <Route exact path="/account/:id/settings" component={AccountSettingsPage} />
        <Route exact path="/account/:id/access" component={AccessPage} />
        <Route exact path="/account/:id/share" component={ShareAccessPage} />
        <Route exact path="/account/:id/share/permissions" component={SelectPermissionsPage} />
        <Route exact path="/account/:id/share/review" component={ReviewSummaryPage} />
        <Route exact path="/notifications" component={NotificationsPage} />
        <Route exact path="/accounts" component={AccountSelectorPage} />
        <Route exact path="/transfer" component={TransferPage} />
        <Route exact path="/child-account" render={() => <Redirect to="/child-account/child-1" />} />
        <Route exact path="/child-account/:id" component={ChildAccountPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/pockets" component={PocketsPage} />
        <Route exact path="/send" component={SendMoneyPage} />
        <Route exact path="/receive" component={RequestMoneyPage} />
        <Route exact path="/search" component={TransactionSearchPage} />
        <Route exact path="/insights/nwg/:type" component={NwgDetailPage} />
        <Route exact path="/insights/category/:name" component={CategoryDetailPage} />
        <Route exact path="/insights/health" component={HealthOverviewPage} />
        <Route exact path="/insights/health/:pillarId" component={PillarDetailPage} />
        <Route exact path="/qr" component={QRScannerPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      <FloatingTabBar />
    </IonReactRouter>
  </IonApp>
  </ToastProvider>
  </RhythmProvider>
  </DisplayModeProvider>
  </ThemeProvider>
  </ErrorBoundary>
);

export default App;
