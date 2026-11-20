/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { LightboxModal } from './components/LightboxModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CorporateServicesPage } from './pages/CorporateServicesPage';
import { BrandsPage } from './pages/BrandsPage';
import { ChurchesPage } from './pages/ChurchesPage';
import { PersonalEventsPage } from './pages/PersonalEventsPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';

import { Project, ServiceCategory, Testimonial, WebsiteSettings } from './types';
import { api } from './services/api';
import { initialProjects, initialServiceCategories, initialSettings, initialTestimonials } from './data/initialData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [quoteServicePrefill, setQuoteServicePrefill] = useState<string | undefined>();
  const [servicesCategoryFilter, setServicesCategoryFilter] = useState<string | undefined>();

  // Always use Clean Minimalist theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'clean-light');
  }, []);

  // Global data state
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [services, setServices] = useState<ServiceCategory[]>(initialServiceCategories);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    title?: string;
    client?: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

  // Load data from API / persistent storage
  const loadData = async () => {
    try {
      const [fetchedProjects, fetchedServices, fetchedSettings, fetchedTestimonials] = await Promise.all([
        api.getProjects(),
        api.getServices(),
        api.getSettings(),
        api.getTestimonials(),
      ]);
      if (fetchedProjects && fetchedProjects.length > 0) setProjects(fetchedProjects);
      if (fetchedServices && fetchedServices.length > 0) setServices(fetchedServices);
      if (fetchedSettings && fetchedSettings.agencyName) setSettings(fetchedSettings);
      if (fetchedTestimonials && fetchedTestimonials.length > 0) setTestimonials(fetchedTestimonials);
    } catch (err) {
      console.warn('Using seeded data:', err);
    }
  };

  useEffect(() => {
    loadData();

    // Sync from URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        const validPages = [
          'home',
          'about',
          'services',
          'portfolio',
          'corporate',
          'brands',
          'churches',
          'personal',
          'quote',
          'contact',
          'privacy',
          'terms',
          'admin',
        ];
        if (validPages.includes(hash)) {
          setCurrentPage(hash);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, params?: { service?: string }) => {
    if (params?.service) {
      if (page === 'quote') {
        setQuoteServicePrefill(params.service);
      } else if (page === 'services') {
        setServicesCategoryFilter(params.service);
      }
    }
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLightbox = (images: string[], index: number, title?: string, client?: string) => {
    setLightboxState({
      isOpen: true,
      images,
      currentIndex: index,
      title,
      client,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNavigateLightbox = (index: number) => {
    setLightboxState((prev) => ({ ...prev, currentIndex: index }));
  };

  // Video embed helper
  const getEmbedVideoUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return url;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200">
      {/* Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            projects={projects}
            services={services}
            testimonials={testimonials}
            settings={settings}
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenVideo={(url) => setVideoModalUrl(url)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} settings={settings} />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            onNavigate={navigateTo}
            selectedCategoryFromNav={servicesCategoryFilter}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenVideo={(url) => setVideoModalUrl(url)}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'corporate' && (
          <CorporateServicesPage
            onNavigate={navigateTo}
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {currentPage === 'brands' && (
          <BrandsPage
            onNavigate={navigateTo}
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {currentPage === 'churches' && (
          <ChurchesPage onNavigate={navigateTo} testimonials={testimonials} />
        )}

        {currentPage === 'personal' && (
          <PersonalEventsPage
            onNavigate={navigateTo}
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {currentPage === 'quote' && (
          <QuotePage
            services={services}
            settings={settings}
            initialService={quoteServicePrefill}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage settings={settings} onNavigate={navigateTo} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={navigateTo} />
        )}

        {currentPage === 'terms' && (
          <TermsPage onNavigate={navigateTo} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            settings={settings}
            projects={projects}
            services={services}
            testimonials={testimonials}
            onProjectsChange={loadData}
            onServicesChange={loadData}
            onSettingsChange={loadData}
            onTestimonialsChange={loadData}
            onNavigate={navigateTo}
          />
        )}

        {![
          'home',
          'about',
          'services',
          'portfolio',
          'corporate',
          'brands',
          'churches',
          'personal',
          'quote',
          'contact',
          'privacy',
          'terms',
          'admin',
        ].includes(currentPage) && <NotFoundPage onNavigate={navigateTo} />}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={navigateTo}
        settings={settings}
      />

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppFloatingButton settings={settings} currentPage={currentPage} />

      {/* High-Resolution Gallery Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        mediaItems={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onNavigate={handleNavigateLightbox}
        title={lightboxState.title}
        client={lightboxState.client}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLightbox={(imgs, idx) =>
          handleOpenLightbox(imgs, idx, selectedProject?.title, selectedProject?.client)
        }
        onRequestQuote={(svc) => {
          setSelectedProject(null);
          navigateTo('quote', { service: svc });
        }}
      />

      {/* Dedicated Video Player Modal */}
      {videoModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl aspect-[16/9] bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
            <button
              onClick={() => setVideoModalUrl(null)}
              className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/70 hover:bg-neutral-800 text-white text-xs font-mono rounded-lg border border-neutral-700 transition-colors"
            >
              Close Film ✕
            </button>
            <iframe
              src={`${getEmbedVideoUrl(videoModalUrl)}?autoplay=1`}
              title="DAVEAK Production Film"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
