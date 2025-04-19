import Link from 'next/link';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  hideOnDesktop?: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, hideOnDesktop }) => (
  <>
    {hideOnDesktop && (
      <div className="space-y-2 text-center lg:hidden mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            <div className="h-4 w-4 rounded-sm bg-white" />
          </div>
          <span className="text-lg font-semibold text-white">Law Assist</span>
        </Link>
      </div>
    )}
    <div className="space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </>
);
