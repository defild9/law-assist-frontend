'use client';

export const dynamic = 'force-dynamic';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import UpdateProfileForm from '@/components/profile/UpdateProfileForm';
import ChangePassword from '@/components/profile/ChangePassword';
import DeleteAccount from '@/components/profile/DeleteAccount';
import VideoConsultation from '@/components/profile/VideoConsultation';

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Налаштування профілю</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Профіль</TabsTrigger>
            <TabsTrigger value="consultations">Консультації</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6">
              <UpdateProfileForm />

              <ChangePassword />

              <DeleteAccount />
            </div>
          </TabsContent>

          <TabsContent value="consultations">
            <div className="grid gap-6">
              <VideoConsultation />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
