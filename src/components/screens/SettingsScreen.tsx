import React, { useState } from 'react';
import { ArrowLeft, Settings, Clock, Bell, Palette, Shield, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SettingsScreen() {
  const { state, setCurrentScreen, setDailyBloomReminderTime } = useApp();
  const [reminderTime, setReminderTime] = useState(state.dailyBloomReminderTime || '09:00');
  const [showSaved, setShowSaved] = useState(false);

  const handleSaveReminderTime = () => {
    setDailyBloomReminderTime(reminderTime);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleDisableReminder = () => {
    setDailyBloomReminderTime(null);
    setReminderTime('09:00');
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
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
            <Settings className="w-8 h-8 text-violet-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">⚙️ Settings</h1>
          </div>
        </div>

        {/* Daily Reminder Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6">
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 text-sky-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Daily Bloom Reminder</h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Set a daily reminder to check in with your wellness journey. We'll gently remind you to track your mood, 
            complete your habits, and take a moment for self-reflection.
          </p>

          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sky-700 mb-2">Current Reminder</h3>
                  <p className="text-sky-600">
                    {state.dailyBloomReminderTime 
                      ? `Daily reminder set for ${formatTime(state.dailyBloomReminderTime)}`
                      : 'No daily reminder set'
                    }
                  </p>
                </div>
                <Bell className={`w-8 h-8 ${state.dailyBloomReminderTime ? 'text-sky-400' : 'text-gray-300'}`} />
              </div>
            </div>

            {/* Time Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Reminder Time
                </label>
                <input
                  type="time"
                  id="reminderTime"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Selected time: {formatTime(reminderTime)}
                </p>
              </div>

              <div className="flex flex-col justify-end space-y-3">
                <button
                  onClick={handleSaveReminderTime}
                  className="px-6 py-3 bg-sky-400 text-white rounded-xl font-semibold hover:bg-sky-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Set Reminder
                </button>
                
                {state.dailyBloomReminderTime && (
                  <button
                    onClick={handleDisableReminder}
                    className="px-6 py-3 bg-gray-400 text-white rounded-xl font-semibold hover:bg-gray-500 transition-all duration-200"
                  >
                    Disable Reminder
                  </button>
                )}
              </div>
            </div>

            {/* Success Message */}
            {showSaved && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-emerald-700 font-medium">
                    {state.dailyBloomReminderTime ? 'Reminder time updated!' : 'Reminder disabled!'}
                  </p>
                </div>
              </div>
            )}

            {/* Reminder Benefits */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6">
              <h3 className="font-semibold text-violet-700 mb-4">💡 Benefits of Daily Reminders</h3>
              <ul className="text-sm text-violet-600 space-y-2">
                <li>• Builds consistent wellness habits through gentle nudges</li>
                <li>• Helps you stay connected to your emotional well-being</li>
                <li>• Creates accountability for your mental health journey</li>
                <li>• Ensures you don't miss important self-care moments</li>
                <li>• Supports long-term positive behavior change</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setCurrentScreen('themes')}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left group"
          >
            <div className="flex items-center mb-4">
              <Palette className="w-6 h-6 text-violet-400 mr-3" />
              <h3 className="font-semibold text-gray-800">Themes</h3>
            </div>
            <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">
              Customize your app's appearance with beautiful color themes
            </p>
          </button>

          <button
            onClick={() => setCurrentScreen('privacy-policy')}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left group"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-emerald-400 mr-3" />
              <h3 className="font-semibold text-gray-800">Privacy</h3>
            </div>
            <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">
              Learn how we protect your personal wellness data
            </p>
          </button>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-sky-400 mr-3" />
              <h3 className="font-semibold text-gray-800">App Info</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Storage:</strong> Local Device</p>
              <p><strong>Data Sync:</strong> Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Note about Browser Notifications */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-semibold text-amber-700 mb-3">📱 About Notifications</h3>
          <p className="text-amber-600 text-sm leading-relaxed">
            <strong>Note:</strong> Daily Bloom currently stores your reminder preference locally. 
            For browser-based notifications, you'll need to enable notifications for this website in your browser settings. 
            We're working on enhanced notification features for future updates, including push notifications and email reminders.
          </p>
        </div>
      </div>
    </div>
  );
}