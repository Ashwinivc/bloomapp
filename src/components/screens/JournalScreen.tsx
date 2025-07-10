import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Save, Sparkles, List, Edit3, Calendar, Clock, Search } from 'lucide-react';
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

type ViewMode = 'write' | 'list' | 'view';

export function JournalScreen() {
  const [content, setContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('write');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { state, setCurrentScreen, addJournalEntry, updateBloomScore } = useApp();

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
        setViewMode('list'); // Show the new entry in the list
      }, 2000);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setContent(content + (content ? '\n\n' : '') + prompt + '\n\n');
  };

  const handleViewEntry = (entryId: string) => {
    setSelectedEntryId(entryId);
    setViewMode('view');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getPreview = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const filteredEntries = state.journalEntries
    .filter(entry => 
      searchTerm === '' || 
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const selectedEntry = selectedEntryId 
    ? state.journalEntries.find(entry => entry.id === selectedEntryId)
    : null;

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentScreen('home')}
              className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">
                {viewMode === 'write' && '📝 Write your thoughts'}
                {viewMode === 'list' && '📚 Your Journal Entries'}
                {viewMode === 'view' && '📖 Journal Entry'}
              </h1>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-white/90 rounded-xl shadow-lg p-1">
            <button
              onClick={() => setViewMode('write')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'write'
                  ? 'bg-sky-400 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Write
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-sky-400 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              View All ({state.journalEntries.length})
            </button>
          </div>
        </div>

        {/* Write Mode */}
        {viewMode === 'write' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Writing Area */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Your Journal</h2>
                  <button
                    onClick={handleSave}
                    disabled={!content.trim()}
                    className="flex items-center px-4 py-2 bg-sky-400 text-white rounded-xl hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </button>
                </div>
                
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your thoughts here... Let your mind flow freely."
                  className="w-full h-96 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none transition-all duration-200"
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
                  <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
                  <h3 className="font-semibold text-gray-800">Writing Prompts</h3>
                </div>
                
                <div className="space-y-2">
                  {journalPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSelect(prompt)}
                      className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-sky-50 hover:to-blue-100 transition-all duration-200 text-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6">
                <h3 className="font-semibold text-sky-700 mb-2">Benefits of Journaling</h3>
                <ul className="text-sm text-sky-600 space-y-1">
                  <li>• Reduces stress and anxiety</li>
                  <li>• Improves self-awareness</li>
                  <li>• Enhances emotional processing</li>
                  <li>• Boosts creativity</li>
                  <li>• Tracks personal growth</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* List Mode */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your journal entries..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Entries List */}
            <div className="space-y-4">
              {filteredEntries.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchTerm ? 'No entries found' : 'No journal entries yet'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm 
                      ? 'Try adjusting your search terms'
                      : 'Start your journaling journey by writing your first entry'
                    }
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setViewMode('write')}
                      className="px-6 py-3 bg-sky-400 text-white rounded-xl hover:bg-sky-500 transition-all duration-200"
                    >
                      Write First Entry
                    </button>
                  )}
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => handleViewEntry(entry.id)}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(entry.date)}</span>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        <span>{new Date(entry.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-sky-500 text-sm font-medium">Read more →</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {getPreview(entry.content, 200)}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {entry.content.length} characters
                      </span>
                      <div className="w-2 h-2 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* View Mode */}
        {viewMode === 'view' && selectedEntry && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              {/* Entry Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <button
                  onClick={() => setViewMode('list')}
                  className="flex items-center text-sky-500 hover:text-sky-600 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to all entries
                </button>
                
                <div className="text-right">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{formatDate(selectedEntry.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{new Date(selectedEntry.date).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</span>
                  </div>
                </div>
              </div>

              {/* Entry Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {selectedEntry.content}
                </div>
              </div>

              {/* Entry Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{selectedEntry.content.length} characters</span>
                  <span>{selectedEntry.content.split(/\s+/).length} words</span>
                  <span>~{Math.ceil(selectedEntry.content.split(/\s+/).length / 200)} min read</span>
                </div>
              </div>
            </div>

            {/* Reflection Questions */}
            <div className="mt-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6">
              <h3 className="font-semibold text-violet-700 mb-4">🤔 Reflection Questions</h3>
              <div className="space-y-2 text-sm text-violet-600">
                <p>• What emotions do you notice in this entry?</p>
                <p>• What patterns or themes emerge from your thoughts?</p>
                <p>• How have your perspectives changed since writing this?</p>
                <p>• What insights can you apply to your current situation?</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}