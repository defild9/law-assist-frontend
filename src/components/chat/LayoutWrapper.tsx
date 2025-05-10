'use client';

import { useState } from 'react';
import SidebarWrapper from '../ui/SidebarWrapper';
import { Button } from '../ui/Button';
import { PanelLeftIcon, PanelRightIcon, Search } from 'lucide-react';
import ChatSidebar from './ChatSidebar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          <div className="flex items-center gap-2">{/* TODO: Profile section */}</div>
        </div>

        <main className="flex-1 relative">{children}</main>
      </div>
    </>
  );
}
