export const moodEmojis = [
  { emoji: '😊', label: 'Happy', value: 5 },
  { emoji: '😌', label: 'Calm', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😔', label: 'Sad', value: 2 },
  { emoji: '😰', label: 'Anxious', value: 1 },
  { emoji: '😴', label: 'Tired', value: 2 },
  { emoji: '🤗', label: 'Grateful', value: 5 },
  { emoji: '😤', label: 'Frustrated', value: 2 },
];

export const moodResponses = {
  5: "That's wonderful! Your positive energy is shining bright today. Keep spreading those good vibes! ✨",
  4: "Beautiful! A calm mind is a powerful mind. Take a moment to appreciate this peaceful feeling. 🌸",
  3: "Neutral days are perfectly okay. Sometimes we just need to be present and that's enough. 🌿",
  2: "I hear you. It's okay to have difficult moments. Remember, this feeling is temporary and you're stronger than you know. 💙",
  1: "Thank you for sharing how you're feeling. Take some deep breaths and be gentle with yourself today. You're not alone. 🤗",
};

// Utility function to get today's date in YYYY-MM-DD format
export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Utility function to get date N days ago in YYYY-MM-DD format
export const getDateNDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Utility function to check if two dates are the same day
export const isSameDay = (date1: string, date2: string): boolean => {
  return date1.split('T')[0] === date2.split('T')[0];
};

// Utility function to check if a date is within the last N days
export const isWithinLastNDays = (dateString: string, days: number): boolean => {
  const date = new Date(dateString);
  const nDaysAgo = new Date();
  nDaysAgo.setDate(nDaysAgo.getDate() - days);
  return date >= nDaysAgo;
};