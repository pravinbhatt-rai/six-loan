"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration ---
const BRAND_COLORS = {
  primary: "from-cyan-500 to-blue-600",
  secondary: "from-teal-400 to-emerald-500",
  accent: "from-violet-500 to-purple-600",
  glow: "via-cyan-400/30 to-blue-500/20"
};

// --- Futuristic Finance Messages ---
const FINANCE_MESSAGES = [
  "Quantum Computing Portfolio...",
  "Syncing Blockchain Nodes...",
  "Processing Alpha Signals...",
  "Executing Smart Contracts...",
  "Analyzing Market Trends...",
  "Optimizing Risk Matrix...",
  "Calibrating AI Predictions...",
  "Validating Crypto Assets..."
];

// --- 1. Enhanced Die Component with Glow Effects ---
const Die = ({ value, delay, isJackpot = false }: { value: number; delay: number; isJackpot?: boolean }) => {
  return (
    <motion.div
      className="relative"
      initial={{ y: -80, opacity: 0, rotate: 180 }}
      animate={{ 
        y: [0, -20, 0], 
        rotate: [0, 180, 360],
        scale: isJackpot ? [1, 1.2, 1] : 1
      }}
      transition={{ 
        duration: 0.8, 
        repeat: Infinity, 
        repeatDelay: 1.5,
        delay: delay,
        ease: "anticipate"
      }}
    >
      {/* Glow Effect */}
      {isJackpot && (
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-purple-500/20 rounded-2xl blur-xl"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {/* Main Die */}
      <div className="relative w-20 h-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col justify-between p-3 overflow-hidden">
        {/* 3D Edge Highlights */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <div className="absolute top-1 left-1 right-1 h-1 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full" />
        
        {/* Matrix-style grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,cyan_50%,transparent_51%)] bg-[length:20px_20px]" />
          <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,cyan_50%,transparent_51%)] bg-[length:20px_20px]" />
        </div>

        {/* Digital Glitch Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-50"
          animate={{ opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />

        {/* Dots with Glow */}
        <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-1 p-1">
          {[1, 2, 3, 4, 5, 6].map((position) => (
            <motion.div
              key={position}
              className={`
                ${getDotPositionClass(position)}
                flex items-center justify-center
              `}
            >
              {(getDotsForValue(value).includes(position)) && (
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1, 1] }}
                  transition={{ delay: delay + 0.1 }}
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${BRAND_COLORS.secondary} shadow-lg shadow-cyan-500/30`} />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-400/40 blur-sm" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Digital Value Display */}
        <motion.div 
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-bold text-white">{value}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Helper functions for die layout
const getDotPositionClass = (position: number) => {
  const positions: Record<number, string> = {
    1: "col-start-2 row-start-2",
    2: "col-start-1 row-start-1",
    3: "col-start-3 row-start-3",
    4: "col-start-3 row-start-1",
    5: "col-start-1 row-start-3",
    6: "col-start-2 row-start-1",
  };
  return positions[position] || "";
};

const getDotsForValue = (value: number): number[] => {
  const dotMap: Record<number, number[]> = {
    1: [1],
    2: [2, 3],
    3: [2, 1, 3],
    4: [2, 4, 5, 3],
    5: [2, 4, 1, 5, 3],
    6: [2, 4, 6, 5, 3, 1],
  };
  return dotMap[value] || [];
};

// --- 2. Main Loader Component ---
export function SixFinanceDiceLoader({ fullScreen = false }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [diceValues, setDiceValues] = useState([6, 6, 6]);
  const [isJackpot, setIsJackpot] = useState(false);

  // Cycle messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % FINANCE_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animate dice values
  useEffect(() => {
    let jackpotCount = 0;
    const interval = setInterval(() => {
      setDiceValues(prev => {
        const shouldJackpot = Math.random() > 0.8;
        
        if (shouldJackpot) {
          jackpotCount++;
          if (jackpotCount === 3) {
            setIsJackpot(true);
            setTimeout(() => setIsJackpot(false), 1000);
            jackpotCount = 0;
          }
          return [6, 6, 6];
        }
        
        return [
          Math.ceil(Math.random() * 6),
          Math.ceil(Math.random() * 6),
          Math.ceil(Math.random() * 6)
        ];
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const content = (
    <div className="relative flex flex-col items-center justify-center p-8 text-center max-w-2xl w-full">
      {/* Animated Background Rings */}
      <div className="absolute -inset-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-500/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-500/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Logo/Title */}
      <motion.div
        className="mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
          SIX FINANCE
        </div>
        <div className="text-sm text-slate-400 font-mono">QUANTUM FINANCIAL ENGINE</div>
      </motion.div>

      {/* Dice Container with Connection Lines */}
      <div className="relative mb-12 flex items-center justify-center">
        {/* Connection Lines */}
        <svg className="absolute w-full h-20" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <motion.path
            d="M 100 40 Q 200 20 300 40"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 5"
            animate={{ strokeDashoffset: [0, 30] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 100 40 Q 200 60 300 40"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 5"
            animate={{ strokeDashoffset: [30, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dice */}
        <div className="flex gap-8 z-10">
          {diceValues.map((value, index) => (
            <Die 
              key={index} 
              value={value} 
              delay={index * 0.2} 
              isJackpot={isJackpot && value === 6}
            />
          ))}
        </div>
      </div>

      {/* Animated Text Container */}
      <div className="relative h-16 mb-8 w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -30, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <p className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-slate-100 bg-clip-text text-transparent">
                {FINANCE_MESSAGES[messageIndex]}
              </p>
              {/* Typing cursor effect */}
              <motion.div
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-cyan-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Progress indicator dots */}
        <div className="flex justify-center gap-2 mt-4">
          {FINANCE_MESSAGES.map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full ${idx === messageIndex ? 'bg-cyan-400' : 'bg-slate-600'}`}
              animate={idx === messageIndex ? {
                scale: [1, 1.5, 1],
                boxShadow: ['0 0 0 0 rgba(34, 211, 238, 0)', '0 0 0 4px rgba(34, 211, 238, 0.3)', '0 0 0 0 rgba(34, 211, 238, 0)']
              } : {}}
              transition={idx === messageIndex ? { duration: 1.5, repeat: Infinity } : {}}
            />
          ))}
        </div>
      </div>

      {/* Futuristic Progress Bar */}
      <div className="relative w-64 h-2 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-full overflow-hidden border border-slate-700/30">
        <motion.div 
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30"
          initial={{ left: "-33%" }}
          animate={{ left: ["-33%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-purple-500/20 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Scrolling binary code */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div 
            className="absolute inset-0 text-[8px] font-mono text-cyan-300/20 whitespace-nowrap"
            animate={{ x: [0, -100] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            01100110 01101001 01101110 01100001 01101110 01100011 01100101 
          </motion.div>
        </div>
      </div>

      {/* Stats Display */}
      <motion.div 
        className="mt-8 flex gap-6 text-sm font-mono text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>LIVE DATA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>ENCRYPTED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>AI ACTIVE</span>
        </div>
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-9999 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,#0f172a_50%,transparent_51%)] bg-[length:50px_50px] opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,#0f172a_50%,transparent_51%)] bg-[length:50px_50px] opacity-20" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {content}
      </motion.div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800/50 shadow-2xl shadow-blue-900/20 overflow-hidden">
      {content}
    </div>
  );
}

// --- 3. Background Hex Grid for Fullscreen ---
const HexGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3 25V75L50 100L6.7 75V25L50 0ZM50 10L13.4 32.5V67.5L50 90L86.6 67.5V32.5L50 10Z' fill='%2322d3ee' fill-opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }} />
    </div>
  );
};

// --- Exports ---
export function PageLoader() {
  return <SixFinanceDiceLoader fullScreen />;
}

export function SectionLoader() {
  return <SixFinanceDiceLoader />;
}

export function InlineLoader({ className = "" }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
        <motion.div 
          className="w-2 h-2 bg-white rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
      <div className="absolute -inset-2 border border-cyan-500/30 rounded-lg animate-pulse" />
    </motion.div>
  );
}

// Quick loading spinner for buttons/small elements
export function NanoLoader() {
  return (
    <motion.div 
      className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}