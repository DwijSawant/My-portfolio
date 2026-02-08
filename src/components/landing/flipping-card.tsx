'use client';

import Image from 'next/image';
import { socialLinks } from '@/lib/data';
import { Code } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FlippingCard() {
  return (
    <div className="group w-full max-w-sm h-64">
      <div
        className="relative h-full w-full rounded-xl shadow-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* Front of the card */}
        <div className={cn(
          "absolute inset-0 rounded-xl p-6 flex flex-col items-center justify-center [backface-visibility:hidden]",
          "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(247,147,26,0.1)]"
        )}>
            <div className="p-3 rounded-full bg-primary/20 mb-4 shadow-[0_0_20px_rgba(247,147,26,0.2)]">
              {/* <Code className="h-12 w-12 text-primary" /> */}
              <Image
                src="/frnt_logo.png"
                alt="Code Icon"
                width={48}
                height={48}
                className="h-12 w-12 text-primary"
                data-ai-hint="code-icon"
              />
            </div>
            <h2 className="text-2xl font-bold font-headline uppercase tracking-tight text-white">0xinterstellar.eth</h2>
            <p className="text-primary font-code font-bold text-xs uppercase tracking-widest mt-1 opacity-80">Blockchain Developer/Web3 enthusiast</p>
            <p className="text-[10px] text-white/30 mt-8 font-code uppercase tracking-tighter">Hover to flip card</p>
        </div>

        {/* Back of the card */}
        <div className={cn(
          "absolute inset-0 w-full h-full rounded-xl text-center [transform:rotateY(180deg)] [backface-visibility:hidden]",
          "bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl"
        )}>
            <div className="flex min-h-full flex-col items-center justify-center p-6">
                <div className="relative h-24 w-24 mb-4">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
                    <Image
                        src="/avatar.jpeg"
                        alt="Avatar"
                        width={96}
                        height={96}
                        className="relative rounded-full border-2 border-primary/50 shadow-lg"
                        data-ai-hint="avatar"
                    />
                </div>
                <h3 className="text-xl font-bold font-headline text-white">Dwij Sawant</h3>
                <p className="text-xs text-primary/80 font-body font-medium uppercase tracking-wide">Full Stack Blockchain Developer and Community Builder </p>
                <div className="flex justify-center gap-4 mt-6">
                    {socialLinks.map((link) => (
                        <a 
                          key={link.name} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white/40 hover:text-primary transition-all duration-300 hover:scale-110" 
                          aria-label={link.name}
                        >
                            <link.icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
