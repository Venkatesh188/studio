
'use client';
import SectionWrapper from "@/components/shared/SectionWrapper";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { AboutContent, Achievement } from "@/types/cms";
import { getAboutContent } from "@/lib/about-manager";
import { renderMarkdown } from "@/lib/markdownRenderer";
import { ICONS } from "@/types/cms"; // Import the ICONS map
import { Lightbulb, type LucideIcon } from "lucide-react"; // Default icon

export default function AboutSection() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchedContent = getAboutContent();
    setContent(fetchedContent);
    setIsLoading(false);
  }, []);

  if (isLoading || !content) {
    return (
      <SectionWrapper id="about-loading" title="About Me" subtitle="Driven AI Professional & Innovator">
        <p className="text-center text-muted-foreground">Loading content...</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="about" title="About Me" subtitle="Driven AI Professional & Innovator">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-foreground/90 prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
          {renderMarkdown(content.mainText)}
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Image
            src={content.imageUrl || "https://picsum.photos/seed/venkateshwork/600/400"}
            alt="Venkatesh Shivandi working on AI"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl relative"
            data-ai-hint={content.imageHint || "person working computer"}
          />
        </div>
      </div>
      {content.achievements && content.achievements.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Key Achievements</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.achievements.map((achievement) => {
              const IconComponent = ICONS[achievement.iconName] || Lightbulb; // Fallback to Lightbulb
              return (
                <div key={achievement.id} className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                  <IconComponent className="h-10 w-10 text-primary mb-4" />
                  <p className="text-sm text-card-foreground/80">{achievement.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
