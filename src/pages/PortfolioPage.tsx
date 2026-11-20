import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Filter, Sparkles, ArrowRight } from 'lucide-react';

interface PortfolioPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenVideo: (url: string) => void;
  onNavigate: (page: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  projects,
  onSelectProject,
  onOpenVideo,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'corporate', label: 'Corporate Events' },
    { id: 'documentaries', label: 'Documentaries' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'institutional', label: 'Institutional' },
    { id: 'photography', label: 'Photography' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const searchMatch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.client.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.services.some((s) => s.toLowerCase().includes(query)) ||
      p.location.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-16 pb-24 text-[var(--theme-text-primary)]">
      {/* Header */}
      <section className="pt-12 pb-6 border-b border-[var(--theme-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            Curated Visual Archive
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--theme-text-primary)]">
            Selected Works & Productions
          </h1>
          <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] font-light max-w-2xl">
            Explore our portfolio of institutional summits, NGO documentaries, commercial campaigns, and luxury celebrations across Ghana and international venues.
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl shadow-sm">
          {/* Categories Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'theme-accent-bg font-semibold shadow-sm'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-elevated)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 text-[var(--theme-text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by client or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs py-2 pl-9 pr-4 bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] rounded-lg text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)]"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
                onOpenVideo={onOpenVideo}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl max-w-xl mx-auto space-y-4 shadow-sm">
            <Filter className="w-10 h-10 text-[var(--theme-text-muted)] mx-auto" />
            <h3 className="text-base font-semibold text-[var(--theme-text-primary)]">No projects found</h3>
            <p className="text-xs text-[var(--theme-text-secondary)]">
              No productions match your active filter or search term. Try resetting the category or clearing the search bar.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium bg-[var(--theme-bg-elevated)] hover:opacity-90 text-[var(--theme-text-primary)] border border-[var(--theme-border)] rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Action Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 pt-8">
        <h3 className="text-2xl font-bold text-[var(--theme-text-primary)]">
          Commission a New Production
        </h3>
        <p className="text-[var(--theme-text-secondary)] text-xs sm:text-sm max-w-lg mx-auto">
          Every project begins with a focused creative consultation to align your communications goals with our technical strategy.
        </p>
        <button
          onClick={() => onNavigate('quote')}
          className="inline-flex items-center gap-2 px-7 py-3.5 theme-accent-bg hover:opacity-90 text-xs font-semibold rounded-xl transition-all shadow-md"
        >
          <span>Request Project Quotation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
