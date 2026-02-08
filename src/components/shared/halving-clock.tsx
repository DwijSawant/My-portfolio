'use client';

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export function HalvingClock() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    // Estimated next halving date: April 17, 2028
    const targetDate = new Date('2028-04-17T00:00:00Z').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(247,147,26,0.1)]">
      <Timer className="h-4 w-4 text-primary animate-pulse" />
      <div className="flex items-center space-x-1 text-[10px] sm:text-xs font-code font-bold text-white tracking-tighter">
        <div className="flex flex-col items-center">
          <span>{timeLeft.days}d</span>
        </div>
        <span className="text-primary/50">:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.hours}h</span>
        </div>
        <span className="text-primary/50">:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.minutes}m</span>
        </div>
        <span className="text-primary/50">:</span>
        <div className="flex flex-col items-center">
          <span>{timeLeft.seconds}s</span>
        </div>
      </div>
    </div>
  );
}
