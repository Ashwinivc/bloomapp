import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const breathingPhases = [
  { phase: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose' },
  { phase: 'Hold', duration: 4, instruction: 'Hold your breath gently' },
  { phase: 'Exhale', duration: 6, instruction: 'Breathe out slowly through your mouth' },
  { phase: 'Rest', duration: 2, instruction: 'Rest and prepare for the next breath' },
];

export function BreathingExerciseScreen() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(breathingPhases[0].duration);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const { setCurrentScreen } = useApp();

  const currentPhase = breathingPhases[currentPhaseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      const nextPhaseIndex = (currentPhaseIndex + 1) % breathingPhases.length;
      
      if (nextPhaseIndex === 0) {
        // Completed a full round
        if (round >= totalRounds) {
          setIsActive(false);
          setRound(1);
          setCurrentPhaseIndex(0);
          setTimeLeft(breathingPhases[0].duration);
        } else {
          setRound(round + 1);
          setCurrentPhaseIndex(0);
          setTimeLeft(breathingPhases[0].duration);
        }
      } else {
        setCurrentPhaseIndex(nextPhaseIndex);
        setTimeLeft(breathingPhases[nextPhaseIndex].duration);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, currentPhaseIndex, round, totalRounds]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(breathingPhases[0].duration);
    setRound(1);
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Inhale': return 'from-sky-200 to-blue-300';
      case 'Hold': return 'from-violet-200 to-purple-300';
      case 'Exhale': return 'from-emerald-200 to-green-300';
      case 'Rest': return 'from-gray-400 to-gray-500';
      default: return 'from-sky-200 to-blue-300';
    }
  };

  const getCircleScale = () => {
    const progress = (breathingPhases[currentPhaseIndex].duration - timeLeft) / breathingPhases[currentPhaseIndex].duration;
    
    switch (currentPhase.phase) {
      case 'Inhale': return 0.5 + (progress * 0.5); // Scale from 0.5 to 1
      case 'Hold': return 1; // Stay at full size
      case 'Exhale': return 1 - (progress * 0.5); // Scale from 1 to 0.5
      case 'Rest': return 0.5; // Stay at small size
      default: return 0.5;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('relaxation')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🌬️ Breathe with Me</h1>
            <p className="text-gray-600">4-4-6-2 breathing pattern for relaxation</p>
          </div>
        </div>

        {/* Breathing Circle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              
              {/* Breathing circle */}
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${getPhaseColor(currentPhase.phase)} transition-transform duration-1000 ease-in-out`}
                style={{ 
                  transform: `scale(${getCircleScale()})`,
                  transformOrigin: 'center'
                }}
              ></div>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-4xl font-bold mb-2">{timeLeft}</div>
                <div className="text-lg font-medium">{currentPhase.phase}</div>
              </div>
            </div>

            {/* Phase instruction */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentPhase.phase}</h2>
            <p className="text-gray-600 mb-6">{currentPhase.instruction}</p>

            {/* Round counter */}
            <div className="text-lg font-medium text-gray-700 mb-6">
              Round {round} of {totalRounds}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleStartPause}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-rose-400 hover:bg-rose-500 text-white' 
                    : 'bg-emerald-400 hover:bg-emerald-500 text-white'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-xl font-semibold transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6">
          <h3 className="font-semibold text-sky-700 mb-4">🧘‍♀️ How to Practice</h3>
          <div className="space-y-3 text-sm text-sky-600">
            <div className="flex items-start">
              <span className="font-medium mr-2">1.</span>
              <span>Sit comfortably with your back straight and shoulders relaxed</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium mr-2">2.</span>
              <span>Follow the visual guide and breathe with the expanding circle</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium mr-2">3.</span>
              <span>Focus on the rhythm: Inhale (4s) → Hold (4s) → Exhale (6s) → Rest (2s)</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium mr-2">4.</span>
              <span>If your mind wanders, gently bring attention back to your breath</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}