'use client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useVectorStoreCollectionsWithFiles } from '@/hooks/useVectoreStore';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Database,
  FileText,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from 'lucide-react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { SearchBar } from './SearchBar';
import { CollectionCard } from './CollectionCard';
import { PaginationFooter } from './PaginationFooter';

export default function CollectionTabContent() {
  const [searchCollection, setSearchCollection] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { data: vectoreStores, isLoading } = useVectorStoreCollectionsWithFiles(
    searchCollection,
    page,
    limit
  );

  const totalCollections = vectoreStores?.total ?? 0;
  const totalPages = Math.ceil(totalCollections / limit);

  const goToPage = (page: number) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Колекції
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SearchBar
              value={searchCollection}
              placeholder="Пошук колекцій..."
              onChange={setSearchCollection}
              itemsPerPage={limit}
              setItemsPerPage={setLimit}
              currentPage={page}
              setCurrentPage={setPage}
            />
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : vectoreStores?.data?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Колекції не знайдено</div>
            ) : (
              vectoreStores?.data.map(collection => (
                <CollectionCard key={collection.id} collection={collection} />
              ))
            )}

            <PaginationFooter
              page={page}
              totalPages={totalPages}
              totalItems={totalCollections}
              pageSize={limit}
              goToPage={goToPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
