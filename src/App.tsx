import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './components/ThemeProvider';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { MoodScreen } from './components/screens/MoodScreen';
import { HabitScreen } from './components/screens/HabitScreen';
import { JournalScreen } from './components/screens/JournalScreen';
import { BloomScoreScreen } from './components/screens/BloomScoreScreen';
import { AICoachScreen } from './components/screens/AICoachScreen';
import { ThemeScreen } from './components/screens/ThemeScreen';
import { RelaxationScreen } from './components/screens/RelaxationScreen';
import { BreathingExerciseScreen } from './components/screens/BreathingExerciseScreen';
import { NatureSoundsScreen } from './components/screens/NatureSoundsScreen';
import { MindfulReadingScreen } from './components/screens/MindfulReadingScreen';
import { TipScreen } from './components/screens/TipScreen';
import { PrivacyPolicyScreen } from './components/screens/PrivacyPolicyScreen';

function AppContent() {
  const { state } = useApp();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'mood':
        return <MoodScreen />;
      case 'habits':
        return <HabitScreen />;
      case 'journal':
        return <JournalScreen />;
      case 'score':
        return <BloomScoreScreen />;
      case 'coach':
        return <AICoachScreen />;
      case 'themes':
        return <ThemeScreen />;
      case 'relaxation':
        return <RelaxationScreen />;
      case 'breathing':
        return <BreathingExerciseScreen />;
      case 'nature':
        return <NatureSoundsScreen />;
      case 'reading':
        return <MindfulReadingScreen />;
      case 'tip':
        return <TipScreen />;
      case 'privacy-policy':
        return <PrivacyPolicyScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <ThemeProvider>
      {renderScreen()}
    </ThemeProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;