import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, Play, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onOpenVideo?: (url: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onOpenVideo }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={() => onSelect(project)}
      className="group cursor-pointer flex flex-col bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:border-[var(--theme-border-highlight)] transition-all duration-300 shadow-sm"
    >
      {/* Media Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        {!imageError ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 p-4">
            <ImageIcon className="w-8 h-8 mb-2 opacity-60" />
            <span className="text-xs font-mono">{project.categoryLabel}</span>
          </div>
        )}

        {/* Cinematic gradient overlay scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Video trigger button if project has video */}
        {project.videoUrl && onOpenVideo && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenVideo(project.videoUrl!);
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-[var(--theme-accent)] text-white hover:text-[var(--theme-accent-contrast)] backdrop-blur-md border border-white/20 transition-colors"
            title="Watch Film"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        )}

        {/* Quiet unboxed location & year on bottom right of image */}
        <div className="absolute bottom-3 right-3 text-[11px] font-mono text-white/90 drop-shadow">
          <span>{project.location}</span>
          <span className="mx-1.5 opacity-50">·</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet Unboxed Metadata kicker (NO PILLS) */}
          <div className="flex items-center gap-2 text-xs text-[var(--theme-accent)] font-medium tracking-wide mb-2">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true" className="opacity-40">/</span>
            <span className="text-[var(--theme-text-muted)]">{project.client}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors leading-snug line-clamp-2">
            {project.title}
          </h3>

          {/* Summary */}
          <p className="mt-2.5 text-xs text-[var(--theme-text-secondary)] leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Bottom services list and link */}
        <div className="mt-5 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between text-xs text-[var(--theme-text-muted)]">
          <div className="truncate max-w-[220px]">
            {project.services.join(' · ')}
          </div>
          <span className="inline-flex items-center gap-1 text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-text-primary)] font-medium shrink-0 ml-2">
            <span>View Case</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
