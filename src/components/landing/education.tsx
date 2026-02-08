import { education } from '@/lib/data';
import { Section } from './section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-8 md:grid-cols-2">
        {education.map((edu, index) => (
          <Card key={index} className="flex flex-col animate-in fade-in zoom-in-95 duration-500" style={{animationDelay: `${index * 150}ms`}}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-headline font-bold">{edu.degree}</CardTitle>
                  <p className="text-muted-foreground font-body font-medium">{edu.institution}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-code font-bold tracking-tight">{edu.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
