import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';

interface DashboardHeaderProps {
  period: '7d' | '30d' | '90d';
  setPeriod: (v: '7d' | '30d' | '90d') => void;
}

export function DashboardHeader({ period, setPeriod }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Панель керування</h1>
        <p className="text-muted-foreground">Огляд продуктивності вашої платформи</p>
      </div>
      <Tabs value={period} onValueChange={(v: any) => setPeriod(v)}>
        <TabsList>
          <TabsTrigger value="7d">7 днів</TabsTrigger>
          <TabsTrigger value="30d">30 днів</TabsTrigger>
          <TabsTrigger value="90d">90 днів</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
