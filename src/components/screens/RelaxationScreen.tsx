import React from 'react';
import { ArrowLeft, Wind, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackWellnessEvent } from '../../utils/analytics';

const relaxationOptions = [
  {
    id: 'breathing',
    title: '🌬️ Breathing Exercise',
    description: 'Calming breathwork to reduce stress',
    icon: Wind,
    color: 'from-sky-200 to-blue-300',
    action: 'breathing',
  },
  {
    id: 'reading',
    title: '📖 Mindful Reading',
    description: 'Inspirational quotes and wisdom',
    icon: BookOpen,
    color: 'from-amber-200 to-orange-300',
    action: 'reading',
  },
];

export function RelaxationScreen() {
  const { setCurrentScreen } = useApp();

  const handleOptionSelect = (action: string) => {
    trackWellnessEvent.relaxationActivity(action);
    setCurrentScreen(action);
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
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🧘 Relaxation Zone</h1>
            <p className="text-gray-600">Choose a way to relax and unwind today</p>
          </div>
        </div>

        {/* Relaxation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {relaxationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.action)}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-left"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </button>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🌟 Why Relaxation Matters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-200 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Mental Clarity</h4>
              <p className="text-sm text-gray-600">
                Regular relaxation improves focus, decision-making, and cognitive function.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-200 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Emotional Balance</h4>
              <p className="text-sm text-gray-600">
                Helps regulate emotions, reduce anxiety, and increase overall well-being.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-200 to-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Energy Renewal</h4>
              <p className="text-sm text-gray-600">
                Restores energy levels and prevents burnout through mindful rest.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6">
          <h3 className="font-semibold text-violet-700 mb-4">💡 Quick Relaxation Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm text-violet-600 space-y-2">
              <li>• Take 3 deep breaths before starting</li>
              <li>• Find a quiet, comfortable space</li>
              <li>• Turn off notifications and distractions</li>
            </ul>
            <ul className="text-sm text-violet-600 space-y-2">
              <li>• Don't judge your thoughts, just observe</li>
              <li>• Start with just 5 minutes daily</li>
              <li>• Be patient and kind with yourself</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}