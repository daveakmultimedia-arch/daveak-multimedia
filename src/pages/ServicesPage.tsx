import React, { useState, useEffect } from 'react';
import { ServiceCategory } from '../types';
import {
  Camera,
  Video,
  Building2,
  Palette,
  Smartphone,
  Radio,
  Sparkles,
  ArrowRight,
  Clock,
  PackageCheck,
  CheckCircle2,
} from 'lucide-react';

interface ServicesPageProps {
  services: ServiceCategory[];
  onNavigate: (page: string, params?: { service?: string }) => void;
  selectedCategoryFromNav?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onNavigate,
  selectedCategoryFromNav,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    selectedCategoryFromNav || services[0]?.id || 'photography'
  );

  useEffect(() => {
    if (selectedCategoryFromNav) {
      setActiveCategoryId(selectedCategoryFromNav);
    }
  }, [selectedCategoryFromNav]);

  const activeCategory = services.find((s) => s.id === activeCategoryId) || services[0];

  const getIcon = (name: string) => {
    switch (name) {
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

  return (
    <div className="space-y-20 pb-24 text-[var(--theme-text-primary)]">
      {/* Header */}
      <section className="pt-12 pb-6 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Full Capabilities Catalog · Cape Coast & Nationwide
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            Comprehensive Creative & Media Services
          </h1>
          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light max-w-2xl">
            Organised into seven specialized production divisions, each equipped with dedicated gear, trained operators, and rapid delivery pipelines.
          </p>
        </div>
      </section>

      {/* Main Interactive Services Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Categories Selector */}
          <div className="lg:col-span-4 space-y-2 sticky top-28 bg-[var(--theme-bg-surface)] p-3 rounded-2xl border border-[var(--theme-border)] shadow-sm">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] px-3 py-2">
              Select Division
            </div>
            {services.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-150 flex items-center justify-between group ${
                    isActive
                      ? 'theme-accent-bg font-semibold shadow-md'
                      : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-elevated)]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? 'bg-black/10' : 'bg-[var(--theme-bg-elevated)] group-hover:bg-[var(--theme-border)]'
                      }`}
                    >
                      {getIcon(cat.iconName)}
                    </div>
                    <span className="text-xs sm:text-sm font-medium truncate">{cat.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--theme-text-muted)] tabular-nums shrink-0 ml-2">
                    {cat.services.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Active Category Detail Panel */}
          <div className="lg:col-span-8 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-10 space-y-8 shadow-xl">
            {/* Division Banner */}
            <div className="border-b border-[var(--theme-border)] pb-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-accent)] uppercase tracking-wider">
                <span>Production Division</span>
                <span>/</span>
                <span>{activeCategory.services.length} Specializations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
                {activeCategory.title}
              </h2>
              <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
                {activeCategory.tagline}
              </p>
            </div>

            {/* Services Grid */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
                Specialized Service Offerings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCategory.services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-4 bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] rounded-xl space-y-1.5 hover:border-[var(--theme-border-highlight)] transition-colors shadow-sm"
                  >
                    <div className="text-sm font-semibold text-[var(--theme-text-primary)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>{svc.title}</span>
                    </div>
                    <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed pl-3.5">
                      {svc.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Turnarounds Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--theme-border)]">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-[var(--theme-text-primary)] font-semibold flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Standard Deliverables</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--theme-text-secondary)]">
                  {activeCategory.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-[var(--theme-text-primary)] font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Estimated Production Turnaround</span>
                </div>
                <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed bg-[var(--theme-bg-elevated)] p-3.5 rounded-xl border border-[var(--theme-border)]">
                  {activeCategory.typicalTurnaround}
                </p>
              </div>
            </div>

            {/* Action Bar for this Category */}
            <div className="pt-6 border-t border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[var(--theme-text-secondary)]">
                Ready to book or consult on <strong className="text-[var(--theme-text-primary)]">{activeCategory.title}</strong>?
              </div>
              <button
                onClick={() => onNavigate('quote', { service: activeCategory.title })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 theme-accent-bg hover:opacity-90 font-semibold text-xs rounded-xl transition-all shadow-md"
              >
                <span>Request Quote for {activeCategory.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Cutting Quality Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--theme-text-primary)]">Full Commercial Copyright</h4>
            <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
              Every client receives transparent commercial licensing terms for broadcast, press dissemination, and digital campaigns without predatory recurring royalties.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--theme-text-primary)]">Tethered Backup Redundancy</h4>
            <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
              All live recordings, footage, and photo frames are simultaneously captured to dual redundant high-speed media cards and mirrored to on-site SSD storage.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--theme-text-primary)]">Nationwide & International Mobilization</h4>
            <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
              Based in Cape Coast, we operate self-contained flight kits for rapid deployment to any district in Ghana, West Africa, and abroad on 48 hours’ notice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
