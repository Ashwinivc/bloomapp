import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, RefreshCw, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const wellnessTips = [
  {
    tip: "Take three deep breaths before starting any task. This simple practice helps center your mind and reduce stress.",
    category: "Breathing",
    icon: "🌬️"
  },
  {
    tip: "Practice gratitude by writing down three things you're thankful for each morning. It shifts your mindset to positivity.",
    category: "Gratitude",
    icon: "🙏"
  },
  {
    tip: "Drink a glass of water as soon as you wake up. Your body has been without hydration for hours and needs replenishment.",
    category: "Hydration",
    icon: "💧"
  },
  {
    tip: "Take a 5-minute walk outside. Fresh air and movement can instantly boost your mood and energy levels.",
    category: "Movement",
    icon: "🚶‍♀️"
  },
  {
    tip: "Practice the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds to rest your eyes.",
    category: "Eye Care",
    icon: "👁️"
  },
  {
    tip: "Set a gentle reminder to check in with your emotions throughout the day. Awareness is the first step to emotional wellness.",
    category: "Mindfulness",
    icon: "🧘‍♀️"
  },
  {
    tip: "Keep healthy snacks nearby. When you're hungry, you're more likely to make better choices if they're easily accessible.",
    category: "Nutrition",
    icon: "🥕"
  },
  {
    tip: "Create a bedtime routine that starts 30 minutes before sleep. Consistency helps signal to your body that it's time to rest.",
    category: "Sleep",
    icon: "😴"
  },
  {
    tip: "Stretch your neck and shoulders every hour. Tension builds up quickly, especially when working at a desk.",
    category: "Stretching",
    icon: "🤸‍♀️"
  },
  {
    tip: "Smile at yourself in the mirror. This simple act can trigger the release of feel-good hormones and boost self-compassion.",
    category: "Self-Love",
    icon: "😊"
  },
  {
    tip: "Put your phone in another room for 30 minutes. Give your mind a break from constant notifications and digital stimulation.",
    category: "Digital Wellness",
    icon: "📱"
  },
  {
    tip: "Listen to your favorite song and really focus on the music. Let it wash over you and notice how it makes you feel.",
    category: "Music Therapy",
    icon: "🎵"
  }
];

export function TipScreen() {
  const [currentTip, setCurrentTip] = useState(wellnessTips[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setCurrentScreen } = useApp();

  useEffect(() => {
    // Show a random tip when component mounts
    const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
    setCurrentTip(randomTip);
  }, []);

  const getNewTip = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
      setCurrentTip(randomTip);
      setIsAnimating(false);
    }, 300);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Growth': 'from-emerald-200 to-green-300',
      'Peace': 'from-sky-200 to-blue-300',
      'Self-Worth': 'from-violet-200 to-purple-300',
      'Mindfulness': 'from-amber-200 to-orange-300',
      'Inner Strength': 'from-rose-200 to-pink-300',
      'Self-Love': 'from-pink-200 to-rose-300',
      'Change': 'from-teal-200 to-cyan-300',
      'Love': 'from-rose-200 to-pink-300',
      'Healing': 'from-emerald-200 to-teal-300',
      'Presence': 'from-violet-200 to-indigo-300',
      'Opportunity': 'from-amber-200 to-yellow-300',
      'Music Therapy': 'from-violet-400 to-purple-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <Lightbulb className="w-8 h-8 text-amber-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Today's Bloom Tip</h1>
          </div>
        </div>

        {/* Tip Card */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center">
            {/* Category Badge */}
            <div className="inline-block mb-6">
              <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(currentTip.category)} text-white rounded-full text-sm font-medium flex items-center`}>
                <span className="mr-2">{currentTip.icon}</span>
                {currentTip.category}
              </span>
            </div>

            {/* Tip Content */}
            <div className="mb-8">
              <div className="text-6xl mb-6">💡</div>
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
                {currentTip.tip}
              </p>
            </div>

            {/* Get New Tip Button */}
            <button
              onClick={getNewTip}
              disabled={isAnimating}
              className="flex items-center mx-auto px-6 py-3 bg-gradient-to-r from-amber-300 to-orange-400 text-white rounded-xl font-semibold hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isAnimating ? 'animate-spin' : ''}`} />
              Get Another Tip
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-amber-500 mr-2" />
            <h3 className="font-semibold text-amber-700">Why Daily Tips Matter</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-amber-600 mb-2">Small Steps, Big Impact</h4>
              <p className="text-sm text-amber-500">
                Tiny daily actions compound over time to create significant positive changes in your life.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-amber-600 mb-2">Mindful Awareness</h4>
              <p className="text-sm text-amber-500">
                Regular wellness tips help you stay conscious of your well-being throughout the day.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">🌱 How to Make Tips Stick</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="font-medium text-emerald-500 mr-3">1.</span>
              <div>
                <h4 className="font-medium text-gray-700">Start Small</h4>
                <p className="text-sm text-gray-600">Choose one tip and practice it for a week before adding another.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-emerald-500 mr-3">2.</span>
              <div>
                <h4 className="font-medium text-gray-700">Set Reminders</h4>
                <p className="text-sm text-gray-600">Use phone alerts or sticky notes to remind yourself throughout the day.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-emerald-500 mr-3">3.</span>
              <div>
                <h4 className="font-medium text-gray-700">Track Progress</h4>
                <p className="text-sm text-gray-600">Notice how implementing tips makes you feel and celebrate small wins.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-emerald-500 mr-3">4.</span>
              <div>
                <h4 className="font-medium text-gray-700">Be Patient</h4>
                <p className="text-sm text-gray-600">Building new habits takes time. Be kind to yourself in the process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}