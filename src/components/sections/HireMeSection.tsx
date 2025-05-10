
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Layers, Users, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const hireMeFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type HireMeFormValues = z.infer<typeof hireMeFormSchema>;

const whyHireMeItems = [
  {
    icon: Lightbulb,
    title: "Proven Innovator",
    description: "Successfully developed and deployed AI solutions that delivered tangible business results, including revenue growth and cost reduction.",
  },
  {
    icon: Layers,
    title: "Full-Stack AI Capabilities",
    description: "Expertise spanning from data acquisition and preprocessing to model development, deployment, and monitoring using MLOps best practices.",
  },
  {
    icon: Users,
    title: "Collaborative & Results-Oriented",
    description: "A proactive team player with a strong analytical mindset, committed to delivering high-quality, data-driven solutions and leading cross-functional teams.",
  },
];

const keySkills = [
  "Python", "SQL", "Java", "C++", "Scikit-learn", "TensorFlow", "PyTorch", "Keras", 
  "NLTK", "spaCy", "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", 
  "Power BI", "Tableau", "AWS", "Azure", "Docker", "Git", "MLOps",
  "MySQL", "PostgreSQL", "MongoDB"
];

export default function HireMeSection() {
  const { toast } = useToast();
  const form = useForm<HireMeFormValues>({
    resolver: zodResolver(hireMeFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<HireMeFormValues> = async (data) => {
    console.log("Hire Me Form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. I'll get back to you soon.",
      variant: "default",
    });
    form.reset();
  };

  return (
    <SectionWrapper id="hire-me" title="Let's Build the Future Together" subtitle="Seeking Opportunities to Drive Innovation">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-lg text-muted-foreground">
          I am actively seeking new opportunities where I can apply my expertise in Artificial Intelligence and Machine Learning to solve challenging problems and contribute to impactful projects. If you're looking for a dedicated and innovative AI professional to join your team, I'd love to connect.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Why Hire Me & Skills */}
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary">Why Hire Me?</h3>
            <ul className="space-y-6">
              {whyHireMeItems.map((item) => (
                <li key={item.title} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 mt-1">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary">Key Skills</h3>
            <div className="flex flex-wrap gap-2">
              {keySkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form & Calendly */}
        <div className="space-y-8">
          <Card className="p-6 sm:p-8 shadow-xl bg-card">
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Interested? Send me a message!</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="hire-name" className="text-foreground/90">Full Name</Label>
                <Input 
                  id="hire-name" 
                  type="text" 
                  placeholder="Your Name" 
                  {...form.register("name")}
                  className="mt-1 bg-input focus:ring-primary focus:border-primary" 
                />
                {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="hire-email" className="text-foreground/90">Email Address</Label>
                <Input 
                  id="hire-email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  {...form.register("email")}
                  className="mt-1 bg-input focus:ring-primary focus:border-primary"
                />
                {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="hire-company" className="text-foreground/90">Company (Optional)</Label>
                <Input 
                  id="hire-company" 
                  type="text" 
                  placeholder="Your Company" 
                  {...form.register("company")}
                  className="mt-1 bg-input focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="hire-message" className="text-foreground/90">Message</Label>
                <Textarea 
                  id="hire-message" 
                  placeholder="Briefly describe the opportunity or your inquiry..." 
                  rows={4} 
                  {...form.register("message")}
                  className="mt-1 bg-input focus:ring-primary focus:border-primary"
                />
                {form.formState.errors.message && <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
          
          <div className="text-center">
             <p className="text-muted-foreground mb-4">Or, schedule a direct discussion:</p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="https://calendly.com/venkatesh-ai/recruiter-discussion" target="_blank" rel="noopener noreferrer">
                <CalendarDays className="mr-2 h-5 w-5" /> Schedule an Interview
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
