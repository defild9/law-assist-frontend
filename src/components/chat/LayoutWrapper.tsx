'use client';

import { useState } from 'react';
import SidebarWrapper from '../ui/SidebarWrapper';
import { Button } from '../ui/Button';
import { LogOut, PanelLeftIcon, PanelRightIcon, Search, Settings, User } from 'lucide-react';
import ChatSidebar from './ChatSidebar';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';

import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import Link from 'next/link';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => signOut();

  return (
    <>
      <SidebarWrapper isOpen={isSidebarOpen}>
        <ChatSidebar />
      </SidebarWrapper>

      <div className="flex-1 flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? (
                <PanelLeftIcon className="h-5 w-5" />
              ) : (
                <PanelRightIcon className="h-5 w-5" />
              )}
            </Button>
            {/* TODO: search opening */}
            <Button variant="ghost" size="icon" onClick={() => {}}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <main className="flex-1 relative">{children}</main>
      </div>
    </>
  );
}
