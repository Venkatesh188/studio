import SectionWrapper from "@/components/shared/SectionWrapper";
import ProjectCard from "@/components/shared/ProjectCard";
import { getAllProjects } from "@/lib/markdown";

export default function ProjectsSection() {
  const projects = getAllProjects();

  // Fallback to empty array if no projects found
  const projectsToDisplay = projects.length > 0 ? projects : [];

  return (
    <SectionWrapper id="projects" title="My Projects" subtitle="Showcasing Innovation & Expertise">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsToDisplay.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
