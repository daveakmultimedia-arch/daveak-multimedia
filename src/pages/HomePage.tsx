import React, { useState } from 'react';
import { Project, ServiceCategory, Testimonial } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import {
  ArrowRight,
  Camera,
  Video,
  Building2,
  Palette,
  Smartphone,
  Radio,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, params?: { service?: string }) => void;
  projects: Project[];
  services: ServiceCategory[];
  testimonials: Testimonial[];
  onSelectProject: (project: Project) => void;
  onOpenVideo: (url: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  projects,
  services,
  testimonials,
  onSelectProject,
  onOpenVideo,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const filteredProjects = activeCategoryFilter === 'all'
    ? projects.slice(0, 6)
    : projects.filter((p) => p.category === activeCategoryFilter);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'Video':
        return <Video className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[var(--theme-accent)]" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-[var(--theme-accent)]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />;
    }
  };

  const creativeSteps = [
    {
      num: '01',
      title: 'Strategic Brief & Creative Treatment',
      desc: 'We dissect your core audience, communications mandate, or emotional milestone. We develop a precise script, shot list, lighting scheme, and timeline.',
    },
    {
      num: '02',
      title: 'High-Fidelity Production',
      desc: 'Deploying cinema-grade sensor cameras, calibrated audio gear, wireless rigs, and broadcast switchers under strict professional direction.',
    },
    {
      num: '03',
      title: 'Editorial & Master Grading',
      desc: 'Color grading on calibrated monitors, dialogue denoisers, licensed orchestral or afrobeat scoring, and motion design that elevate your story.',
    },
    {
      num: '04',
      title: 'Rapid Master & Multi-Platform Delivery',
      desc: 'Delivering uncompressed 4K master files alongside platform-optimized vertical cuts for immediate press, broadcast, or social dissemination.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 text-[var(--theme-text-primary)]">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden pt-6">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_cinematic_production_1795142170945.jpg"
            alt="DAVEAK-MULTIMEDIA Production Set"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08] scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette and gradient fades */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-8 text-white">
          {/* Quiet Unboxed Editorial Tag */}
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[var(--theme-accent)]">
            <span>Cape Coast, Ghana</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>Serving Nationwide & Global Markets</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-balance">
            Unparalleled Creativity <span className="gold-gradient-text italic font-normal">With Speed.</span>
          </h1>

          {/* Value Proposition */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-200 font-light leading-relaxed text-balance">
            We preserve memories, communicate impact and build legacies through our lens. Helping organisations, brands, churches, and individuals communicate stories that command respect.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('quote')}
              className="w-full sm:w-auto px-8 py-4 theme-accent-bg hover:opacity-90 active:scale-95 font-semibold text-sm rounded-xl transition-all duration-150 shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Request a Project Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="w-full sm:w-auto px-7 py-4 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/40 text-white font-medium text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>
          </div>

          {/* Proof Strip below Hero */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 max-w-4xl mx-auto text-left">
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">4K & 6K</div>
              <div className="text-xs text-neutral-300 mt-0.5">Cinema Master Standards</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">&lt;24h</div>
              <div className="text-xs text-neutral-300 mt-0.5">Rapid Press Dissemination</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">100%</div>
              <div className="text-xs text-neutral-300 mt-0.5">Broadcast Uptime Record</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tabular-nums">Pan-African</div>
              <div className="text-xs text-neutral-300 mt-0.5">Cape Coast & Global Missions</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION & AGENCY IDENTITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Who We Are
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-[var(--theme-text-primary)]">
              A serious digital creative agency, built for high-stakes storytelling.
            </h2>
            <p className="text-[var(--theme-text-secondary)] text-sm sm:text-base leading-relaxed">
              DAVEAK-MULTIMEDIA was founded on the conviction that African stories, corporate milestones, and private legacies deserve world-class technical execution without sluggish turnarounds.
            </p>
            <p className="text-[var(--theme-text-secondary)] text-sm sm:text-base leading-relaxed">
              From high-level diplomatic and economic summits across Ghana to grassroots NGO documentation in rural communities, and from bespoke royal weddings to prime-time commercial broadcasts, our crews deliver cinematic visual authority.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--theme-accent)] hover:opacity-80 transition-colors"
              >
                <span>Read our full brand story & philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-bg-surface)] shadow-xl">
              <img
                src="/src/assets/images/portfolio_corporate_summit_1795142171141.jpg"
                alt="Corporate Summit Documentation by DAVEAK-MULTIMEDIA"
                className="w-full aspect-[16/10] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-[var(--theme-bg-surface)] border-t border-[var(--theme-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[var(--theme-accent)] font-mono uppercase">Field Highlight</div>
                  <div className="text-sm font-semibold text-[var(--theme-text-primary)] mt-0.5">
                    Economic Summit & Plenary Documentation
                  </div>
                  <div className="text-xs text-[var(--theme-text-muted)] mt-1">
                    Multi-camera fiber optic broadcast · 1,200 delegates · 20-min press photo turnarounds
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('corporate')}
                  className="px-4 py-2 text-xs font-medium bg-[var(--theme-bg-elevated)] hover:bg-[var(--theme-border)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] rounded-lg transition-colors shrink-0"
                >
                  View Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES BENTO / OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--theme-border)] pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Production Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)]">
              Our Core Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold text-[var(--theme-accent)] hover:opacity-80 flex items-center gap-1 transition-colors"
          >
            <span>Explore All 7 Categories & Deliverables</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((serviceCategory) => (
            <div
              key={serviceCategory.id}
              className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-highlight)] rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 group shadow-sm"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center group-hover:border-[var(--theme-accent)]/40 transition-colors">
                  {getServiceIcon(serviceCategory.iconName)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                    {serviceCategory.title}
                  </h3>
                  <p className="text-xs text-[var(--theme-text-secondary)] mt-1.5 leading-relaxed">
                    {serviceCategory.tagline}
                  </p>
                </div>

                {/* Service Items bullets */}
                <ul className="space-y-1.5 text-xs text-[var(--theme-text-secondary)] pt-2">
                  {serviceCategory.services.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span className="truncate">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--theme-border)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                  {serviceCategory.services.length} Specialized Offerings
                </span>
                <button
                  onClick={() => onNavigate('services', { service: serviceCategory.id })}
                  className="text-xs font-medium text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS WITH CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--theme-border)] pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Selected Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)]">
              Featured Productions
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[var(--theme-bg-surface)] p-1.5 border border-[var(--theme-border)] rounded-xl">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'documentaries', label: 'Documentaries' },
              { id: 'corporate', label: 'Corporate' },
              { id: 'weddings', label: 'Weddings' },
              { id: 'commercial', label: 'Commercial' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategoryFilter === tab.id
                    ? 'theme-accent-bg font-semibold shadow-sm'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-elevated)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              onOpenVideo={onOpenVideo}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs font-medium rounded-xl transition-colors shadow-sm"
          >
            <span>View Complete Project Archives</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTOR CAPABILITIES STRIP */}
      <section className="bg-[var(--theme-bg-surface)] border-y border-[var(--theme-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Tailored Sector Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)]">
              Engineered for specific operational mandates.
            </h2>
            <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
              Different clients carry different risks and protocols. We maintain specialized teams and packages configured for distinct institutions across Cape Coast and Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onNavigate('corporate')}
              className="bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 rounded-xl p-6 space-y-3 cursor-pointer group transition-all shadow-sm"
            >
              <div className="text-[var(--theme-accent)] text-xs font-mono uppercase">01 · Institutional</div>
              <h3 className="text-base font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                Corporate & NGO Media
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                Diplomatic summits, annual reports, donor impact stories, and VIP protocol coverage with strict confidentiality.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--theme-accent)] pt-2 font-medium">
                <span>Explore Sector</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('brands')}
              className="bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 rounded-xl p-6 space-y-3 cursor-pointer group transition-all shadow-sm"
            >
              <div className="text-[var(--theme-accent)] text-xs font-mono uppercase">02 · Commerce</div>
              <h3 className="text-base font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                Brands & Businesses
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                Packshot campaigns, TV commercial spots, viral social formats, and full visual identity systems for ambitious businesses.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--theme-accent)] pt-2 font-medium">
                <span>Explore Sector</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('churches')}
              className="bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 rounded-xl p-6 space-y-3 cursor-pointer group transition-all shadow-sm"
            >
              <div className="text-[var(--theme-accent)] text-xs font-mono uppercase">03 · Faith</div>
              <h3 className="text-base font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                Churches & Ministries
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                Multi-camera broadcast switching, crystal acoustics, annual conventions, and global diaspora streaming infrastructure.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--theme-accent)] pt-2 font-medium">
                <span>Explore Sector</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('personal')}
              className="bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 rounded-xl p-6 space-y-3 cursor-pointer group transition-all shadow-sm"
            >
              <div className="text-[var(--theme-accent)] text-xs font-mono uppercase">04 · Milestones</div>
              <h3 className="text-base font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                Weddings & VIP Personal
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                Cinematography that honors cultural heritage, royal kente traditions, executive headshots, and landmark graduations.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--theme-accent)] pt-2 font-medium">
                <span>Explore Sector</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* OUR CREATIVE PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            How We Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            The DAVEAK Production Pipeline
          </h2>
          <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
            Eliminating chaos, miscommunication, and missed deadlines through disciplined production governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {creativeSteps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl space-y-4 shadow-sm"
            >
              <div className="text-3xl font-bold text-[var(--theme-accent)] tabular-nums">
                {step.num}
              </div>
              <h3 className="text-base font-semibold text-[var(--theme-text-primary)]">{step.title}</h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--theme-border)] pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Client Testimony & Credibility
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)]">
              Trusted by Institutions & Visionaries
            </h2>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)] max-w-md">
            Real feedback from organizational directors, brand leaders, pastors, and private clients who rely on our lens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl p-8 space-y-6 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="text-xs font-mono text-[var(--theme-accent)] font-semibold">
                  {test.projectType}
                </div>
                <blockquote className="text-[var(--theme-text-secondary)] text-sm leading-relaxed italic">
                  "{test.quote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[var(--theme-text-primary)]">{test.name}</div>
                  <div className="text-xs text-[var(--theme-text-muted)]">
                    {test.role} · <span className="text-[var(--theme-text-secondary)]">{test.organisation}</span>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)] shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CALL TO ACTION BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] p-8 sm:p-14 lg:p-20 text-center space-y-8 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              Let's Build Something Memorable
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--theme-text-primary)]">
              Ready to elevate your story with unmatched speed?
            </h2>
            <p className="text-[var(--theme-text-secondary)] text-sm sm:text-base leading-relaxed">
              Tell us about your upcoming conference, commercial campaign, documentary mission, or personal celebration in Cape Coast or nationwide. We direct inquiries to our WhatsApp Business desk (<strong className="text-[var(--theme-text-primary)]">0246488207</strong>) and respond within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('quote')}
              className="w-full sm:w-auto px-9 py-4 theme-accent-bg hover:opacity-90 font-semibold text-sm rounded-xl transition-all shadow-md"
            >
              Request a Formal Quotation
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-[var(--theme-bg-elevated)] hover:bg-[var(--theme-border)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] font-medium text-sm rounded-xl transition-colors"
            >
              Speak to a Producer
            </button>
          </div>

          <div className="pt-6 text-xs text-[var(--theme-text-muted)] font-mono">
            Cape Coast Studio & Mobile Field Units · Direct Hotline / WhatsApp: 0246488207
          </div>
        </div>
      </section>
    </div>
  );
};
