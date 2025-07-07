import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Save, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const journalPrompts = [
  "What am I grateful for today?",
  "What challenged me today and how did I grow from it?",
  "What brought me joy today?",
  "How did I take care of myself today?",
  "What would I like to focus on tomorrow?",
  "What emotions did I experience today?",
  "What did I learn about myself today?",
  "How did I show kindness today?",
];

export function JournalScreen() {
  const [content, setContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const { setCurrentScreen, addJournalEntry, updateBloomScore } = useApp();

  const handleSave = () => {
    if (content.trim()) {
      const entry = {
        id: Date.now().toString(),
        content: content.trim(),
        date: new Date().toISOString(),
      };
      
      addJournalEntry(entry);
      updateBloomScore();
      setShowSaved(true);
      
      setTimeout(() => {
        setShowSaved(false);
        setContent('');
        setSelectedPrompt(null);
      }, 2000);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setContent(content + (content ? '\n\n' : '') + prompt + '\n\n');
  };

  if (showSaved) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Entry Saved!</h2>
          <p className="text-gray-600">
            Your thoughts have been captured. Thank you for taking time to reflect.
          </p>
        </div>
      </div>
    );
  }

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
            <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">📝 Write your thoughts</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Writing Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Journal</h2>
                <button
                  onClick={handleSave}
                  disabled={!content.trim()}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </button>
              </div>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts here... Let your mind flow freely."
                className="w-full h-96 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              />
              
              <div className="mt-4 text-sm text-gray-500">
                <p>💡 Tip: Write without judgment. This is your safe space for thoughts and feelings.</p>
              </div>
            </div>
          </div>

          {/* Prompts Sidebar */}
          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Writing Prompts</h3>
              </div>
              
              <div className="space-y-2">
                {journalPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptSelect(prompt)}
                    className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-100 transition-all duration-200 text-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 mb-2">Benefits of Journaling</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Reduces stress and anxiety</li>
                <li>• Improves self-awareness</li>
                <li>• Enhances emotional processing</li>
                <li>• Boosts creativity</li>
                <li>• Tracks personal growth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}