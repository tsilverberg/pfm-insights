import React from 'react';
import { IonModal } from '@ionic/react';
import { THEMES, ThemeId, useTheme } from '../../hooks/useTheme';
import './ThemeSelectorSheet.css';

interface ThemeSelectorSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSelectorSheet: React.FC<ThemeSelectorSheetProps> = ({ isOpen, onClose }) => {
  const { theme: activeTheme, setTheme } = useTheme();

  const handleSelect = (id: ThemeId) => {
    setTheme(id);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="theme-selector-modal" initialBreakpoint={0.55} breakpoints={[0, 0.55]}>
      <div className="theme-selector">
        <div className="theme-selector__header">
          <h3 className="theme-selector__title">Choose theme</h3>
          <p className="theme-selector__subtitle">Preview how your bank would brand this app</p>
        </div>
        <div className="theme-selector__list">
          {THEMES.map((t) => {
            const isActive = t.id === activeTheme.id;
            return (
              <button
                key={t.id}
                className={`theme-selector__item${isActive ? ' theme-selector__item--active' : ''}`}
                onClick={() => handleSelect(t.id)}
              >
                <div className="theme-selector__swatch" style={{ background: t.primaryColor }} />
                <div className="theme-selector__info">
                  <span className="theme-selector__name">{t.bankName}</span>
                  <span className="theme-selector__font">
                    {t.id === 'default' ? 'Lato' : t.id === 'danske-bank' ? 'Source Sans 3' : t.id === 'everbank' ? 'Inter' : 'Nunito Sans'}
                  </span>
                </div>
                {isActive && (
                  <span className="material-symbols-rounded theme-selector__check">check_circle</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </IonModal>
  );
};

export default ThemeSelectorSheet;
