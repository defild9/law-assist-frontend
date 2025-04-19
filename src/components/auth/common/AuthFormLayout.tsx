import React, { ReactNode } from 'react';

interface AuthFormLayoutProps {
  children: ReactNode;
}

export const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({ children }) => (
  <div className="w-full max-w-sm space-y-6">{children}</div>
);
