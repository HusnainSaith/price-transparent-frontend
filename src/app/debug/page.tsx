'use client';

import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated, selectUser, selectToken } from '@/store/auth';
import { getAuthToken, getAuthUser } from '@/utils/cookies';

export default function DebugPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  
  const cookieToken = getAuthToken();
  const cookieUser = getAuthUser();

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
          Authentication Debug Info
        </h1>

        <div className="space-y-6">
          <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Redux State
            </h2>
            <div className="space-y-2 font-mono text-sm">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                <span className="font-semibold">Is Authenticated:</span> {isAuthenticated ? '✅ Yes' : '❌ No'}
              </p>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                <span className="font-semibold">User:</span> {user ? JSON.stringify(user, null, 2) : 'null'}
              </p>
              <p className="text-light-text-secondary dark:text-dark-text-secondary break-all">
                <span className="font-semibold">Token:</span> {token ? token.substring(0, 50) + '...' : 'null'}
              </p>
            </div>
          </div>

          <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Cookies
            </h2>
            <div className="space-y-2 font-mono text-sm">
              <p className="text-light-text-secondary dark:text-dark-text-secondary break-all">
                <span className="font-semibold">Cookie Token:</span> {cookieToken ? cookieToken.substring(0, 50) + '...' : 'null'}
              </p>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                <span className="font-semibold">Cookie User:</span> {cookieUser ? JSON.stringify(cookieUser, null, 2) : 'null'}
              </p>
            </div>
          </div>

          <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
              <li>If "Is Authenticated" shows ❌ No, you need to login</li>
              <li>If Token is null, your session has expired - please login again</li>
              <li>If everything shows data but categories still don't load, there's a backend issue</li>
              <li>After logging in, refresh this page to see updated values</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
