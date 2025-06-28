import React from 'react';
import { Target, Clock, Flame, Trophy } from 'lucide-react';
import { SessionStats } from '../types/timer';

interface SessionStatsProps {
  stats: SessionStats;
  currentMode: string;
}

export const SessionStatsComponent: React.FC<SessionStatsProps> = ({ stats, currentMode }) => {
  const statItems = [
    {
      icon: Target,
      label: 'Completed',
      value: stats.completedPomodoros,
      color: '#EF4444'
    },
    {
      icon: Clock,
      label: 'Focus Time',
      value: `${stats.totalFocusTime}m`,
      color: '#10B981'
    },
    {
      icon: Flame,
      label: 'Streak',
      value: stats.currentStreak,
      color: '#F59E0B'
    },
    {
      icon: Trophy,
      label: 'Today',
      value: stats.todaysSessions,
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center space-x-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <item.icon size={20} style={{ color: item.color }} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {item.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};