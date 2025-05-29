'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { BotIcon } from 'lucide-react';
import React, { useState } from 'react';
import BotTable from './BotTable';
import AddBotModal from './modals/AddBotModal';
import DeleteBotModal from './modals/DeleteBotModal';
import EditBotModal from './modals/EditBotModal';
import SearchFilter from './SearchFilter';
import { Bot } from '@/api/types/bots';
import { useBots, useCreateBot, useUpdateBot, useDeleteBot } from '@/hooks/useBots';
import useDialog from '@/hooks/useDialog';
import { useVectorStoreCollections } from '@/hooks/useVectoreStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function BotTabContent() {
  const [searchBot, setSearchBot] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useBots(
    searchBot,
    selectedCollection === 'all' ? undefined : selectedCollection
  );

  const { mutate: updateBot, isPending: isUpdating } = useUpdateBot({
    onSuccess: () => {
      toast.success('Бота успішно оновлено');
      closeEditBot();
      queryClient.invalidateQueries({ queryKey: ['bots'] });
      setSelectedBot(null);
    },
    onError: () => toast.error('Не вдалося оновити бота'),
  });

  const { mutate: deleteBot, isPending: isDeleting } = useDeleteBot({
    onSuccess: () => {
      toast.success('Бота успішно видалено');
      closeDeleteBot();
      queryClient.invalidateQueries({ queryKey: ['bots'] });
      setSelectedBot(null);
    },
    onError: () => toast.error('Не вдалося видалити бота'),
  });

  const { data: collections } = useVectorStoreCollections();
  const { isVisible: isVisibleEditBot, open: openEditBot, close: closeEditBot } = useDialog();
  const { isVisible: isVisibleDeleteBot, open: openDeleteBot, close: closeDeleteBot } = useDialog();

  const handleUpdateBot = () => {
    if (!selectedBot?.id || !selectedBot.name || !selectedBot.chromaCollection) {
      toast.error('Будь ласка, заповніть усі обов’язкові поля');
      return;
    }
    updateBot({
      botId: selectedBot.id,
      data: {
        name: selectedBot.name,
        description: selectedBot.description,
        chromaCollection: selectedBot.chromaCollection,
        botPrompt: selectedBot.botPrompt,
      },
    });
  };

  const handleDeleteBot = () => {
    if (!selectedBot?.id) {
      toast.error('Будь ласка, виберіть бота для видалення');
      return;
    }
    deleteBot(selectedBot.id);
  };

  return (
    <>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BotIcon className="h-5 w-5" />
              Боти
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SearchFilter
                searchBot={searchBot}
                setSearchBot={setSearchBot}
                selectedCollection={selectedCollection}
                setSelectedCollection={setSelectedCollection}
                collections={collections}
              />

              <BotTable
                bots={data?.bots || []}
                isLoading={isLoading}
                setSelectedBot={setSelectedBot}
                openEdit={openEditBot}
                openDelete={openDeleteBot}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit bot */}
      <EditBotModal
        isOpen={isVisibleEditBot}
        onClose={closeEditBot}
        selectedBot={selectedBot}
        setSelectedBot={setSelectedBot}
        collections={collections}
        onUpdate={handleUpdateBot}
        isUpdating={isUpdating}
      />
      {/* Delete bot */}
      <DeleteBotModal
        isOpen={isVisibleDeleteBot}
        onClose={closeDeleteBot}
        onDelete={handleDeleteBot}
        isDeleting={isDeleting}
      />
    </>
  );
}
