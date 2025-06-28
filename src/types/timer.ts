export interface TimerMode {
  id: string;
  name: string;
  duration: number; // in minutes
  color: string;
  description: string;
}

export interface TimerSettings {
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  notifications: boolean;
  soundEnabled: boolean;
  volume: number;
  theme: 'light' | 'dark' | 'auto';
}

export interface SessionStats {
  completedPomodoros: number;
  totalFocusTime: number; // in minutes
  currentStreak: number;
  todaysSessions: number;
}