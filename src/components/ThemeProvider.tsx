import React, { ReactNode } from 'react';
import { useApp } from '../context/AppContext';

const themes = {
  'calm-forest': {
    primary: 'from-emerald-200 to-teal-300',
    secondary: 'from-emerald-50 to-teal-50',
    accent: 'emerald-400',
    text: 'emerald-700',
    background: 'emerald-25',
  },
  'floral-bliss': {
    primary: 'from-rose-200 to-pink-300',
    secondary: 'from-rose-50 to-pink-50',
    accent: 'rose-400',
    text: 'rose-700',
    background: 'rose-25',
  },
  'sunrise-glow': {
    primary: 'from-amber-200 to-orange-300',
    secondary: 'from-amber-50 to-orange-50',
    accent: 'amber-400',
    text: 'amber-700',
    background: 'amber-25',
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