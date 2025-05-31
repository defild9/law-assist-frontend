import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Scale,
  MessageSquare,
  Shield,
  Sparkles,
  ArrowRight,
  Users,
  CheckCircle2,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Scale className="h-6 w-6" />
              <span className="text-lg font-medium">Law Assist</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Юридична допомога стала простішою з ШІ
            </h1>

            <p className="text-xl text-muted-foreground">
              Отримайте миттєві юридичні консультації, зв&apos;яжіться з досвідченими юристами та
              ефективно керуйте своїми юридичними справами за допомогою нашої платформи на базі ШІ.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8">
                <Link href="/register">Розпочати</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Link href="/pricing">Тарифи</Link>
              </Button>
            </div>

            <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Безкоштовний пробний період</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Без кредитної картки</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Скасування в будь-який час</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Чому обирають Law Assist?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Комплексні юридичні рішення на базі передових технологій ШІ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ШІ-Юридичний Асистент</h3>
                <p className="text-muted-foreground">
                  Отримуйте миттєві відповіді на ваші юридичні питання за допомогою нашого
                  передового ШІ-чатбота, навченого на юридичних прецедентах та нормативних актах.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Експертні Юристи</h3>
                <p className="text-muted-foreground">
                  Зв&apos;яжіться з кваліфікованими юристами для персональних консультацій та
                  професійних юридичних порад.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Безпека та Приватність</h3>
                <p className="text-muted-foreground">
                  Ваші дані захищені системою безпеки корпоративного рівня. Всі комунікації
                  шифруються наскрізним шифруванням.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Як це працює</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Почніть роботу з Law Assist у три прості кроки
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Задайте питання</h3>
              <p className="text-muted-foreground">
                Опишіть вашу юридичну ситуацію або задайте конкретне питання нашому ШІ-асистенту.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Отримайте ШІ-аналіз</h3>
              <p className="text-muted-foreground">
                Отримайте миттєві висновки на базі ШІ, відповідну юридичну інформацію та
                рекомендовані наступні кроки.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Зв&apos;яжіться з юристами</h3>
              <p className="text-muted-foreground">
                За потреби, заплануйте консультацію з кваліфікованим юристом, що спеціалізується на
                вашій справі.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold">Готові почати?</h2>
              <p className="mt-2 text-primary-foreground/80">
                Приєднуйтесь до тисяч користувачів, які довіряють Law Assist свої юридичні потреби.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" variant="secondary">
                <Link href="/register" className="text-lg px-8">
                  Зареєструватися
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/pricing" className="text-lg px-8">
                  Переглянути тарифи
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Продукт</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground">
                    Можливості
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Тарифи
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Компанія</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Контакти
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Юридична інформація</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Конфіденційність
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Умови використання
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Підтримка</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Центр підтримки
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    Часті питання
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              <span className="font-semibold">Law Assist</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Law Assist. Всі права захищені.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
