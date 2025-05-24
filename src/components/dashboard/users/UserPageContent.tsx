'use client';

import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SearchBar } from '../collections/SearchBar';
import { useUsers } from '@/hooks/useUsers';
import { UserList } from './UserList';
import { PaginationFooter } from '../collections/PaginationFooter';
import { DeleteUserModal } from './modals/DeleteUserModal';
import useDialog from '@/hooks/useDialog';

export default function UserPageContent() {
  const [searchUser, setSearchUser] = useState<string | undefined>(undefined);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: users, isLoading } = useUsers({
    search: searchUser,
    limit: itemsPerPage,
    page: currentPage,
  });

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, users?.totalPages || 0)));
  };
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <HeaderSection />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SearchBar
                value={searchUser}
                placeholder="Search users..."
                onChange={setSearchUser}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isNeedRefresh={false}
              />

              <div className="rounded-md border">
                <UserList users={users?.data || []} isLoading={isLoading} />
              </div>

              <PaginationFooter
                page={currentPage}
                totalPages={users?.totalPages || 0}
                totalItems={users?.total || 0}
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
