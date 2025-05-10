'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import UpdateProfileForm from '@/components/profile/UpdateProfileForm';
import ChangePassword from '@/components/profile/ChangePassword';
import DeleteAccount from '@/components/profile/DeleteAccount';

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6">
              <UpdateProfileForm />

              <ChangePassword />

              <DeleteAccount />
            </div>
          </TabsContent>

          <TabsContent value="consultations">
            {/* TODO: tab with consultation with laywer */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
