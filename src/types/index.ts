export interface User {
  name: string;
  theme: string;
}

export interface MoodEntry {
  id: string;
  emoji: string;
  date: string;
  note?: string;
}

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  lastCompletedDate?: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  date: string;
}

export interface BloomScore {
  mood: number;
  habits: number;
  reflection: number;
  overall: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export type Theme = 'calm-forest' | 'floral-bliss' | 'sunrise-glow';

export interface AppState {
  user: User | null;
  currentScreen: string;
  lastActiveDate?: string;
  moodEntries: MoodEntry[];
  habits: Habit[];
  journalEntries: JournalEntry[];
  bloomScore: BloomScore;
  chatMessages: ChatMessage[];
  selectedTheme: Theme;
}