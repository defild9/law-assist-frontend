'use client';
import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { SearchBar } from '../collections/SearchBar';
import { useUsers } from '@/hooks/useUsers';
import { LawyerList } from './LawyerList';
import { PaginationFooter } from '../collections/PaginationFooter';

export default function LawyersPageContent() {
  const [searchLawyer, setSearchLawyer] = useState<string | undefined>(undefined);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: lawyers, isLoading } = useUsers({
    search: searchLawyer,
    limit: itemsPerPage,
    page: currentPage,
    role: 'lawyer',
  });

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, lawyers?.totalPages || 0)));
  };
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <HeaderSection />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lawyer Profiles</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <SearchBar
                value={searchLawyer}
                placeholder="Search lawyers..."
                onChange={setSearchLawyer}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isNeedRefresh={false}
              />

              <div className="rounded-md border">
                <LawyerList lawyers={lawyers?.data || []} />
              </div>

              <PaginationFooter
                page={currentPage}
                totalPages={lawyers?.totalPages || 0}
                totalItems={lawyers?.total || 0}
                pageSize={itemsPerPage}
                goToPage={goToPage}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
