import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useHaptics } from '../../hooks/useHaptics';
import './FloatingTabBar.css';

const tabs = [
  { id: 'home', path: '/home', label: 'Home', icon: 'home' },
  { id: 'insights', path: '/insights', label: 'Insights', icon: 'insights' },
  { id: 'invest', path: '/invest', label: 'Invest', icon: 'trending_up' },
  { id: 'explore', path: '/explore', label: 'Explore', icon: 'explore' },
];

const hiddenPaths = ['/profile', '/cards', '/cards/points', '/account/', '/pockets', '/send', '/transfer', '/receive', '/qr', '/notifications', '/accounts', '/child-account/', '/search'];

const TabIcon: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'home':
      return (
        <svg width="24" height="24" viewBox="0 0 20 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2.69L15 7.19V15H13V9H7V15H5V7.19L10 2.69V2.69ZM10 0L0 9H3V17H9V11H11V17H17V9H20L10 0Z" />
        </svg>
      );
    case 'insights':
      return (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM17.93 9H11V2.07C14.61 2.52 17.48 5.39 17.93 9ZM2 10C2 5.93 5.06 2.56 9 2.07V17.93C5.06 17.44 2 14.07 2 10ZM11 17.93V11H17.93C17.48 14.61 14.61 17.48 11 17.93Z" />
        </svg>
      );
    case 'trending_up':
      return (
        <svg width="24" height="24" viewBox="0 0 20 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z" />
        </svg>
      );
    case 'explore':
      return (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM4.5 15.5L12.01 12.01L15.5 4.5L7.99 7.99L4.5 15.5ZM10 8.9C10.61 8.9 11.1 9.39 11.1 10C11.1 10.61 10.61 11.1 10 11.1C9.39 11.1 8.9 10.61 8.9 10C8.9 9.39 9.39 8.9 10 8.9Z" />
        </svg>
      );
    default:
      return null;
  }
};

const FloatingTabBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const haptics = useHaptics();

  const shouldHide = hiddenPaths.some((p) => location.pathname.startsWith(p));
  if (shouldHide) return null;

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    haptics.light();
    const isActive = location.pathname.startsWith(tab.path);
    if (isActive) {
      const content = document.querySelector('ion-content');
      content?.scrollToTop(300);
    } else {
      history.push(tab.path);
    }
  };

  return (
    <div className="floating-tab-bar" role="navigation" aria-label="Main navigation">
      <div className="floating-tab-bar__main">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.id}
              className={`floating-tab-bar__item ${isActive ? 'floating-tab-bar__item--active' : ''}`}
              onClick={() => handleTabClick(tab)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`floating-tab-bar__icon-wrap ${isActive ? 'floating-tab-bar__icon-wrap--active' : ''}`}>
                <TabIcon name={tab.icon} />
              </div>
              <span className="floating-tab-bar__label">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <button className="floating-tab-bar__search" aria-label="Search" onClick={() => { haptics.light(); history.push('/search'); }}>
        <svg width="32" height="32" viewBox="0 0 23.32 23.32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6667 14.6667H15.6133L15.24 14.3067C16.5467 12.7867 17.3333 10.8133 17.3333 8.66667C17.3333 3.88 13.4533 0 8.66667 0C3.88 0 0 3.88 0 8.66667C0 13.4533 3.88 17.3333 8.66667 17.3333C10.8133 17.3333 12.7867 16.5467 14.3067 15.24L14.6667 15.6133V16.6667L21.3333 23.32L23.32 21.3333L16.6667 14.6667V14.6667ZM8.66667 14.6667C5.34667 14.6667 2.66667 11.9867 2.66667 8.66667C2.66667 5.34667 5.34667 2.66667 8.66667 2.66667C11.9867 2.66667 14.6667 5.34667 14.6667 8.66667C14.6667 11.9867 11.9867 14.6667 8.66667 14.6667Z" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingTabBar;
