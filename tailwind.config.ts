import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - Professional blue
        brand: {
          primary: '#4A9FD8',
          secondary: '#60A5DC',
          hover: '#3D8BC7',
          light: '#E0F2FE',
          dark: '#2D7AB8',
        },
        // Semantic colors
        success: {
          light: '#D1FAE5',
          DEFAULT: '#10B981',
          dark: '#065F46',
        },
        warning: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
          dark: '#92400E',
        },
        error: {
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#991B1B',
        },
        info: {
          light: '#DBEAFE',
          DEFAULT: '#3B82F6',
          dark: '#1E3A8A',
        },
        // Dark mode colors - Professional navy
        dark: {
          bg: {
            primary: '#1a1d2e',
            secondary: '#1f2436',
            card: '#24293e', // Slightly lighter than bg for contrast
            input: '#2d3348',
            elevated: '#2a3046',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#94a3b8',
            muted: '#64748b',
          },
          border: '#334155', // Slate-700 for subtle borders
        },
        // Light mode colors - Clean professional
        light: {
          bg: {
            primary: '#F8FAFC', // Changed from #FFFFFF to #F8FAFC for better contrast with cards
            secondary: '#F1F5F9',
            card: '#FFFFFF',
            input: '#F1F5F9',
            elevated: '#FFFFFF',
          },
          text: {
            primary: '#0F172A',
            secondary: '#475569',
            muted: '#64748B',
          },
          border: '#E2E8F0',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dot-pattern': 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        'dot-pattern-dark': 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '30px 30px',
        'dot-lg': '40px 40px',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(74, 159, 216, 0.3)',
        'glow-lg': '0 0 40px rgba(74, 159, 216, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(74, 159, 216, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
