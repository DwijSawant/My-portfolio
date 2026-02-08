import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { FlippingCard } from './flipping-card';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-32 md:py-48">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 space-y-8 text-left animate-fade-in-up">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-code font-bold bg-primary/10 text-primary border border-primary/20">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                LIVE ON MAINNET
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline text-white leading-[1.1]">
               👋Namaste <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">I'm Dwij Sawant</span>
              </h1>
              
              <p className="text-lg md:text-xl max-w-xl text-muted-foreground font-body leading-relaxed">
                I wear multiple hats community leader, developer, writer, and crypto dreamer ,trying to build wealth and meaning in a decentralized world.


              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full font-bold tracking-tight shadow-[0_0_20px_-5px_rgba(247,147,26,0.5)]">
                  <a href="/resume.pdf" download="interstellar-resume.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 hover:bg-primary/5 font-bold tracking-tight">
                  <a href="#projects">
                    View Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center items-center perspective-1000">
                <FlippingCard />
            </div>
        </div>
      </div>
    </section>
  );
}
