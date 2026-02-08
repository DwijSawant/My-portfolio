import { experiences } from '@/lib/data';
import { Section } from './section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export function Experience() {
  return (
    <Section id="experience" title="Work Experience">
      <div className="relative space-y-8">
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5 md:mx-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse opacity-60 shadow-[0_0_20px_rgba(247,147,26,0.6)]" />
        </div>

        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom-5 duration-500" 
            style={{animationDelay: `${index * 200}ms`}}
          >
            <div className="relative flex items-center justify-center w-10 h-10 z-10">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping blur-xl" />
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-md group-hover:bg-primary/30 transition-all duration-500" />
              
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_rgba(247,147,26,0.8)] z-20 transition-transform duration-500 group-hover:scale-125">
                <Briefcase className="w-4 h-4"/>
              </div>
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
              <Card className="bg-black/60 backdrop-blur-xl border-white/5 group-hover:border-primary/40 transition-all duration-700 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-[1px] bg-primary/0 group-hover:bg-primary transition-all duration-700 shadow-[0_0_15px_rgba(247,147,26,0.5)]" />
                
                <CardHeader className="pb-2">
                  <p className="text-xs text-primary font-code font-bold tracking-[0.2em] mb-1">
                    {exp.period}
                  </p>
                  <CardTitle className="text-white text-xl md:text-2xl font-headline font-bold group-hover:text-primary transition-colors duration-300">
                    {exp.role}
                  </CardTitle>
                  <CardDescription className="text-white/50 font-medium font-body">
                    {exp.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 font-body">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground/80 text-sm sm:text-base leading-relaxed group/li">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40 group-hover/li:bg-primary transition-colors duration-300 shadow-[0_0_5px_rgba(247,147,26,0.3)]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
