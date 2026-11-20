import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface WhatsAppFloatingButtonProps {
  settings: WebsiteSettings;
  currentPage: string;
}

export function formatWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    return '233' + digits.substring(1);
  }
  if (!digits.startsWith('233') && digits.length === 9) {
    return '233' + digits;
  }
  return digits;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  settings,
  currentPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');

  // Context-aware default message depending on active page
  const getContextMessage = (): string => {
    switch (currentPage) {
      case 'corporate':
        return 'Hello DAVEAK-MULTIMEDIA, I would like to inquire about your Corporate & Institutional Media services for an upcoming conference/documentation in Cape Coast / Ghana.';
      case 'brands':
        return 'Hello DAVEAK-MULTIMEDIA, I am interested in your Brand Storytelling and Commercial Video production services for our business.';
      case 'churches':
        return 'Hello DAVEAK-MULTIMEDIA, I would like to consult on Livestreaming & Media coverage for our church/ministry event.';
      case 'personal':
        return 'Hello DAVEAK-MULTIMEDIA, I would like to check availability and packages for wedding/personal photography and cinematography.';
      case 'services':
        return 'Hello DAVEAK-MULTIMEDIA, I am browsing your services catalog and would like to speak with a creative producer.';
      case 'portfolio':
        return 'Hello DAVEAK-MULTIMEDIA, I reviewed your recent projects and would like to discuss a similar production for our organization.';
      case 'quote':
        return 'Hello DAVEAK-MULTIMEDIA, I am preparing a project quotation request and would like to ask a few preliminary questions.';
      default:
        return 'Hello DAVEAK-MULTIMEDIA, I am reaching out through your website to inquire about your multimedia production services.';
    }
  };

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = formatWhatsAppNumber(settings.whatsappNumber);
    const baseMessage = customNote.trim() || getContextMessage();
    const encoded = encodeURIComponent(baseMessage);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl shadow-2xl p-4 text-[var(--theme-text-primary)] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-medium">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--theme-text-primary)]">Direct WhatsApp Desk</h4>
                <p className="text-[10px] text-[var(--theme-text-muted)]">DAVEAK-MULTIMEDIA · 0246488207</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleLaunchWhatsApp} className="mt-3 space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-[var(--theme-text-secondary)] mb-1">
                Pre-filled inquiry based on your view:
              </label>
              <textarea
                value={customNote || getContextMessage()}
                onChange={(e) => setCustomNote(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-lg text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[var(--theme-text-muted)]">
              <span>Cape Coast HQ: 0246488207</span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
              >
                <span>Chat Now</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
        aria-label="Chat with DAVEAK-MULTIMEDIA on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Open WhatsApp chat</span>
        {/* Tooltip on hover */}
        {!isOpen && (
          <span className="absolute right-16 px-3 py-1 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            Chat on WhatsApp (0246488207)
          </span>
        )}
      </button>
    </div>
  );
};
