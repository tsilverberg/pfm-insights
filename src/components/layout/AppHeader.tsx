import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import './AppHeader.css';

interface AppHeaderAction {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface AppHeaderProps {
  title?: string;
  actions?: AppHeaderAction[];
}

const AppHeader: React.FC<AppHeaderProps> = ({ title = 'Insights', actions }) => {
  return (
    <IonHeader translucent className="app-header-ionic">
      <IonToolbar>
        <IonTitle><h1 className="app-header__h1">{title}</h1></IonTitle>
        {actions && actions.length > 0 && (
          <IonButtons slot="end">
            {actions.map((action) => (
              <IonButton key={action.label} onClick={action.onClick} aria-label={action.label}>
                {action.icon}
              </IonButton>
            ))}
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
