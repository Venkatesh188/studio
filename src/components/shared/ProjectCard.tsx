
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, FileText } from "lucide-react";
import type { Project } from "@/types/cms"; // Import Project type
import { renderMarkdown } from "@/lib/markdownRenderer";

// ProjectCardProps now uses the Project type, removing redundant fields
interface ProjectCardProps extends Project {}

export default function ProjectCard({
  title,
  description, // Markdown
  problem,     // Markdown
  tools,
  outcome,     // Markdown
  imageUrl = "https://picsum.photos/seed/project/400/250",
  imageHint = "abstract tech",
  liveLink,
  repoLink,
  // paperLink, // Assuming paperLink is not part of the base Project type for now, can be added
  slug, // Added slug to link to a potential detail page
}: ProjectCardProps) {
  // A potential detail page link, if you plan to have one for projects
  const projectDetailLink = `/projects/${slug}`; 

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <Link href={projectDetailLink} passHref>
          <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden group cursor-pointer">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill={true}
              style={{objectFit: "cover"}}
              className="transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={imageHint}
            />
          </div>
        </Link>
        <CardTitle className="text-xl text-primary hover:underline">
            <Link href={projectDetailLink}>{title}</Link>
        </CardTitle>
        {/* Render description as Markdown, but limit height for card view */}
        <div className="text-sm text-muted-foreground h-16 overflow-hidden">
            {renderMarkdown(description)}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div>
          <h4 className="font-semibold text-sm mb-1">Problem:</h4>
          <div className="text-xs text-foreground/80 max-h-20 overflow-y-auto prose prose-xs dark:prose-invert">
            {renderMarkdown(problem)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Outcome:</h4>
           <div className="text-xs text-foreground/80 max-h-20 overflow-y-auto prose prose-xs dark:prose-invert">
            {renderMarkdown(outcome)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Tools Used:</h4>
          <div className="flex flex-wrap gap-1">
            {tools.map((tool) => (
              <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex flex-wrap gap-2 justify-start">
        {liveLink && (
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3 w-3" /> Live Demo
            </Link>
          </Button>
        )}
        {repoLink && (
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={repoLink} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1 h-3 w-3" /> View Code
            </Link>
          </Button>
        )}
        {/* {paperLink && ( // Uncomment if paperLink is used
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={paperLink} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-1 h-3 w-3" /> Read Paper
            </Link>
          </Button>
        )} */}
         <Button variant="link" size="sm" asChild className="text-xs text-primary p-0">
            <Link href={projectDetailLink}>
                Read More <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
