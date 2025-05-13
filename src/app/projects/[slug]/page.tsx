
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Tag, ExternalLink, Github, Lightbulb, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getProjectBySlug as getProjectBySlugFromStorage } from "@/lib/project-manager";
import type { Project } from "@/types/cms";
import { useParams } from "next/navigation";
import { RenderHtmlContent } from "@/lib/htmlRenderer";

export default function ProjectDetailPage() {
  const params = useParams();
  const slugParam = params ? params.slug : null;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      const fetchedProject = getProjectBySlugFromStorage(slug);
      if (fetchedProject && fetchedProject.published) {
        setProject(fetchedProject);
      } else {
        setProject(null);
      }
    } else {
      setProject(null);
    }
  }, [slug]);

  if (project === undefined) {
    return (
      <SectionWrapper id="project-loading" title="Loading Project..." subtitle="Please wait">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Fetching project details...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!project) {
    return (
      <SectionWrapper id="project-not-found" title="Project Not Found" subtitle="Oops!">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">The project you are looking for does not exist, has been moved, or is not published.</p>
          <Button asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={`project-${project.slug}`} className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/#projects" className="text-sm text-primary hover:underline inline-flex items-center mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to All Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{project.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center"><CalendarDays className="mr-1.5 h-4 w-4" /> {project.date}</span>
            <span className="inline-flex items-center"><User className="mr-1.5 h-4 w-4" /> {project.author}</span>
          </div>
        </header>

        {(project.imageUrl) && (
          <div className="relative w-full h-72 md:h-[500px] mb-10 rounded-lg overflow-hidden shadow-xl border border-border">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill={true}
              style={{ objectFit: "cover" }}
              data-ai-hint={project.imageHint || "project technology"}
              priority
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <aside className="md:col-span-1 space-y-6 bg-card p-6 rounded-lg shadow-md">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                ))}
              </div>
            </div>
            
            {project.liveLink && (
              <Button asChild variant="outline" className="w-full">
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
            {project.repoLink && (
              <Button asChild variant="outline" className="w-full">
                <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View Repository
                </Link>
              </Button>
            )}
             {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <article className="md:col-span-2 space-y-8 bg-card p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><AlertTriangle className="mr-2 h-6 w-6 text-primary" />Problem Statement</h2>
              <RenderHtmlContent htmlString={project.problem} className="text-foreground/90" />
            </div>
            
            <hr className="border-border" />

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-primary" />Description & Approach</h2>
              <RenderHtmlContent htmlString={project.description} className="text-foreground/90" />
            </div>

            <hr className="border-border" />

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Tag className="mr-2 h-6 w-6 text-primary" />Outcome & Impact</h2>
              <RenderHtmlContent htmlString={project.outcome} className="text-foreground/90" />
            </div>
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
}
