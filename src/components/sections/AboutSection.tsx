
'use client';
import SectionWrapper from "@/components/shared/SectionWrapper";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { WordPressPage } from "@/types/wordpress";
import { getAboutPageContent } from "@/lib/wordpress/api";
import { RenderHtmlContent } from "@/lib/htmlRenderer";
import { ICONS } from "@/types/cms";
import { Lightbulb } from "lucide-react";

export default function AboutSection() {
  const [content, setContent] = useState<WordPressPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const fetchedContent = await getAboutPageContent();
        setContent(fetchedContent);
      } catch (error) {
        console.error("Failed to fetch About page content:", error);
        setContent(null); // Set to null on error to avoid rendering issues
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SectionWrapper id="about-loading" title="About Me" subtitle="Driven AI Professional & Innovator">
        <p className="text-center text-muted-foreground">Loading content...</p>
      </SectionWrapper>
    );
  }

  if (!content) {
    return (
      <SectionWrapper id="about-error" title="About Me" subtitle="Driven AI Professional & Innovator">
        <p className="text-center text-destructive">Could not load About Me content. Please try again later.</p>
      </SectionWrapper>
    );
  }
  
  const mainText = content.aboutPageFields?.mainText || content.content;
  const imageUrl = content.featuredImage?.node?.sourceUrl || "https://picsum.photos/seed/venkateshwork/600/400";
  const imageAlt = content.featuredImage?.node?.altText || "Venkatesh Shivandi working on AI";
  const imageHint = content.aboutPageFields?.imageAiHint || "person working computer";
  const achievements = content.aboutPageFields?.achievements || [];


  return (
    <SectionWrapper id="about" title={content.title || "About Me"} subtitle="Driven AI Professional & Innovator">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-foreground/90">
          <RenderHtmlContent htmlString={mainText} />
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={600}
            height={400}
            className="rounded-lg shadow-2xl relative"
            data-ai-hint={imageHint}
          />
        </div>
      </div>
      {achievements && achievements.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Key Achievements</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = (achievement.icon && ICONS[achievement.icon]) || Lightbulb;
              return (
                <div key={`ach-${index}`} className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
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
