import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-neutral-300 text-sm leading-relaxed pb-24">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-xs font-mono text-[#d4af37] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Homepage</span>
      </button>

      <div className="space-y-4 border-b border-neutral-800 pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-xs text-neutral-400 font-mono">
          Last Updated: March 2026 · Compliant with the Data Protection Act, 2012 (Act 843) of Ghana & International GDPR Standards
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
          <p>
            DAVEAK-MULTIMEDIA ("the Agency", "we", "us", or "our") respects the privacy and confidentiality of our clients, institutional partners, conference attendees, and website visitors. This policy outlines how we collect, process, store, and protect personal and institutional media data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. Information We Collect</h2>
          <p>When you interact with our website, request quotations, or engage our creative services, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
            <li>Contact Information: Full name, business title, organization name, official email, phone number, and physical billing address.</li>
            <li>Project Specifications: Target dates, venues, creative briefs, deliverable requests, and budget ranges.</li>
            <li>Media Recordings: Visual recordings, photography, audio stems, and aerial footage captured during production mandates.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. Non-Disclosure & Confidentiality</h2>
          <p>
            For corporate, diplomatic, and private milestones, DAVEAK-MULTIMEDIA routinely enters into formal Non-Disclosure Agreements (NDAs). Any confidential presentation slides, unpublished financial statements, unreleased product prototypes, or proprietary discussions recorded during our coverage remain the exclusive confidential property of the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Secure Media Storage & Archiving</h2>
          <p>
            All production footage is stored on encrypted local SSD arrays and mirrored to secure cloud backups with two-factor authentication. We retain uncompressed master archives for an agreed contractual period (typically 12 months) before secure archival or permanent decommissioning upon written request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">5. Your Data Protection Rights</h2>
          <p>Under Act 843 of Ghana and international best practices, you are entitled to:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
            <li>Request a copy of any personal data we hold about you.</li>
            <li>Request the deletion or restricted use of your contact information.</li>
            <li>Withdraw consent for promotional showcase inclusion of your project imagery.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-neutral-800 pt-6">
          <h2 className="text-lg font-semibold text-white">6. Contact Our Data Controller</h2>
          <p className="text-xs text-neutral-400">
            For privacy inquiries or data removal requests, contact our legal desk at <strong className="text-white">daveakmultimedia@gmail.com</strong> or call <strong className="text-white">0246488207</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
