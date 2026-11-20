import { Project, ServiceCategory, Testimonial, WebsiteSettings, Enquiry, EnquiryStatus } from '../types';
import { initialProjects, initialServiceCategories, initialSettings, initialTestimonials, initialEnquiries } from '../data/initialData';
import { supabase } from './supabaseClient';

const STORAGE_KEYS = {
  PROJECTS: 'daveak_projects_v1',
  SERVICES: 'daveak_services_v1',
  SETTINGS: 'daveak_settings_v1',
  TESTIMONIALS: 'daveak_testimonials_v1',
  ENQUIRIES: 'daveak_enquiries_v1',
  AUTH: 'daveak_admin_auth_v1',
};

function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage quota or sandboxed
  }
}

export function initLocalStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    setLocal(STORAGE_KEYS.PROJECTS, initialProjects);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    setLocal(STORAGE_KEYS.SERVICES, initialServiceCategories);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    setLocal(STORAGE_KEYS.SETTINGS, initialSettings);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    setLocal(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    setLocal(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
  }
}

if (typeof window !== 'undefined') {
  initLocalStorage();
}

export const api = {
  // --- Projects ---
  async getProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && data && data.length > 0) {
        // Map Supabase snake_case columns to camelCase Project type if needed
        const mapped: Project[] = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          client: p.client,
          category: p.category,
          categoryLabel: p.category_label || p.categoryLabel,
          services: p.services || [],
          date: p.date,
          year: p.year,
          location: p.location,
          featured: p.featured,
          published: p.published,
          thumbnail: p.thumbnail,
          gallery: p.gallery || [],
          videoUrl: p.video_url || p.videoUrl,
          summary: p.summary,
          challenge: p.challenge,
          solution: p.solution,
          impact: p.impact,
          metrics: p.metrics || [],
        }));
        setLocal(STORAGE_KEYS.PROJECTS, mapped);
        return mapped;
      }
    } catch {
      // Supabase unavailable or table not yet created
    }
    return getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  },

  async getProjectById(id: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.id === id) || null;
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };

    try {
      const payload = {
        id: newProj.id,
        title: newProj.title,
        client: newProj.client,
        category: newProj.category,
        category_label: newProj.categoryLabel,
        services: newProj.services,
        date: newProj.date,
        year: newProj.year,
        location: newProj.location,
        featured: newProj.featured,
        published: newProj.published,
        thumbnail: newProj.thumbnail,
        gallery: newProj.gallery,
        video_url: newProj.videoUrl,
        summary: newProj.summary,
        challenge: newProj.challenge,
        solution: newProj.solution,
        impact: newProj.impact,
        metrics: newProj.metrics,
      };
      const { error } = await supabase.from('projects').insert([payload]);
      if (!error) {
        const current = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
        setLocal(STORAGE_KEYS.PROJECTS, [newProj, ...current]);
        return newProj;
      }
    } catch {
      // Fallback
    }

    const current = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    const updated = [newProj, ...current];
    setLocal(STORAGE_KEYS.PROJECTS, updated);
    return newProj;
  },

  async updateProject(project: Project): Promise<Project> {
    try {
      const payload = {
        title: project.title,
        client: project.client,
        category: project.category,
        category_label: project.categoryLabel,
        services: project.services,
        date: project.date,
        year: project.year,
        location: project.location,
        featured: project.featured,
        published: project.published,
        thumbnail: project.thumbnail,
        gallery: project.gallery,
        video_url: project.videoUrl,
        summary: project.summary,
        challenge: project.challenge,
        solution: project.solution,
        impact: project.impact,
        metrics: project.metrics,
      };
      await supabase.from('projects').update(payload).eq('id', project.id);
    } catch {
      // Fallback
    }

    const current = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    const updated = current.map((p) => (p.id === project.id ? project : p));
    setLocal(STORAGE_KEYS.PROJECTS, updated);
    return project;
  },

  async deleteProject(id: string): Promise<boolean> {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch {
      // Fallback
    }

    const current = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    setLocal(STORAGE_KEYS.PROJECTS, current.filter((p) => p.id !== id));
    return true;
  },

  // --- Services ---
  async getServices(): Promise<ServiceCategory[]> {
    try {
      const { data, error } = await supabase.from('service_categories').select('*');
      if (!error && data && data.length > 0) {
        const mapped: ServiceCategory[] = data.map((s: any) => ({
          id: s.id,
          title: s.title,
          tagline: s.tagline,
          iconName: s.icon_name || s.iconName,
          services: s.services || [],
          deliverables: s.deliverables || [],
          typicalTurnaround: s.typical_turnaround || s.typicalTurnaround,
        }));
        setLocal(STORAGE_KEYS.SERVICES, mapped);
        return mapped;
      }
    } catch {
      // Fallback
    }
    return getLocal<ServiceCategory[]>(STORAGE_KEYS.SERVICES, initialServiceCategories);
  },

  async updateServices(services: ServiceCategory[]): Promise<ServiceCategory[]> {
    setLocal(STORAGE_KEYS.SERVICES, services);
    return services;
  },

  // --- Settings ---
  async getSettings(): Promise<WebsiteSettings> {
    try {
      const { data, error } = await supabase.from('agency_settings').select('*').limit(1).single();
      if (!error && data) {
        const mapped: WebsiteSettings = {
          agencyName: data.agency_name || data.agencyName,
          tagline: data.tagline,
          brandPhilosophy: data.brand_philosophy || data.brandPhilosophy,
          email: data.email,
          phone: data.phone,
          whatsappNumber: data.whatsapp_number || data.whatsappNumber,
          location: data.location,
          officeHours: data.office_hours || data.officeHours,
          socials: data.socials || initialSettings.socials,
          heroImages: data.hero_images || data.heroImages || initialSettings.heroImages,
        };
        setLocal(STORAGE_KEYS.SETTINGS, mapped);
        return mapped;
      }
    } catch {
      // Fallback
    }
    return getLocal<WebsiteSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  },

  async updateSettings(settings: WebsiteSettings): Promise<WebsiteSettings> {
    try {
      const payload = {
        id: 'main',
        agency_name: settings.agencyName,
        tagline: settings.tagline,
        brand_philosophy: settings.brandPhilosophy,
        email: settings.email,
        phone: settings.phone,
        whatsapp_number: settings.whatsappNumber,
        location: settings.location,
        office_hours: settings.officeHours,
        socials: settings.socials,
        hero_images: settings.heroImages || initialSettings.heroImages,
      };
      await supabase.from('agency_settings').upsert(payload);
    } catch {
      // Fallback
    }
    setLocal(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // --- Enquiries ---
  async getEnquiries(): Promise<Enquiry[]> {
    try {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        const mapped: Enquiry[] = data.map((e: any) => ({
          id: e.id,
          fullName: e.full_name || e.fullName,
          organisation: e.organisation,
          email: e.email,
          phone: e.phone,
          serviceRequired: e.service_required || e.serviceRequired,
          secondaryServices: e.secondary_services || e.secondaryServices || [],
          projectDescription: e.project_description || e.projectDescription,
          projectDate: e.project_date || e.projectDate,
          location: e.location,
          budgetRange: e.budget_range || e.budgetRange,
          urgency: e.urgency,
          status: e.status,
          adminNotes: e.admin_notes || e.adminNotes,
          createdAt: e.created_at || e.createdAt,
        }));
        setLocal(STORAGE_KEYS.ENQUIRIES, mapped);
        return mapped;
      }
    } catch {
      // Fallback
    }
    return getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
  },

  async submitEnquiry(
    enquiryData: Omit<Enquiry, 'id' | 'status' | 'createdAt'>
  ): Promise<{ success: boolean; id: string; message: string }> {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    try {
      const payload = {
        id: newEnquiry.id,
        full_name: newEnquiry.fullName,
        organisation: newEnquiry.organisation,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        service_required: newEnquiry.serviceRequired,
        secondary_services: newEnquiry.secondaryServices || [],
        project_description: newEnquiry.projectDescription,
        project_date: newEnquiry.projectDate,
        location: newEnquiry.location,
        budget_range: newEnquiry.budgetRange,
        urgency: newEnquiry.urgency,
        status: newEnquiry.status,
        admin_notes: newEnquiry.adminNotes,
        created_at: newEnquiry.createdAt,
      };
      await supabase.from('enquiries').insert([payload]);
    } catch {
      // Fallback
    }

    const current = getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    setLocal(STORAGE_KEYS.ENQUIRIES, [newEnquiry, ...current]);
    return {
      success: true,
      id: newEnquiry.id,
      message: 'Your project enquiry has been submitted. Our production team will contact you shortly.',
    };
  },

  async updateEnquiryStatus(
    id: string,
    status: EnquiryStatus,
    adminNotes?: string
  ): Promise<Enquiry | null> {
    try {
      const updatePayload: any = { status };
      if (adminNotes !== undefined) updatePayload.admin_notes = adminNotes;
      await supabase.from('enquiries').update(updatePayload).eq('id', id);
    } catch {
      // Fallback
    }

    const current = getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    const target = current.find((e) => e.id === id);
    if (!target) return null;
    const updated: Enquiry = {
      ...target,
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : target.adminNotes,
    };
    setLocal(STORAGE_KEYS.ENQUIRIES, current.map((e) => (e.id === id ? updated : e)));
    return updated;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    try {
      await supabase.from('enquiries').delete().eq('id', id);
    } catch {
      // Fallback
    }
    const current = getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    setLocal(STORAGE_KEYS.ENQUIRIES, current.filter((e) => e.id !== id));
    return true;
  },

  // --- Testimonials ---
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase.from('testimonials').select('*');
      if (!error && data && data.length > 0) {
        const mapped: Testimonial[] = data.map((t: any) => ({
          id: t.id,
          name: t.name,
          role: t.role,
          organisation: t.organisation,
          quote: t.quote,
          projectType: t.project_type || t.projectType,
        }));
        setLocal(STORAGE_KEYS.TESTIMONIALS, mapped);
        return mapped;
      }
    } catch {
      // Fallback
    }
    return getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  },

  async createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: `test-${Date.now()}`,
    };
    const current = getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    const updated = [newTestimonial, ...current];
    setLocal(STORAGE_KEYS.TESTIMONIALS, updated);
    return newTestimonial;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const current = getLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    setLocal(STORAGE_KEYS.TESTIMONIALS, current.filter((t) => t.id !== id));
    return true;
  },

  // --- Media Upload ---
  async uploadMedia(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // --- Admin Auth ---
  verifyAdminSession(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'authenticated';
    } catch {
      return false;
    }
  },

  loginAdmin(password: string): boolean {
    if (password === 'Vik7777777' || password === 'daveak2026' || password === 'admin123' || password === 'daveak') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
      return true;
    }
    return false;
  },

  logoutAdmin(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },
};
