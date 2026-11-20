import React from 'react';
import { ArrowLeft, Compass, Home, Phone } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-[var(--theme-text-primary)]">
      <div className="max-w-md w-full bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center mx-auto text-[var(--theme-accent)]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            404 · Page Not Found
          </div>
          <h1 className="text-3xl font-bold text-[var(--theme-text-primary)]">
            Lost In Production
          </h1>
          <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
            The page, case study, or resource you are looking for has been moved or is currently in post-production.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Agency Home</span>
          </button>

          <button
            onClick={() => onNavigate('portfolio')}
            className="w-full py-3 bg-[var(--theme-bg-elevated)] hover:bg-[var(--theme-border)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs font-medium rounded-xl transition-colors"
          >
            Browse Selected Work
          </button>
        </div>
      </div>
    </div>
  );
};
