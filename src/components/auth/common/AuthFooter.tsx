import Link from 'next/link';

interface AuthFooterProps {
  question: string;
  actionText: string;
  actionHref: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ question, actionText, actionHref }) => (
  <p className="text-sm text-center text-muted-foreground">
    {question}{' '}
    <Link href={actionHref} className="font-medium underline underline-offset-4 hover:text-primary">
      {actionText}
    </Link>
  </p>
);
