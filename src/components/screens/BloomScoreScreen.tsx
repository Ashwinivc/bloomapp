import React, { useEffect } from 'react';
import { ArrowLeft, TrendingUp, Heart, CheckSquare, BookOpen, Award, Volume2, VolumeX, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { trackWellnessEvent } from '../../utils/analytics';
import { getLastNDays, formatDateForDisplay } from '../../utils/constants';

export function BloomScoreScreen() {
  const { state, setCurrentScreen } = useApp();
  const { bloomScore } = state;
  const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();

  useEffect(() => {
    // Track that user viewed their bloom score
    trackWellnessEvent.bloomScoreViewed(bloomScore.overall);
  }, [bloomScore.overall]);

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
    if (score >= 80) return "You're absolutely blooming! Your dedication shines through every aspect of your wellness journey.";
    if (score >= 60) return "Fantastic momentum! You're cultivating beautiful habits and nurturing meaningful growth.";
    if (score >= 40) return "Steady progress! Each mindful choice you make is building a stronger, more resilient you.";
    return "Every wellness journey begins with courage. You're here, you're trying, and that's incredibly powerful.";
  };

  const getPersonalizedMessage = (bloomScore: any) => {
    const { mood, habits, reflection, overall } = bloomScore;
    let message = "";
    
    // Habit-specific encouragement
    if (habits < 30) {
      message += "Small steps create big changes! Building consistent daily habits is a journey worth celebrating. ";
    } else if (habits < 60) {
      message += "Your daily habit consistency is growing beautifully! Keep nurturing these positive routines. ";
    } else if (habits < 80) {
      message += "Excellent daily habit momentum! You're building a strong foundation for lasting wellness. ";
    } else {
      message += "Outstanding daily habit mastery! Your consistency is truly inspiring and transformative. ";
    }
    
    // Mood-specific encouragement
    if (mood < 40) {
      message += "Your recent mood patterns show some challenges—remember, difficult emotions are temporary visitors. ";
    } else if (mood < 70) {
      message += "Your recent emotional awareness and mood tracking is a superpower that guides your growth. ";
    } else {
      message += "Your recent positive energy radiates through your consistent mood tracking! ";
    }
    
    // Reflection-specific encouragement
    if (reflection < 40) {
      message += "Consider adding more regular journaling to deepen your self-discovery journey. ";
    } else if (reflection < 70) {
      message += "Your recent thoughtful reflections are nurturing profound personal insights. ";
    } else {
      message += "Your consistent commitment to self-reflection is creating beautiful inner wisdom. ";
    }
    
    // Overall encouragement
    if (overall < 50) {
      message += "Progress isn't about perfection—it's about showing up with compassion for yourself. You're doing amazingly!";
    } else {
      message += "Your holistic approach to wellness is creating lasting, meaningful transformation. Keep blooming!";
    }
    
    return message;
  };

  const handleSpeakScore = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    const scoreMessage = `Your overall Bloom Score is ${bloomScore.overall} percent. ${getPersonalizedMessage(bloomScore)} ${getMotivationalMessage(bloomScore.overall)}`;
    speak(scoreMessage);
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
            <TrendingUp className="w-8 h-8 text-violet-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">🌿 Your Bloom Score</h1>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-amber-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Overall Bloom Score</h2>
            {isSupported && (
              <button
                onClick={handleSpeakScore}
                className={`ml-4 p-3 rounded-full transition-all duration-200 ${
                  isSpeaking 
                    ? 'bg-rose-400 hover:bg-rose-500 text-white' 
                    : 'bg-sky-400 hover:bg-sky-500 text-white'
                } shadow-lg hover:shadow-xl`}
                title={isSpeaking ? 'Stop speaking' : 'Listen to your score'}
              >
                {isSpeaking ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            )}
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
          
          {isSupported && (
            <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sky-600 text-sm">
                🎧 Click the speaker icon to hear your personalized wellness message with a calming voice
              </p>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
            <p className="text-violet-700 text-sm leading-relaxed">
              <strong>Your Weekly Wellness Journey:</strong> This score reflects your recent commitment to self-care across mood awareness (last 7 days), 
              daily habit consistency (today), and mindful reflection (last 7 days). Each element strengthens your foundation for lasting wellness. 
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
                  <Icon className={`w-8 h-8 text-${item.color}-400 mr-3`} />
                  <h3 className="text-xl font-semibold text-gray-800">{item.label}</h3>
                </div>
                
                <div className={`text-3xl font-bold mb-3 ${getScoreColor(item.value)}`}>
                  {item.value}%
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className={`bg-${item.color}-400 h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* 7-Day Trend */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="w-8 h-8 text-violet-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">7-Day Bloom Score Trend</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {getLastNDays(7).map((date, index) => {
              const dayScore = state.dailyBloomScores?.[date]?.overall || 0;
              const isToday = date === new Date().toISOString().split('T')[0];
              
              return (
                <div key={date} className="text-center">
                  <div className="text-xs text-gray-500 mb-2 font-medium">
                    {formatDateForDisplay(date)}
                  </div>
                  
                  <div className={`relative w-full h-24 bg-gray-100 rounded-lg overflow-hidden ${isToday ? 'ring-2 ring-purple-400' : ''}`}>
                    <div 
                      className={`absolute bottom-0 w-full bg-gradient-to-t ${getScoreGradient(dayScore)} transition-all duration-1000`}
                      style={{ height: `${dayScore}%` }}
                    ></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm font-bold ${dayScore > 50 ? 'text-white' : 'text-gray-700'}`}>
                        {dayScore}%
                      </span>
                    </div>
                  </div>
                  
                  {isToday && (
                    <div className="text-xs text-violet-500 font-medium mt-1">
                      Current
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100">
            <p className="text-violet-700 text-sm leading-relaxed">
              <strong>📊 Your Weekly Journey:</strong> This chart shows your daily Bloom Score over the past 7 days. 
              Each bar represents your overall wellness score for that day, combining mood tracking, habit completion, 
              and reflection activities. Watch your patterns and celebrate your progress! Consistency over perfection is the key to lasting wellness.
            </p>
          </div>
        </div>

        {/* 7-Day Trend */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="w-8 h-8 text-indigo-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">7-Day Bloom Score Trend</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {getLastNDays(7).map((date, index) => {
              const dayScore = state.dailyBloomScores?.[date]?.overall || 0;
              const isToday = date === new Date().toISOString().split('T')[0];
              
              return (
                <div key={date} className="text-center">
                  <div className="text-xs text-gray-500 mb-2 font-medium">
                    {formatDateForDisplay(date)}
                  </div>
                  
                  <div className={`relative w-full h-24 bg-gray-100 rounded-lg overflow-hidden ${isToday ? 'ring-2 ring-purple-400' : ''}`}>
                    <div 
                      className={`absolute bottom-0 w-full bg-gradient-to-t ${getScoreGradient(dayScore)} transition-all duration-1000`}
                      style={{ height: `${dayScore}%` }}
                    ></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm font-bold ${dayScore > 50 ? 'text-white' : 'text-gray-700'}`}>
                        {dayScore}%
                      </span>
                    </div>
                  </div>
                  
                  {isToday && (
                    <div className="text-xs text-purple-600 font-medium mt-1">
                      Current
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <p className="text-indigo-800 text-sm leading-relaxed">
              <strong>📊 Your Weekly Journey:</strong> This chart shows your daily Bloom Score over the past 7 days. 
              Each bar represents your overall wellness score for that day, combining mood tracking, habit completion, 
              and reflection activities. Watch your patterns and celebrate your progress! Consistency over perfection is the key to lasting wellness.
            </p>
          </div>
        </div>

        {/* Tips for Improvement */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6">
          <h3 className="font-semibold text-violet-700 mb-4 text-xl">💡 Tips to Boost Your Bloom Score</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-violet-600">Daily Habits:</h4>
              <ul className="text-sm text-violet-500 space-y-1">
                <li>• Complete your daily habit checklist each day</li>
                <li>• Stay consistent with small actions</li>
                <li>• Celebrate small wins</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-violet-600">Mindful Practices:</h4>
              <ul className="text-sm text-violet-500 space-y-1">
                <li>• Track your mood regularly throughout the week</li>
                <li>• Write in your journal consistently</li>
                <li>• Practice gratitude and reflection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}