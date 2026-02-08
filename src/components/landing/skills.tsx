import { skills } from '@/lib/data';
import { Section } from './section';
import { Badge } from '@/components/ui/badge';

export function Skills() {
  return (
    <Section id="skills" title="Technical Skills">
      <div className="max-w-4xl mx-auto space-y-8">
        {skills.map((skillCategory, index) => (
          <div key={index} className="animate-in fade-in slide-in-from-left-5 duration-500" style={{animationDelay: `${index * 200}ms`}}>
            <h3 className="text-xl font-bold mb-4 text-accent font-headline uppercase tracking-wide">{skillCategory.category}</h3>
            <div className="flex flex-wrap gap-3">
              {skillCategory.technologies.map((tech, i) => (
                <Badge key={i} className="text-sm px-4 py-2 font-code transition-all hover:bg-accent hover:text-accent-foreground" variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
