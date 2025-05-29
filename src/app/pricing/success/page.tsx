import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { CheckCircle2, ArrowLeft, CreditCard, Calendar } from 'lucide-react';

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Оплата пройшла успішно!</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4 pb-6">
          <p className="text-muted-foreground">
            Дякуємо за оформлення підписки. Ваша підписка активована, і ви маєте повний доступ до
            всіх функцій.
          </p>

          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>Статус оплати</span>
              </div>
              <span className="font-medium text-green-500">Успішно</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Наступне списання</span>
              </div>
              <span className="font-medium">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">
            <Link href="/profile">Перейти в Профіль</Link>
          </Button>

          <Button variant="outline" className="w-full gap-2">
            <Link href="/pricing" className="w-full flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Деталі підписки
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
