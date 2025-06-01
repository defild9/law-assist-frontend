import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BarChart3, ThumbsUp, ThumbsDown } from 'lucide-react';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
];

export function FeedbackChart({ tagsStatus, likePercent, dislikePercent }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Аналіз відгуків
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tagsStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {tagsStatus.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Позитивні</p>
              <p className="text-2xl font-bold">{likePercent}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown className="h-4 w-4 text-red-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Негативні</p>
              <p className="text-2xl font-bold">{dislikePercent}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
