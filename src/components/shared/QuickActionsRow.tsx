import React from 'react';
import { useHistory } from 'react-router-dom';
import type { QuickAction } from '../../data/types';
import QuickActionButton from './QuickActionButton';
import './QuickActionsRow.css';

interface QuickActionsRowProps {
  actions: QuickAction[];
}

const QuickActionsRow: React.FC<QuickActionsRowProps> = ({ actions }) => {
  const history = useHistory();

  return (
    <div className="quick-actions-row">
      {actions.map((action) => (
        <QuickActionButton
          key={action.id}
          action={action}
          onClick={action.route ? () => history.push(action.route!) : undefined}
        />
      ))}
    </div>
  );
};

export default QuickActionsRow;
