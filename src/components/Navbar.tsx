import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setIndustriesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const industries = [
    { id: 'corporate', label: 'Corporate & Institutional', desc: 'Conferences, summits & NGO impact' },
    { id: 'brands', label: 'Brands & Businesses', desc: 'Commercials, digital ads & studio campaigns' },
    { id: 'churches', label: 'Churches & Ministries', desc: 'Livestreaming & worship broadcast' },
    { id: 'personal', label: 'Personal & Events', desc: 'Weddings, VIP portraits & graduations' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--theme-bg-canvas)]/95 backdrop-blur-md border-b border-[var(--theme-border)] text-[var(--theme-text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer shrink-0 py-2 focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors whitespace-nowrap">
              DAVEAK<span className="text-[var(--theme-accent)] font-light">·</span>MULTIMEDIA
            </span>
          </button>

          {/* Zone 2: Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--theme-text-secondary)]">
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[var(--theme-text-primary)] transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'about' ? 'text-[var(--theme-accent)]' : ''
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`hover:text-[var(--theme-text-primary)] transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'services' ? 'text-[var(--theme-accent)]' : ''
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`hover:text-[var(--theme-text-primary)] transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'portfolio' ? 'text-[var(--theme-accent)]' : ''
              }`}
            >
              Portfolio
            </button>

            {/* Segment Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIndustriesOpen(!industriesOpen)}
                onMouseEnter={() => setIndustriesOpen(true)}
                className={`flex items-center gap-1.5 hover:text-[var(--theme-text-primary)] transition-colors whitespace-nowrap shrink-0 ${
                  ['corporate', 'brands', 'churches', 'personal'].includes(currentPage)
                    ? 'text-[var(--theme-accent)]'
                    : ''
                }`}
              >
                <span>Sectors</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {industriesOpen && (
                <div
                  onMouseLeave={() => setIndustriesOpen(false)}
                  className="absolute left-0 mt-3 w-72 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-[var(--theme-text-primary)]"
                >
                  {industries.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg hover:bg-[var(--theme-bg-elevated)] transition-colors group block"
                    >
                      <div className="text-xs font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] whitespace-nowrap">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[var(--theme-text-muted)] mt-0.5 truncate">{item.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[var(--theme-text-primary)] transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'contact' ? 'text-[var(--theme-accent)]' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNavClick('quote')}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg transition-all duration-150 shadow-sm whitespace-nowrap shrink-0 theme-accent-bg hover:opacity-90 active:scale-95"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap theme-accent-bg"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--theme-bg-surface)] border-b border-[var(--theme-border)] px-6 py-6 space-y-4">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left py-2 text-base font-medium ${
                currentPage === 'home' ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-primary)]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`block w-full text-left py-2 text-base font-medium ${
                currentPage === 'about' ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-primary)]'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`block w-full text-left py-2 text-base font-medium ${
                currentPage === 'services' ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-primary)]'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`block w-full text-left py-2 text-base font-medium ${
                currentPage === 'portfolio' ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-primary)]'
              }`}
            >
              Portfolio & Work
            </button>
          </div>

          <div className="pt-3 border-t border-[var(--theme-border)]">
            <div className="text-xs uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold mb-2">
              Sectors & Audiences
            </div>
            <div className="space-y-1.5 pl-2">
              {industries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-1 text-sm ${
                    currentPage === item.id ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-secondary)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--theme-border)] space-y-3">
            <button
              onClick={() => handleNavClick('contact')}
              className={`block w-full text-left py-2 text-base font-medium ${
                currentPage === 'contact' ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-primary)]'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavClick('quote')}
              className="w-full py-3 text-center text-sm font-semibold rounded-lg theme-accent-bg"
            >
              Request a Project Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
