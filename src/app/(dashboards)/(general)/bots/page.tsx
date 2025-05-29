export const dynamic = 'force-dynamic';
import BotsAndCollectionsContent from '@/components/dashboard/bots/BotsAndCollectionsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Боти | Law Assist',
};

export default async function BotsAndCollectionsPage() {
  return <BotsAndCollectionsContent />;
}
