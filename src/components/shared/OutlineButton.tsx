import React from 'react';

interface OutlineButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({ label, onClick, icon, fullWidth }) => {
  return (
    <button
      className="btn-outline"
      onClick={onClick}
      style={fullWidth ? { width: '100%' } : undefined}
    >
      {icon}
      {label}
    </button>
  );
};

export default OutlineButton;
