import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  color: string;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
  color
}) => {
  const buttonClass = `
    p-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 
    active:scale-95 shadow-lg hover:shadow-xl backdrop-blur-sm
  `;

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={onReset}
        className={`${buttonClass} bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`}
      >
        <RotateCcw size={24} />
      </button>
      
      <button
        onClick={isRunning ? onPause : onStart}
        className={`${buttonClass} text-white`}
        style={{
          backgroundColor: color,
          boxShadow: `0 8px 25px ${color}40`
        }}
      >
        {isRunning ? <Pause size={32} /> : <Play size={32} />}
      </button>
      
      <button
        onClick={onSkip}
        className={`${buttonClass} bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`}
      >
        <SkipForward size={24} />
      </button>
    </div>
  );
};