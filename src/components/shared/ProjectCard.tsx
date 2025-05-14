
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { WordPressProject } from "@/types/wordpress";
import { RenderHtmlContent } from "@/lib/htmlRenderer";

interface ProjectCardProps {
  project: WordPressProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    slug,
    content, // Main description
    featuredImage,
    projectFields, // ACF fields
  } = project;

  const descriptionExcerpt = content ? content.substring(0, 150) + (content.length > 150 ? '...' : '') : 'No description available.';
  const problemStatement = projectFields?.problemStatement || "Problem statement not provided.";
  const outcomeText = projectFields?.outcome || "Outcome not specified.";
  
  // Tools can be a comma-separated string or an array if structured differently in ACF
  const toolsArray = typeof projectFields?.toolsUsed === 'string' 
    ? projectFields.toolsUsed.split(',').map(tool => tool.trim()).filter(tool => tool) 
    : (Array.isArray(projectFields?.toolsUsed) ? projectFields.toolsUsed : []);

  const imageUrl = featuredImage?.node?.sourceUrl || "https://picsum.photos/seed/project/400/250";
  const imageAlt = featuredImage?.node?.altText || title || "Project image";
  const imageHint = projectFields?.imageAiHint || "abstract tech";
  
  const projectDetailLink = `/projects/${slug}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        {imageUrl && (
          <Link href={projectDetailLink} passHref>
            <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden group cursor-pointer">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill={true}
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={imageHint}
                priority={true} // Consider adding priority for above-the-fold images
              />
            </div>
          </Link>
        )}
        <CardTitle className="text-xl text-primary hover:underline">
          <Link href={projectDetailLink}>{title}</Link>
        </CardTitle>
        <div className="text-sm text-muted-foreground h-16 overflow-hidden">
          <RenderHtmlContent htmlString={descriptionExcerpt} className="prose-sm dark:prose-invert max-h-16 overflow-hidden" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div>
          <h4 className="font-semibold text-sm mb-1">Problem:</h4>
          <div className="text-xs text-foreground/80 max-h-20 overflow-y-auto">
            <RenderHtmlContent htmlString={problemStatement} className="prose-xs dark:prose-invert"/>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Outcome:</h4>
          <div className="text-xs text-foreground/80 max-h-20 overflow-y-auto">
             <RenderHtmlContent htmlString={outcomeText} className="prose-xs dark:prose-invert"/>
          </div>
        </div>
        {toolsArray.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-1">Tools Used:</h4>
            <div className="flex flex-wrap gap-1">
              {toolsArray.map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 flex flex-wrap gap-2 justify-start">
        {projectFields?.liveLink && (
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={projectFields.liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3 w-3" /> Live Demo
            </Link>
          </Button>
        )}
        {projectFields?.repositoryLink && (
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={projectFields.repositoryLink} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1 h-3 w-3" /> View Code
            </Link>
          </Button>
        )}
        <Button variant="link" size="sm" asChild className="text-xs text-primary p-0">
          <Link href={projectDetailLink}>
            Read More <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
