
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, CodeXml } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
// Removed useAuth and related imports as admin auth is handled by WordPress

const baseNavItems = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' }, // Direct link to blog page
  { href: '/#hire-me', label: 'Hire Me' },
  { href: '/#mentorship', label: 'Mentorship' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const currentRoutePathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let currentSectionId = '';
      if (currentRoutePathname === '/') { // Only track active section on homepage
        baseNavItems.forEach(item => {
          if (item.href.startsWith('/#')) { // Ensure it's a homepage hash link
            const sectionId = item.href.substring(2); // Remove '/#'
            const section = document.getElementById(sectionId);
            if (section && section.offsetTop <= window.scrollY + 150) {
              currentSectionId = item.href;
            }
          }
        });
        setActiveSection(currentSectionId);
      } else {
         // For non-homepage routes, check if any nav item matches the start of the path
        const activeItem = baseNavItems.find(item => !item.href.startsWith('/#') && currentRoutePathname.startsWith(item.href));
        setActiveSection(activeItem ? activeItem.href : '');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoutePathname]);

  // WordPress handles admin login, so no specific admin links here.
  // Users access the WordPress admin panel via its own URL (e.g., your-wordpress-site.com/wp-admin).
  const navItems = baseNavItems.map(item => {
    // Ensure fullHref is correctly constructed for homepage hash links vs direct page links
    const fullHref = item.href.startsWith('/#') && currentRoutePathname !== '/' ? `/${item.href}` : item.href;
    return { ...item, fullHref };
  });


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            <CodeXml className="h-8 w-8" />
            <span>Venkatesh.ai</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = item.href.startsWith('/#')
                ? activeSection === item.href
                : currentRoutePathname.startsWith(item.href);
              return (
                <Link key={item.label} href={item.fullHref} passHref legacyBehavior>
                  <a className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 flex items-center gap-1.5",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80"
                  )}>
                    {item.label}
                  </a>
                </Link>
              );
            })}
            <ThemeSwitcher />
          </nav>

          <div className="md:hidden flex items-center">
            <ThemeSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6 text-primary" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] bg-background p-6">
                <nav className="flex flex-col space-y-3 mt-8">
                  {navItems.map((item) => {
                     const isActive = item.href.startsWith('/#')
                     ? activeSection === item.href
                     : currentRoutePathname.startsWith(item.href);
                    return (
                     <Link key={item.label} href={item.fullHref} passHref legacyBehavior>
                      <a className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-primary hover:bg-primary/10 flex items-center gap-2",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-foreground/80"
                      )}>
                        {item.label}
                      </a>
                    </Link>
                  );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
