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
  'serene-ocean': {
    primary: 'from-sky-200 to-cyan-300',
    secondary: 'from-sky-50 to-cyan-50',
    accent: 'sky-400',
    text: 'sky-700',
    background: 'sky-25',
  },
  'lavender-dream': {
    primary: 'from-purple-200 to-violet-300',
    secondary: 'from-purple-50 to-violet-50',
    accent: 'purple-400',
    text: 'purple-700',
    background: 'purple-25',
  },
  'peachy-sunset': {
    primary: 'from-orange-200 to-red-300',
    secondary: 'from-orange-50 to-red-50',
    accent: 'orange-400',
    text: 'orange-700',
    background: 'orange-25',
  },
  'mint-fresh': {
    primary: 'from-green-200 to-emerald-300',
    secondary: 'from-green-50 to-emerald-50',
    accent: 'green-400',
    text: 'green-700',
    background: 'green-25',
  },
  'warm-earth': {
    primary: 'from-yellow-200 to-amber-300',
    secondary: 'from-yellow-50 to-amber-50',
    accent: 'yellow-400',
    text: 'yellow-700',
    background: 'yellow-25',
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