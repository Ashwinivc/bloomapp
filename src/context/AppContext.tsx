import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, MoodEntry, Habit, JournalEntry, ChatMessage, Theme } from '../types';

interface AppContextType {
  state: AppState;
  setUser: (user: User) => void;
  setCurrentScreen: (screen: string) => void;
  addMoodEntry: (entry: MoodEntry) => void;
  toggleHabit: (habitId: string) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  addChatMessage: (message: ChatMessage) => void;
  setTheme: (theme: Theme) => void;
  updateBloomScore: () => void;
  resetAppState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CURRENT_SCREEN'; payload: string }
  | { type: 'ADD_MOOD_ENTRY'; payload: MoodEntry }
  | { type: 'TOGGLE_HABIT'; payload: string }
  | { type: 'ADD_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'UPDATE_BLOOM_SCORE' }
  | { type: 'RESET_APP_STATE' };

const initialState: AppState = {
  user: null,
  currentScreen: 'login',
  moodEntries: [],
  habits: [
    { id: '1', name: 'Drink Water', completed: false, streak: 0 },
    { id: '2', name: 'Stretch', completed: false, streak: 0 },
    { id: '3', name: 'Journal', completed: false, streak: 0 },
  ],
  journalEntries: [],
  bloomScore: { mood: 0, habits: 0, reflection: 0, overall: 0 },
  chatMessages: [],
  selectedTheme: 'calm-forest',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_SCREEN':
      return { ...state, currentScreen: action.payload };
    case 'ADD_MOOD_ENTRY':
      return { ...state, moodEntries: [...state.moodEntries, action.payload] };
    case 'TOGGLE_HABIT':
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload
            ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 }
            : habit
        ),
      };
    case 'ADD_JOURNAL_ENTRY':
      return { ...state, journalEntries: [...state.journalEntries, action.payload] };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'SET_THEME':
      return { ...state, selectedTheme: action.payload };
    case 'UPDATE_BLOOM_SCORE':
      const completedHabits = state.habits.filter(h => h.completed).length;
      const totalHabits = state.habits.length;
      const recentMood = state.moodEntries.slice(-7);
      const avgMood = recentMood.length > 0 ? (recentMood.length / 7) * 100 : 0;
      const journalScore = state.journalEntries.length > 0 ? Math.min(state.journalEntries.length * 10, 100) : 0;
      
      const habitScore = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
      const overall = (avgMood + habitScore + journalScore) / 3;
      
      return {
        ...state,
        bloomScore: {
          mood: Math.round(avgMood),
          habits: Math.round(habitScore),
          reflection: Math.round(journalScore),
          overall: Math.round(overall),
        },
      };
    case 'RESET_APP_STATE':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user: User) => dispatch({ type: 'SET_USER', payload: user });
  const setCurrentScreen = (screen: string) => dispatch({ type: 'SET_CURRENT_SCREEN', payload: screen });
  const addMoodEntry = (entry: MoodEntry) => dispatch({ type: 'ADD_MOOD_ENTRY', payload: entry });
  const toggleHabit = (habitId: string) => dispatch({ type: 'TOGGLE_HABIT', payload: habitId });
  const addJournalEntry = (entry: JournalEntry) => dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: entry });
  const addChatMessage = (message: ChatMessage) => dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });
  const setTheme = (theme: Theme) => dispatch({ type: 'SET_THEME', payload: theme });
  const updateBloomScore = () => dispatch({ type: 'UPDATE_BLOOM_SCORE' });
  const resetAppState = () => dispatch({ type: 'RESET_APP_STATE' });

  return (
    <AppContext.Provider
      value={{
        state,
        setUser,
        setCurrentScreen,
        addMoodEntry,
        toggleHabit,
        addJournalEntry,
        addChatMessage,
        setTheme,
        updateBloomScore,
        resetAppState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}