import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/Select';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchBot: string;
  setSearchBot: (v: string) => void;
  selectedCollection: string;
  setSelectedCollection: (v: string) => void;
  collections?: { collection: string[] };
}

export default function SearchFilter({
  searchBot,
  setSearchBot,
  selectedCollection,
  setSelectedCollection,
  collections,
}: SearchFilterProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bots..."
          value={searchBot}
          onChange={e => setSearchBot(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={selectedCollection} onValueChange={setSelectedCollection}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by collection" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Collections</SelectItem>
          {collections?.collection?.map(col => (
            <SelectItem key={col} value={col}>
              {col}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
