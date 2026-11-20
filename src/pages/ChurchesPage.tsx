import React from 'react';
import { ArrowRight, Radio, Volume2, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Project, Testimonial } from '../types';

interface ChurchesPageProps {
  onNavigate: (page: string, params?: { service?: string }) => void;
  testimonials: Testimonial[];
}

export const ChurchesPage: React.FC<ChurchesPageProps> = ({ onNavigate, testimonials }) => {
  const churchTestimonial = testimonials.find((t) => t.id === 'test-3');

  const capabilities = [
    {
      icon: <Radio className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Multi-Camera Sunday Broadcasts',
      desc: 'Seamless live switching between pulpit, choir, congregation, and roaming handheld angles with zero lag or visual stuttering.',
    },
    {
      icon: <Volume2 className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Dedicated Acoustic Sound Mixing',
      desc: 'Separate broadcast audio mixing calibrated so online worshippers hear the preaching with pristine clarity and the choir with immersive stereo depth.',
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Diaspora & Convention Streaming',
      desc: 'Reliable multi-destination transmission to YouTube, Facebook, and private ministry portals with redundant bonded internet connectivity.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />,
      title: 'Annual Conferences & Crusades',
      desc: 'End-to-end media coverage for massive multi-day conventions, open-air crusades, and commemorative anniversary services.',
    },
  ];

  return (
    <div className="space-y-24 pb-24 text-[var(--theme-text-primary)]">
      {/* Sector Hero */}
      <section className="relative pt-12 pb-8 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Dedicated Sector · Churches & Religious Institutions
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[var(--theme-text-primary)]">
            Church Livestreaming & Convention Media Production
          </h1>

          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light leading-relaxed max-w-3xl">
            Empowering ministries across Ghana and the diaspora with broadcast-quality multi-camera livestreams, pristine sound engineering, and dignified worship documentation that reaches worshippers worldwide.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('quote', { service: 'Livestreaming and Event Media' })}
              className="px-7 py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md"
            >
              Request Church Media Proposal
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs font-medium rounded-xl transition-colors"
            >
              Consult On Sanctuary AV Setup
            </button>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Worship Media Infrastructure
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            Elevating the Broadcast of the Sacred
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((item, idx) => (
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

      {/* Pastor Testimony */}
      {churchTestimonial && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-3xl space-y-6 text-center shadow-md">
            <div className="text-xs font-mono uppercase text-[var(--theme-accent)] tracking-widest">
              Ministry Testimony
            </div>
            <blockquote className="text-lg sm:text-xl text-[var(--theme-text-primary)] italic leading-relaxed">
              "{churchTestimonial.quote}"
            </blockquote>
            <div className="pt-2">
              <div className="text-sm font-semibold text-[var(--theme-text-primary)]">{churchTestimonial.name}</div>
              <div className="text-xs text-[var(--theme-text-secondary)]">
                {churchTestimonial.role} · {churchTestimonial.organisation}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
          Upgrade Your Ministry’s Broadcast Presence
        </h3>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] max-w-xl mx-auto">
          We offer flexible arrangements ranging from single-event convention broadcasts to ongoing weekly Sunday livestream production teams and volunteer training.
        </p>
        <button
          onClick={() => onNavigate('quote', { service: 'Livestreaming and Event Media' })}
          className="px-8 py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md"
        >
          Request Ministry Quotation
        </button>
      </section>
    </div>
  );
};
