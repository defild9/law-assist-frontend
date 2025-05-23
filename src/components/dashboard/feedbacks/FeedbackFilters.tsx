import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { FeedbackTag, FeedbackType } from '@/api/types/feedback';

interface FeedbackFiltersProps {
  filterType: 'all' | FeedbackType;
  setFilterType: (v: 'all' | FeedbackType) => void;
  filterTag: 'all' | FeedbackTag;
  setFilterTag: (v: 'all' | FeedbackTag) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

export const FeedbackFilters: React.FC<FeedbackFiltersProps> = ({
  filterType,
  setFilterType,
  filterTag,
  setFilterTag,
  searchQuery,
  setSearchQuery,
}) => (
  <div className="flex flex-wrap items-center gap-4">
    <div className="relative flex-1 min-w-[200px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>

    <Select value={filterType} onValueChange={v => setFilterType(v as any)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="All types" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All types</SelectItem>
        <SelectItem value={FeedbackType.LIKE}>Likes</SelectItem>
        <SelectItem value={FeedbackType.DISLIKE}>Dislikes</SelectItem>
      </SelectContent>
    </Select>

    <Select value={filterTag} onValueChange={v => setFilterTag(v as any)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="All tags" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All tags</SelectItem>
        {Object.values(FeedbackTag).map(tag => (
          <SelectItem key={tag} value={tag}>
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
