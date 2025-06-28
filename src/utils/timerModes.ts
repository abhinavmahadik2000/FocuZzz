import { TimerMode } from '../types/timer';

export const TIMER_MODES: TimerMode[] = [
  {
    id: 'pomodoro',
    name: 'Focus',
    duration: 25,
    color: '#EF4444',
    description: 'Time to focus and get work done'
  },
  {
    id: 'shortBreak',
    name: 'Short Break',
    duration: 5,
    color: '#10B981',
    description: 'Take a quick breather'
  },
  {
    id: 'longBreak',
    name: 'Long Break',
    duration: 15,
    color: '#3B82F6',
    description: 'Relax and recharge'
  },
  {
    id: 'custom',
    name: 'Custom',
    duration: 30,
    color: '#8B5CF6',
    description: 'Set your own timer'
  }
];

export const getNextMode = (currentMode: string, completedPomodoros: number, longBreakInterval: number): string => {
  if (currentMode === 'pomodoro') {
    return completedPomodoros % longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
  }
  return 'pomodoro';
};