import React from 'react';

interface SidebarWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ children, isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? 'w-80' : 'w-0'
      } transition-all duration-300 overflow-hidden border-r bg-muted/30`}
    >
      {children}
    </div>
  );
};

export default SidebarWrapper;
