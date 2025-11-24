'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectIsAuthenticated, selectUser, logoutUser } from '@/store/auth';
import ThemeToggle from './ThemeToggle';
import { ShoppingBag, Home, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-light-bg-primary/95 dark:bg-dark-bg-primary/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <ShoppingBag className="w-8 h-8 text-brand-primary" />
            <span className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
              TransparentPrice
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-brand-primary'
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-primary'
              }`}
            >
              Home
            </Link>

            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-brand-primary'
                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-primary'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border hover:border-brand-primary transition-colors"
                >
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {user?.firstName}
                  </span>
                </Link>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border hover:border-error hover:bg-error/10 transition-colors group"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-error transition-colors" />
                  <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary group-hover:text-error transition-colors">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:text-brand-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-brand-primary hover:bg-brand-hover text-white rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
