import React from 'react';
import type { TransactionGroup } from '../../data/types';
import TransactionListItem from './TransactionListItem';
import './TransactionList.css';

interface TransactionListProps {
  groups: TransactionGroup[];
}

const TransactionList: React.FC<TransactionListProps> = ({ groups }) => (
  <div className="tx-list">
    {groups.map((group) => (
      <div key={group.label} className="tx-list__group">
        <div className="tx-list__date">{group.label}</div>
        <div className="tx-list__items">
          {group.transactions.map((tx) => (
            <TransactionListItem key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default TransactionList;
