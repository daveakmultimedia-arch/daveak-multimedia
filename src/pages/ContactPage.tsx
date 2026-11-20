import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { WebsiteSettings } from '../types';
import { api } from '../services/api';
import { formatWhatsAppNumber } from '../components/WhatsAppFloatingButton';

interface ContactPageProps {
  settings: WebsiteSettings;
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where is DAVEAK-MULTIMEDIA based, and do you travel?',
      a: 'Our main office and production studio are proudly based in Cape Coast, Central Region, Ghana. We regularly travel across all 16 regions of Ghana (Accra, Kumasi, Takoradi, Tamale) and execute international assignments across West Africa and globally.',
    },
    {
      q: 'How can I reach your team most quickly?',
      a: 'The fastest channel is our direct WhatsApp Business line at 0246488207. You can also call directly or submit a project quotation request online for a guaranteed response within 24 hours.',
    },
    {
      q: 'Do you provide on-site press photos during conferences and summits?',
      a: 'Yes. Our signature corporate workflow includes a tethered digital workstation. Keynote speaker portraits and opening plenary photos are retouched, metadata-tagged, and handed to your PR desk within 20 minutes of the address.',
    },
    {
      q: 'Are your drone operators certified to fly commercially in Ghana?',
      a: 'Yes. All aerial drone operations conducted by DAVEAK-MULTIMEDIA comply with Ghana Civil Aviation Authority (GCAA) regulations, and our pilots hold commercial certifications with liability coverage.',
    },
    {
      q: 'What is your standard project payment schedule?',
      a: 'Our standard terms for corporate and private productions are a 60% commitment deposit upon booking to secure calendar dates and reserve technical crews, with the remaining 40% balance due upon delivery of final master files.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    try {
      await api.submitEnquiry({
        fullName: name,
        email,
        phone: phone || '0246488207',
        serviceRequired: subject,
        projectDescription: message,
        projectDate: 'N/A',
        location: 'Cape Coast / Remote',
      });
      setSubmitted(true);

      // Also forward enquiry directly to WhatsApp Business page
      const cleanNumber = formatWhatsAppNumber(settings.whatsappNumber);
      const text = `*MESSAGE VIA WEBSITE CONTACT FORM*
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}
Message: ${message}`;
      const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDirectWhatsApp = () => {
    const cleanNumber = formatWhatsAppNumber(settings.whatsappNumber);
    const text = 'Hello DAVEAK-MULTIMEDIA, I would like to speak with a creative producer regarding an upcoming project.';
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-24 pb-24 text-[var(--theme-text-primary)]">
      {/* Header */}
      <section className="pt-12 pb-6 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Direct Production Desk · Cape Coast, Ghana
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Contact DAVEAK-MULTIMEDIA
          </h1>
          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light max-w-2xl">
            Connect directly with our producers and creative directors in Cape Coast, Ghana. Whether you have an immediate inquiry or a future production date, we are at your service.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Agency Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                Headquarters & Studio
              </h3>
              <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                Our main office and creative post-production studio are centrally located in Cape Coast, supporting commercial shoots, university convocations, and nationwide field deployments across Ghana.
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-[var(--theme-text-secondary)]">
              <div className="flex items-start gap-3.5 p-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl">
                <MapPin className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[var(--theme-text-primary)]">Studio Address</div>
                  <div className="text-[var(--theme-text-muted)] mt-0.5">Cape Coast, Central Region, Ghana</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl">
                <Phone className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[var(--theme-text-primary)]">Telephone Hotline</div>
                  <a href="tel:0246488207" className="text-[var(--theme-text-primary)] hover:underline mt-0.5 block font-mono font-bold">
                    0246488207
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl">
                <Mail className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[var(--theme-text-primary)]">Official Agency Email</div>
                  <a href="mailto:daveakmultimedia@gmail.com" className="text-[var(--theme-text-primary)] hover:underline mt-0.5 block">
                    daveakmultimedia@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl">
                <Clock className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[var(--theme-text-primary)]">Operating Hours</div>
                  <div className="text-[var(--theme-text-muted)] mt-0.5">{settings.officeHours}</div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Card */}
            <div className="p-6 bg-[var(--theme-bg-surface)] border border-emerald-900/40 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Business Desk</span>
              </div>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                Connect directly with our creative team on WhatsApp at <strong>0246488207</strong> for immediate response and rate cards.
              </p>
              <button
                onClick={handleOpenDirectWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium rounded-lg transition-colors"
              >
                <span>Chat on WhatsApp Business (0246488207)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl">
              <div className="border-b border-[var(--theme-border)] pb-4">
                <h3 className="text-xl font-bold text-[var(--theme-text-primary)]">
                  Send a Message to Production
                </h3>
                <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                  Enquiries are logged and automatically forwarded to our WhatsApp Business desk.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-semibold text-[var(--theme-text-primary)]">Message Transmitted & Directed to WhatsApp</h4>
                  <p className="text-xs text-[var(--theme-text-secondary)] max-w-sm mx-auto">
                    Your inquiry has been sent to our production desk and forwarded to our WhatsApp Business page (<strong>0246488207</strong>).
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[var(--theme-accent)] hover:underline pt-2 block mx-auto"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ama Serwaa"
                        className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-lg text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ama@domain.com"
                        className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-lg text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 024 123 4567"
                        className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-lg text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1">
                        Topic / Department
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-lg text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      >
                        <option value="General Consultation">General Consultation</option>
                        <option value="Corporate & NGO Media">Corporate & NGO Media</option>
                        <option value="Commercial Production">Commercial Production</option>
                        <option value="Church Livestreaming">Church Livestreaming</option>
                        <option value="Wedding & Personal">Wedding & Personal</option>
                        <option value="Press / Media Inquiry">Press / Media Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1">
                      Message Brief
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your message or inquiry here..."
                      className="w-full text-xs p-3 bg-[var(--theme-bg-input)] border border-[var(--theme-border)] rounded-lg text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{loading ? 'Directing to WhatsApp...' : 'Send & Direct to WhatsApp Business'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Clarity & Policies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-medium text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--theme-text-muted)] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs text-[var(--theme-text-secondary)] leading-relaxed border-t border-[var(--theme-border)] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
