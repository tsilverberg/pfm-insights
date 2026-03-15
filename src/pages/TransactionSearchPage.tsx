import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useHaptics } from '../hooks/useHaptics';
import TransactionList from '../components/shared/TransactionList';
import EmptyState from '../components/shared/EmptyState';
import { homeTransactionsData } from '../data/mockData';
import { formatEuro } from '../data/formatters';
import type { Transaction, TransactionGroup } from '../data/types';
import './TransactionSearchPage.css';

type FilterType = 'all' | 'income' | 'expenses';

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Income', value: 'income' },
  { label: 'Expenses', value: 'expenses' },
];

const allTransactions: Transaction[] = homeTransactionsData.flatMap(
  (group) => group.transactions
);

const dateLabelMap = new Map<string, string>();
for (const group of homeTransactionsData) {
  for (const tx of group.transactions) {
    if (!dateLabelMap.has(tx.date)) {
      dateLabelMap.set(tx.date, group.label);
    }
  }
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

function groupTransactions(txs: Transaction[]): TransactionGroup[] {
  if (txs.length === 0) return [];

  const grouped = new Map<string, Transaction[]>();
  for (const tx of txs) {
    const dateKey = tx.date;
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(tx);
  }

  return Array.from(grouped.entries()).map(([date, transactions]) => ({
    label: dateLabelMap.get(date) || date,
    transactions,
  }));
}

const TransactionSearchPage: React.FC = () => {
  const history = useHistory();
  const haptics = useHaptics();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const filteredTransactions = useMemo(() => {
    let txs = allTransactions;

    if (activeFilter === 'income') {
      txs = txs.filter((tx) => tx.isPositive);
    } else if (activeFilter === 'expenses') {
      txs = txs.filter((tx) => !tx.isPositive);
    }

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      const numericQuery = parseFloat(q);
      const hasNumeric = !isNaN(numericQuery);

      txs = txs.filter((tx) => {
        const nameMatch = tx.name.toLowerCase().includes(q);
        const descMatch = tx.description?.toLowerCase().includes(q) || false;
        const amountMatch = hasNumeric && Math.abs(tx.amount).toString().includes(q);
        return nameMatch || descMatch || amountMatch;
      });
    }

    return txs;
  }, [debouncedQuery, activeFilter]);

  const resultGroups = useMemo(
    () => groupTransactions(filteredTransactions),
    [filteredTransactions]
  );

  const handleCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = filteredTransactions.length > 0;
  const showHighlighted = hasQuery && hasResults;

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="search-page__header">
          <button className="search-page__back" onClick={handleCancel} aria-label="Back">
            <span className="material-symbols-rounded">arrow_back_ios_new</span>
          </button>
          <div className="search-page__input-wrap">
            <div className="search-page__input-icon">
              <span className="material-symbols-rounded">search</span>
            </div>
            <input
              ref={inputRef}
              className="search-page__input"
              type="text"
              placeholder="Search transactions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="search-page__cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        <div className="search-page__filters">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              className={`search-page__chip ${
                activeFilter === filter.value
                  ? 'search-page__chip--active'
                  : 'search-page__chip--inactive'
              }`}
              onClick={() => { haptics.light(); setActiveFilter(filter.value); }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="search-page__results">
          {hasResults ? (
            showHighlighted ? (
              <HighlightedTransactionList groups={resultGroups} query={debouncedQuery} />
            ) : (
              <TransactionList groups={resultGroups} />
            )
          ) : hasQuery || activeFilter !== 'all' ? (
            <EmptyState preset="no-results" />
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

/* Custom list that renders highlighted matches inline */
const HighlightedTransactionList: React.FC<{
  groups: TransactionGroup[];
  query: string;
}> = ({ groups, query }) => (
  <div className="tx-list">
    {groups.map((group) => (
      <div key={group.label} className="tx-list__group">
        <div className="tx-list__date">{group.label}</div>
        <div className="tx-list__items">
          {group.transactions.map((tx) => {
            const displayAmount = tx.isPositive
              ? `+\u202F${formatEuro(tx.amount)}`
              : `-\u202F${formatEuro(Math.abs(tx.amount))}`;

            return (
              <div key={tx.id} className="list-row">
                <div className="list-row__icon tx-item__icon">
                  {tx.logoUrl ? (
                    <img
                      src={tx.logoUrl}
                      alt={tx.name}
                      className="tx-item__logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove(
                          'tx-item__fallback--hidden'
                        );
                      }}
                    />
                  ) : null}
                  {tx.logoUrl ? (
                    <span className="tx-item__fallback tx-item__fallback--hidden">
                      {tx.initials || tx.name.charAt(0)}
                    </span>
                  ) : (
                    <span className="tx-item__fallback">
                      {tx.initials || tx.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="list-row__text">
                  <span className="typo-subhead-semibold">
                    {highlightText(tx.name, query)}
                    {tx.description && (
                      <span className="tx-item__desc">
                        {' '}{highlightText(tx.description, query)}
                      </span>
                    )}
                  </span>
                  <span className="typo-footnote color-secondary">{tx.category}</span>
                </div>
                <span
                  className={`list-row__value typo-callout-semibold ${
                    tx.isPositive ? 'tx-item__amount--positive' : ''
                  }`}
                >
                  {displayAmount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

export default TransactionSearchPage;
