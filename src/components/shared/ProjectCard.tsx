
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, FileText } from "lucide-react";
import type { Project } from "@/types/cms"; 
import { RenderHtmlContent } from "@/lib/htmlRenderer";

interface ProjectCardProps extends Project {}

export default function ProjectCard({
  title,
  description, 
  problem,     
  tools,
  outcome,     
  imageUrl = "https://picsum.photos/seed/project/400/250",
  imageHint = "abstract tech",
  liveLink,
  repoLink,
  slug, 
}: ProjectCardProps) {
  
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
        
        <div className="text-sm text-muted-foreground h-16 overflow-hidden">
            <RenderHtmlContent htmlString={description} className="prose-xs dark:prose-invert max-h-16 overflow-hidden"/>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div>
          <h4 className="font-semibold text-sm mb-1">Problem:</h4>
          <div className="text-xs text-foreground/80 max-h-20 overflow-y-auto">
            <RenderHtmlContent htmlString={problem} className="prose-xs dark:prose-invert"/>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Outcome:</h4>
           <div className="text-xs text-foreground/80 max-h-20 overflow-y-auto">
            <RenderHtmlContent htmlString={outcome} className="prose-xs dark:prose-invert"/>
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
         <Button variant="link" size="sm" asChild className="text-xs text-primary p-0">
            <Link href={projectDetailLink}>
                Read More <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
