"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export function SixFinanceLoader({ message = "Loading...", size = 'medium', fullScreen = false }: LoaderProps) {
  const sizeClasses = {
    small: { container: 'w-16 h-16', text: 'text-xs' },
    medium: { container: 'w-24 h-24', text: 'text-sm' },
    large: { container: 'w-32 h-32', text: 'text-base' }
  };

  const currentSize = sizeClasses[size];

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Six Finance Logo Loader */}
      <motion.div 
        className={currentSize.container}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Outer rotating circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="220 80"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: '50% 50%' }}
          />
          
          {/* Middle rotating circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="180 80"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: '50% 50%' }}
          />

          {/* Inner pulsing circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="25"
            fill="url(#gradient3)"
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: '50% 50%' }}
          />

          {/* Number "6" in center */}
          <motion.text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="32"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            6
          </motion.text>

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <radialGradient id="gradient3">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Loading text with animated dots */}
      <motion.div 
        className="flex items-center gap-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <span className={`font-semibold text-gray-700 ${currentSize.text}`}>
          {message}
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="text-teal-600 font-bold"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            >
              .
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div 
        className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
}

// Compact inline loader for buttons and small spaces
export function InlineLoader({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`animate-spin ${className}`} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="50 30"
        className="opacity-25"
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="50 30"
        strokeDashoffset="0"
      />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize="10"
        fontWeight="bold"
      >
        6
      </text>
    </svg>
  );
}

// Section loader for page sections
export function SectionLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <SixFinanceLoader message={message} size="medium" />
    </div>
  );
}

// Full page loader
export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return <SixFinanceLoader message={message} size="large" fullScreen />;
}
