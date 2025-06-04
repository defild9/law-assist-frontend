import { FileText, Loader2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';

interface FileItemProps {
  source: string;
  lastUpdated: string;
  onDelete: () => void;
  isLoading?: boolean;
}

export function FileItem({ source, lastUpdated, onDelete, isLoading }: FileItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">{decodeURIComponent(escape(source))}</p>
          <p className="text-xs text-muted-foreground">
            Оновлено: {format(new Date(lastUpdated), 'd MMM yyyy')}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
