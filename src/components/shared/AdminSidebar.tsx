'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, UserCircle, Newspaper, Settings, Tags } from 'lucide-react';
import { Button } from '@/components/ui/button';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts', icon: Newspaper },
  // { href: '/admin/categories', label: 'Categories', icon: Tags }, // Future addition
  { href: '/admin/account', label: 'Account', icon: UserCircle },
  // { href: '/admin/settings', label: 'Settings', icon: Settings }, // Future addition
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card text-card-foreground p-4 space-y-6 border-r border-border flex flex-col min-h-full">
      <div className="text-center">
        <Link href="/admin/dashboard" className="text-2xl font-bold text-primary">
          Admin Panel
        </Link>
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
        <Button variant="outline" className="w-full">
          Log Out
        </Button>
      </div>
    </aside>
  );
}
