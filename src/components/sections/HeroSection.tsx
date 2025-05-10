import { Button } from "@/components/ui/button";
import { Briefcase, MessageSquare, UserCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="relative bg-gradient-to-br from-background via-background to-muted min-h-[calc(100vh-5rem)] flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* You can use a subtle background pattern or image here */}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
             <Image 
              src="https://picsum.photos/seed/venkateshprofile/120/120" 
              alt="Venkatesh Shivandi"
              width={120}
              height={120}
              className="rounded-full mx-auto shadow-xl border-4 border-primary"
              data-ai-hint="profile professional"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="block">Venkatesh Shivandi</span>
            <span className="block text-primary">AI Expert & Innovator</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            AI/ML expert transforming data into impactful solutions. Specializing in developing innovative machine learning models and driving business growth. Explore my projects or reach out to discuss collaboration.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="#projects">
                <Briefcase className="mr-2 h-5 w-5" /> Explore My Work
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="#hire-me">
                <UserCheck className="mr-2 h-5 w-5" /> Hire Me
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-foreground border-border hover:bg-accent hover:text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="#contact">
                <MessageSquare className="mr-2 h-5 w-5" /> Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Subtle decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary/20 rounded-full animate-pulse opacity-50 blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-lg animate-ping opacity-30 blur-lg"></div>
    </section>
  );
}
