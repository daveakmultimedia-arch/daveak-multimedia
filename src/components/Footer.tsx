import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook, ArrowUpRight, Palette } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface FooterProps {
  onNavigate: (page: string) => void;
  settings: WebsiteSettings;
  onOpenThemeSelector?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings, onOpenThemeSelector }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--theme-bg-surface)] border-t border-[var(--theme-border)] text-[var(--theme-text-secondary)] text-sm transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand & Ambition column */}
          <div className="lg:col-span-2 space-y-5">
            <span className="text-2xl font-bold tracking-tight text-[var(--theme-text-primary)] block">
              DAVEAK<span className="text-[var(--theme-accent)]">·</span>MULTIMEDIA
            </span>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              {settings.tagline}
            </p>
            <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed max-w-sm">
              {settings.brandPhilosophy}
            </p>
            <div className="pt-2 text-xs text-[var(--theme-text-muted)]">
              Headquartered in Cape Coast, Central Region, Ghana · Serving organisations, institutions, and individuals across Ghana and internationally.
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Capabilities Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-primary)]">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--theme-text-secondary)]">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors text-left"
                >
                  Corporate & Event Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors text-left"
                >
                  Videography & Film Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors text-left"
                >
                  Institutional Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors text-left"
                >
                  Branding & Visual Identity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors text-left"
                >
                  Livestreaming & Multi-Camera
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[var(--theme-text-primary)] transition-colors text-left"
                >
                  Drone Cinematography
                </button>
              </li>
            </ul>
          </div>

          {/* Client Sectors */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-primary)]">
              Sectors Served
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--theme-text-secondary)]">
              <li>
                <button
                  onClick={() => onNavigate('corporate')}
                  className="hover:text-[var(--theme-accent)] transition-colors text-left flex items-center gap-1"
                >
                  <span>Corporate & Institutional</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brands')}
                  className="hover:text-[var(--theme-accent)] transition-colors text-left flex items-center gap-1"
                >
                  <span>Brands & Businesses</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('churches')}
                  className="hover:text-[var(--theme-accent)] transition-colors text-left flex items-center gap-1"
                >
                  <span>Churches & Ministries</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('personal')}
                  className="hover:text-[var(--theme-accent)] transition-colors text-left flex items-center gap-1"
                >
                  <span>Weddings & VIP Personal</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-1"
                >
                  <span>View Project Archives</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Agency Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-primary)]">
              Production Office
            </h4>
            <div className="space-y-3 text-xs text-[var(--theme-text-secondary)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <span>Cape Coast, Central Region, Ghana</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[var(--theme-text-primary)] transition-colors font-mono">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[var(--theme-text-primary)] transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('quote')}
                  className="w-full text-center py-2 px-3 bg-[var(--theme-bg-elevated)] hover:bg-[var(--theme-border)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs font-medium rounded-lg transition-colors"
                >
                  Request Project Quotation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet legal, copyright and theme switch */}
        <div className="mt-16 pt-8 border-t border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--theme-text-muted)]">
          <div>
            © {currentYear} DAVEAK-MULTIMEDIA. Cape Coast, Ghana. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {onOpenThemeSelector && (
              <button
                onClick={onOpenThemeSelector}
                className="flex items-center gap-1.5 text-[var(--theme-accent)] hover:underline"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Theme Options</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-[var(--theme-text-secondary)] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-[var(--theme-text-secondary)] transition-colors"
            >
              Terms of Service
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
};
