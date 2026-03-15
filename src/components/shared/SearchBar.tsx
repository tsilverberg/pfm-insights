import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search', onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <div className="search-bar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="search-bar__icon">
        <circle cx="11" cy="11" r="7" stroke="var(--pfm-text-tertiary)" strokeWidth="1.5" />
        <path d="M16 16l4 4" stroke="var(--pfm-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        aria-label="Search"
      />
      {query && (
        <button className="search-bar__clear" onClick={handleClear} aria-label="Clear">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="var(--pfm-text-tertiary)" />
            <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
