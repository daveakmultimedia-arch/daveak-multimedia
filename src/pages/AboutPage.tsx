import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Target, Globe } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  settings: WebsiteSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, settings }) => {
  const pillars = [
    {
      icon: <Zap className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Unparalleled Speed',
      description:
        'In today’s accelerated communications cycle, delayed footage is lost momentum. We deploy tethered workflows, on-site editors, and streamlined color grading pipelines to ensure you lead news cycles, press releases, and feeds.',
    },
    {
      icon: <Shield className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Cinematic Technical Rigor',
      description:
        'We refuse standard template capture. Every project benefits from cinema-grade sensors, calibrated prime lenses, broadcast-tier multi-camera switchers, and pristine audio capture engineered to international delivery standards.',
    },
    {
      icon: <Target className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Institutional Reliability',
      description:
        'From presidential protocols and diplomatic summits to confidential corporate board sessions, we operate with strict non-disclosure compliance, backup redundancies, and flawless professionalism.',
    },
    {
      icon: <Globe className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Ghana First, Global Reach',
      description:
        'Proudly rooted in Cape Coast, Central Region, Ghana, our mission is to represent African visual culture with contemporary majesty, while executing international co-productions and donor missions with seamless borderless delivery.',
    },
  ];

  return (
    <div className="space-y-24 pb-24 text-[var(--theme-text-primary)]">
      {/* Editorial Header */}
      <section className="relative pt-12 pb-8 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Agency Profile & Brand Philosophy
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[var(--theme-text-primary)]">
            Preserving memories, communicating impact, and building legacies.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--theme-text-secondary)] font-light leading-relaxed max-w-3xl">
            {settings.brandPhilosophy}
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[var(--theme-text-muted)]">
            <span>Established in Cape Coast, Ghana</span>
            <span>·</span>
            <span className="text-[var(--theme-accent)]">{settings.tagline}</span>
          </div>
        </div>
      </section>

      {/* Narrative & Ambition Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Our Ambition
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)]">
              To establish a benchmark creative agency serving Ghana and the world.
            </h2>
            <p className="text-[var(--theme-text-secondary)] text-sm sm:text-base leading-relaxed">
              DAVEAK-MULTIMEDIA was founded to solve a pervasive frustration in creative communications: the frequent sacrifice of quality for speed, or the agonizing delays associated with high-end production houses.
            </p>
            <p className="text-[var(--theme-text-secondary)] text-sm sm:text-base leading-relaxed">
              We engineered a hybrid production model that pairs cinematic gear and narrative storytelling with agile, broadcast-speed execution. Whether documenting an emergency NGO community grant, broadcasting a national economic conference, or shooting a high-fashion campaign, we deliver results that command global respect.
            </p>
            <div className="p-6 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl space-y-2 shadow-sm">
              <div className="text-xs font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider">
                Our Core Promise
              </div>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                "We don't simply record what happened. We craft visual assets that elevate your authority, move stakeholders to action, and stand the test of time."
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-bg-surface)] shadow-xl">
              <img
                src="/src/assets/images/portfolio_brand_commercial_1795142172634.jpg"
                alt="DAVEAK-MULTIMEDIA Creative Production Studio"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-[var(--theme-bg-surface)] border-t border-[var(--theme-border)] text-xs text-[var(--theme-text-muted)] font-mono flex items-center justify-between">
                <span>Studio & On-Location Production Units</span>
                <span className="text-[var(--theme-accent)]">Cape Coast, GH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Strategic Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            The DAVEAK Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            How We Define Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--theme-text-primary)]">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Production Infrastructure */}
      <section className="bg-[var(--theme-bg-surface)] border-y border-[var(--theme-border)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
                Gear & Standards
              </div>
              <h3 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                Field-Tested Cinema & Live Infrastructure
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                Our in-house equipment packages are curated for immediate deployment across difficult terrains and high-security venues in Cape Coast and across West Africa.
              </p>
            </div>

            <div className="space-y-4 text-xs text-[var(--theme-text-secondary)]">
              <div className="font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider text-[11px] text-[var(--theme-accent)]">
                Camera & Optic Systems
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Full-frame 4K & 6K Cinema Cameras (Dual ISO low-light capabilities)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Cine Prime & Fast Zoom Glass (f/1.2, f/1.4, 24-70mm f/2.8)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Electronic 3-Axis Heavy-Duty Gimbals & Wireless Follow Focus</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 text-xs text-[var(--theme-text-secondary)]">
              <div className="font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider text-[11px] text-[var(--theme-accent)]">
                Live Broadcast & Sound
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Multi-channel SDI / Optical Fiber Video Switchers with redundant outputs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Dual-channel digital wireless microphones & acoustic field recorders</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Bonded 5G Cellular Internet Uplinks for remote livestream stability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
          Work with an agency committed to your legacy.
        </h2>
        <p className="text-[var(--theme-text-secondary)] text-sm max-w-xl mx-auto">
          Contact our Cape Coast headquarters to schedule a creative briefing or receive a technical quotation for your upcoming project.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('quote')}
            className="px-8 py-3.5 theme-accent-bg hover:opacity-90 font-semibold text-xs rounded-xl transition-all shadow-md"
          >
            Request Quotation
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-7 py-3.5 bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] font-medium text-xs rounded-xl transition-colors"
          >
            Contact Production Team
          </button>
        </div>
      </section>
    </div>
  );
};
