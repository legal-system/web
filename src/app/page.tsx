'use client';

import { useRouter } from 'next/navigation';
import { RequireAuth } from '@/components/RequireAuth';
import { useAuth } from '@/components/AuthProvider';

export default function HomePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <RequireAuth>
      {user ? (
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 p-8">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Signed in as</p>
              <h1 className="text-2xl font-semibold">{user.fullName}</h1>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Sign out
            </button>
          </header>

          <dl className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            <Row label="Email" value={user.email} />
            <Row label="Status" value={user.status} />
            <Row
              label="Last sign-in"
              value={user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : '—'}
            />
            <Row label="Member since" value={new Date(user.createdAt).toLocaleDateString()} />
          </dl>

          <p className="text-sm text-slate-500">
            Reload the page: this card repopulates from{' '}
            <code className="rounded bg-slate-100 px-1">GET /api/auth/me</code>, not from what the
            browser stored at login.
          </p>
        </main>
      ) : null}
    </RequireAuth>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
