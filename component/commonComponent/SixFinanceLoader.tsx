"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration ---
const BRAND_COLOR = "bg-teal-600"; // The color of the dots/brand
const DIE_SIZE = "w-16 h-16"; 

// --- Funny "Honest Finance" Messages ---
const FUNNY_MESSAGES = [
  "Consulting the probability gods...",
  "It's not gambling if we call it 'Strategy'...",
  "Rolling for Alpha...",
  "Cooking the... uh, calculating data...",
  "Hedging our bets...",
  "Searching for liquidity...",
  "Doing the math (fingers crossed)...",
];

// --- 1. Single Die Component ---
// Renders a die face based on a number (1-6)
const Die = ({ value, delay }: { value: number; delay: number }) => {
  // CSS Grid positions for the dots on a die
  const dotPositions: Record<number, string[]> = {
    1: ['justify-center items-center'], // Center
    2: ['justify-start items-start', 'justify-end items-end'], // Top-left, Bot-right
    3: ['justify-start items-start', 'justify-center items-center', 'justify-end items-end'],
    4: ['justify-start items-start', 'justify-end items-start', 'justify-start items-end', 'justify-end items-end'],
    5: ['justify-start items-start', 'justify-end items-start', 'justify-center items-center', 'justify-start items-end', 'justify-end items-end'],
    6: ['justify-start items-start', 'justify-end items-start', 'justify-start items-center', 'justify-end items-center', 'justify-start items-end', 'justify-end items-end'], // The Six Finance special
  };

  const currentDots = dotPositions[value] || dotPositions[6];

  return (
    <motion.div
      className={`${DIE_SIZE} bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] border-2 border-slate-100 flex flex-wrap content-between p-2 relative overflow-hidden`}
      initial={{ y: -50, opacity: 0, rotate: 180 }}
      animate={{ 
        y: [0, -30, 0], 
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 0.8, 
        repeat: Infinity, 
        repeatDelay: 1, // Pause after landing
        delay: delay,
        ease: "backOut" // Bouncy effect
      }}
    >
      {/* 3D edge effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-200/50 pointer-events-none" />

      {/* The Dots */}
      <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-1">
         {/* Mapping dots based on grid cells isn't perfect for dice, let's use absolute positioning logic or flex grids per dot */}
         {/* Simpler approach: Just render dots and let flex handle it? No, Dice need specific spots. */}
         {/* Let's use the layout classes defined above in a 3x3 grid for perfection */}
      </div>
      
      {/* Rendering Dots manually for clean Dice look */}
      <div className="absolute inset-2 flex flex-col justify-between">
         {/* Top Row */}
         <div className="flex justify-between">
            {(value > 1) && <div className={`w-3 h-3 rounded-full ${BRAND_COLOR}`} />}
            {(value > 3) && <div className={`w-3 h-3 rounded-full ${BRAND_COLOR}`} />}
         </div>
         {/* Middle Row */}
         <div className="flex justify-center">
            {(value === 1 || value === 3 || value === 5) && <div className={`w-3 h-3 rounded-full ${BRAND_COLOR}`} />}
            {(value === 6) && (
               <div className="w-full flex justify-between">
                  <div className={`w-3 h-3 rounded-full ${BRAND_COLOR}`} />
                  <div className={`w-3 h-3 rounded-full ${BRAND_COLOR}`} />
               </div>
            )}
         </div>
         {/* Bottom Row */}
         <div className="flex justify-between">
            {(value > 3) && <div className={`w-3 h-3 rounded-full ${BRAND_COLOR}`} />}
            {(value > 1) && <div className={`w-3 h-3 rounded-full ${BRAND_COLOR}`} />}
         </div>
      </div>
    </motion.div>
  );
};


// --- 2. Main Loader Component ---
export function SixFinanceDiceLoader({ fullScreen = false }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [diceValues, setDiceValues] = useState([1, 1, 1]);

  // Cycle messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Cycle Dice numbers quickly to simulate "rolling"
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomize values, but every 3rd tick force them all to be 6 (The Jackpot)
      setDiceValues(prev => {
        const isJackpot = Math.random() > 0.6;
        if(isJackpot) return [6,6,6];
        return [
           Math.ceil(Math.random() * 6),
           Math.ceil(Math.random() * 6),
           Math.ceil(Math.random() * 6)
        ];
      });
    }, 200); // Fast changing numbers
    return () => clearInterval(interval);
  }, []);

  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md w-full">
      
      {/* The Dice Container */}
      <div className="flex gap-4 mb-8 perspective-normal">
        <Die value={diceValues[0]} delay={0} />
        <Die value={diceValues[1]} delay={0.15} />
        <Die value={diceValues[2]} delay={0.3} />
      </div>

      {/* Shadow under dice */}
      <div className="flex gap-4 mb-8">
         {[0,1,2].map(i => (
             <motion.div 
               key={i}
               className="w-12 h-2 bg-black/10 rounded-[100%] blur-sm"
               animate={{ scale: [1, 0.5, 1], opacity: [0.3, 0.1, 0.3] }}
               transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "backOut" }}
             />
         ))}
      </div>

      {/* The Text */}
      <div className="h-12 relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="text-slate-600 font-bold text-lg italic">
              "{FUNNY_MESSAGES[messageIndex]}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar (Hidden inside a poker chip stack or simple bar) */}
      <div className="mt-4 w-48 h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
        <motion.div 
          className="h-full bg-teal-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div 
        className="fixed inset-0 bg-slate-50/95 backdrop-blur-md z-9999 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Floating background dice for extra "More Dice" request */}
        <BackgroundDice />
        {content}
      </motion.div>
    );
  }

  return <div className="flex items-center justify-center">{content}</div>;
}


// --- 3. Background Floating Dice (The "More Dice" visual noise) ---
const BackgroundDice = () => {
  const [randomDice, setRandomDice] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate random positions for background noise on client side only
    setRandomDice(Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 10 + 10
    })));
  }, []);

  if (randomDice.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      {randomDice.map((d) => (
        <motion.div
          key={d.id}
          className="absolute border border-slate-200 bg-white/40 rounded-lg flex items-center justify-center text-slate-300 font-bold"
          style={{ 
            left: `${d.x}%`, 
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            fontSize: d.size / 2
          }}
          animate={{ 
            y: [0, -100, 0], 
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: d.duration, repeat: Infinity, ease: "linear" }}
        >
          6
        </motion.div>
      ))}
    </div>
  );
};


// --- Exports ---

// Full Page
export function PageLoader() {
  return <SixFinanceDiceLoader fullScreen />;
}

// Section
export function SectionLoader() {
  return <SixFinanceDiceLoader />;
}

// Inline (Small spinning die)
export function InlineLoader({ className="" }) {
  return (
    <motion.div 
      className={`w-5 h-5 bg-teal-600 rounded-sm flex items-center justify-center ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-1 h-1 bg-white rounded-full shadow-[2px_2px_0_white,-2px_-2px_0_white]" />
    </motion.div>
  );
}