'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32); // Default bottom-8 (32px)

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility based on scroll depth
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Detect footer intersection to adjust position
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If the top of the footer is visible within the viewport
        if (footerRect.top < viewportHeight) {
          const visibleFooterHeight = viewportHeight - footerRect.top;
          // Set position to be just above the footer with some padding
          setBottomOffset(visibleFooterHeight + 24); 
        } else {
          setBottomOffset(32); // Standard bottom-8
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className={cn(
        "fixed right-8 z-[101] transition-all duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      style={{ bottom: `${bottomOffset}px` }}
    >
      <Button
        size="icon"
        className="rounded-full h-12 w-12 shadow-[0_0_20px_rgba(247,147,26,0.3)] bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 active:scale-95 transition-transform"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
}
