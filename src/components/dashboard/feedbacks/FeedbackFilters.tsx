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

const FeedbackTagLabels: Record<FeedbackTag, string> = {
  [FeedbackTag.TOO_SHORT]: 'Занадто коротко',
  [FeedbackTag.OFF_TOPIC]: 'Не по темі',
  [FeedbackTag.HELPFUL]: 'Корисно',
  [FeedbackTag.HARMFUL]: 'Шкідливо',
  [FeedbackTag.SPAM]: 'Спам',
  [FeedbackTag.OTHER]: 'Інше',
};

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
        placeholder="Пошук..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>

    <Select value={filterType} onValueChange={v => setFilterType(v as any)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Усі типи" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Усі типи</SelectItem>
        <SelectItem value={FeedbackType.LIKE}>Подобається</SelectItem>
        <SelectItem value={FeedbackType.DISLIKE}>Не подобається</SelectItem>
      </SelectContent>
    </Select>

    <Select value={filterTag} onValueChange={v => setFilterTag(v as any)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Усі теги" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Усі теги</SelectItem>
        {Object.values(FeedbackTag).map(tag => (
          <SelectItem key={tag} value={tag}>
            {FeedbackTagLabels[tag]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
