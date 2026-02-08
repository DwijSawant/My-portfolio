'use client';

import { useState } from 'react';
import { SiteHeader } from "@/components/shared/site-header";
import { Hero } from "@/components/landing/hero";
import { Experience } from "@/components/landing/experience";
import { Projects } from "@/components/landing/projects";
import { Skills } from "@/components/landing/skills";
import { Education } from "@/components/landing/education";
import { Footer } from "@/components/landing/footer";
import Grainient from "@/components/shared/grainient";
import { Intro } from "@/components/landing/intro";
import { ScrollToTop } from "@/components/shared/scroll-to-top";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-black">
      {/* 
        Structure:
        .page.under (z-index: 10) - The Site Content
        canvas/grainient (z-index: 1) - The Background (fixed)
        .page (z-index: 100) - The Intro Layer (fixed overlay)
      */}
      
      {/* Revealed Site Layer */}
      <div className="page under">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Education />
        </main>
        <Footer />
      </div>

      {/* WebGL Background Layer */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        <Grainient
          color1="#000000"
          color2="#a30505"
          color3="#13101e"
          timeSpeed={0.25}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Intro Overlay Layer */}
      {showIntro && (
        <div className="page fixed inset-0 z-[100]">
          <Intro onFinish={() => setShowIntro(false)} />
        </div>
      )}

      {/* Scroll to Top UI */}
      {!showIntro && <ScrollToTop />}
    </div>
  );
}
