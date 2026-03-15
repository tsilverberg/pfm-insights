import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ScreenHeader from '../components/shared/ScreenHeader';
import TransactionListItem from '../components/shared/TransactionListItem';
import { cardPointsData, creditCardsData } from '../data/mockData';
import CreditCardDisplay from '../components/shared/CreditCardDisplay';

const CardPointsPage: React.FC = () => {
  const card = creditCardsData[0];

  return (
    <IonPage>
      <ScreenHeader title="Card Points" />
      <IonContent className="page-content">
        <div>

          <div className="section-module text-center">
            <div className="mb-24">
              <div className="typo-footnote color-secondary mb-4">Total points</div>
              <div className="typo-large-title">{cardPointsData.total.toLocaleString()}</div>
            </div>
            <div className="flex-center gap-32">
              <div>
                <div className="typo-footnote color-tertiary">Pending</div>
                <div className="typo-callout-semibold">{cardPointsData.pending}</div>
              </div>
              <div>
                <div className="typo-footnote color-tertiary">Redeemed</div>
                <div className="typo-callout-semibold">{cardPointsData.redeemed.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="section-module flex-center">
            <CreditCardDisplay card={card} />
          </div>

          <div className="section-module">
            <div className="section-module__title mb-16">Recent activity</div>
            <div className="flex-col gap-24">
              {cardPointsData.transactions.map((tx) => (
                <TransactionListItem key={tx.id} transaction={tx} />
              ))}
            </div>
          </div>

          <div className="bottom-spacer" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardPointsPage;
