'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/auth';
import {
  ArrowRight, Shield, DollarSign, TrendingDown,
  Search, Globe, Zap, CheckCircle, Package, Eye,
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Enter a product name or upload an image. Our AI instantly finds it across dozens of stores.',
  },
  {
    icon: DollarSign,
    title: 'Real-Time Prices',
    description: 'Live pricing from Amazon, Walmart, Daraz, Flipkart, and more — all on one screen.',
  },
  {
    icon: TrendingDown,
    title: 'Best Deals',
    description: 'AI-powered analysis highlights the lowest price and the best value so you never overpay.',
  },
  {
    icon: Shield,
    title: 'Trusted Data',
    description: 'Verified prices pulled directly from official store listings. No hidden fees.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Supports 7+ countries — US, UK, India, Pakistan, Germany, France, Canada — in local currency.',
  },
  {
    icon: Package,
    title: 'Easy Workflow',
    description: 'Select country → add product → compare prices. Done in under 30 seconds.',
  },
];

const steps = [
  {
    title: 'Pick Your Country',
    description: 'Choose from 7+ supported regions. Prices and stores are automatically localized.',
  },
  {
    title: 'Add a Product',
    description: 'Type the product name. Our AI searches Google Shopping for real listings.',
  },
  {
    title: 'Compare & Save',
    description: 'See all prices side-by-side. Click any listing to go directly to the store.',
  },
];

export default function HomePage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dots">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8"
              style={{ borderColor: 'color-mix(in srgb, var(--brand-primary) 35%, transparent)', color: 'var(--brand-primary)', backgroundColor: 'var(--brand-light)' }}>
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Price Comparison
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ color: 'var(--foreground)' }}>
              Discover{' '}
              <span style={{ color: 'var(--brand-primary)' }}>Transparent</span>
              <br className="hidden sm:block" />
              Product Prices
            </h1>

            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: 'var(--muted)' }}>
              Compare prices across top e-commerce stores instantly.
              Get AI-powered insights and never overpay again.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isAuthenticated ? (
                <Link href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--brand-primary)', boxShadow: '0 4px 24px var(--brand-ring)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand-primary)')}
                >
                  Go to Dashboard <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link href="/register"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: 'var(--brand-primary)', boxShadow: '0 4px 24px var(--brand-ring)' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--brand-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--brand-primary)')}
                  >
                    Get Started Free <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/login"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      color: 'var(--foreground)',
                      borderColor: 'var(--card-border)',
                      backgroundColor: 'var(--card-bg)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-12 text-sm"
              style={{ color: 'var(--muted)' }}>
              {['Free to use', 'Real-time prices', '7+ countries', 'No credit card needed'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#22c55e' }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <div className="border-y" style={{ borderColor: 'var(--card-border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '7+', label: 'Countries' },
              { value: '50+', label: 'Stores Monitored' },
              { value: 'Live', label: 'Price Updates' },
              { value: 'AI', label: 'Powered Insights' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: 'var(--brand-primary)' }}>{s.value}</div>
                <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Why Choose TransparentPrice?
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
              Powered by AI and real-time data from the world&apos;s leading e-commerce platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map(f => (
              <div key={f.title}
                className="group p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'color-mix(in srgb, var(--brand-primary) 50%, transparent)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px var(--brand-ring)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--brand-light)' }}>
                  <f.icon className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: 'var(--section-alt)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              How It Works
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
              Get price comparisons in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* connector line — desktop only */}
            <div className="hidden md:block absolute top-7 left-1/3 right-1/3 h-px"
              style={{ backgroundColor: 'var(--brand-light)' }} />

            {steps.map((step, i) => (
              <div key={step.title} className="text-center relative">
                <div className="w-14 h-14 rounded-2xl text-white text-xl font-bold flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: 'var(--brand-primary)', boxShadow: '0 4px 16px var(--brand-ring)' }}>
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl p-10 sm:p-16"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 50%, #3730a3 100%)',
              boxShadow: '0 20px 60px rgba(79,70,229,0.35)',
            }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Saving Money?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join smart shoppers comparing prices before they buy.
              Free forever — no credit card required.
            </p>
            <Link
              href={isAuthenticated ? '/dashboard' : '/register'}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                backgroundColor: '#ffffff',
                color: '#4f46e5',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
              }}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
