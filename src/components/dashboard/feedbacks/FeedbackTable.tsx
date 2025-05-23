import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Feedback, FeedbackType } from '@/api/types/feedback';
import { format } from 'date-fns';

interface FeedbackTableProps {
  feedbackList: Feedback[];
  searchQuery: string;
}

export const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbackList, searchQuery }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Feedback | 'message';
    direction: 'asc' | 'desc';
  }>({ key: 'createdAt', direction: 'desc' });

  const sorted = useMemo(() => {
    return [...feedbackList].sort((a, b) => {
      const aVal = sortConfig.key === 'message' ? a.message : a[sortConfig.key];
      const bVal = sortConfig.key === 'message' ? b.message : b[sortConfig.key];
      if (aVal! < bVal!) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal! > bVal!) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [feedbackList, sortConfig]);

  const handleSort = (key: keyof Feedback | 'message') =>
    setSortConfig(cfg => ({
      key,
      direction: cfg.key === key && cfg.direction === 'asc' ? 'desc' : 'asc',
    }));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort('type')}>
              Type
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort('message')}>
              Message
            </Button>
          </TableHead>
          <TableHead>Tag</TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort('createdAt')}>
              Date
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted
          .filter(f => !searchQuery || f.message.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(f => (
            <TableRow key={f.id}>
              <TableCell>
                {f.type === FeedbackType.LIKE ? (
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ThumbsDown className="h-4 w-4 text-red-500" />
                )}
              </TableCell>
              <TableCell className="truncate max-w-[300px]">{f.message}</TableCell>
              <TableCell>{f.tag}</TableCell>
              <TableCell>{format(f.createdAt, 'MMM d, yyyy HH:mm')}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
