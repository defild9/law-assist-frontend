import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Feedback, FeedbackTag, FeedbackType } from '@/api/types/feedback';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

interface FeedbackStatsProps {
  feedbackList: Feedback[];
}

export const FeedbackStats: React.FC<FeedbackStatsProps> = ({ feedbackList }) => {
  const typeStats = useMemo(
    () => [
      { name: 'Likes', value: feedbackList.filter(f => f.type === FeedbackType.LIKE).length },
      { name: 'Dislikes', value: feedbackList.filter(f => f.type === FeedbackType.DISLIKE).length },
    ],
    [feedbackList]
  );

  const tagStats = useMemo(
    () =>
      Object.values(FeedbackTag).map((tag, i) => ({
        name: tag,
        value: feedbackList.filter(f => f.tag === tag).length,
      })),
    [feedbackList]
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>By Type</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={typeStats} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                {typeStats.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>By Tag</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tagStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {tagStats.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
