import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Layers, Eye } from 'lucide-react';
import { Project } from '../types';

interface BrandsPageProps {
  onNavigate: (page: string, params?: { service?: string }) => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({
  onNavigate,
  projects,
  onSelectProject,
}) => {
  const brandProjects = projects.filter(
    (p) => p.category === 'commercial' || p.category === 'branding' || p.category === 'photography'
  );

  return (
    <div className="space-y-24 pb-24 text-[var(--theme-text-primary)]">
      {/* Sector Hero */}
      <section className="relative pt-12 pb-8 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Dedicated Sector · Commercial & Retail
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[var(--theme-text-primary)]">
            Commercial Video, Packshots & Brand Storytelling
          </h1>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light leading-relaxed max-w-3xl">
            We partner with ambitious consumer brands, SMEs, luxury retail, and tech enterprises to craft conversion-focused visual campaigns that dominate social feeds, billboards, and television screens.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('quote', { service: 'Videography and Film' })}
              className="px-7 py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md"
            >
              Request Commercial Campaign Quote
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-6 py-3.5 bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs font-medium rounded-xl transition-colors"
            >
              View Commercial Reel
            </button>
          </div>
        </div>
      </section>

      {/* Brand Growth Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Creative Engineering
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            Built for Modern Consumer Attention
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm">
            <TrendingUp className="w-6 h-6 text-[var(--theme-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">Conversion-Driven Ads</h3>
            <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              Scripted TVCs and digital commercials structured with strong 3-second visual hooks, rhythmic pacing, and clear calls-to-action that drive measurable checkout and inquiry growth.
            </p>
          </div>

          <div className="p-7 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm">
            <Layers className="w-6 h-6 text-[var(--theme-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">Multi-Ratio Asset Suites</h3>
            <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              Every shoot delivers simultaneously framed 16:9 widescreen masters, 9:16 vertical TikTok/Instagram reels, and 1:1 e-commerce catalogue cuts from a single production day.
            </p>
          </div>

          <div className="p-7 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm">
            <Eye className="w-6 h-6 text-[var(--theme-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">Studio Packshot Precision</h3>
            <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              Clean, shadow-controlled studio product photography for cosmetic brands, food & beverages, luxury fashion, and consumer tech packages ready for web and print.
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-3xl overflow-hidden p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-md">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Commercial Highlight · Apex Lifestyle
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
              Elevated Identity Campaign & Digital Broadcast
            </h3>
            <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
              Complete brand campaign encompassing studio commercial spots, high-contrast color grading, and billboard imagery for prime-time rollout across Accra and regional retail channels.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[var(--theme-border)]">
              <div>
                <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">2.8M+</div>
                <div className="text-[11px] text-[var(--theme-text-muted)]">Total Impressions</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">+34%</div>
                <div className="text-[11px] text-[var(--theme-text-muted)]">Online Conversions</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">28 Cuts</div>
                <div className="text-[11px] text-[var(--theme-text-muted)]">Multi-Channel Variations</div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  const proj = projects.find((p) => p.id === 'project-apex-commercial-branding');
                  if (proj) onSelectProject(proj);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--theme-accent)] hover:opacity-80"
              >
                <span>Inspect Commercial Campaign Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[var(--theme-border)]">
              <img
                src="/src/assets/images/portfolio_brand_commercial_1795142172634.jpg"
                alt="Brand Commercial Shoot"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
          Ready to scale your brand’s visual presence?
        </h3>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] max-w-xl mx-auto">
          Whether you need a monthly content creation retainer, packshot catalogue, or flagship television commercial, DAVEAK is your production partner.
        </p>
        <button
          onClick={() => onNavigate('quote', { service: 'Videography and Film' })}
          className="px-8 py-3.5 theme-accent-bg hover:opacity-90 font-semibold text-xs rounded-xl transition-all shadow-md"
        >
          Request Brand Production Quote
        </button>
      </section>
    </div>
  );
};
