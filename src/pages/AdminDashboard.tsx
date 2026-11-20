import React, { useState, useEffect } from 'react';
import {
  Project,
  ProjectCategory,
  ServiceCategory,
  Testimonial,
  WebsiteSettings,
  Enquiry,
  EnquiryStatus,
} from '../types';
import { api } from '../services/api';
import { formatWhatsAppNumber } from '../components/WhatsAppFloatingButton';
import {
  Lock,
  LogOut,
  FolderKanban,
  Inbox,
  Settings as SettingsIcon,
  Layers,
  MessageSquare,
  Upload,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Save,
  Search,
} from 'lucide-react';

interface AdminDashboardProps {
  settings: WebsiteSettings;
  projects: Project[];
  services: ServiceCategory[];
  testimonials: Testimonial[];
  onProjectsChange: () => void;
  onServicesChange: () => void;
  onSettingsChange: () => void;
  onTestimonialsChange: () => void;
  onNavigate: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  settings,
  projects,
  services,
  testimonials,
  onProjectsChange,
  onServicesChange,
  onSettingsChange,
  onTestimonialsChange,
  onNavigate,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'enquiries' | 'projects' | 'services' | 'settings' | 'testimonials' | 'media'>('enquiries');

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Project Editor state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    client: '',
    category: 'corporate',
    categoryLabel: 'Corporate Media',
    services: ['Conference Documentation'],
    date: new Date().toISOString().split('T')[0],
    year: '2026',
    location: 'Accra, Ghana',
    featured: false,
    published: true,
    thumbnail: '',
    gallery: [],
    videoUrl: '',
    summary: '',
    challenge: '',
    solution: '',
    impact: '',
  });

  // Media upload testbench state
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Website Settings local edit state
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Check existing session
  useEffect(() => {
    setIsAuthenticated(api.verifyAdminSession());
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    const data = await api.getEnquiries();
    setEnquiries(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (api.loginAdmin(passwordInput)) {
      setIsAuthenticated(true);
      setLoginError(false);
      loadEnquiries();
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    api.logoutAdmin();
    setIsAuthenticated(false);
  };

  // --- Enquiries management ---
  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus, notes?: string) => {
    const updated = await api.updateEnquiryStatus(id, newStatus, notes);
    if (updated) {
      loadEnquiries();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(updated);
      }
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (window.confirm('Delete this enquiry record?')) {
      await api.deleteEnquiry(id);
      loadEnquiries();
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    }
  };

  // --- Project CRUD ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.client) return;

    if (editingProject) {
      await api.updateProject({ ...editingProject, ...(projectForm as Project) });
    } else {
      await api.createProject(projectForm as Omit<Project, 'id'>);
    }

    setIsCreatingProject(false);
    setEditingProject(null);
    onProjectsChange();
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await api.deleteProject(id);
      onProjectsChange();
    }
  };

  const handleTogglePublished = async (project: Project) => {
    await api.updateProject({ ...project, published: !project.published });
    onProjectsChange();
  };

  const handleToggleFeatured = async (project: Project) => {
    await api.updateProject({ ...project, featured: !project.featured });
    onProjectsChange();
  };

  // --- Media upload handler ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      setUploadError('File exceeds 25MB maximum limit.');
      return;
    }

    setUploadLoading(true);
    setUploadError(null);
    try {
      const url = await api.uploadMedia(file);
      setUploadedMediaUrl(url);
      // Auto fill thumbnail in active project form if creating
      if (isCreatingProject || editingProject) {
        setProjectForm((prev) => ({
          ...prev,
          thumbnail: url,
          gallery: prev.gallery ? [...prev.gallery, url] : [url],
        }));
      }
    } catch (err: any) {
      setUploadError(err.message || 'Media upload failed.');
    } finally {
      setUploadLoading(false);
    }
  };

  // --- Settings Save ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateSettings(settingsForm);
      setSettingsSaved(true);
      alert('✓ Website Settings and Hero Background Images saved successfully!');
      setTimeout(() => setSettingsSaved(false), 4000);
      onSettingsChange();
    } catch (err: any) {
      alert('Failed to save settings: ' + (err.message || 'Unknown error'));
    }
  };

  // Render Login Gate if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-[#0f0f12] border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-[#d4af37]">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-bold text-white">
              Agency Staff Access
            </h2>
            <p className="text-xs text-neutral-400">
              Enter master authorization key to manage portfolio assets, client inquiries, and production settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invalid credentials. Try master key: daveak2026</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Authorization Key
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-xs p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#d4af37] hover:bg-[#e5c158] text-black font-semibold text-xs rounded-xl transition-all shadow-md"
            >
              Authorize & Enter Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[11px] font-mono text-neutral-500">
              Demo Master Key: <strong className="text-neutral-400">daveak2026</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryFilter === 'all') return true;
    return e.status === enquiryFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-28">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase tracking-wider">
            <span>DAVEAK Production Command</span>
            <span>·</span>
            <span>Secure Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Agency Management Portal
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-red-400 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Rule 1.A buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-800/80">
        {[
          { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: <Inbox className="w-4 h-4" /> },
          { id: 'projects', label: `Projects (${projects.length})`, icon: <FolderKanban className="w-4 h-4" /> },
          { id: 'media', label: 'Media Storage', icon: <Upload className="w-4 h-4" /> },
          { id: 'settings', label: 'Agency Settings', icon: <SettingsIcon className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setIsCreatingProject(false);
              setEditingProject(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* --- TAB 1: ENQUIRIES & LEADS --- */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {['all', 'new', 'contacted', 'proposal_sent', 'booked', 'completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setEnquiryFilter(st)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                    enquiryFilter === st
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={loadEnquiries}
              className="text-xs text-[#d4af37] hover:underline"
            >
              Refresh Inquiries
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Leads List */}
            <div className="lg:col-span-6 space-y-3">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedEnquiry?.id === enq.id
                        ? 'bg-neutral-800/90 border-[#d4af37]/60 text-white shadow-md'
                        : 'bg-[#0f0f12] border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                      <span className="uppercase text-[#d4af37] font-semibold">
                        {enq.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {enq.fullName} {enq.organisation ? `(${enq.organisation})` : ''}
                    </div>
                    <div className="text-xs text-[#d4af37] mt-0.5">{enq.serviceRequired}</div>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                      {enq.projectDescription}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-[#0f0f12] border border-neutral-800 rounded-xl text-neutral-500 text-xs">
                  No enquiries matching "{enquiryFilter}".
                </div>
              )}
            </div>

            {/* Selected Lead Inspector */}
            <div className="lg:col-span-6 sticky top-28 bg-[#0f0f12] border border-neutral-800 rounded-2xl p-6 space-y-6">
              {selectedEnquiry ? (
                <>
                  <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                    <div>
                      <div className="text-xs font-mono text-neutral-400">
                        Reference: #{selectedEnquiry.id}
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {selectedEnquiry.fullName}
                      </h3>
                      {selectedEnquiry.organisation && (
                        <div className="text-xs text-neutral-400">
                          Org: {selectedEnquiry.organisation}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/80">
                      <div>
                        <div className="text-neutral-500">Email:</div>
                        <a href={`mailto:${selectedEnquiry.email}`} className="text-white hover:underline">
                          {selectedEnquiry.email}
                        </a>
                      </div>
                      <div>
                        <div className="text-neutral-500">Phone:</div>
                        <a href={`tel:${selectedEnquiry.phone}`} className="text-white hover:underline">
                          {selectedEnquiry.phone}
                        </a>
                      </div>
                      <div>
                        <div className="text-neutral-500">Target Date:</div>
                        <div className="text-white">{selectedEnquiry.projectDate || 'Flexible'}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">Location:</div>
                        <div className="text-white">{selectedEnquiry.location}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-neutral-500 font-semibold mb-1">Service & Scope:</div>
                      <div className="text-white font-medium">{selectedEnquiry.serviceRequired}</div>
                      {selectedEnquiry.secondaryServices && selectedEnquiry.secondaryServices.length > 0 && (
                        <div className="text-neutral-400 mt-1">
                          Add-ons: {selectedEnquiry.secondaryServices.join(', ')}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-neutral-500 font-semibold mb-1">Project Brief:</div>
                      <p className="text-neutral-300 leading-relaxed bg-neutral-900/40 p-3 rounded-lg border border-neutral-800/60">
                        {selectedEnquiry.projectDescription}
                      </p>
                    </div>

                    {selectedEnquiry.budgetRange && (
                      <div>
                        <div className="text-neutral-500">Estimated Budget Range:</div>
                        <div className="text-[#d4af37] font-mono">{selectedEnquiry.budgetRange}</div>
                      </div>
                    )}

                    {/* Status Updater */}
                    <div className="pt-2 border-t border-neutral-800 space-y-2">
                      <label className="text-neutral-400 block font-medium">Update Lead Status:</label>
                      <div className="flex flex-wrap gap-2">
                        {(['new', 'contacted', 'proposal_sent', 'booked', 'completed', 'archived'] as EnquiryStatus[]).map(
                          (statusVal) => (
                            <button
                              key={statusVal}
                              onClick={() => handleUpdateStatus(selectedEnquiry.id, statusVal)}
                              className={`px-2.5 py-1 text-xs rounded-md capitalize transition-colors ${
                                selectedEnquiry.status === statusVal
                                  ? 'bg-[#d4af37] text-black font-semibold'
                                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {statusVal.replace('_', ' ')}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Direct Contact Actions */}
                    <div className="pt-4 flex items-center gap-3">
                      <a
                        href={`https://wa.me/${formatWhatsAppNumber(selectedEnquiry.phone)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:${selectedEnquiry.email}?subject=DAVEAK-MULTIMEDIA: Proposal for ${encodeURIComponent(
                          selectedEnquiry.serviceRequired
                        )}`}
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        Send Email Reply
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-neutral-500 text-xs">
                  Select an enquiry on the left to inspect details and update status.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: PORTFOLIO MANAGEMENT --- */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">All Portfolio Projects</h3>
            {!isCreatingProject && !editingProject && (
              <button
                onClick={() => {
                  setIsCreatingProject(true);
                  setEditingProject(null);
                  setProjectForm({
                    title: '',
                    client: '',
                    category: 'corporate',
                    categoryLabel: 'Corporate Media',
                    services: ['Conference Documentation'],
                    date: new Date().toISOString().split('T')[0],
                    year: '2026',
                    location: 'Accra, Ghana',
                    featured: false,
                    published: true,
                    thumbnail: '/src/assets/images/portfolio_corporate_summit_1795142171141.jpg',
                    gallery: [],
                    videoUrl: '',
                    summary: '',
                    challenge: '',
                    solution: '',
                    impact: '',
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#d4af37] hover:bg-[#e5c158] text-black text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Project</span>
              </button>
            )}
          </div>

          {/* Project Form Modal / Drawer */}
          {(isCreatingProject || editingProject) && (
            <form
              onSubmit={handleSaveProject}
              className="bg-[#0f0f12] border border-neutral-700 rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h4 className="text-base font-semibold text-white">
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingProject(false);
                    setEditingProject(null);
                  }}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Client / Organization *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as ProjectCategory;
                      setProjectForm({
                        ...projectForm,
                        category: cat,
                        categoryLabel: cat.charAt(0).toUpperCase() + cat.slice(1),
                      });
                    }}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  >
                    <option value="corporate">Corporate Events</option>
                    <option value="documentaries">Documentaries</option>
                    <option value="commercial">Commercial</option>
                    <option value="weddings">Weddings</option>
                    <option value="institutional">Institutional</option>
                    <option value="photography">Photography</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Thumbnail Media URL or Path</label>
                  <input
                    type="text"
                    value={projectForm.thumbnail}
                    onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
                    placeholder="/src/assets/images/... or /uploads/..."
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Video Embed URL (YouTube/Vimeo)</label>
                  <input
                    type="text"
                    value={projectForm.videoUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Executive Summary *</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.summary}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Challenge</label>
                  <textarea
                    rows={2}
                    value={projectForm.challenge || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                    className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Solution</label>
                  <textarea
                    rows={2}
                    value={projectForm.solution || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Impact</label>
                  <textarea
                    rows={2}
                    value={projectForm.impact || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })}
                    className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs">
                <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.published}
                    onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                    className="rounded text-[#d4af37] focus:ring-0"
                  />
                  <span>Published on Public Site</span>
                </label>

                <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="rounded text-[#d4af37] focus:ring-0"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingProject(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4af37] text-black font-semibold text-xs rounded-lg"
                >
                  Save Project
                </button>
              </div>
            </form>
          )}

          {/* Projects Table */}
          <div className="bg-[#0f0f12] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-900/80 border-b border-neutral-800 uppercase tracking-wider font-mono text-[11px] text-neutral-400">
                  <tr>
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-800/40">
                      <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt=""
                          className="w-10 h-8 object-cover rounded bg-neutral-900"
                        />
                        <span className="truncate max-w-[200px]">{p.title}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#d4af37]">{p.category}</td>
                      <td className="py-3.5 px-4 text-neutral-400">{p.client}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleTogglePublished(p)}
                            className={`flex items-center gap-1 text-[11px] font-mono ${
                              p.published ? 'text-emerald-400' : 'text-neutral-500'
                            }`}
                            title="Toggle publication"
                          >
                            {p.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{p.published ? 'Live' : 'Draft'}</span>
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(p)}
                            className={`${p.featured ? 'text-[#d4af37]' : 'text-neutral-600'}`}
                            title="Toggle featured"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProject(p);
                            setIsCreatingProject(false);
                            setProjectForm(p);
                          }}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: MEDIA UPLOAD & TESTBENCH --- */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="bg-[#0f0f12] border border-neutral-800 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                Direct Media Storage & Uploader
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Upload photography stills, video assets, or brand graphics directly from phone or desktop. Files are saved securely to the agency repository.
              </p>
            </div>

            {/* Upload Dropzone */}
            <div className="border-2 border-dashed border-neutral-700/80 hover:border-[#d4af37] rounded-2xl p-10 text-center space-y-4 transition-colors">
              <Upload className="w-10 h-10 text-[#d4af37] mx-auto opacity-80" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Select image or video from device
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Supported formats: JPEG, PNG, WebP, MP4 (Max: 25MB)
                </p>
              </div>

              <label className="inline-block px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-xl cursor-pointer transition-colors">
                <span>Browse Files</span>
                <input
                  type="file"
                  accept="image/*,video/mp4"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadLoading && (
                <div className="text-xs text-[#d4af37] font-mono">Uploading and optimizing media...</div>
              )}
              {uploadError && (
                <div className="text-xs text-red-400">{uploadError}</div>
              )}
            </div>

            {/* Uploaded Result Preview */}
            {uploadedMediaUrl && (
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Media Upload Successful</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={uploadedMediaUrl}
                    alt="Uploaded media"
                    className="w-20 h-14 object-cover rounded bg-black"
                  />
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-neutral-300 break-all select-all">
                      {uploadedMediaUrl}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(uploadedMediaUrl);
                        alert('URL copied to clipboard!');
                      }}
                      className="text-[11px] text-[#d4af37] hover:underline"
                    >
                      Copy Media Path
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 4: AGENCY SETTINGS & CONTACT --- */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-[#0f0f12] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Agency Information & Contacts
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Update public phone, WhatsApp number, physical location, and brand copy.
                </p>
              </div>
              {settingsSaved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved to database</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-300 mb-1">Agency Name</label>
                <input
                  type="text"
                  value={settingsForm.agencyName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, agencyName: e.target.value })}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Agency Tagline</label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Official Email</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Hotline Phone</label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">WhatsApp Business Number</label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  placeholder="+233240000000"
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={settingsForm.officeHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, officeHours: e.target.value })}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Studio Address & Operating Coverage
              </label>
              <input
                type="text"
                value={settingsForm.location}
                onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Brand Philosophy Statement
              </label>
              <textarea
                rows={3}
                value={settingsForm.brandPhilosophy}
                onChange={(e) => setSettingsForm({ ...settingsForm, brandPhilosophy: e.target.value })}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-xs"
              />
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-neutral-800 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Social Handles</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={settingsForm.socials.instagram}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, instagram: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={settingsForm.socials.linkedin}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">YouTube URL</label>
                  <input
                    type="text"
                    value={settingsForm.socials.youtube}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, youtube: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Facebook URL</label>
                  <input
                    type="text"
                    value={settingsForm.socials.facebook}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        socials: { ...settingsForm.socials, facebook: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>

            {/* Hero Background Images Manager */}
            <div className="pt-4 border-t border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Hero Background Slideshow Images (Auto-rotates every 4s)
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Upload or add multiple image URLs to feature in the homepage hero background rotation.
                  </p>
                </div>
                <label className="px-3 py-1.5 bg-[#d4af37] text-black text-xs font-semibold rounded-lg cursor-pointer hover:bg-[#e5c158] transition-colors">
                  <span>+ Upload Hero Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await api.uploadMedia(file);
                        const currentImages = settingsForm.heroImages || [];
                        setSettingsForm({
                          ...settingsForm,
                          heroImages: [...currentImages, url],
                        });
                        alert('✓ Hero background image uploaded successfully! Click "Save Website Settings" below to apply.');
                      } catch (err) {
                        alert('Failed to upload image.');
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {(settingsForm.heroImages || []).map((imgUrl, idx) => (
                  <div key={idx} className="relative group aspect-[16/10] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
                    <img src={imgUrl} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (settingsForm.heroImages || []).filter((_, i) => i !== idx);
                        setSettingsForm({ ...settingsForm, heroImages: updated });
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-mono text-white">
                      #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add URL Manual Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  id="newHeroImageUrl"
                  placeholder="Or paste image URL here..."
                  className="flex-1 text-xs p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('newHeroImageUrl') as HTMLInputElement;
                    if (input && input.value.trim()) {
                      const currentImages = settingsForm.heroImages || [];
                      setSettingsForm({
                        ...settingsForm,
                        heroImages: [...currentImages, input.value.trim()],
                      });
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg"
                >
                  Add URL
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-neutral-800">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] hover:bg-[#e5c158] text-black font-semibold text-xs rounded-xl shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Website Settings</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
