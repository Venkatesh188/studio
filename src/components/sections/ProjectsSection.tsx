
'use client';
import SectionWrapper from "@/components/shared/SectionWrapper";
import ProjectCard from "@/components/shared/ProjectCard";
import { useEffect, useState } from "react";
import type { WordPressProject } from "@/types/wordpress";
import { getAllProjects } from "@/lib/wordpress/api";
import { Button } from "@/components/ui/button";

const PROJECTS_PER_PAGE = 6;

export default function ProjectsSection() {
  const [projects, setProjects] = useState<WordPressProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchProjects = async (after: string | null = null) => {
    if (after) setIsLoadingMore(true); else setIsLoading(true);
    
    try {
      const data = await getAllProjects(PROJECTS_PER_PAGE, after);
      setProjects(prev => after ? [...prev, ...data.projects] : data.projects);
      setPageInfo(data.pageInfo);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      // Optionally set an error state here to display to the user
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      fetchProjects(pageInfo.endCursor);
    }
  };

  if (isLoading && projects.length === 0) {
    return (
      <SectionWrapper id="projects-loading" title="My Projects" subtitle="Showcasing Innovation & Expertise">
        <p className="text-center text-muted-foreground">Loading projects...</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="projects" title="My Projects" subtitle="Showcasing Innovation & Expertise">
      {projects.length === 0 && !isLoading ? (
        <p className="text-center text-muted-foreground">No projects to display yet. Stay tuned!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      {pageInfo?.hasNextPage && (
        <div className="mt-12 text-center">
          <Button onClick={handleLoadMore} disabled={isLoadingMore} size="lg">
            {isLoadingMore ? 'Loading More...' : 'Load More Projects'}
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
