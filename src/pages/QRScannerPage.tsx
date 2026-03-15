import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import './QRScannerPage.css';

const QRScannerPage: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();

  return (
    <IonPage>
      <IonContent>
        <div className="qr-scanner">
          {/* Top bar */}
          <div className="qr-scanner__top">
            <button className="qr-scanner__close" onClick={() => history.goBack()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="qr-scanner__title">Scan QR code</span>
            <div style={{ width: 44 }} />
          </div>

          {/* Viewfinder */}
          <div className="qr-scanner__viewfinder">
            <div className="qr-scanner__frame">
              <div className="qr-scanner__corner qr-scanner__corner--tl" />
              <div className="qr-scanner__corner qr-scanner__corner--tr" />
              <div className="qr-scanner__corner qr-scanner__corner--bl" />
              <div className="qr-scanner__corner qr-scanner__corner--br" />
            </div>
            <div className="qr-scanner__line" />
          </div>

          {/* Instructions */}
          <div className="qr-scanner__instructions">
            <p>Align the QR code within</p>
            <p>the frame to scan</p>
          </div>

          {/* Bottom actions */}
          <div className="qr-scanner__actions">
            <button className="qr-scanner__action-btn" onClick={() => history.push('/receive')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5" />
                <rect x="14" y="14" width="3" height="3" stroke="white" strokeWidth="1.5" />
                <rect x="18" y="18" width="3" height="3" stroke="white" strokeWidth="1.5" />
              </svg>
              <span>My QR</span>
            </button>
            <button className="qr-scanner__action-btn" onClick={() => showToast({ type: 'info', message: 'Gallery picker coming soon' })}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="1.5" />
                <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Gallery</span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRScannerPage;
