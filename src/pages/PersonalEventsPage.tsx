import React from 'react';
import { ArrowRight, Sparkles, Heart, Crown, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface PersonalEventsPageProps {
  onNavigate: (page: string, params?: { service?: string }) => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const PersonalEventsPage: React.FC<PersonalEventsPageProps> = ({
  onNavigate,
  projects,
  onSelectProject,
}) => {
  const weddingProject = projects.find((p) => p.id === 'project-royal-golden-wedding');

  const personalOfferings = [
    {
      icon: <Heart className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Luxury Wedding Cinematography',
      desc: 'Bespoke feature films and highlight reels capturing the sacred intimacy, cultural splendor, and joy of traditional Ghanaian marriages and white wedding celebrations.',
    },
    {
      icon: <Crown className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'VIP Personal & Executive Portraits',
      desc: 'Studio and estate editorial portraits for diplomats, executives, artists, and thought leaders needing distinguished press kits and personal branding.',
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Graduation & Milestone Commemoration',
      desc: 'Commemorating academic milestones, convocations, and milestone birthdays with timeless family albums and heirloom print quality.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Private Galas & Milestone Anniversaries',
      desc: 'Discreet, non-intrusive documentation of high-society anniversary galas, retirement ceremonies, and family legacy gatherings.',
    },
  ];

  return (
    <div className="space-y-24 pb-24 text-[var(--theme-text-primary)]">
      {/* Sector Hero */}
      <section className="relative pt-12 pb-8 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Dedicated Sector · Weddings & Private Milestones
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[var(--theme-text-primary)]">
            Heirloom Cinematography & Editorial Wedding Photography
          </h1>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light leading-relaxed max-w-3xl">
            We preserve the emotional grandeur and cultural heritage of your once-in-a-lifetime milestones with magazine-grade photography, cinematic films, and heirloom albums built to outlast generations.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('quote', { service: 'Photography' })}
              className="px-7 py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md"
            >
              Check Wedding Date Availability
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-6 py-3.5 bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs font-medium rounded-xl transition-colors"
            >
              Browse Wedding Films
            </button>
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Milestone Coverage
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            Crafted for Unforgettable Life Moments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personalOfferings.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">{item.title}</h3>
              <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Royal Wedding Spotlight */}
      {weddingProject && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-3xl overflow-hidden p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-md">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
                Featured Celebration · Accra & Peduase
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
                {weddingProject.title}
              </h3>
              <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
                {weddingProject.summary}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[var(--theme-border)]">
                <div>
                  <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">900+</div>
                  <div className="text-[11px] text-[var(--theme-text-muted)]">Curated Frames</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">4K HDR</div>
                  <div className="text-[11px] text-[var(--theme-text-muted)]">Cinematic Master</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[var(--theme-text-primary)] tabular-nums">10 Days</div>
                  <div className="text-[11px] text-[var(--theme-text-muted)]">Delivery Latency</div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onSelectProject(weddingProject)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--theme-accent)] hover:opacity-80"
                >
                  <span>View Wedding Film & Photo Stills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[var(--theme-border)]">
                <img
                  src="/src/assets/images/portfolio_wedding_cinematography_1795142171823.jpg"
                  alt="Luxury Ghanaian Wedding Photography"
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
          Secure Your Milestone Date
        </h3>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] max-w-xl mx-auto">
          Wedding and private milestone dates are booked strictly on a first-confirmed basis to ensure our principal director leads your production.
        </p>
        <button
          onClick={() => onNavigate('quote', { service: 'Wedding photography' })}
          className="px-8 py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md"
        >
          Check Date & Request Package
        </button>
      </section>
    </div>
  );
};
