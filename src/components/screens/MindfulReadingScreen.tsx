import React, { useState } from 'react';
import { ArrowLeft, BookOpen, RefreshCw, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const quotes = [
  {
    text: "Be like a tree. Stay grounded, connect with your roots, turn over a new leaf, bend before you break, enjoy your unique beauty, and keep growing.",
    author: "Unknown",
    category: "Growth"
  },
  {
    text: "Worrying does not take away tomorrow's troubles. It takes away today's peace.",
    author: "Unknown",
    category: "Peace"
  },
  {
    text: "You are not a drop in the ocean, but the entire ocean in each drop.",
    author: "Rumi",
    category: "Self-Worth"
  },
  {
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh",
    category: "Mindfulness"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "Inner Strength"
  },
  {
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
    category: "Self-Love"
  },
  {
    text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    author: "Alan Watts",
    category: "Change"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "Peace"
  },
  {
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    author: "Rumi",
    category: "Love"
  },
  {
    text: "The wound is the place where the Light enters you.",
    author: "Rumi",
    category: "Healing"
  },
  {
    text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
    author: "Bill Keane",
    category: "Presence"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Opportunity"
  }
];

const categories = ['All', 'Growth', 'Peace', 'Self-Worth', 'Mindfulness', 'Inner Strength', 'Self-Love', 'Change', 'Love', 'Healing', 'Presence', 'Opportunity'];

export function MindfulReadingScreen() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const { setCurrentScreen } = useApp();

  const filteredQuotes = selectedCategory === 'All' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  const currentQuote = filteredQuotes[currentQuoteIndex] || quotes[0];

  const getNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % filteredQuotes.length);
  };

  const toggleFavorite = () => {
    const quoteIndex = quotes.findIndex(q => q.text === currentQuote.text);
    setFavorites(prev => 
      prev.includes(quoteIndex) 
        ? prev.filter(i => i !== quoteIndex)
        : [...prev, quoteIndex]
    );
  };

  const isFavorite = favorites.includes(quotes.findIndex(q => q.text === currentQuote.text));

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
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('relaxation')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-amber-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">📖 Mindful Reading</h1>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentQuoteIndex(0);
                }}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-amber-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Quote Display */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6">
          <div className="text-center">
            {/* Category Badge */}
            <div className="inline-block mb-6">
              <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(currentQuote.category)} text-white rounded-full text-sm font-medium`}>
                {currentQuote.category}
              </span>
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-8 italic">
              "{currentQuote.text}"
            </blockquote>

            {/* Author */}
            <p className="text-lg text-gray-600 mb-8">— {currentQuote.author}</p>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isFavorite 
                    ? 'bg-rose-400 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={getNextQuote}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-amber-300 to-orange-400 text-white rounded-xl font-semibold hover:from-amber-400 hover:to-orange-500 transition-all duration-200 shadow-lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Next Quote
              </button>
            </div>

            {/* Quote Counter */}
            <p className="text-sm text-gray-500 mt-4">
              {currentQuoteIndex + 1} of {filteredQuotes.length} quotes
            </p>
          </div>
        </div>

        {/* Reading Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
            <h3 className="font-semibold text-amber-700 mb-4">📚 How to Practice Mindful Reading</h3>
            <ul className="text-sm text-amber-600 space-y-2">
              <li>• Read slowly and deliberately</li>
              <li>• Pause to reflect on the meaning</li>
              <li>• Notice how the words make you feel</li>
              <li>• Apply the wisdom to your own life</li>
              <li>• Return to favorites when needed</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6">
            <h3 className="font-semibold text-violet-700 mb-4">✨ Benefits of Mindful Reading</h3>
            <ul className="text-sm text-violet-600 space-y-2">
              <li>• Reduces stress and anxiety</li>
              <li>• Increases self-awareness</li>
              <li>• Provides perspective on challenges</li>
              <li>• Inspires positive thinking</li>
              <li>• Cultivates inner wisdom</li>
            </ul>
          </div>
        </div>

        {/* Favorites Count */}
        {favorites.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              You have <span className="font-semibold text-rose-400">{favorites.length}</span> favorite quote{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}