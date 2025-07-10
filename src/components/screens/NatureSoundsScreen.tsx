import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const natureSounds = [
  {
    id: 'rain',
    title: 'Gentle Rainfall',
    description: 'Soft rain drops for deep relaxation',
    icon: '🌧️',
    color: 'from-sky-200 to-blue-300',
    image: 'https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'ocean',
    title: 'Ocean Waves',
    description: 'Rhythmic waves washing ashore',
    icon: '🌊',
    color: 'from-cyan-200 to-blue-300',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'forest',
    title: 'Forest Birds',
    description: 'Peaceful bird songs in the woods',
    icon: '🐦',
    color: 'from-emerald-200 to-green-300',
    image: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'wind',
    title: 'Gentle Breeze',
    description: 'Soft wind through the trees',
    icon: '🍃',
    color: 'from-emerald-200 to-teal-300',
    image: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'stream',
    title: 'Babbling Brook',
    description: 'Gentle water flowing over rocks',
    icon: '💧',
    color: 'from-sky-200 to-cyan-300',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'thunder',
    title: 'Distant Thunder',
    description: 'Soft rumbling for deep sleep',
    icon: '⛈️',
    color: 'from-gray-300 to-slate-400',
    image: 'https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export function NatureSoundsScreen() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const { setCurrentScreen } = useApp();

  const handlePlayPause = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('relaxation')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🌿 Nature Sounds</h1>
            <p className="text-gray-600">Immerse yourself in the calming sounds of nature</p>
          </div>
        </div>

        {/* Volume Control */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Volume Control</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-gray-600" />
                ) : (
                  <Volume2 className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-8">0</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-8">100</span>
              </div>
              
              <span className="text-sm font-medium text-gray-700 w-12">
                {isMuted ? 0 : volume}%
              </span>
            </div>
          </div>
        </div>

        {/* Nature Sounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {natureSounds.map((sound) => (
            <div
              key={sound.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sound.image}
                  alt={sound.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${sound.color} opacity-60`}></div>
                
                {/* Play Button */}
                <button
                  onClick={() => handlePlayPause(sound.id)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    {playingId === sound.id ? (
                      <Pause className="w-8 h-8 text-gray-700" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-700 ml-1" />
                    )}
                  </div>
                </button>

                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <span className="text-3xl">{sound.icon}</span>
                </div>

                {/* Playing Indicator */}
                {playingId === sound.id && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{sound.title}</h3>
                <p className="text-gray-600 text-sm">{sound.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6">
          <h3 className="font-semibold text-emerald-700 mb-4 text-xl">🌱 Benefits of Nature Sounds</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-emerald-600 mb-2">Stress Reduction</h4>
              <p className="text-sm text-emerald-500">
                Natural sounds activate the parasympathetic nervous system, promoting relaxation and reducing cortisol levels.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-600 mb-2">Better Sleep</h4>
              <p className="text-sm text-emerald-500">
                Consistent nature sounds can mask disruptive noises and create a peaceful environment for deeper sleep.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-600 mb-2">Enhanced Focus</h4>
              <p className="text-sm text-emerald-500">
                Gentle nature sounds can improve concentration and cognitive performance by reducing mental fatigue.
              </p>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">💡 Tips for Best Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Use headphones for immersive experience</li>
              <li>• Start with lower volume and adjust gradually</li>
              <li>• Combine with breathing exercises for deeper relaxation</li>
            </ul>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Listen for 10-20 minutes for optimal benefits</li>
              <li>• Create a comfortable, distraction-free environment</li>
              <li>• Try different sounds to find your favorites</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}