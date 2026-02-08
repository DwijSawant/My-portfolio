'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

export function Intro({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');
    const timer = setTimeout(() => setHasStarted(true), 500);
    return () => {
      document.body.classList.remove('loading');
      clearTimeout(timer);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isRevealed) return;
    setIsDragging(true);
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isRevealed) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      // Map drag distance to tear progress
      const dragProgress = Math.min(Math.max(relativeY / (rect.height * 0.8), 0), 1);
      
      setProgress(dragProgress);

      if (dragProgress > 0.95) {
        setIsRevealed(true);
        setTimeout(() => {
          onFinish();
          document.body.classList.remove('loading');
        }, 800);
      }
    }
  };

  const handlePointerUp = () => {
    if (!isRevealed) {
      setIsDragging(false);
      // Optional: spring back if not far enough
      if (progress < 0.2) setProgress(0);
    }
  };

  // Generate a jagged rip path
  const jaggedPath = useMemo(() => {
    const points = [];
    const steps = 15;
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * 100;
      // Procedural jaggedness
      const xOffset = Math.sin(i * 1.5) * 1.5 + (i % 2 === 0 ? 0.5 : -0.5);
      points.push(`${50 + xOffset}% ${y}%`);
    }
    return points;
  }, []);

  const leftClip = `polygon(0% 0%, 50% 0%, ${jaggedPath.join(', ')}, 50% 100%, 0% 100%)`;
  const rightClip = `polygon(100% 0%, 50% 0%, ${jaggedPath.join(', ')}, 50% 100%, 100% 100%)`;

  const rotation = progress * 15;
  const translation = progress * 100;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-[#17181D] select-none transition-opacity duration-1000",
        isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="relative w-full max-w-5xl aspect-[2.2/1] px-6">
        {/* Left Half of Bill */}
        <div 
          className="absolute inset-y-0 left-0 w-full transition-transform duration-150 ease-out origin-bottom-right"
          style={{
            clipPath: leftClip,
            transform: `translateX(${-translation}px) rotate(${-rotation}deg)`,
          }}
        >
          <img 
            src="/dollar.jpg" 
            alt="Legacy Note" 
            className="w-full h-full object-cover grayscale brightness-[0.4] border-r border-white/5"
            draggable={false}
          />
        </div>

        {/* Right Half of Bill */}
        <div 
          className="absolute inset-y-0 left-0 w-full transition-transform duration-150 ease-out origin-bottom-left"
          style={{
            clipPath: rightClip,
            transform: `translateX(${translation}px) rotate(${rotation}deg)`,
          }}
        >
          <img 
            src="/dollar.jpg" 
            alt="Legacy Note" 
            className="w-full h-full object-cover grayscale brightness-[0.4] border-l border-white/5"
            draggable={false}
          />
        </div>

        {/* Instructions Overlay (Text removed) */}
        <div className={cn(
          "absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 pointer-events-none",
          progress > 0.1 ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}>
        </div>

        {/* The Rip Line Glow */}
        <div 
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-primary/20 blur-sm pointer-events-none"
          style={{ opacity: 1 - progress }}
        />
      </div>
    </div>
  );
}
