import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Award, Building, Globe } from 'lucide-react';
import { Project } from '../types';

interface CorporateServicesPageProps {
  onNavigate: (page: string, params?: { service?: string }) => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const CorporateServicesPage: React.FC<CorporateServicesPageProps> = ({
  onNavigate,
  projects,
  onSelectProject,
}) => {
  const corporateProjects = projects.filter(
    (p) => p.category === 'corporate' || p.category === 'institutional' || p.category === 'documentaries'
  );

  return (
    <div className="space-y-24 pb-24 text-[var(--theme-text-primary)]">
      {/* Sector Hero */}
      <section className="relative pt-12 pb-8 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Dedicated Sector · Corporate & Governance
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[var(--theme-text-primary)]">
            Institutional Media & Conference Documentation
          </h1>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light leading-relaxed max-w-3xl">
            Trusted by multinational corporations, NGOs, universities, and government bodies across Ghana and West Africa to document high-stakes summits, communicate donor impact, and protect executive protocol.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('quote', { service: 'Corporate and Institutional Media' })}
              className="px-7 py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md"
            >
              Request Corporate Technical Rider
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs font-medium rounded-xl transition-colors"
            >
              Schedule Protocol Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Technical Operations
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            Designed for Zero-Failure Environments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm">
            <Clock className="w-6 h-6 text-[var(--theme-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">Rapid Press Dissemination</h3>
            <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              Tethered digital workflows allow retouched, branded executive photos to be handed to your corporate communications desk within 20 minutes of each plenary keynote.
            </p>
          </div>

          <div className="p-7 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[var(--theme-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">Confidentiality & Compliance</h3>
            <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              Standard non-disclosure agreements (NDAs), encrypted SSD footage transport, and strict compliance with Ghana Data Protection Act guidelines for closed-door sessions.
            </p>
          </div>

          <div className="p-7 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm">
            <Globe className="w-6 h-6 text-[var(--theme-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">NGO Impact Field Units</h3>
            <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
              Self-contained documentary crews experienced in traversing rural districts, respecting community consent protocols, and capturing compelling human beneficiary narratives.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Institutional Case Study */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-3xl overflow-hidden p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-md">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Case Study Highlight · Global Reach NGO
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
              Youth in Action: Renewable Agriculture Initiative
            </h3>
            <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
              A comprehensive multi-region documentary mission across 6 districts in Ghana. DAVEAK-MULTIMEDIA delivered an international festival-grade film alongside 12 short-form grant showcase reels that directly aided in securing a $1.2M phase-two expansion.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[var(--theme-border)] text-left">
              <div>
                <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">$1.2M</div>
                <div className="text-[11px] text-[var(--theme-text-muted)]">Funding Secured</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">6 Regions</div>
                <div className="text-[11px] text-[var(--theme-text-muted)]">Field Coverage</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">14 Days</div>
                <div className="text-[11px] text-[var(--theme-text-muted)]">Festival Delivery</div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  const proj = projects.find((p) => p.id === 'project-ngo-ghana-impact');
                  if (proj) onSelectProject(proj);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--theme-accent)] hover:opacity-80"
              >
                <span>Read Full Technical Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[var(--theme-border)]">
              <img
                src="/src/assets/images/portfolio_ngo_documentary_1795142171892.jpg"
                alt="NGO Impact Storytelling"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Case Cards */}
      {corporateProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-4">
            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">Related Institutional Projects</h3>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-xs text-[var(--theme-accent)] hover:underline font-medium"
            >
              View all portfolio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateProjects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl overflow-hidden cursor-pointer group hover:border-[var(--theme-accent)] transition-all p-4 space-y-3 shadow-sm"
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full aspect-[16/10] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs text-[var(--theme-accent)] font-mono">{p.client}</div>
                <h4 className="text-sm font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2">{p.summary}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Strip */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
          Book Corporate Media Coverage
        </h3>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] max-w-xl mx-auto">
          Contact our corporate desk for bespoke technical riders, retainer agreements, or multi-day conference packages.
        </p>
        <button
          onClick={() => onNavigate('quote', { service: 'Corporate and Institutional Media' })}
          className="px-8 py-3.5 theme-accent-bg hover:opacity-90 font-semibold text-xs rounded-xl transition-all shadow-md"
        >
          Request Corporate Quotation
        </button>
      </section>
    </div>
  );
};
