"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Configuration ---
// Kept simple colors to match your theme
const COLORS = {
  ring: "border-cyan-500",
  track: "border-cyan-500/20",
};

interface LoaderProps {
  /** Size of the spinner (sm, md, lg, xl) */
  size?: "sm" | "md" | "lg" | "xl";
  /** If true, covers the whole screen with a blurred backdrop */
  fullScreen?: boolean;
  /** Custom classes */
  className?: string;
}

const SIZES = {
  sm: "w-5 h-5 border-2",
  md: "w-10 h-10 border-[3px]",
  lg: "w-16 h-16 border-4",
  xl: "w-24 h-24 border-4",
};

export default function RotatingLoader({ size = "md", fullScreen = false, className = "" }: LoaderProps) {
  
  // The actual spinning ring component
  const Spinner = () => (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 1. The Track (Static faint ring) */}
      <div 
        className={`
          ${SIZES[size]} 
          ${COLORS.track} 
          rounded-full 
          absolute inset-0
        `} 
      />

      {/* 2. The Spinner (Rotating arc) */}
      <motion.div
        className={`
          ${SIZES[size]} 
          ${COLORS.ring}
          rounded-full 
          border-t-transparent border-l-transparent 
          shadow-[0_0_15px_rgba(6,182,212,0.5)] 
        `}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      {/* 3. Optional Center Dot (Only for larger sizes) */}
      {(size === 'lg' || size === 'xl') && (
        <motion.div 
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
  );

  // If Fullscreen, wrap in a fixed overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
        <Spinner />
      </div>
    );
  }

  // Otherwise just return the transparent spinner
  return <Spinner />;
}

// --- Convenience Exports for different contexts ---

// 1. For Page Loading (Fullscreen)
export function PageLoader() {
  return <RotatingLoader fullScreen size="xl" />;
}

// 2. For Section Loading (Inside a div)
export function SectionLoader() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <RotatingLoader size="lg" />
    </div>
  );
}

// 3. For Buttons (Tiny)
export function ButtonLoader() {
  return <RotatingLoader size="sm" />;
}