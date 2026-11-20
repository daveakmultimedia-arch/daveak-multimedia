import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ServiceCategory, WebsiteSettings } from '../types';
import { formatWhatsAppNumber } from '../components/WhatsAppFloatingButton';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  MessageCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface QuotePageProps {
  services: ServiceCategory[];
  settings: WebsiteSettings;
  initialService?: string;
  onNavigate: (page: string) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({
  services,
  settings,
  initialService,
  onNavigate,
}) => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceRequired, setServiceRequired] = useState(initialService || 'Photography');
  const [secondaryServices, setSecondaryServices] = useState<string[]>([]);
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [location, setLocation] = useState('Cape Coast, Ghana');
  const [budgetRange, setBudgetRange] = useState('');
  const [urgency, setUrgency] = useState<'standard' | 'priority' | 'rush'>('standard');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // Spam protection: honeypot field (hidden from real users)
  const [honeypot, setHoneypot] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setServiceRequired(initialService);
    }
  }, [initialService]);

  const addOnOptions = [
    'Drone Aerial Cinematography',
    'Multi-Camera Live Switching',
    'Same-Day Press Photo Selection',
    'Vertical Reels / TikTok Cuts',
    'Studio Lighting Package',
    'Executive Headshot Suite',
  ];

  const handleToggleAddOn = (item: string) => {
    if (secondaryServices.includes(item)) {
      setSecondaryServices(secondaryServices.filter((s) => s !== item));
    } else {
      setSecondaryServices([...secondaryServices, item]);
    }
  };

  const validate = (): boolean => {
    setErrorMessage(null);

    // Spam honeypot check
    if (honeypot) {
      setErrorMessage('Submission rejected.');
      return false;
    }

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please provide a valid email address for quotation delivery.');
      return false;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Please provide a valid phone or WhatsApp number.');
      return false;
    }
    if (!serviceRequired) {
      setErrorMessage('Please select the primary service required.');
      return false;
    }
    if (!projectDescription.trim() || projectDescription.trim().length < 15) {
      setErrorMessage('Please provide a brief description of your project requirements (at least 15 characters).');
      return false;
    }
    if (!privacyAgreed) {
      setErrorMessage('Please confirm your consent to our privacy policy to proceed.');
      return false;
    }

    return true;
  };

  const getWhatsAppMessageUrl = (enquiryId: string) => {
    const cleanNumber = formatWhatsAppNumber(settings.whatsappNumber);
    const summary = `*NEW PROJECT ENQUIRY — DAVEAK-MULTIMEDIA*
Reference: #${enquiryId.toUpperCase()}
Client Name: ${fullName.trim()}
Organisation: ${organisation.trim() || 'Individual Client'}
Email: ${email.trim()}
Phone: ${phone.trim()}
Service Required: ${serviceRequired}
Special Add-ons: ${secondaryServices.join(', ') || 'None selected'}
Target Date: ${projectDate || 'Flexible / To Be Decided'}
Project Location: ${location.trim()}
Budget Range: ${budgetRange || 'Quotation requested from agency'}
Urgency: ${urgency.toUpperCase()}

*Project Brief:*
${projectDescription.trim()}`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(summary)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.submitEnquiry({
        fullName: fullName.trim(),
        organisation: organisation.trim() || undefined,
        email: email.trim(),
        phone: phone.trim(),
        serviceRequired,
        secondaryServices,
        projectDescription: projectDescription.trim(),
        projectDate,
        location: location.trim(),
        budgetRange: budgetRange || undefined,
        urgency,
      });

      if (response.success) {
        setSubmittedId(response.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Direct enquiry message straight to WhatsApp Business
        const waUrl = getWhatsAppMessageUrl(response.id);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } else {
        setErrorMessage('Failed to submit enquiry. Please try again or reach us directly on WhatsApp (0246488207).');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualWhatsAppRedirect = () => {
    if (!submittedId) return;
    const waUrl = getWhatsAppMessageUrl(submittedId);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 pb-24 text-[var(--theme-text-primary)]">
      {/* Header */}
      <section className="pt-12 pb-6 border-b border-[var(--theme-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Project Consultation & Estimator · Cape Coast, Ghana
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Request a Project Quotation
          </h1>
          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light leading-relaxed">
            Tell us about your production mandate, milestone date, and deliverable specifications. Enquiries are automatically directed to our WhatsApp Business desk (<strong>0246488207</strong>) and logged in our production queue.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedId ? (
          /* Confirmation Success Screen */
          <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl p-8 sm:p-14 text-center space-y-8 animate-in fade-in duration-300 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--theme-accent)] uppercase tracking-wider">
                Enquiry Reference #{submittedId.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
                Enquiry Received & Directed to WhatsApp Business
              </h2>
              <p className="text-[var(--theme-text-secondary)] text-sm max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-[var(--theme-text-primary)]">{fullName}</strong>. Your project brief has been sent to our official WhatsApp Business desk (<strong>0246488207</strong>) and stored in our production database.
              </p>
            </div>

            <div className="p-6 bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] rounded-xl text-left text-xs space-y-2 max-w-md mx-auto text-[var(--theme-text-secondary)] font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--theme-text-muted)]">Service:</span>
                <span className="text-[var(--theme-text-primary)]">{serviceRequired}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--theme-text-muted)]">Location:</span>
                <span className="text-[var(--theme-text-primary)]">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--theme-text-muted)]">Date:</span>
                <span className="text-[var(--theme-text-primary)]">{projectDate || 'Flexible'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--theme-text-muted)]">WhatsApp Desk:</span>
                <span className="text-emerald-400 font-bold">0246488207</span>
              </div>
              {budgetRange && (
                <div className="flex justify-between">
                  <span className="text-[var(--theme-text-muted)]">Budget Range:</span>
                  <span className="text-[var(--theme-text-primary)]">{budgetRange}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleManualWhatsAppRedirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp Business (0246488207)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setSubmittedId(null);
                  setProjectDescription('');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[var(--theme-bg-elevated)] hover:bg-[var(--theme-border)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] text-xs font-medium rounded-xl transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Main Quotation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-12 space-y-10 shadow-2xl"
          >
            {/* Honeypot Spam Protection Field */}
            <input
              type="text"
              name="company_title_verification"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="opacity-0 absolute -left-[9999px]"
              aria-hidden="true"
            />

            {/* Error banner if validation fails */}
            {errorMessage && (
              <div className="p-4 bg-red-950/60 border border-red-800/80 rounded-xl flex items-start gap-3 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Direct WhatsApp Callout Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-[var(--theme-text-secondary)]">
                  Submitting will automatically forward this project brief to our WhatsApp Business desk at <strong className="text-emerald-400">0246488207</strong> for immediate review.
                </span>
              </div>
            </div>

            {/* SECTION 1: SERVICE & SCOPE */}
            <div className="space-y-6">
              <div className="border-b border-[var(--theme-border)] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
                  01 · Production Scope
                </span>
                <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mt-1">
                  Which service do you require?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Photography',
                  'Videography and Film',
                  'Corporate and Institutional Media',
                  'Branding and Design',
                  'Digital Content',
                  'Livestreaming and Event Media',
                  'Additional Services',
                ].map((svc) => (
                  <label
                    key={svc}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      serviceRequired === svc
                        ? 'bg-[var(--theme-bg-elevated)] border-[var(--theme-accent)] text-[var(--theme-text-primary)] shadow-sm'
                        : 'bg-[var(--theme-bg-surface)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-border-highlight)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceRequired"
                      value={svc}
                      checked={serviceRequired === svc}
                      onChange={() => setServiceRequired(svc)}
                      className="text-[var(--theme-accent)] focus:ring-0"
                    />
                    <span className="text-xs font-medium">{svc}</span>
                  </label>
                ))}
              </div>

              {/* Optional Add-ons */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-[var(--theme-text-secondary)] block">
                  Optional Specialized Add-ons (Select all that apply):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {addOnOptions.map((addon) => {
                    const isSelected = secondaryServices.includes(addon);
                    return (
                      <button
                        type="button"
                        key={addon}
                        onClick={() => handleToggleAddOn(addon)}
                        className={`text-left text-xs p-3 rounded-lg border transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-[var(--theme-bg-elevated)] border-[var(--theme-accent)]/80 text-[var(--theme-text-primary)]'
                            : 'bg-[var(--theme-bg-input)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                        }`}
                      >
                        <span>{addon}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 2: SCHEDULE, LOCATION & DESCRIPTION */}
            <div className="space-y-6">
              <div className="border-b border-[var(--theme-border)] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
                  02 · Project Context & Schedule
                </span>
                <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mt-1">
                  When and where will this project occur?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Target Project Date / Timeframe
                  </label>
                  <input
                    type="date"
                    value={projectDate}
                    onChange={(e) => setProjectDate(e.target.value)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                  />
                  <p className="text-[11px] text-[var(--theme-text-muted)] mt-1">
                    Leave blank if date is tentative.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Venue & Location <span className="text-[var(--theme-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cape Coast / Accra / Takoradi / Virtual / Abroad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                  Project Description & Key Deliverables <span className="text-[var(--theme-accent)]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline the objectives, number of hours, target audience, style preferences, and any specific deliverables (e.g. 15-minute documentary cut, executive portraits in Cape Coast, livestreaming to 500 delegates)..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>

              {/* Budget Range (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Estimated Budget Range (Optional)
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                  >
                    <option value="">Select budget range (or leave open)</option>
                    <option value="GHS 5,000 - 15,000">GHS 5,000 – 15,000 (Standard Session)</option>
                    <option value="GHS 15,000 - 35,000">GHS 15,000 – 35,000 (Multi-Asset Production)</option>
                    <option value="GHS 35,000 - 75,000">GHS 35,000 – 75,000 (Summit / Large Campaign)</option>
                    <option value="GHS 75,000+">GHS 75,000+ (Enterprise / Multi-Day Mission)</option>
                    <option value="International / USD">International / USD Equivalent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Turnaround Urgency
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                  >
                    <option value="standard">Standard Production Timeline</option>
                    <option value="priority">Priority Delivery (&lt;5 Days)</option>
                    <option value="rush">Emergency / Same-Day Broadcast Rush</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: CLIENT CONTACT DETAILS */}
            <div className="space-y-6">
              <div className="border-b border-[var(--theme-border)] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
                  03 · Contact Information
                </span>
                <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mt-1">
                  Where should we send your technical proposal?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Your Full Name <span className="text-[var(--theme-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwabena Mensah"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Organisation / Brand / Institution
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. University of Cape Coast, NGO, or Individual"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Official Email Address <span className="text-[var(--theme-accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. kmensah@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">
                    Phone / WhatsApp Number <span className="text-[var(--theme-accent)]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 024 000 0000 or +233 24 648 8207"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                  />
                </div>
              </div>

              {/* Privacy consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-[var(--theme-text-secondary)]">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-[var(--theme-accent)] focus:ring-0"
                  />
                  <span>
                    I agree to the processing of this information in accordance with DAVEAK-MULTIMEDIA's{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('privacy')}
                      className="text-[var(--theme-accent)] hover:underline"
                    >
                      Privacy Policy
                    </button>
                    . Your contact details are strictly confidential.
                  </span>
                </label>
              </div>
            </div>

            {/* Submission Button & Direct WhatsApp Routing */}
            <div className="pt-6 border-t border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[var(--theme-text-muted)]">
                Direct WhatsApp Business Desk: <strong className="text-[var(--theme-text-primary)] font-mono">0246488207</strong>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting & Connecting...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      <span>Submit & Direct to WhatsApp Business</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
