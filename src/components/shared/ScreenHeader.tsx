import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './ScreenHeader.css';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightLabel?: string;
  rightVariant?: 'text' | 'pill';
  onRightAction?: () => void;
  showBack?: boolean;
  rightIcon?: React.ReactNode;
  closeButton?: boolean;
  onBackAction?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  rightLabel,
  rightVariant = 'text',
  onRightAction,
  showBack = true,
  rightIcon,
  closeButton = false,
  onBackAction,
}) => {
  const history = useHistory();

  return (
    <IonHeader translucent className="screen-header-ionic">
      <IonToolbar>
        <IonButtons slot="start">
          {closeButton ? (
            <IonButton onClick={onBackAction || (() => history.goBack())} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="var(--pfm-text-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </IonButton>
          ) : showBack && onBackAction ? (
            <IonButton onClick={onBackAction} aria-label="Back" className="screen-header__back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="var(--pfm-text-primary)" />
              </svg>
            </IonButton>
          ) : showBack ? (
            <IonBackButton defaultHref="/" text="" className="screen-header__back-btn" />
          ) : null}
        </IonButtons>
        <IonTitle>
          {title}
          {subtitle && <div className="screen-header__subtitle">{subtitle}</div>}
        </IonTitle>
        <IonButtons slot="end">
          {rightLabel ? (
            <IonButton
              className={rightVariant === 'pill' ? 'screen-header__right-pill' : 'screen-header__right-text'}
              onClick={onRightAction}
            >
              {rightLabel}
            </IonButton>
          ) : rightIcon ? (
            <IonButton onClick={onRightAction}>
              {rightIcon}
            </IonButton>
          ) : null}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default ScreenHeader;
