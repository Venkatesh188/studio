
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, UserCircle, Newspaper, Settings, LogOut, Briefcase, Info } from 'lucide-react'; // Added Briefcase, Info
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth'; 
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Blog Posts', icon: Newspaper },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/about', label: 'About Page', icon: Info },
  { href: '/admin/account', label: 'Account', icon: UserCircle },
  // { href: '/admin/settings', label: 'Settings', icon: Settings }, // Future addition
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut: authSignOut } = useAuth();
  const { toast } = useToast();

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


  return (
    <aside className="w-64 bg-card text-card-foreground p-4 space-y-6 border-r border-border flex flex-col min-h-full">
      <div className="text-center">
        <Link href="/admin/dashboard" className="text-2xl font-bold text-primary">
          Admin Panel
        </Link>
        {user && <p className="text-xs text-muted-foreground mt-1">{user.email}</p>}
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {adminNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted hover:text-foreground/80 text-foreground/70'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
         <Button variant="outline" className="w-full mb-2" asChild>
          <Link href="/" target="_blank">View Website</Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>
    </aside>
  );
}
