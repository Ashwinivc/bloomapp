import React, { useState } from 'react';
import { Flower2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function LoginScreen() {
  const [name, setName] = useState('');
  const { setUser, setCurrentScreen } = useApp();

  const handleContinue = () => {
    if (name.trim()) {
      setUser({ name: name.trim(), theme: 'calm-forest' });
      setCurrentScreen('home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Flower2 className="w-12 h-12 text-emerald-500 mr-2" />
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🌼 Daily Bloom</h1>
          <p className="text-gray-600">Your personal wellness companion</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            Continue Your Journey
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Start your daily wellness journey with mindful habits and self-reflection</p>
          <div className="mt-4">
            <button
              onClick={() => setCurrentScreen('privacy-policy')}
              className="text-emerald-600 hover:text-emerald-700 underline transition-colors duration-200"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}