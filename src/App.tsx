import React, { useState, useEffect } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { ModeSelector } from './components/ModeSelector';
import { Controls } from './components/Controls';
import { SessionStatsComponent } from './components/SessionStats';
import { Settings } from './components/Settings';
import { CustomTimerModal } from './components/CustomTimerModal';
import { DynamicBackground } from './components/DynamicBackground';
import { useTimer } from './hooks/useTimer';
import { TIMER_MODES } from './utils/timerModes';
import { TimerSettings } from './types/timer';
import { Timer, Brain, Sparkles } from 'lucide-react';

function App() {
  const [settings, setSettings] = useState<TimerSettings>({
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
    notifications: true,
    soundEnabled: true,
    volume: 50,
    theme: 'light'
  });

  const [showCustomModal, setShowCustomModal] = useState(false);

  const {
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
    setCustomDuration,
  } = useTimer(TIMER_MODES[0]);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // Auto theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  const handleModeSelect = (mode: any) => {
    if (mode.id === 'custom') {
      setShowCustomModal(true);
    } else {
      setMode(mode);
    }
  };

  const handleCustomTimerSet = (minutes: number) => {
    setCustomDuration(minutes);
    setShowCustomModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FocuZzz
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Study Timer & Productivity</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Settings settings={settings} onSettingsChange={setSettings} />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-12">
          {/* Mode Description */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {currentMode.description}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              {currentMode.id === 'pomodoro' && 'Focus deeply on your most important task'}
              {currentMode.id === 'shortBreak' && 'Take a quick break to refresh your mind'}
              {currentMode.id === 'longBreak' && 'Time for a longer break to fully recharge'}
              {currentMode.id === 'custom' && `Work at your own pace with a ${currentMode.duration} minute timer`}
            </p>
          </div>

          {/* Mode Selector */}
          <ModeSelector
            modes={TIMER_MODES}
            currentMode={currentMode}
            onModeSelect={handleModeSelect}
          />

          {/* Timer Display */}
          <TimerDisplay
            timeLeft={timeLeft}
            progress={progress}
            color={currentMode.color}
            mode={currentMode.name}
            isRunning={isRunning}
          />

          {/* Controls */}
          <Controls
            isRunning={isRunning}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            onSkip={skipTimer}
            color={currentMode.color}
          />

          {/* Session Stats */}
          <SessionStatsComponent stats={sessionStats} currentMode={currentMode.id} />
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Built with focus and dedication • Stay productive • Abhinav
          </p>
        </footer>
      </div>

      {/* Custom Timer Modal */}
      {showCustomModal && (
        <CustomTimerModal
          onClose={() => setShowCustomModal(false)}
          onSetTimer={handleCustomTimerSet}
          currentDuration={currentMode.id === 'custom' ? currentMode.duration : 30}
        />
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(-20px) translateX(10px) scale(1.05);
          }
          66% {
            transform: translateY(10px) translateX(-5px) scale(0.95);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% {
            transform: translateY(15px) translateX(-10px) scale(1.1);
          }
          66% {
            transform: translateY(-10px) translateX(15px) scale(0.9);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) translateX(20px) rotate(5deg);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(25px) translateX(-15px) scale(1.15);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-15px) translateX(8px);
          }
          75% {
            transform: translateY(8px) translateX(-12px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes ping-delayed {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes ping-fast {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        
        @keyframes wave-reverse {
          0%, 100% {
            transform: translateX(100%);
          }
          50% {
            transform: translateX(-100%);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-delayed {
          animation: ping-delayed 4s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 1s;
        }
        
        .animate-ping-fast {
          animation: ping-fast 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 0.5s;
        }
        
        .animate-wave {
          animation: wave 15s ease-in-out infinite;
        }
        
        .animate-wave-reverse {
          animation: wave-reverse 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;