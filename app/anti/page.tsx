"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const AntigravityGSAP = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const particles = useRef<any[]>([]);
  const animationFrame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // 1. Create mapping for the brackets
      const tCanvas = document.createElement('canvas');
      const tCtx = tCanvas.getContext('2d');
      if (!tCtx) return;
      tCanvas.width = width;
      tCanvas.height = height;

      // Bold, thick font for high particle density
      const fontSize = Math.min(width, height) * 0.5;
      tCtx.font = `900 ${fontSize}px sans-serif`;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText('{    }', width / 2, height / 2);

      const pixels = tCtx.getImageData(0, 0, width, height).data;
      const newParticles = [];

      // Denser sampling (step 4) for the "solid" look
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const index = (y * width + x) * 4;
          if (pixels[index + 3] > 128) {
            newParticles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              tX: x, // Target X
              tY: y, // Target Y
              fX: Math.random() * width, // Float X (random drift)
              fY: Math.random() * height, // Float Y (random drift)
              size: Math.random() * 1.5,
              alpha: Math.random() * 0.5 + 0.2
            });
          }
        }
      }
      particles.current = newParticles;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const pCount = particles.current.length;
      for (let i = 0; i < pCount; i++) {
        const p = particles.current[i];
        
        // Jitter effect for the "static" look
        const jitter = isHovered ? (Math.random() - 0.5) * 1.5 : 0;
        
        ctx.fillStyle = isHovered 
          ? `rgba(66, 133, 244, ${p.alpha + 0.3})` 
          : `rgba(0, 0, 0, ${p.alpha * 0.4})`;

        ctx.beginPath();
        ctx.arc(p.x + jitter, p.y + jitter, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrame.current = requestAnimationFrame(render);
    };

    init();
    render();

    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  // Use GSAP to animate the transition between states
  useEffect(() => {
    particles.current.forEach((p) => {
      gsap.to(p, {
        duration: isHovered ? 1.2 : 2.5,
        x: isHovered ? p.tX : p.fX,
        y: isHovered ? p.tY : p.fY,
        ease: isHovered ? "expo.out" : "power1.inOut",
        delay: Math.random() * 0.2 // Stagger the "flight" for organic feel
      });
    });
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 text-center pointer-events-none select-none">
        <p className="text-gray-400 text-xs font-medium mb-4 tracking-tight">
          Available at no charge
        </p>
        <h1 className="text-black text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
          For developers<br />Achieve new heights
        </h1>
        <div className="mt-10 pointer-events-auto">
          <button className="bg-black text-white px-10 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-xl">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default AntigravityGSAP;