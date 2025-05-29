'use client';

import React from 'react';
import { Bot, BarChart3, Scale, Users, FileMinus, CreditCard, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/utils';
import Link from 'next/link';

const navigation = [
  {
    name: 'Користувачі',
    href: '/users',
    icon: Users,
  },
  {
    name: 'Юристи',
    href: '/lawyers',
    icon: Scale,
  },
  {
    name: 'Боти',
    href: '/bots',
    icon: Bot,
  },
  {
    name: 'Тарифи підписки',
    href: '/subscription-plans',
    icon: CreditCard,
  },
  {
    name: 'Підписки',
    href: '/subscriptions',
    icon: CreditCard,
  },
  {
    name: 'Відгуки',
    href: '/feedbacks',
    icon: BarChart3,
  },
  {
    name: 'Шаблони документів',
    href: '/templates',
    icon: FileText,
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
