export type ProjectCategory =
  | 'all'
  | 'photography'
  | 'corporate'
  | 'documentaries'
  | 'commercial'
  | 'weddings'
  | 'branding'
  | 'institutional';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  categoryLabel: string;
  services: string[];
  date: string;
  year: string;
  location: string;
  featured: boolean;
  published: boolean;
  thumbnail: string;
  gallery: string[];
  videoUrl?: string;
  summary: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  metrics?: { label: string; value: string }[];
}

export type ServiceCategoryId =
  | 'photography'
  | 'videography'
  | 'corporate-media'
  | 'branding'
  | 'digital-content'
  | 'livestreaming'
  | 'additional';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  tagline: string;
  iconName: string;
  services: ServiceItem[];
  deliverables: string[];
  typicalTurnaround: string;
}

export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'proposal_sent'
  | 'booked'
  | 'completed'
  | 'archived';

export interface Enquiry {
  id: string;
  fullName: string;
  organisation?: string;
  email: string;
  phone: string;
  serviceRequired: string;
  secondaryServices?: string[];
  projectDescription: string;
  projectDate: string;
  location: string;
  budgetRange?: string;
  urgency?: 'standard' | 'priority' | 'rush';
  hearAboutUs?: string;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organisation: string;
  quote: string;
  projectType: string;
  avatar?: string;
}

export interface WebsiteSettings {
  agencyName: string;
  tagline: string;
  brandPhilosophy: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  location: string;
  officeHours: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    vimeo?: string;
  };
  heroImages?: string[];
  adminPasswordHash?: string;
}
