'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Twitter, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Venkatesh188', icon: Github, color: "hover:text-[#333]" },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/venkatesh188/', icon: Linkedin, color: "hover:text-[#0A66C2]" },
  { name: 'Twitter', href: '#', icon: Twitter, color: "hover:text-[#1DA1F2]" }, // Replace # with actual Twitter
];

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Placeholder submit handler
  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // In a real app, you would send this data to a backend or email service.
    // For this example, we'll just show a success toast.
    console.log("Form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
      variant: "default",
    });
    form.reset(); // Reset form after submission
  };

  return (
    <SectionWrapper id="contact" title="Get In Touch" subtitle="Let's Collaborate or Connect">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">Contact Information</h3>
          <p className="text-muted-foreground">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through the form or connect with me on social media.
          </p>
          
          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start text-left group">
              <Link href="https://calendly.com/venkatesh-ai/initial-consultation" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <CalendarDays className="mr-3 h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                <span className="group-hover:text-primary-foreground transition-colors">Schedule a Meeting via Calendly</span>
              </Link>
            </Button>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3 text-foreground">Connect with me:</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                      className={`p-2 rounded-full bg-card hover:bg-primary/20 transition-all duration-300 group ${link.color}`}>
                  <link.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Card className="p-6 sm:p-8 shadow-xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground/90">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Your Name" 
                {...form.register("name")}
                className="mt-1 bg-input focus:ring-primary focus:border-primary" 
              />
              {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground/90">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                {...form.register("email")}
                className="mt-1 bg-input focus:ring-primary focus:border-primary"
              />
              {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground/90">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Your message..." 
                rows={5} 
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
      </div>
    </SectionWrapper>
  );
}
