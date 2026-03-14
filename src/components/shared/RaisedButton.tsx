import React from 'react';

interface RaisedButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const RaisedButton: React.FC<RaisedButtonProps> = ({ label, onClick, icon, fullWidth }) => {
  return (
    <button
      className="btn-raised"
      onClick={onClick}
      style={fullWidth ? { width: '100%' } : undefined}
    >
      {icon}
      {label}
    </button>
  );
};

export default RaisedButton;
