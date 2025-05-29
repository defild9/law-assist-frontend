import Link from 'next/link';
import { ReactNode } from 'react';

const quotes = [
  {
    text: 'Життя закону полягало не в логіці, а в досвіді.',
    author: 'Олівер Венделл Голмс-молодший',
  },
  {
    text: 'Знання закону — це не просто пам’ятати його слова, а розуміти його зміст.',
    author: 'Арістотель',
  },
  {
    text: 'Закон без справедливості — це лише сила в законній оболонці.',
    author: 'Олександр Солженіцин',
  },
  {
    text: 'Право — це мистецтво добра і справедливості.',
    author: 'Ульпіан',
  },
  {
    text: 'Свобода існує лише там, де діє закон.',
    author: 'Бенджамін Франклін',
  },
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  const quote = getRandomQuote();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-black">
        <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-black">
          <>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <div className="h-4 w-4 rounded-sm bg-white" />
              </div>
              <span className="text-lg font-semibold text-white">Law Assist</span>
            </Link>
          </>
          <blockquote className="space-y-2">
            <p className="text-lg text-white">«{quote.text}»</p>
            <footer className="text-sm text-white/60">{quote.author}</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        {children}
      </div>
    </div>
  );
}
