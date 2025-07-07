import React, { ReactNode } from 'react';
import { useApp } from '../context/AppContext';

const themes = {
  'calm-forest': {
    primary: 'from-emerald-400 to-teal-600',
    secondary: 'from-green-100 to-emerald-100',
    accent: 'emerald-500',
    text: 'emerald-800',
    background: 'emerald-50',
  },
  'floral-bliss': {
    primary: 'from-pink-400 to-rose-600',
    secondary: 'from-pink-100 to-rose-100',
    accent: 'rose-500',
    text: 'rose-800',
    background: 'rose-50',
  },
  'sunrise-glow': {
    primary: 'from-orange-400 to-amber-600',
    secondary: 'from-orange-100 to-amber-100',
    accent: 'amber-500',
    text: 'amber-800',
    background: 'amber-50',
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { state } = useApp();
  const theme = themes[state.selectedTheme];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary} transition-all duration-500`}>
      <div className={`min-h-screen bg-${theme.background} bg-opacity-90`}>
        {children}
      </div>
    </div>
  );
}