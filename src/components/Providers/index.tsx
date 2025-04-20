import { SessionProvider } from 'next-auth/react';
import { FC } from 'react';
import QueryProvider from './QueryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
};

export default Providers;
