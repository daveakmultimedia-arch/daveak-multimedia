import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-[var(--theme-text-secondary)] text-sm leading-relaxed pb-24">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--theme-accent)] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Homepage</span>
      </button>

      <div className="space-y-4 border-b border-[var(--theme-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
          Commercial Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--theme-text-primary)] tracking-tight">
          Terms of Service & Production Agreement
        </h1>
        <p className="text-xs text-[var(--theme-text-muted)] font-mono">
          Standard Engagement Terms · DAVEAK-MULTIMEDIA Agency
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">1. Scope of Agreement</h2>
          <p>
            These Terms govern all multimedia production, photography, cinematography, livestreaming, drone operations, and creative consultancy services commissioned from DAVEAK-MULTIMEDIA. Each project is accompanied by an itemized Technical Rider and Quotation agreed upon before production commencement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">2. Booking Deposit & Payment Schedule</h2>
          <p>
            To secure production crew reservations, equipment allocations, and shooting dates:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--theme-text-secondary)]">
            <li>A non-refundable 60% commitment deposit is required upon formal signing or quotation approval.</li>
            <li>The final 40% balance is payable upon client review and prior to final uncompressed 4K master delivery or handover of print albums.</li>
            <li>For ongoing monthly retainers, invoices are issued net-15 on the first business day of the billing cycle.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">3. Intellectual Property & Commercial Licensing</h2>
          <p>
            Upon full payment of all contracted fees, DAVEAK-MULTIMEDIA grants the client an irrevocable, worldwide, perpetual commercial license to use, broadcast, distribute, and publish the delivered media across all internal and public channels, as specified in the project agreement.
          </p>
          <p className="text-xs text-[var(--theme-text-muted)]">
            The agency retains moral rights and the standard right to showcase selected non-confidential imagery in its professional portfolio, unless restricted under an active Non-Disclosure Agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">4. Revisions & Approvals</h2>
          <p>
            All video and commercial productions include two (2) complimentary rounds of editorial revisions (pacing, text graphics, color timing adjustments). Substantive structural changes requested after offline cut approval may incur additional studio editing time at standard hourly rates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">5. Weather & Force Majeure</h2>
          <p>
            For outdoor aerial drone and on-location shoots, safety is paramount. If adverse meteorological conditions (heavy rainfall, tropical storms, severe dust haze) endanger flight safety or sensitive camera electronics, DAVEAK-MULTIMEDIA reserves the right to postpone the outdoor sequence to an agreed backup date with zero penalty fees.
          </p>
        </section>

        <section className="space-y-3 border-t border-[var(--theme-border)] pt-6">
          <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">6. Governing Law</h2>
          <p className="text-xs text-[var(--theme-text-muted)]">
            These terms are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising shall be resolved under the jurisdiction of the courts of Ghana.
          </p>
        </section>
      </div>
    </div>
  );
};
