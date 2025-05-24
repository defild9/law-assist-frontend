import { Users } from 'lucide-react';
import React from 'react';

export default function HeaderSection() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Users className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Lawyer Profiles</h1>
        <p className="text-muted-foreground">Manage lawyer profiles and permissions</p>
      </div>
    </div>
  );
}
