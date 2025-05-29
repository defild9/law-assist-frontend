import { Button } from '@/components/ui/Button';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface PaginationFooterProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  goToPage: (page: number) => void;
}

export function PaginationFooter({
  page,
  totalPages,
  totalItems,
  pageSize,
  goToPage,
}: PaginationFooterProps) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="text-sm text-muted-foreground">
        Показано з {startIndex + 1} по {Math.min(endIndex, totalItems)} із {totalItems} колекцій
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => goToPage(1)} disabled={page === 1}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-sm font-medium">Сторінка</div>
          <div className="text-sm font-medium">
            {page} з {totalPages}
          </div>
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(totalPages)}
          disabled={page === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
