'use client';

import React from 'react';
import { Bot, BarChart3, Scale, Users, FileMinus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/utils';
import Link from 'next/link';

const navigation = [
  {
    name: 'Bots',
    href: '/bots',
    icon: Bot,
  },
  {
    name: 'Feedback',
    href: '/feedbacks',
    icon: BarChart3,
  },
  {
    name: 'Lawyers',
    href: '/lawyers',
    icon: Users,
  },
  {
    name: 'Templates',
    href: '/templates',
    icon: FileMinus,
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
  },
];

const LayoutNavigation = () => {
  const pathname = usePathname();
  return (
    <nav className="p-4 space-y-2">
      {navigation.map(item => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default LayoutNavigation;
