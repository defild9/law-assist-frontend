'use client';

import React from 'react';
import { Bot, BarChart3, Scale, Users, FileMinus, CreditCard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/utils';
import Link from 'next/link';

const navigation = [
  {
    name: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    name: 'Lawyers',
    href: '/lawyers',
    icon: Scale,
  },
  {
    name: 'Bots',
    href: '/bots',
    icon: Bot,
  },
  {
    name: 'Subscription Plans',
    href: '/subscription-plans',
    icon: CreditCard,
  },
  {
    name: 'Subscriptions',
    href: '/subscriptions',
    icon: CreditCard,
  },
  {
    name: 'Feedback',
    href: '/feedback',
    icon: BarChart3,
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
