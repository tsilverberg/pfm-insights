import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { invalidateChartTokens } from '../theme/chartTokens';

export type ThemeId = 'default' | 'danske-bank' | 'everbank' | 'td-bank';

interface ThemeMeta {
  id: ThemeId;
  name: string;
  bankName: string;
  logo: string; // emoji placeholder
  primaryColor: string; // for preview swatch
  fontUrl?: string; // Google Fonts URL to load
}

export const THEMES: ThemeMeta[] = [
  { id: 'default', name: 'Backbase', bankName: 'Backbase PFM', logo: '🏦', primaryColor: '#3A495D' },
  { id: 'danske-bank', name: 'Danske Bank', bankName: 'Danske Bank', logo: '🇩🇰', primaryColor: '#003755', fontUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap' },
  { id: 'everbank', name: 'EverBank', bankName: 'EverBank', logo: '🌿', primaryColor: '#00875A', fontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' },
  { id: 'td-bank', name: 'TD Bank', bankName: 'TD Bank', logo: '🟢', primaryColor: '#008A00', fontUrl: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap' },
];

interface ThemeContextValue {
  theme: ThemeMeta;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES[0],
  setTheme: () => {},
});

function loadFont(url: string) {
  const existing = document.querySelector(`link[href="${url}"]`);
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function applyThemeClass(id: ThemeId) {
  // Remove any existing theme class
  document.documentElement.classList.forEach(cls => {
    if (cls.startsWith('theme-')) document.documentElement.classList.remove(cls);
  });
  if (id !== 'default') {
    document.documentElement.classList.add(`theme-${id}`);
  }
  // Invalidate chart color cache so charts pick up new tokens
  invalidateChartTokens();
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    return (localStorage.getItem('pfm-theme') as ThemeId) || 'everbank';
  });

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem('pfm-theme', id);
  }, []);

  useEffect(() => {
    applyThemeClass(themeId);
    if (theme.fontUrl) loadFont(theme.fontUrl);
  }, [themeId, theme.fontUrl]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
