'use client';
import { SessionProvider } from 'next-auth/react';

const AuthCredentials = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthCredentials;
