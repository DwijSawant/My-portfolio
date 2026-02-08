'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { navLinks } from '@/lib/data';
import { Code, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { HalvingClock } from './halving-clock';
import GlassSurface from '@/components/ui/glass-surface';

export function SiteHeader() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'experience', 'projects', 'skills', 'education'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const activeLink = linkRefs.current[activeSection];
    if (activeLink && navRef.current) {
      const { offsetLeft, offsetWidth } = activeLink;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1
      });
    }
  }, [activeSection]);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header className="w-full max-w-6xl pointer-events-auto">
        <div
          className={cn(
            "transition-all duration-700 w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] h-16 shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
            isScrolled ? "scale-[0.98]" : "scale-100"
          )}
        >
          <div className="flex h-full w-full items-center px-4 sm:px-6">
            <Link href="#home" className="mr-4 sm:mr-8 flex items-center space-x-2 shrink-0 group">
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(247,147,26,0.3)]">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <span className="font-headline font-bold hidden sm:inline-block tracking-tight text-primary uppercase text-sm">My Profile</span>
            </Link>
            
            <nav ref={navRef} className="hidden md:flex relative items-center space-x-1 text-xs font-bold font-headline h-full flex-1">
              <div 
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: '38px'
                }}
              >
                <GlassSurface 
                   width="100%" 
                   height="100%" 
                   borderRadius={19} 
                   backgroundOpacity={0.08}
                   brightness={60}
                   blur={12}
                   className="border border-white/20 shadow-[0_0_15px_rgba(247,147,26,0.2)]"
                >
                  <div className="w-full h-full" />
                </GlassSurface>
              </div>
              
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    ref={(el) => { linkRefs.current[sectionId] = el; }}
                    className={cn(
                      "relative px-4 py-2 transition-all duration-300 rounded-full z-10 uppercase tracking-wider",
                      isActive ? "text-white" : "text-white/40 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end gap-2 sm:gap-4 ml-auto">
              <div className="hidden sm:block">
                <HalvingClock />
              </div>
              
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black/95 backdrop-blur-3xl border-l-primary/20">
                  <div className="p-6 mt-8 flex flex-col h-full">
                    <div className="flex flex-col space-y-6 flex-1 font-headline">
                      {navLinks.map((link) => (
                         <SheetClose key={link.href} asChild>
                            <Link 
                              href={link.href} 
                              className={cn(
                                "text-xl font-bold transition-colors border-b border-primary/10 pb-2 uppercase tracking-wide",
                                activeSection === link.href.replace('#', '') ? "text-primary" : "text-muted-foreground hover:text-primary"
                              )}
                            >
                                {link.label}
                            </Link>
                         </SheetClose>
                      ))}
                    </div>
                    <div className="mt-auto pb-8">
                      <HalvingClock />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
