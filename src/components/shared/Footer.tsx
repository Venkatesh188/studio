import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Venkatesh188', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/venkatesh188/', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/your_twitter_handle', icon: Twitter }, // Replace with actual Twitter handle
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 py-8 text-foreground/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors">
              <link.icon className="h-6 w-6" />
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Venkatesh.ai. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
