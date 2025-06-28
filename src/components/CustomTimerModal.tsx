import React, { useState } from 'react';
import { X, Clock, Plus, Minus } from 'lucide-react';

interface CustomTimerModalProps {
  onClose: () => void;
  onSetTimer: (minutes: number) => void;
  currentDuration: number;
}

export const CustomTimerModal: React.FC<CustomTimerModalProps> = ({
  onClose,
  onSetTimer,
  currentDuration
}) => {
  const [duration, setDuration] = useState(currentDuration);

  const handleSubmit = () => {
    if (duration > 0 && duration <= 180) {
      onSetTimer(duration);
    }
  };

  const adjustDuration = (amount: number) => {
    const newDuration = Math.max(1, Math.min(180, duration + amount));
    setDuration(newDuration);
  };

  const presetDurations = [5, 10, 15, 25, 30, 45, 60, 90];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Custom Timer</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Duration Input */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => adjustDuration(-5)}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Minus size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, Math.min(180, Number(e.target.value))))}
                  className="w-20 text-3xl font-bold text-center bg-transparent border-b-2 border-purple-500 text-gray-800 dark:text-white focus:outline-none focus:border-purple-600"
                  min="1"
                  max="180"
                />
                <span className="text-lg text-gray-500 dark:text-gray-400">min</span>
              </div>
              
              <button
                onClick={() => adjustDuration(5)}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Plus size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => adjustDuration(-1)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                -1
              </button>
              <button
                onClick={() => adjustDuration(1)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                +1
              </button>
            </div>
          </div>

          {/* Preset Durations */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Quick Presets</h3>
            <div className="grid grid-cols-4 gap-2">
              {presetDurations.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setDuration(preset)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    duration === preset
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {preset}m
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-4 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors duration-200 shadow-lg"
            >
              Set Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};