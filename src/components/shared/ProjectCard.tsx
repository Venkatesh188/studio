import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, FileText } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  problem: string;
  tools: string[];
  outcome: string;
  imageUrl?: string;
  liveLink?: string;
  repoLink?: string;
  paperLink?: string;
  imageHint?: string;
}

export default function ProjectCard({
  title,
  description,
  problem,
  tools,
  outcome,
  imageUrl = "https://picsum.photos/seed/project/400/250",
  liveLink,
  repoLink,
  paperLink,
  imageHint = "abstract tech"
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            className="transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={imageHint}
          />
        </div>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground h-12 overflow-hidden">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div>
          <h4 className="font-semibold text-sm mb-1">Problem:</h4>
          <p className="text-xs text-foreground/80">{problem}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Outcome:</h4>
          <p className="text-xs text-foreground/80">{outcome}</p>
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
        {paperLink && (
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link href={paperLink} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-1 h-3 w-3" /> Read Paper
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
