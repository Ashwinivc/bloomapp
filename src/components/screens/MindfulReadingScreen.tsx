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
      'Growth': 'from-green-400 to-emerald-500',
      'Peace': 'from-blue-400 to-cyan-500',
      'Self-Worth': 'from-purple-400 to-indigo-500',
      'Mindfulness': 'from-orange-400 to-amber-500',
      'Inner Strength': 'from-red-400 to-pink-500',
      'Self-Love': 'from-pink-400 to-rose-500',
      'Change': 'from-teal-400 to-cyan-500',
      'Love': 'from-rose-400 to-pink-500',
      'Healing': 'from-emerald-400 to-green-500',
      'Presence': 'from-indigo-400 to-purple-500',
      'Opportunity': 'from-yellow-400 to-orange-500',
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
            <BookOpen className="w-8 h-8 text-orange-500 mr-3" />
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
                    ? 'bg-orange-500 text-white shadow-lg'
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
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={getNextQuote}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg"
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
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6">
            <h3 className="font-semibold text-orange-800 mb-4">📚 How to Practice Mindful Reading</h3>
            <ul className="text-sm text-orange-700 space-y-2">
              <li>• Read slowly and deliberately</li>
              <li>• Pause to reflect on the meaning</li>
              <li>• Notice how the words make you feel</li>
              <li>• Apply the wisdom to your own life</li>
              <li>• Return to favorites when needed</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6">
            <h3 className="font-semibold text-purple-800 mb-4">✨ Benefits of Mindful Reading</h3>
            <ul className="text-sm text-purple-700 space-y-2">
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
              You have <span className="font-semibold text-red-500">{favorites.length}</span> favorite quote{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}