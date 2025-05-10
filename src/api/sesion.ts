'use server';

import { auth } from '@/libs/auth';

export const getSession = async () => {
  const session = await auth();
  return session;
};
