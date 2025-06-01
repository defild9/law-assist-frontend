'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/utils';
import { useUserRole } from '@/hooks/useUserRole';
import {
  Bot,
  BarChart3,
  Scale,
  Users,
  FileMinus,
  CreditCard,
  FileText,
  LayoutDashboard,
} from 'lucide-react';

const navigation = [
  { name: 'Панель керування', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Користувачі', href: '/users', icon: Users, adminOnly: true },
  { name: 'Юристи', href: '/lawyers', icon: Scale, adminOnly: true },
  { name: 'Боти', href: '/bots', icon: Bot },
  { name: 'Тарифи підписки', href: '/subscription-plans', icon: CreditCard, adminOnly: true },
  { name: 'Підписки', href: '/subscriptions', icon: CreditCard, adminOnly: true },
  { name: 'Відгуки', href: '/feedbacks', icon: BarChart3 },
  { name: 'Шаблони документів', href: '/templates', icon: FileText },
];

const LayoutNavigation = () => {
  const pathname = usePathname();
  const { isAdmin } = useUserRole();

  return (
    <nav className="p-4 space-y-2">
      {navigation
        .filter(item => !item.adminOnly || isAdmin)
        .map(item => {
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
