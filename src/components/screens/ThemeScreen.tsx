import React from 'react';
import { ArrowLeft, Palette, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Theme } from '../../types';

const themes = [
  {
    id: 'calm-forest' as Theme,
    name: 'Calm Forest',
    description: 'Peaceful greens and earth tones',
    gradient: 'from-emerald-400 to-teal-600',
    preview: 'bg-emerald-100',
    accent: 'emerald-500',
  },
  {
    id: 'floral-bliss' as Theme,
    name: 'Floral Bliss',
    description: 'Soft pinks and warm roses',
    gradient: 'from-pink-400 to-rose-600',
    preview: 'bg-pink-100',
    accent: 'rose-500',
  },
  {
    id: 'sunrise-glow' as Theme,
    name: 'Sunrise Glow',
    description: 'Warm oranges and golden hues',
    gradient: 'from-orange-400 to-amber-600',
    preview: 'bg-orange-100',
    accent: 'amber-500',
  },
];

export function ThemeScreen() {
  const { state, setCurrentScreen, setTheme } = useApp();

  const handleThemeSelect = (themeId: Theme) => {
    setTheme(themeId);
    setTimeout(() => {
      setCurrentScreen('home');
    }, 1000);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <Palette className="w-8 h-8 text-purple-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">🎨 Choose Your Theme</h1>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Theme Preview */}
              <div className={`w-full h-32 bg-gradient-to-br ${theme.gradient} rounded-2xl mb-4 relative overflow-hidden`}>
                <div className={`absolute inset-0 ${theme.preview} opacity-30`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {state.selectedTheme === theme.id && (
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Theme Info */}
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{theme.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{theme.description}</p>
                
                {/* Color Palette Preview */}
                <div className="flex space-x-2">
                  <div className={`w-6 h-6 bg-${theme.accent} rounded-full`}></div>
                  <div className={`w-6 h-6 bg-gradient-to-r ${theme.gradient} rounded-full`}></div>
                  <div className={`w-6 h-6 ${theme.preview} rounded-full border border-gray-200`}></div>
                </div>
              </div>

              {/* Selection Indicator */}
              {state.selectedTheme === theme.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Theme Benefits */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4 text-xl">🌈 Why Themes Matter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Psychological Impact</h4>
              <p className="text-sm text-gray-600">
                Colors can influence mood and energy levels. Choose a theme that resonates 
                with your current wellness goals and emotional state.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Personal Connection</h4>
              <p className="text-sm text-gray-600">
                A personalized environment helps create a stronger connection to your 
                wellness journey and makes the experience more enjoyable.
              </p>
            </div>
          </div>
        </div>

        {/* Current Selection */}
        {state.selectedTheme && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Current theme: <span className="font-semibold">
                {themes.find(t => t.id === state.selectedTheme)?.name}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}