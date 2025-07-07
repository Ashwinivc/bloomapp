import React from 'react';
import { ArrowLeft, TrendingUp, Heart, CheckSquare, BookOpen, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function BloomScoreScreen() {
  const { state, setCurrentScreen } = useApp();
  const { bloomScore } = state;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-amber-500';
    if (score >= 40) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-pink-500';
  };

  const getMotivationalMessage = (score: number) => {
    if (score >= 80) return "You're absolutely blooming! Your dedication shines through every aspect of your wellness journey. 🌟";
    if (score >= 60) return "Fantastic momentum! You're cultivating beautiful habits and nurturing meaningful growth. 🌱";
    if (score >= 40) return "Steady progress! Each mindful choice you make is building a stronger, more resilient you. 🌿";
    return "Every wellness journey begins with courage. You're here, you're trying, and that's incredibly powerful. 💚";
  };

  const getPersonalizedMessage = (bloomScore: BloomScore) => {
    const { mood, habits, reflection, overall } = bloomScore;
    let message = "";
    
    // Habit-specific encouragement
    if (habits < 30) {
      message += "🌱 Small steps create big changes! Even one completed habit today is a victory worth celebrating. ";
    } else if (habits < 60) {
      message += "🌿 Your habit consistency is growing beautifully! Keep nurturing these positive routines. ";
    } else if (habits < 80) {
      message += "🌳 Excellent habit momentum! You're building a strong foundation for lasting wellness. ";
    } else {
      message += "🌟 Outstanding habit mastery! Your consistency is truly inspiring and transformative. ";
    }
    
    // Mood-specific encouragement
    if (mood < 40) {
      message += "Remember, difficult emotions are temporary visitors—acknowledge them with kindness. ";
    } else if (mood < 70) {
      message += "Your emotional awareness is a superpower that guides your growth. ";
    } else {
      message += "Your positive energy radiates through your mood tracking! ";
    }
    
    // Reflection-specific encouragement
    if (reflection < 40) {
      message += "Consider adding journaling to deepen your self-discovery journey. ";
    } else if (reflection < 70) {
      message += "Your thoughtful reflections are nurturing profound personal insights. ";
    } else {
      message += "Your commitment to self-reflection is creating beautiful inner wisdom. ";
    }
    
    // Overall encouragement
    if (overall < 50) {
      message += "Progress isn't about perfection—it's about showing up with compassion for yourself. You're doing amazingly! 💙";
    } else {
      message += "Your holistic approach to wellness is creating lasting, meaningful transformation. Keep blooming! ✨";
    }
    
    return message;
  };

  const scoreData = [
    { 
      label: 'Mood', 
      value: bloomScore.mood, 
      icon: Heart, 
      color: 'pink',
      description: 'Reflects your emotional well-being over the past 7 days. Consistent tracking empowers your journey!'
    },
    { 
      label: 'Habits', 
      value: bloomScore.habits, 
      icon: CheckSquare, 
      color: 'green',
      description: 'Celebrates your dedication to positive daily actions. Every completed habit builds momentum!'
    },
    { 
      label: 'Reflection', 
      value: bloomScore.reflection, 
      icon: BookOpen, 
      color: 'blue',
      description: 'Highlights your growth through thoughtful journaling. Deep reflection cultivates profound self-awareness!'
    },
  ];

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
            <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">🌿 Your Bloom Score</h1>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Overall Bloom Score</h2>
          </div>
          
          <div className={`text-6xl font-bold mb-4 ${getScoreColor(bloomScore.overall)}`}>
            {bloomScore.overall}%
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6 max-w-md mx-auto">
            <div 
              className={`bg-gradient-to-r ${getScoreGradient(bloomScore.overall)} h-4 rounded-full transition-all duration-1000`}
              style={{ width: `${bloomScore.overall}%` }}
            ></div>
          </div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {getPersonalizedMessage(bloomScore)}
          </p>
          
          <p className="text-gray-500 text-base max-w-2xl mx-auto mt-4">
            {getMotivationalMessage(bloomScore.overall)}
          </p>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
            <p className="text-purple-800 text-sm leading-relaxed">
              <strong>Your Daily Performance:</strong> This score reflects your commitment to self-care across mood awareness, 
              habit consistency, and mindful reflection. Each element strengthens your foundation for lasting wellness. 
              Remember, progress isn't about perfection—it\'s about showing up for yourself with compassion and intention. 
              Every entry, every completed habit, every moment of reflection is a victory worth celebrating! 🌟
            </p>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {scoreData.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Icon className={`w-8 h-8 text-${item.color}-500 mr-3`} />
                  <h3 className="text-xl font-semibold text-gray-800">{item.label}</h3>
                </div>
                
                <div className={`text-3xl font-bold mb-3 ${getScoreColor(item.value)}`}>
                  {item.value}%
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className={`bg-${item.color}-500 h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tips for Improvement */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6">
          <h3 className="font-semibold text-purple-800 mb-4 text-xl">💡 Tips to Boost Your Bloom Score</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">Daily Habits:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Complete your daily habit checklist</li>
                <li>• Stay consistent with small actions</li>
                <li>• Celebrate small wins</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">Mindful Practices:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Track your mood regularly</li>
                <li>• Write in your journal daily</li>
                <li>• Practice gratitude and reflection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}