import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Section } from './section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeXml, Github } from 'lucide-react';

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const placeholder = PlaceHolderImages.find(p => p.id === project.imageId);
          return (
            <Link 
              key={index} 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="flex flex-col h-full overflow-hidden border-white/5 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(247,147,26,0.1)] hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-5" style={{animationDelay: `${index * 150}ms`}}>
                {placeholder && (
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={placeholder.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={placeholder.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white font-code font-bold text-sm">
                        <Github className="h-5 w-5" />
                        VIEW ON GITHUB
                      </div>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <CodeXml className="h-5 w-5" />
                      </div>
                      <CardTitle className="font-headline font-bold text-white group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col font-body">
                  <CardDescription className="flex-grow leading-relaxed text-muted-foreground">
                    {project.description}
                  </CardDescription>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-white/5 text-white/70 font-code text-[10px] tracking-tight hover:bg-primary/20 hover:text-primary transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
