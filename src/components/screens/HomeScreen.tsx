import React, { useEffect } from 'react';
import { 
  Heart, 
  CheckSquare, 
  Lightbulb, 
  BookOpen, 
  TrendingUp, 
  MessageCircle, 
  Palette, 
  Flower2,
  Sparkles,
  LogOut,
  Settings
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const menuItems = [
  { id: 'mood', title: 'Track Mood', icon: Heart, screen: 'mood', color: 'from-rose-200 to-pink-300' },
  { id: 'habits', title: 'View Habits', icon: CheckSquare, screen: 'habits', color: 'from-emerald-200 to-green-300' },
  { id: 'tip', title: "Today's Bloom Tip", icon: Lightbulb, screen: 'tip', color: 'from-amber-200 to-yellow-300' },
  { id: 'journal', title: 'Journal', icon: BookOpen, screen: 'journal', color: 'from-sky-200 to-blue-300' },
  { id: 'score', title: 'Bloom Score', icon: TrendingUp, screen: 'score', color: 'from-violet-200 to-purple-300' },
  { id: 'coach', title: 'AI Coach', icon: MessageCircle, screen: 'coach', color: 'from-teal-200 to-cyan-300' },
  { id: 'themes', title: 'Themes', icon: Palette, screen: 'themes', color: 'from-orange-200 to-amber-300' },
  { id: 'relaxation', title: 'Relaxation Zone', icon: Flower2, screen: 'relaxation', color: 'from-emerald-200 to-teal-300' },
  { id: 'settings', title: 'Settings', icon: Settings, screen: 'settings', color: 'from-violet-200 to-purple-300' },
];

export function HomeScreen() {
  const { state, setCurrentScreen, updateBloomScore, resetAppState } = useApp();

  useEffect(() => {
    updateBloomScore();
  }, [updateBloomScore]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be saved locally.')) {
      resetAppState();
      setCurrentScreen('login');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Flower2 className="w-8 h-8 text-emerald-400 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">🌼 Daily Bloom</h1>
              </div>
              <p className="text-gray-600">
                {getGreeting()}, {state.user?.name}! Ready to bloom today?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentScreen('settings')}
                className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-500 hover:text-violet-600 transition-all duration-200 group"
                title="Settings"
              >
                <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </button>
              <div className="text-right">
                <div className="flex items-center text-emerald-500 mb-1">
                  <Sparkles className="w-5 h-5 mr-1" />
                  <span className="font-semibold">Bloom Score</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  {state.bloomScore.overall}%
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-500 hover:text-rose-600 transition-all duration-200 group"
                title="Exit App"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Back Message */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 mb-6">
          <p className="text-emerald-700 text-center">
            <span className="font-semibold">Welcome back!</span> Your progress is automatically saved locally on your device. 
            Every moment you spend here is an investment in your well-being. 🌱
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.screen)}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 text-left">{item.title}</h3>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-500">
                {state.moodEntries.filter(entry => {
                  const entryDate = new Date(entry.date);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return entryDate >= weekAgo;
                }).length}
              </div>
              <div className="text-sm text-gray-600">Mood Entries (7d)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500">
                {state.habits.filter(h => h.completed).length}/{state.habits.length}
              </div>
              <div className="text-sm text-gray-600">Habits Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-500">
                {state.journalEntries.filter(entry => {
                  const entryDate = new Date(entry.date);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return entryDate >= weekAgo;
                }).length}
              </div>
              <div className="text-sm text-gray-600">Journal Entries (7d)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}