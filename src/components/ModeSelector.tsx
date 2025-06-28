import React from 'react';
import { TimerMode } from '../types/timer';

interface ModeSelectorProps {
  modes: TimerMode[];
  currentMode: TimerMode;
  onModeSelect: (mode: TimerMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  modes,
  currentMode,
  onModeSelect
}) => {
  return (
    <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeSelect(mode)}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out
            ${currentMode.id === mode.id
              ? 'text-white shadow-lg transform scale-105'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
          style={{
            backgroundColor: currentMode.id === mode.id ? mode.color : 'transparent',
            boxShadow: currentMode.id === mode.id ? `0 4px 15px ${mode.color}40` : 'none'
          }}
        >
          {mode.name}
        </button>
      ))}
    </div>
  );
};