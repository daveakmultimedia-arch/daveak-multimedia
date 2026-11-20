import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, Play, ArrowRight, MapPin, Calendar, Building, Sparkles } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLightbox: (images: string[], index: number) => void;
  onRequestQuote: (serviceName?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenLightbox,
  onRequestQuote,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl shadow-2xl overflow-hidden my-8 text-[var(--theme-text-primary)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-bg-elevated)] backdrop-blur-sm rounded-full border border-[var(--theme-border)] transition-colors shadow-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Banner / Video Player */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[var(--theme-bg-canvas)] overflow-hidden">
          {isPlayingVideo && project.videoUrl ? (
            <iframe
              src={`${getEmbedVideoUrl(project.videoUrl)}?autoplay=1`}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-surface)] via-black/30 to-transparent" />
              {project.videoUrl && (
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute inset-0 flex items-center justify-center group focus:outline-none"
                >
                  <div className="flex items-center gap-3 px-5 py-3 rounded-full theme-accent-bg font-semibold text-xs tracking-wide shadow-xl group-hover:scale-105 transition-all">
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Film</span>
                  </div>
                </button>
              )}
            </>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Metadata Header */}
          <div className="border-b border-[var(--theme-border)] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--theme-accent)] uppercase tracking-wider mb-2">
              <span>{project.categoryLabel}</span>
              <span className="opacity-40">·</span>
              <span className="text-[var(--theme-text-muted)]">{project.year}</span>
              <span className="opacity-40">·</span>
              <span className="text-[var(--theme-text-muted)]">{project.location}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--theme-text-primary)]">
              {project.title}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[var(--theme-text-secondary)]">
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>Client: <strong className="text-[var(--theme-text-primary)] font-medium">{project.client}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>Delivered {project.date}</span>
              </div>
            </div>
          </div>

          {/* Project Summary */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[var(--theme-accent)] font-semibold mb-2">
              Executive Summary
            </h3>
            <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Metrics Grid if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] rounded-xl">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)] tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-[var(--theme-text-muted)] uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Challenge, Solution & Impact */}
          {(project.challenge || project.solution || project.impact) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {project.challenge && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <span>The Challenge</span>
                  </h4>
                  <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Our Solution</span>
                  </h4>
                  <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
              {project.impact && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Documented Impact</span>
                  </h4>
                  <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Scope of Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--theme-accent)] font-semibold mb-2">
              Production Capabilities Deployed
            </h4>
            <div className="text-xs text-[var(--theme-text-secondary)]">
              {project.services.join(' · ')}
            </div>
          </div>

          {/* Gallery Strips */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-semibold">
                Project Gallery Frames (Click to Expand)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => onOpenLightbox(project.gallery, idx)}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all group focus:outline-none"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} frame ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action CTA */}
          <div className="pt-6 border-t border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[var(--theme-text-muted)]">
              Need a similar production for your organization or milestone?
            </div>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(project.services[0] || project.categoryLabel);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-lg transition-colors shadow-md"
            >
              <span>Request Quote For Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
