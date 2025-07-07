import React from 'react';
import { ArrowLeft, CheckSquare, Square, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function HabitScreen() {
  const { state, setCurrentScreen, toggleHabit, updateBloomScore } = useApp();

  const handleToggleHabit = (habitId: string) => {
    toggleHabit(habitId);
    updateBloomScore();
  };

  const completedCount = state.habits.filter(h => h.completed).length;
  const totalCount = state.habits.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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
            <CheckSquare className="w-8 h-8 text-green-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Your Habits</h1>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Today's Progress</h2>
            <div className="text-2xl font-bold text-green-600">
              {completedCount}/{totalCount}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600">
            {completionPercentage === 100 
              ? "🎉 Amazing! You've completed all your habits today!" 
              : `${Math.round(completionPercentage)}% complete - Keep going!`
            }
          </p>
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          {state.habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`mr-4 p-2 rounded-xl transition-all duration-200 ${
                      habit.completed
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}
                  >
                    {habit.completed ? (
                      <CheckSquare className="w-6 h-6" />
                    ) : (
                      <Square className="w-6 h-6" />
                    )}
                  </button>
                  
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      habit.completed ? 'text-green-700 line-through' : 'text-gray-800'
                    }`}>
                      {habit.name}
                    </h3>
                    {habit.streak > 0 && (
                      <div className="flex items-center text-sm text-orange-600 mt-1">
                        <Flame className="w-4 h-4 mr-1" />
                        <span>{habit.streak} day streak!</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {habit.completed && (
                  <div className="text-green-500 text-2xl animate-bounce">
                    ✨
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Encouragement */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 text-center">
          <h3 className="font-semibold text-green-800 mb-2">
            {completionPercentage === 100 
              ? "You're on fire today! 🔥" 
              : "Every small step counts! 🌱"
            }
          </h3>
          <p className="text-green-700 text-sm">
            {completionPercentage === 100
              ? "You've built amazing momentum. Keep this energy flowing into tomorrow!"
              : "Consistency is key to building lasting habits. You're doing great!"
            }
          </p>
        </div>
      </div>
    </div>
  );
}