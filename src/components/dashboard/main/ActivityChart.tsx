import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Activity } from 'lucide-react';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export function ActivityChart({ data }: { data: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Активність платформи
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                name="Користувачі"
                stackId="1"
                stroke={COLORS[0]}
                fill={COLORS[0]}
              />
              <Area
                type="monotone"
                dataKey="bots"
                name="Боти"
                stackId="1"
                stroke={COLORS[1]}
                fill={COLORS[1]}
              />
              <Area
                type="monotone"
                dataKey="lawyers"
                name="Юристи"
                stackId="1"
                stroke={COLORS[2]}
                fill={COLORS[2]}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
