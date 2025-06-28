import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, SessionStats } from '../types/timer';

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  currentMode: TimerMode;
  progress: number;
  sessionStats: SessionStats;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  setMode: (mode: TimerMode) => void;
  setCustomDuration: (minutes: number) => void;
}

export const useTimer = (initialMode: TimerMode): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialMode.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    completedPomodoros: 0,
    totalFocusTime: 0,
    currentStreak: 0,
    todaysSessions: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef(initialMode.duration * 60);
  const audioContextRef = useRef<AudioContext | null>(null);

  const progress = ((initialTimeRef.current - timeLeft) / initialTimeRef.current) * 100;

  // Create audio context and play completion sound
  const playCompletionSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      
      // Create a pleasant completion melody
      const playNote = (frequency: number, startTime: number, duration: number, volume: number = 0.1) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      const now = audioContext.currentTime;
      
      // Play a pleasant ascending melody
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((frequency, index) => {
        playNote(frequency, now + index * 0.2, 0.4, 0.08);
      });
      
      // Add a final sustained note
      playNote(1046.50, now + 0.8, 0.8, 0.06);
      
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, []);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(currentMode.duration * 60);
    initialTimeRef.current = currentMode.duration * 60;
  }, [currentMode.duration]);

  const skipTimer = useCallback(() => {
    setTimeLeft(0);
  }, []);

  const setMode = useCallback((mode: TimerMode) => {
    setCurrentMode(mode);
    setTimeLeft(mode.duration * 60);
    initialTimeRef.current = mode.duration * 60;
    setIsRunning(false);
  }, []);

  const setCustomDuration = useCallback((minutes: number) => {
    const newMode = { 
      ...currentMode, 
      duration: minutes,
      id: 'custom',
      name: 'Custom',
      color: '#8B5CF6',
      description: `Custom ${minutes} minute timer`
    };
    setCurrentMode(newMode);
    setTimeLeft(minutes * 60);
    initialTimeRef.current = minutes * 60;
    setIsRunning(false);
  }, [currentMode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            
            // Play completion sound
            playCompletionSound();
            
            // Update session stats
            if (currentMode.id === 'pomodoro') {
              setSessionStats(stats => ({
                ...stats,
                completedPomodoros: stats.completedPomodoros + 1,
                totalFocusTime: stats.totalFocusTime + currentMode.duration,
                currentStreak: stats.currentStreak + 1,
                todaysSessions: stats.todaysSessions + 1
              }));
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentMode, playCompletionSound]);

  return {
    timeLeft,
    isRunning,
    currentMode,
    progress,
    sessionStats,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    setMode,
    setCustomDuration
  };
};