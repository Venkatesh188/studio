
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, CodeXml, LogIn, UserCog, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation'; 
import ThemeSwitcher from './ThemeSwitcher'; 
import { useToast } from '@/hooks/use-toast';

const baseNavItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog'},
  { href: '#hire-me', label: 'Hire Me' },
  { href: '#mentorship', label: 'Mentorship' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { user, loading, signOut: authSignOut } = useAuth();
  const router = useRouter(); 
  const { toast } = useToast();
  const currentRoutePathname = usePathname();

  const handleSignOut = async () => {
    try {
      await authSignOut();
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login'); 
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({ title: 'Logout Failed', description: 'Could not log out. Please try again.', variant: 'destructive' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      if (currentRoutePathname === '/') { // Only track active section on homepage
        let currentSectionId = '';
        baseNavItems.forEach(item => { 
          if (item.href.startsWith('#')) {
            const section = document.querySelector(item.href) as HTMLElement;
            if (section && section.offsetTop <= window.scrollY + 150) { // Adjust offset as needed
              currentSectionId = item.href;
            }
          }
        });
        setActiveSection(currentSectionId);
      } else {
        setActiveSection(''); // Reset active section if not on homepage
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoutePathname]);


  const allNavLinks = [
    ...baseNavItems,
    ...(user ? [{ href: '/admin/dashboard', label: 'Admin', icon: UserCog, type: 'admin' as const }] : []),
  ];

  const processedNavItems = allNavLinks.map(item => {
    let fullHref = item.href;
    if (item.href.startsWith('#')) {
      fullHref = currentRoutePathname === '/' ? item.href : `/${item.href}`;
    }
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
            {processedNavItems.map((item) => {
              let itemIsActive = false;
              if (item.href.startsWith('#')) { 
                itemIsActive = currentRoutePathname === '/' && activeSection === item.href;
              } else {
                itemIsActive = currentRoutePathname.startsWith(item.href);
              }
              return (
                <Link key={item.label} href={item.fullHref} passHref legacyBehavior>
                  <a className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 flex items-center gap-1.5",
                    itemIsActive
                      ? "text-primary bg-primary/10" 
                      : "text-foreground/80"
                  )}>
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </a>
                </Link>
              );
            })}
            {!loading && (
              user ? (
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-foreground/80 hover:text-primary hover:bg-primary/10">
                  <LogOut className="mr-1.5 h-4 w-4" /> Logout
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild className="text-foreground/80 hover:text-primary hover:bg-primary/10">
                  <Link href="/login">
                    <LogIn className="mr-1.5 h-4 w-4" /> Login
                  </Link>
                </Button>
              )
            )}
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
                  {processedNavItems.map((item) => {
                     let itemIsActive = false;
                     if (item.href.startsWith('#')) {
                       itemIsActive = currentRoutePathname === '/' && activeSection === item.href;
                     } else {
                       itemIsActive = currentRoutePathname.startsWith(item.href);
                     }
                    return (
                     <Link key={item.label} href={item.fullHref} passHref legacyBehavior>
                      <a className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-primary hover:bg-primary/10 flex items-center gap-2",
                        itemIsActive
                          ? "text-primary bg-primary/10" 
                          : "text-foreground/80"
                      )}>
                        {item.icon && <item.icon className="h-5 w-5" />}
                        {item.label}
                      </a>
                    </Link>
                  );
                  })}
                   {!loading && (
                    user ? (
                      <Button variant="ghost" onClick={handleSignOut} className="justify-start px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10">
                        <LogOut className="mr-2 h-5 w-5" /> Logout
                      </Button>
                    ) : (
                       <Button variant="ghost" asChild className="justify-start px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10">
                        <Link href="/login">
                          <LogIn className="mr-2 h-5 w-5" /> Login
                        </Link>
                      </Button>
                    )
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
