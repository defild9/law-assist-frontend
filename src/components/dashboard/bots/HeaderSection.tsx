import { BotIcon } from 'lucide-react';

export default function HeaderSection() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <BotIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Bots</h1>
          <p className="text-muted-foreground">Manage AI assistants and their knowledge bases</p>
        </div>
      </div>
    </div>
  );
}
