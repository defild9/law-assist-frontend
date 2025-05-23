'use client';

import { Button } from '@/components/ui/Button';
import { BotIcon, Database, FolderPlus, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import HeaderSection from '@/components/dashboard/bots/HeaderSection';
import BotTabContent from '@/components/dashboard/bots/BotTabContent';
import useDialog from '@/hooks/useDialog';
import CollectionTabContent from '../collections/CollectionTabContent';
import AddBotModal from './modals/AddBotModal';
import { useState } from 'react';
import { useCreateBot } from '@/hooks/useBots';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateCollection, useVectorStoreCollections } from '@/hooks/useVectoreStore';
import { AddCollectionModal } from '../collections/modals/AddCollection';

export default function BotsAndCollectionsContent() {
  const [newBot, setNewBot] = useState({
    name: '',
    description: '',
    collection: '',
    botPrompt: '',
  });

  const [newCollectionName, setNewCollectionName] = useState('');

  const queryClient = useQueryClient();

  const { data: collections } = useVectorStoreCollections();

  const { mutate: createBot, isPending } = useCreateBot({
    onSuccess: () => {
      setNewBot({
        name: '',
        description: '',
        collection: '',
        botPrompt: '',
      });
      closeAddBot();
      queryClient.invalidateQueries({ queryKey: ['bots'] });
      toast.success('Bot created successfully');
    },
    onError: () => {
      toast.error('Failed to create bot');
    },
  });

  const { mutate: createCollection, isPending: isCreatingCollection } = useCreateCollection({
    onSuccess: () => {
      setNewCollectionName('');
      closeAddCollection();
      queryClient.invalidateQueries({ queryKey: ['vectorStoreCollectionsWithFiles'] });
      toast.success('Collection created successfully');
    },
    onError: () => {
      toast.error('Failed to create collection');
    },
  });

  const { isVisible: isVisibleAddBot, open: openAddBot, close: closeAddBot } = useDialog();

  const {
    isVisible: isVisibleAddCollection,
    open: openAddCollection,
    close: closeAddCollection,
  } = useDialog();

  const handleCreateBot = () => {
    if (!newBot.name || newBot.collection === '') {
      toast.error('Please fill in all required fields');
      return;
    }
    createBot({
      name: newBot.name,
      description: newBot.description,
      botPrompt: newBot.botPrompt,
      chromaCollection: newBot.collection,
    });
  };

  const handleCreateCollection = () => {
    if (!newCollectionName) {
      toast.error('Please fill in all required fields');
      return;
    }
    createCollection(newCollectionName);
  };
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <HeaderSection />

          <div className="flex items-center gap-2">
            <Button onClick={() => openAddCollection()}>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Collection
            </Button>
            <Button onClick={() => openAddBot()}>
              <Plus className="h-4 w-4 mr-2" />
              New Bot
            </Button>
          </div>
        </div>

        <Tabs defaultValue="bots">
          <TabsList>
            <TabsTrigger value="bots" className="flex items-center gap-2">
              <BotIcon className="h-4 w-4" />
              Bots
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Collections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bots">
            <BotTabContent />
          </TabsContent>
          <TabsContent value="collections">
            <CollectionTabContent />
          </TabsContent>
        </Tabs>
      </div>
      <AddBotModal
        isOpen={isVisibleAddBot}
        onClose={closeAddBot}
        newBot={newBot}
        setNewBot={setNewBot}
        collections={collections}
        onCreate={handleCreateBot}
        isCreating={isPending}
      />

      <AddCollectionModal
        open={isVisibleAddCollection}
        onOpenChange={closeAddCollection}
        collectionName={newCollectionName}
        setCollectionName={setNewCollectionName}
        onCreate={handleCreateCollection}
        isCreating={isCreatingCollection}
      />
    </div>
  );
}
