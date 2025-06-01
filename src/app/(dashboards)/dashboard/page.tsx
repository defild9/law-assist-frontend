import DashboardContent from '@/components/dashboard/main/DashboardContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Панель керування | Law Assist',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
