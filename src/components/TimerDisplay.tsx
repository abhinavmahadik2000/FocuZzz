import React from 'react';
import { ProgressCircle } from './ProgressCircle';

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  color: string;
  mode: string;
  isRunning: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  progress,
  color,
  mode,
  isRunning
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <ProgressCircle progress={progress} color={color}>
        <div className="text-center">
          <div 
            className={`text-6xl font-bold tracking-wider transition-all duration-300 ${
              isRunning ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
            style={{ 
              textShadow: isRunning ? `0 0 20px ${color}40` : 'none',
              animation: isRunning ? 'pulse 2s infinite' : 'none'
            }}
          >
            {formatTime(timeLeft)}
          </div>
          <div 
            className="text-lg font-medium capitalize tracking-wide mt-2 transition-colors duration-300"
            style={{ color }}
          >
            {mode.replace(/([A-Z])/g, ' $1').trim()}
          </div>
        </div>
      </ProgressCircle>
    </div>
  );
};