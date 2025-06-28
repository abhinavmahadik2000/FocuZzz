import React from 'react';

export const DynamicBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs with different animations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"></div>
      
      <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-600 dark:to-orange-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-60 animate-float-delayed"></div>
      
      <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-50 animate-float-slow"></div>
      
      <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-gradient-to-r from-green-400 to-teal-400 dark:from-green-600 dark:to-teal-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-40 animate-float-reverse"></div>
      
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-rose-400 to-pink-400 dark:from-rose-600 dark:to-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-60 animate-float-fast"></div>

      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-300 to-blue-300 dark:from-purple-500 dark:to-blue-500 opacity-20 rotate-45 animate-spin-slow"></div>
      
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-300 to-red-300 dark:from-yellow-500 dark:to-red-500 opacity-30 rounded-full animate-bounce-slow"></div>

      {/* Particle-like dots */}
      <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-purple-400 dark:bg-purple-300 rounded-full opacity-60 animate-ping-slow"></div>
      <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-blue-400 dark:bg-blue-300 rounded-full opacity-50 animate-ping-delayed"></div>
      <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-pink-400 dark:bg-pink-300 rounded-full opacity-40 animate-ping-fast"></div>
      
      {/* Gradient waves */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100 to-transparent dark:via-purple-900 opacity-30 animate-wave"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-100 to-transparent dark:via-blue-900 opacity-20 animate-wave-reverse"></div>
    </div>
  );
};