import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { moodEmojis, moodResponses } from '../../utils/constants';

export function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const { setCurrentScreen, addMoodEntry, updateBloomScore } = useApp();

  const handleMoodSelect = (mood: typeof moodEmojis[0]) => {
    const entry = {
      id: Date.now().toString(),
      emoji: mood.emoji,
      date: new Date().toISOString(),
      note: mood.label,
    };
    
    addMoodEntry(entry);
    setSelectedMood(mood.emoji);
    setShowResponse(true);
    updateBloomScore();
    
    setTimeout(() => {
      setCurrentScreen('home');
    }, 3000);
  };

  if (showResponse && selectedMood) {
    const selectedMoodData = moodEmojis.find(m => m.emoji === selectedMood);
    const response = moodResponses[selectedMoodData?.value as keyof typeof moodResponses];
    
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">{selectedMood}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank you for sharing!</h2>
          <p className="text-gray-600 mb-6">{response}</p>
          <div className="animate-pulse text-sm text-gray-500">
            Returning to home in a moment...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-rose-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">How do you feel today?</h1>
          </div>
        </div>

        {/* Mood Grid */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8">
          <p className="text-gray-600 text-center mb-8">
            Take a moment to check in with yourself. How are you feeling right now?
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moodEmojis.map((mood, index) => (
              <button
                key={index}
                onClick={() => handleMoodSelect(mood)}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:from-rose-50 hover:to-pink-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {mood.emoji}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-rose-600">
                  {mood.label}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your feelings are valid. Every emotion is a step in your wellness journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
}