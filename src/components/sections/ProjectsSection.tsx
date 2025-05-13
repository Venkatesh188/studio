
'use client';
import SectionWrapper from "@/components/shared/SectionWrapper";
import ProjectCard from "@/components/shared/ProjectCard";
import { useEffect, useState } from "react";
import { getPublishedProjects } from "@/lib/project-manager";
import type { Project } from "@/types/cms";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchedProjects = getPublishedProjects();
    setProjects(fetchedProjects);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <SectionWrapper id="projects-loading" title="My Projects" subtitle="Showcasing Innovation & Expertise">
        <p className="text-center text-muted-foreground">Loading projects...</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="projects" title="My Projects" subtitle="Showcasing Innovation & Expertise">
      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">No projects to display yet. Stay tuned!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
