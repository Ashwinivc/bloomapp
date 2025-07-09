import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, User, MoodEntry, Habit, JournalEntry, ChatMessage, Theme } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { trackPageView, trackWellnessEvent } from '../utils/analytics';
import { moodEmojis, getTodayDateString, isWithinLastNDays } from '../utils/constants';

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
  | { type: 'RESET_APP_STATE' }
  | { type: 'LOAD_STATE'; payload: AppState };

const initialState: AppState = {
  user: null,
  currentScreen: 'login',
  lastActiveDate: getTodayDateString(),
  moodEntries: [],
  habits: [
    { id: '1', name: 'Drink Water', completed: false, streak: 0, lastCompletedDate: undefined },
    { id: '2', name: 'Stretch', completed: false, streak: 0, lastCompletedDate: undefined },
    { id: '3', name: 'Journal', completed: false, streak: 0, lastCompletedDate: undefined },
  ],
  journalEntries: [],
  bloomScore: { mood: 0, habits: 0, reflection: 0, overall: 0 },
  chatMessages: [],
  selectedTheme: 'calm-forest',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_SCREEN':
      return { ...state, currentScreen: action.payload };
    case 'ADD_MOOD_ENTRY':
      return { ...state, moodEntries: [...state.moodEntries, action.payload] };
    case 'TOGGLE_HABIT':
      const today = getTodayDateString();
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload
            ? { 
                ...habit, 
                completed: !habit.completed,
                lastCompletedDate: !habit.completed ? new Date().toISOString() : undefined,
                streak: !habit.completed ? habit.streak + 1 : 0
              }
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
      // Calculate habit score based on today's completed habits
      const completedHabits = state.habits.filter(h => h.completed).length;
      const totalHabits = state.habits.length;
      const habitScore = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
      
      // Calculate mood score based on last 7 days
      const recentMoodEntries = state.moodEntries.filter(entry => 
        isWithinLastNDays(entry.date, 7)
      );
      
      let avgMoodValue = 0;
      if (recentMoodEntries.length > 0) {
        const totalMoodValue = recentMoodEntries.reduce((sum, entry) => {
          const moodData = moodEmojis.find(mood => mood.emoji === entry.emoji);
          return sum + (moodData?.value || 3); // Default to neutral if not found
        }, 0);
        avgMoodValue = totalMoodValue / recentMoodEntries.length;
      }
      const moodScore = avgMoodValue > 0 ? (avgMoodValue / 5) * 100 : 0;
      
      // Calculate reflection score based on journal entries in last 7 days
      const recentJournalEntries = state.journalEntries.filter(entry => 
        isWithinLastNDays(entry.date, 7)
      );
      const journalScore = Math.min(recentJournalEntries.length * 20, 100);
      
      // Calculate overall score
      const overall = (moodScore + habitScore + journalScore) / 3;
      
      return {
        ...state,
        bloomScore: {
          mood: Math.round(moodScore),
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
  const [storedState, setStoredState] = useLocalStorage<AppState>('dailyBloomAppState', initialState);
  const [state, dispatch] = useReducer(appReducer, storedState);

  // Load stored state on mount
  useEffect(() => {
    if (storedState && storedState !== initialState) {
      const today = getTodayDateString();
      let loadedState = { ...storedState };
      
      // Check if it's a new day and reset daily progress
      if (!storedState.lastActiveDate || storedState.lastActiveDate !== today) {
        loadedState = {
          ...storedState,
          lastActiveDate: today,
          habits: storedState.habits.map(habit => ({
            ...habit,
            completed: false, // Reset daily completion status
            // Keep streak and lastCompletedDate intact for historical tracking
          })),
        };
      }
      
      dispatch({ type: 'LOAD_STATE', payload: loadedState });
    }
  }, [storedState]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  const setUser = (user: User) => dispatch({ type: 'SET_USER', payload: user });
  
  const setCurrentScreen = (screen: string) => {
    dispatch({ type: 'SET_CURRENT_SCREEN', payload: screen });
    trackPageView(screen);
  };
  
  const addMoodEntry = (entry: MoodEntry) => {
    dispatch({ type: 'ADD_MOOD_ENTRY', payload: entry });
    trackWellnessEvent.moodEntry(entry.emoji);
  };
  
  const toggleHabit = (habitId: string) => {
    const habit = state.habits.find(h => h.id === habitId);
    if (habit && !habit.completed) {
      trackWellnessEvent.habitCompleted(habit.name);
    }
    dispatch({ type: 'TOGGLE_HABIT', payload: habitId });
  };
  
  const addJournalEntry = (entry: JournalEntry) => {
    dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: entry });
    trackWellnessEvent.journalEntry();
  };
  
  const addChatMessage = (message: ChatMessage) => {
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });
    if (message.isUser) {
      trackWellnessEvent.aiCoachInteraction();
    }
  };
  
  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    trackWellnessEvent.themeChanged(theme);
  };
  
  const updateBloomScore = () => dispatch({ type: 'UPDATE_BLOOM_SCORE' });
  
  const resetAppState = () => {
    dispatch({ type: 'RESET_APP_STATE' });
    setStoredState(initialState);
  };

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