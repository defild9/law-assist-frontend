'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Scale, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">Law Assist</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Можливості
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Тарифи
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Про нас
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Контакти
              </Link>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {session?.user ? (
                <>
                  <Button variant="ghost">
                    <Link href="/chat">До чатів</Link>
                  </Button>
                  <Button variant="outline" onClick={() => signOut()}>
                    Вийти
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost">
                    <Link href="/sign-in">Увійти</Link>
                  </Button>
                  <Button>
                    <Link href="/sign-up">Розпочати</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-2">
              <Link
                href="/features"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
              >
                Можливості
              </Link>
              <Link
                href="/pricing"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
              >
                Тарифи
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
              >
                Про нас
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
              >
                Контакти
              </Link>

              <div className="pt-4 space-y-2">
                {session?.user ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start">
                      <Link href="/chat">До чатів</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => signOut()}
                    >
                      Вийти
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-start">
                      <Link href="/sign-in">Увійти</Link>
                    </Button>
                    <Button className="w-full justify-start">
                      <Link href="/sign-up">Розпочати</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>
    </>
  );
}
