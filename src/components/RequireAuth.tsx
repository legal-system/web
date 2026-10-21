'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthProvider';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, booting } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!booting && !user) {
      router.replace('/login');
    }
  }, [booting, user, router]);

  if (booting) {
    return <p className="p-8 text-sm text-slate-500">Checking your session…</p>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
