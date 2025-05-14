
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, ExternalLink, Github, Lightbulb, AlertTriangle, TagIcon } from "lucide-react"; // Added TagIcon
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { WordPressProject } from "@/types/wordpress";
import { getProjectBySlug } from "@/lib/wordpress/api";
import { RenderHtmlContent } from "@/lib/htmlRenderer";
import { format } from 'date-fns'; // For date formatting

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [project, setProject] = useState<WordPressProject | null | undefined>(undefined); // undefined for initial loading state

  useEffect(() => {
    if (slug) {
      const fetchProjectData = async () => {
        try {
          const fetchedProject = await getProjectBySlug(slug);
          setProject(fetchedProject);
        } catch (error) {
          console.error("Failed to fetch project:", error);
          setProject(null); // Set to null on error
        }
      };
      fetchProjectData();
    } else {
      setProject(null); // No slug, so no project
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
          <p className="text-muted-foreground mb-6">The project you are looking for does not exist or could not be loaded.</p>
          <Button asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }
  
  const formattedDate = project.date ? format(new Date(project.date), 'MMMM d, yyyy') : 'Date not available';
  const authorName = project.author?.node?.name || 'Venkatesh S.';
  const toolsArray = typeof project.projectFields?.toolsUsed === 'string' 
    ? project.projectFields.toolsUsed.split(',').map(tool => tool.trim()).filter(tool => tool) 
    : [];

  return (
    <SectionWrapper id={`project-${project.slug}`} className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/#projects" className="text-sm text-primary hover:underline inline-flex items-center mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to All Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{project.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center"><CalendarDays className="mr-1.5 h-4 w-4" /> {formattedDate}</span>
            <span className="inline-flex items-center"><User className="mr-1.5 h-4 w-4" /> {authorName}</span>
          </div>
        </header>

        {project.featuredImage?.node?.sourceUrl && (
          <div className="relative w-full h-72 md:h-[500px] mb-10 rounded-lg overflow-hidden shadow-xl border border-border">
            <Image
              src={project.featuredImage.node.sourceUrl}
              alt={project.featuredImage.node.altText || project.title}
              fill={true}
              style={{ objectFit: "cover" }}
              data-ai-hint={project.projectFields?.imageAiHint || "project technology"}
              priority
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <aside className="md:col-span-1 space-y-6 bg-card p-6 rounded-lg shadow-md">
            {toolsArray.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {toolsArray.map(tool => (
                    <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {project.projectFields?.liveLink && (
              <Button asChild variant="outline" className="w-full">
                <Link href={project.projectFields.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
            {project.projectFields?.repositoryLink && (
              <Button asChild variant="outline" className="w-full">
                <Link href={project.projectFields.repositoryLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View Repository
                </Link>
              </Button>
            )}
             {project.tags?.edges && project.tags.edges.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.edges.map(edge => (
                    <Badge key={edge.node.id} variant="outline" className="text-xs">{edge.node.name}</Badge>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <article className="md:col-span-2 space-y-8 bg-card p-6 sm:p-8 rounded-lg shadow-md">
            {project.projectFields?.problemStatement && (
                <div>
                <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><AlertTriangle className="mr-2 h-6 w-6 text-primary" />Problem Statement</h2>
                <RenderHtmlContent htmlString={project.projectFields.problemStatement} className="text-foreground/90" />
                </div>
            )}
            
            <hr className="border-border" />

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-primary" />Description & Approach</h2>
              <RenderHtmlContent htmlString={project.content} className="text-foreground/90" />
            </div>

            {project.projectFields?.outcome && (
                <>
                    <hr className="border-border" />
                    <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><TagIcon className="mr-2 h-6 w-6 text-primary" />Outcome & Impact</h2>
                    <RenderHtmlContent htmlString={project.projectFields.outcome} className="text-foreground/90" />
                    </div>
                </>
            )}
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
}
