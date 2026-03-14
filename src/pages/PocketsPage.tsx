import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ScreenHeader from '../components/shared/ScreenHeader';
import PocketGoalCard from '../components/shared/PocketGoalCard';
import BottomSheet from '../components/shared/BottomSheet';
import { pocketsListData } from '../data/mockData';

const PocketsPage: React.FC = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState<string | null>(null);

  return (
    <IonPage>
      <ScreenHeader title="Pockets" rightLabel="New pocket" rightVariant="pill" />
      <IonContent className="page-content">
        <div>

          <div style={{ padding: '0 var(--pfm-page-padding)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pocketsListData.map((pocket) => (
              <PocketGoalCard
                key={pocket.id}
                pocket={pocket}
                onClick={() => { setSelectedPocket(pocket.id); setSheetOpen(true); }}
              />
            ))}

            {/* Virtual card note */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 16,
            }}>
              <span style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 14,
                color: 'var(--pfm-text-secondary)',
              }}>
                1 virtual card added
              </span>
              <div style={{
                width: 40,
                height: 26,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #1A2332 0%, #2E4E78 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="20" height="12" viewBox="0 0 32 20">
                  <circle cx="11" cy="10" r="9" fill="#EB001B" opacity="0.8" />
                  <circle cx="21" cy="10" r="9" fill="#F79E1B" opacity="0.8" />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ height: 120 }} />
        </div>
      </IonContent>

      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Add money">
        <div style={{ padding: '16px 0' }}>
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
              ${amount}
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
