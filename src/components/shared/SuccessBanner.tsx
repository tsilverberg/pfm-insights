import React from 'react';

interface SuccessBannerProps {
  message: string;
}

const SuccessBanner: React.FC<SuccessBannerProps> = ({ message }) => {
  return (
    <div className="success-banner">
      <svg className="success-banner__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#0A5A2B" strokeWidth="1.5" />
        <path d="M6 10l3 3 5-5" stroke="#0A5A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {message}
    </div>
  );
};

export default SuccessBanner;
