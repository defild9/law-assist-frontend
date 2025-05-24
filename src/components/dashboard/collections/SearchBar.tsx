'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Search } from 'lucide-react';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  isNeedRefresh?: boolean;
}

export function SearchBar({
  value,
  placeholder = 'Search...',
  onChange,
  setItemsPerPage,
  setCurrentPage,
  itemsPerPage,
  isNeedRefresh = true,
}: SearchBarProps) {
  const queryClient = useQueryClient();
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select
        value={itemsPerPage.toString()}
        onValueChange={value => {
          setItemsPerPage(parseInt(value));
          setCurrentPage(1);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 per page</SelectItem>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="15">15 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
        </SelectContent>
      </Select>
      {isNeedRefresh && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['vectorStoreCollectionsWithFiles'] });
          }}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
