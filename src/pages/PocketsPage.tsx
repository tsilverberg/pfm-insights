import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ScreenHeader from '../components/shared/ScreenHeader';
import PocketGoalCard from '../components/shared/PocketGoalCard';
import BottomSheet from '../components/shared/BottomSheet';
import { useToast } from '../hooks/useToast';
import { pocketsListData } from '../data/mockData';
import './PocketsPage.css';

const PocketsPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState<string | null>(null);

  return (
    <IonPage>
      <ScreenHeader title="Pockets" onBackAction={() => history.push('/home')} rightLabel="New pocket" rightVariant="pill" onRightAction={() => showToast({ type: 'info', message: 'Pocket creator coming soon' })} />
      <IonContent className="page-content">
        <div className="pockets-page">
          <div className="pockets-page__list">
            {pocketsListData.map((pocket) => (
              <PocketGoalCard
                key={pocket.id}
                pocket={pocket}
                onClick={() => { setSelectedPocket(pocket.id); setSheetOpen(true); }}
              />
            ))}

            {/* Virtual card note */}
            <div className="pockets-page__virtual-note">
              <span className="pockets-page__virtual-note-text">
                1 virtual card added
              </span>
              <div className="pockets-page__virtual-note-icon">
                <svg width="20" height="12" viewBox="0 0 32 20">
                  <circle cx="11" cy="10" r="9" fill="#EB001B" opacity="0.8" />
                  <circle cx="21" cy="10" r="9" fill="#F79E1B" opacity="0.8" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bottom-spacer" />
        </div>
      </IonContent>

      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Add money">
        <div style={{ padding: '8px 0 16px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="typo-footnote" style={{ color: 'var(--pfm-text-secondary)', marginBottom: 4 }}>
              {pocketsListData.find(p => p.id === selectedPocket)?.name}
            </div>
            <div className="typo-title3-semibold" style={{ color: 'var(--pfm-text-primary)' }}>
              How much would you like to add?
            </div>
          </div>
          {[25, 50, 100, 250].map((amount) => (
            <button
              key={amount}
              className="btn-raised"
              style={{ marginBottom: 8 }}
              onClick={() => setSheetOpen(false)}
            >
              €{amount}
            </button>
          ))}
          <button
            className="btn-outline"
            style={{ width: '100%', marginTop: 8 }}
            onClick={() => setSheetOpen(false)}
          >
            Custom amount
          </button>
        </div>
      </BottomSheet>
    </IonPage>
  );
};

export default PocketsPage;
