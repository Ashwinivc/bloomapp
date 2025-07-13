import React from 'react';
import { ArrowLeft, Palette, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Theme } from '../../types';

const themes = [
  {
    id: 'calm-forest' as Theme,
    name: 'Calm Forest',
    description: 'Peaceful greens and earth tones',
    gradient: 'from-emerald-200 to-teal-300',
    preview: 'bg-emerald-50',
    accent: 'emerald-400',
  },
  {
    id: 'floral-bliss' as Theme,
    name: 'Floral Bliss',
    description: 'Soft pinks and warm roses',
    gradient: 'from-rose-200 to-pink-300',
    preview: 'bg-rose-50',
    accent: 'rose-400',
  },
  {
    id: 'sunrise-glow' as Theme,
    name: 'Sunrise Glow',
    description: 'Warm oranges and golden hues',
    gradient: 'from-amber-200 to-orange-300',
    preview: 'bg-amber-50',
    accent: 'amber-400',
  },
  {
    id: 'serene-ocean' as Theme,
    name: 'Serene Ocean',
    description: 'Gentle blues and aqua tones',
    gradient: 'from-sky-200 to-cyan-300',
    preview: 'bg-sky-50',
    accent: 'sky-400',
  },
  {
    id: 'lavender-dream' as Theme,
    name: 'Lavender Dream',
    description: 'Soft purples and violet hues',
    gradient: 'from-purple-200 to-violet-300',
    preview: 'bg-purple-50',
    accent: 'purple-400',
  },
  {
    id: 'peachy-sunset' as Theme,
    name: 'Peachy Sunset',
    description: 'Warm peach and coral tones',
    gradient: 'from-orange-200 to-red-300',
    preview: 'bg-orange-50',
    accent: 'orange-400',
  },
  {
    id: 'mint-fresh' as Theme,
    name: 'Mint Fresh',
    description: 'Cool mint and fresh greens',
    gradient: 'from-green-200 to-emerald-300',
    preview: 'bg-green-50',
    accent: 'green-400',
  },
  {
    id: 'warm-earth' as Theme,
    name: 'Warm Earth',
    description: 'Golden yellows and earth tones',
    gradient: 'from-yellow-200 to-amber-300',
    preview: 'bg-yellow-50',
    accent: 'yellow-400',
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <Palette className="w-8 h-8 text-violet-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">🎨 Choose Your Theme</h1>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Theme Preview */}
              <div className={`w-full h-32 bg-gradient-to-br ${theme.gradient} rounded-2xl mb-4 relative overflow-hidden`}>
                <div className={`absolute inset-0 ${theme.preview} opacity-30`}></div>
                
                {/* Selection Indicator */}
                {state.selectedTheme === theme.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Info */}
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{theme.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{theme.description}</p>
                
                {/* Color Palette Preview */}
                <div className="flex space-x-2">
                  <div className={`w-5 h-5 bg-${theme.accent} rounded-full`}></div>
                  <div className={`w-5 h-5 bg-gradient-to-r ${theme.gradient} rounded-full`}></div>
                  <div className={`w-5 h-5 ${theme.preview} rounded-full border border-gray-200`}></div>
                </div>
              </div>

              {/* Selection Badge */}
              {state.selectedTheme === theme.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Theme Benefits */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🌈 Why Themes Matter for Your Wellness
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-200 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Psychological Impact</h4>
              <p className="text-sm text-gray-600">
                Colors can influence mood and energy levels. Choose a theme that resonates 
                with your current wellness goals and emotional state.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-200 to-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Personal Connection</h4>
              <p className="text-sm text-gray-600">
                A personalized environment helps create a stronger connection to your 
                wellness journey and makes the experience more enjoyable.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-200 to-cyan-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Mindful Customization</h4>
              <p className="text-sm text-gray-600">
                Choosing your environment mindfully is itself a wellness practice, 
                encouraging intentional living and self-awareness.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Recommendations */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6">
          <h3 className="font-semibold text-violet-700 mb-4 text-xl">🎯 Theme Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-violet-600 mb-2">For Energy & Motivation:</h4>
              <ul className="text-sm text-violet-500 space-y-1">
                <li>• <strong>Sunrise Glow</strong> - Energizing oranges and golds</li>
                <li>• <strong>Peachy Sunset</strong> - Warm and uplifting</li>
                <li>• <strong>Warm Earth</strong> - Grounding yet energizing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-violet-600 mb-2">For Calm & Relaxation:</h4>
              <ul className="text-sm text-violet-500 space-y-1">
                <li>• <strong>Serene Ocean</strong> - Peaceful blues and aquas</li>
                <li>• <strong>Lavender Dream</strong> - Soothing purples</li>
                <li>• <strong>Mint Fresh</strong> - Cool and refreshing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Selection */}
        {state.selectedTheme && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Current theme: <span className="font-semibold text-violet-600">
                {themes.find(t => t.id === state.selectedTheme)?.name}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}