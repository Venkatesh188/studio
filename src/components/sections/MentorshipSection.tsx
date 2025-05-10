import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, CheckSquare, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mentorshipAreas = [
  {
    icon: GraduationCap,
    title: "Career Guidance in AI",
    description: "Navigate your AI career path, from entry-level to specialist roles. Get advice on skill development, industry trends, and job searching.",
  },
  {
    icon: Briefcase,
    title: "AI Project Reviews",
    description: "Receive constructive feedback on your personal or academic AI projects. Improve methodology, code quality, and presentation.",
  },
  {
    icon: CheckSquare,
    title: "Interview Preparation",
    description: "Ace your AI interviews with mock sessions, technical question practice, and tips for showcasing your skills effectively.",
  },
];

export default function MentorshipSection() {
  return (
    <SectionWrapper id="mentorship" title="AI Mentorship Programs" subtitle="Guiding Your Growth in AI">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
           <Image
            src="https://picsum.photos/seed/mentor/600/400"
            alt="AI Mentorship"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl relative"
            data-ai-hint="teacher student"
          />
        </div>
        <div className="space-y-6">
          <p className="text-lg text-foreground/90">
            Passionate about fostering talent in Artificial Intelligence, I offer personalized mentorship to aspiring AI professionals. Whether you're looking to kickstart your career, enhance your project skills, or prepare for challenging interviews, I'm here to help.
          </p>
          <div className="space-y-4">
            {mentorshipAreas.map((area) => (
              <div key={area.title} className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 mt-1">
                  <area.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{area.title}</h4>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="https://calendly.com/venkatesh-ai/mentorship" target="_blank" rel="noopener noreferrer">
             <MessageCircle className="mr-2 h-5 w-5" /> Schedule a Mentorship Session
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
