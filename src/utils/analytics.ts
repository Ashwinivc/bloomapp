// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-495897016'; // Replace with your actual Measurement ID

// Initialize Google Analytics
export const initGA = (measurementId: string = GA_MEASUREMENT_ID) => {
  // Create script tag for Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Configure Google Analytics
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: 'Daily Bloom Wellness App',
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (pageName: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'wellness_app',
      event_label: 'daily_bloom',
      ...parameters,
    });
  }
};

// Track wellness-specific events
export const trackWellnessEvent = {
  moodEntry: (mood: string) => {
    trackEvent('mood_entry', {
      event_category: 'wellness',
      mood_type: mood,
    });
  },
  
  habitCompleted: (habitName: string) => {
    trackEvent('habit_completed', {
      event_category: 'wellness',
      habit_name: habitName,
    });
  },
  
  journalEntry: () => {
    trackEvent('journal_entry', {
      event_category: 'wellness',
    });
  },
  
  bloomScoreViewed: (score: number) => {
    trackEvent('bloom_score_viewed', {
      event_category: 'wellness',
      score_value: score,
    });
  },
  
  aiCoachInteraction: () => {
    trackEvent('ai_coach_interaction', {
      event_category: 'wellness',
    });
  },
  
  relaxationActivity: (activityType: string) => {
    trackEvent('relaxation_activity', {
      event_category: 'wellness',
      activity_type: activityType,
    });
  },
  
  themeChanged: (themeName: string) => {
    trackEvent('theme_changed', {
      event_category: 'customization',
      theme_name: themeName,
    });
  },
};