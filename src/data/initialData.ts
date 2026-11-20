import { Project, ServiceCategory, Testimonial, WebsiteSettings, Enquiry } from '../types';

export const initialSettings: WebsiteSettings = {
  agencyName: 'DAVEAK-MULTIMEDIA',
  tagline: 'Unparalleled Creativity With Speed.',
  brandPhilosophy:
    'We preserve memories, communicate impact and build legacies through our lens. We help individuals and organisations communicate their stories, showcase their value and connect with the audiences that matter.',
  email: 'daveakmultimedia@gmail.com',
  phone: '0246488207',
  whatsappNumber: '0246488207',
  location: 'Cape Coast, Central Region, Ghana · Serving Nationwide & International Markets',
  officeHours: 'Monday – Saturday: 8:00 AM – 6:00 PM GMT',
  socials: {
    instagram: 'https://instagram.com/daveakmultimedia',
    facebook: 'https://facebook.com/daveakmultimedia',
    linkedin: 'https://linkedin.com/company/daveakmultimedia',
    youtube: 'https://youtube.com/@daveakmultimedia',
  },
  heroImages: [
    '/src/assets/images/hero_cinematic_production_1795142170945.jpg',
    '/src/assets/images/portfolio_corporate_summit_1795142171141.jpg',
    '/src/assets/images/portfolio_ngo_documentary_1795142171892.jpg',
    '/src/assets/images/portfolio_wedding_cinematography_1795142171823.jpg',
    '/src/assets/images/portfolio_brand_commercial_1795142172634.jpg',
  ],
};

export const initialProjects: Project[] = [
  {
    id: 'project-ngo-ghana-impact',
    title: 'Youth In Action: Renewable Agriculture Initiative',
    client: 'Global Reach & West African Development Fund',
    category: 'documentaries',
    categoryLabel: 'Documentary & Institutional',
    services: ['Documentary Production', 'Field Photojournalism', 'Impact Storytelling'],
    date: '2026-03-12',
    year: '2026',
    location: 'Northern & Eastern Regions, Ghana',
    featured: true,
    published: true,
    thumbnail: '/src/assets/images/portfolio_ngo_documentary_1795142171892.jpg',
    gallery: [
      '/src/assets/images/portfolio_ngo_documentary_1795142171892.jpg',
      '/src/assets/images/hero_cinematic_production_1795142170945.jpg',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    summary:
      'A multi-region documentary chronicling youth-driven micro-irrigation and solar engineering in Ghana, formatted for international donor summits and global broadcast.',
    challenge:
      'Documenting remote agricultural pilot communities across challenging rural terrain with minimal setup time while preserving authentic participant voices and broadcast-standard technical precision.',
    solution:
      'Deploying a lightweight cinema rig, dual-channel wireless lavaliers with ambient shotgun mics, and natural-light color science to produce both a 15-minute festival cut and twelve short-form social reels.',
    impact:
      'Directly contributed to securing a $1.2M phase-two donor expansion following presentations at the Geneva Sustainable Development forum.',
    metrics: [
      { label: 'Donor Fund Secured', value: '$1.2M' },
      { label: 'Districts Documented', value: '6 Regions' },
      { label: 'Turnaround to Festival Cut', value: '14 Days' },
    ],
  },
  {
    id: 'project-accra-corporate-summit',
    title: 'Accra Corporate Summit: Africa’s Strategic Future',
    client: 'Pan-African Leadership Forum',
    category: 'corporate',
    categoryLabel: 'Corporate Media & Livestream',
    services: ['Multi-Camera Livestream', 'Executive Portraits', 'Conference Documentation'],
    date: '2026-02-18',
    year: '2026',
    location: 'Kempinski Hotel Gold Coast City, Accra',
    featured: true,
    published: true,
    thumbnail: '/src/assets/images/portfolio_corporate_summit_1795142171141.jpg',
    gallery: [
      '/src/assets/images/portfolio_corporate_summit_1795142171141.jpg',
      '/src/assets/images/hero_cinematic_production_1795142170945.jpg',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    summary:
      'Three-day flagship executive summit with 1,200 in-person dignitaries and 24,000 global streaming delegates. Full live broadcast, instantaneous press image dissemination, and keynote reels.',
    challenge:
      'Zero latency tolerance, strict VIP protocol clearance, and simultaneous same-day media pack releases for national and international press outlets.',
    solution:
      'A 5-camera optical fiber livestream switcher, dedicated on-site color technician, and tethered photo delivery suite with press release photos available within 20 minutes of each keynote.',
    impact:
      'Zero downtime across 28 broadcast hours, over 400 high-res executive headshots delivered on-site, and top-tier African press coverage.',
    metrics: [
      { label: 'Global Live Viewers', value: '24,000+' },
      { label: 'Keynote Press Latency', value: '<20 Mins' },
      { label: 'Broadcast Uptime', value: '100%' },
    ],
  },
  {
    id: 'project-royal-golden-wedding',
    title: 'The Royal Kente Symphony: Nana & Abena',
    client: 'Private Celebration',
    category: 'weddings',
    categoryLabel: 'Luxury Wedding Cinematography',
    services: ['Wedding Cinematography', 'Editorial Photography', 'Drone Coverage'],
    date: '2026-01-24',
    year: '2026',
    location: 'Labadi Beach & Peduase Valley, Ghana',
    featured: true,
    published: true,
    thumbnail: '/src/assets/images/portfolio_wedding_cinematography_1795142171823.jpg',
    gallery: [
      '/src/assets/images/portfolio_wedding_cinematography_1795142171823.jpg',
      '/src/assets/images/hero_cinematic_production_1795142170945.jpg',
    ],
    summary:
      'A breathtaking union celebrating Akan heritage, bespoke royal kente craftsmanship, and a 600-guest candlelit evening gala captured with editorial precision.',
    challenge:
      'Preserving the richness of gold embroidery and warm candlelit ambiences under extreme contrast and dynamic crowd movements without harsh artificial strobes.',
    solution:
      'Dual full-frame cinema cameras equipped with high-speed prime lenses (f/1.2 and f/1.4), subtle atmospheric fill lighting, and an aerial drone sequence during golden hour.',
    impact:
      'A 12-minute cinematic feature film and a curated 900-photo archival leather album delivered ahead of schedule.',
    metrics: [
      { label: 'Curated Frames', value: '900+' },
      { label: 'Feature Film Cut', value: '4K HDR' },
      { label: 'Delivery Time', value: '10 Days' },
    ],
  },
  {
    id: 'project-apex-commercial-branding',
    title: 'Elevated Identity: Studio Commercial & Digital Campaign',
    client: 'Apex Lifestyle & Fashion Group',
    category: 'commercial',
    categoryLabel: 'Commercial & Brand Storytelling',
    services: ['Commercial Advertisements', 'Brand Storytelling', 'Product Photography'],
    date: '2025-11-20',
    year: '2025',
    location: 'DAVEAK Studio, Accra',
    featured: true,
    published: true,
    thumbnail: '/src/assets/images/portfolio_brand_commercial_1795142172634.jpg',
    gallery: [
      '/src/assets/images/portfolio_brand_commercial_1795142172634.jpg',
      '/src/assets/images/hero_cinematic_production_1795142170945.jpg',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    summary:
      'A high-fashion commercial campaign crafted for pan-African digital billboards, social platforms, and television broadcast.',
    challenge:
      'Conveying premium minimalism and modern African luxury across multiple format ratios (16:9 broadcast, 9:16 mobile reels, and ultra-wide OOH billboards).',
    solution:
      'Open-gate 6K anamorphic capture paired with calibrated DaVinci Resolve color grading to produce unified visuals tailored to every platform format.',
    impact:
      'Over 2.8 million impressions across West Africa and a 34% increase in online campaign conversions in Q4.',
    metrics: [
      { label: 'Campaign Impressions', value: '2.8M+' },
      { label: 'Conversion Lift', value: '+34%' },
      { label: 'Asset Variations', value: '28 Cuts' },
    ],
  },
  {
    id: 'project-national-architectural-survey',
    title: 'Forts, Horizons & Sacred Spaces: Ghana Heritage Survey',
    client: 'Heritage Arts & Tourism Board',
    category: 'institutional',
    categoryLabel: 'Institutional Archival Documentation',
    services: ['Drone Production', 'Architectural Photography', 'Archival Documentation'],
    date: '2025-09-30',
    year: '2025',
    location: 'Cape Coast, Elmina, & Volta Region, Ghana',
    featured: false,
    published: true,
    thumbnail: '/src/assets/images/hero_cinematic_production_1795142170945.jpg',
    gallery: [
      '/src/assets/images/hero_cinematic_production_1795142170945.jpg',
      '/src/assets/images/portfolio_corporate_summit_1795142171141.jpg',
    ],
    summary:
      'Archival 4K aerial mapping and photographic documentation of coastal forts, historic sanctuaries, and emerging eco-infrastructure for national archives.',
    metrics: [
      { label: 'Historic Sites', value: '14 Locations' },
      { label: 'Archival Photos', value: '1,500+' },
    ],
  },
];

export const initialServiceCategories: ServiceCategory[] = [
  {
    id: 'photography',
    title: 'Photography',
    tagline: 'Timeless imagery that captures personality, gravitas, and decisive moments.',
    iconName: 'Camera',
    services: [
      { id: 'p1', title: 'Corporate Photography', description: 'Executive headshots, board meetings, team profiles, and workplace documentation.' },
      { id: 'p2', title: 'Event Photography', description: 'Comprehensive live coverage for conferences, summits, galas, and cultural milestones.' },
      { id: 'p3', title: 'Professional Portraits', description: 'Studio and on-location editorial portraits tailored for personal branding and press kits.' },
      { id: 'p4', title: 'Graduation Photography', description: 'Distinguished university convocation sessions and family commemorative portraits.' },
      { id: 'p5', title: 'Wedding Photography', description: 'Luxury traditional marriage and white wedding documentation with editorial elegance.' },
      { id: 'p6', title: 'Product Photography', description: 'Crisp, commercial e-commerce, packshot, and catalogue photography with studio lighting.' },
    ],
    deliverables: ['High-resolution print-ready files', 'Web-optimised digital gallery', 'Same-day sneak peek selection', 'Full commercial licensing'],
    typicalTurnaround: '48 to 72 hours for initial selections; 5–7 days for full final retouched album',
  },
  {
    id: 'videography',
    title: 'Videography and Film',
    tagline: 'Cinematic storytelling with broadcast-grade camera packages and sound design.',
    iconName: 'Video',
    services: [
      { id: 'v1', title: 'Corporate Video Production', description: 'High-impact brand overview films, investor reels, and executive messages.' },
      { id: 'v2', title: 'Documentary Production', description: 'In-depth long-form and short-form storytelling for NGOs, institutions, and cultural archives.' },
      { id: 'v3', title: 'Promotional Videos', description: 'Dynamic, conversion-oriented video campaigns for product releases and marketing initiatives.' },
      { id: 'v4', title: 'Commercial Advertisements', description: 'Scripted TV commercials and digital video ads crafted to captivate audiences.' },
      { id: 'v5', title: 'Event Videography', description: 'Multi-angle event highlights, full recordings, and recap films with motion graphics.' },
      { id: 'v6', title: 'Brand Storytelling', description: 'Human-centered narratives that forge genuine emotional connections with consumers.' },
      { id: 'v7', title: 'Interviews & Testimonials', description: 'Studio-lit sit-down interviews, client success stories, and leadership spotlights.' },
    ],
    deliverables: ['4K UHD Master files', 'Vertical 9:16 cuts for reels/TikTok', 'Clean & subtitled delivery', 'Audio stem masters'],
    typicalTurnaround: '7 to 14 business days; expedited rush cuts available upon request',
  },
  {
    id: 'corporate-media',
    title: 'Corporate and Institutional Media',
    tagline: 'Strategic media documentation adhering to strict governance and protocol standards.',
    iconName: 'Building2',
    services: [
      { id: 'c1', title: 'Conference Documentation', description: 'Full plenary session recordings, concurrent workshop coverage, and VIP coordination.' },
      { id: 'c2', title: 'Institutional Event Coverage', description: 'Annual general meetings, diplomatic receptions, and national stakeholder engagements.' },
      { id: 'c3', title: 'NGO Project Documentation', description: 'Ground-level field missions capturing grassroots impact, beneficiary stories, and donor metrics.' },
      { id: 'c4', title: 'Impact Storytelling', description: 'Structured narrative media demonstrating grant outcomes and community transformation.' },
      { id: 'c5', title: 'Annual Report Photography & Video', description: 'Bespoke imagery tailored for print publications, digital disclosures, and investor decks.' },
      { id: 'c6', title: 'Training & Workshop Documentation', description: 'Internal capacity building, staff onboarding footage, and educational modules.' },
    ],
    deliverables: ['Executive briefing recaps', 'Print-grade archival imagery', 'Expedited press-ready photo packs', 'Dedicated cloud repository'],
    typicalTurnaround: 'Same-day press delivery; full institutional repository within 5 business days',
  },
  {
    id: 'branding',
    title: 'Branding and Design',
    tagline: 'Distinctive visual identities and marketing collateral built for lasting market recognition.',
    iconName: 'Palette',
    services: [
      { id: 'b1', title: 'Logo Design', description: 'Original, memorable brand marks designed for versatility across physical and digital applications.' },
      { id: 'b2', title: 'Visual Identity Systems', description: 'Comprehensive typography scales, color palettes, iconography, and usage guidelines.' },
      { id: 'b3', title: 'Corporate Branding', description: 'Stationery, office environmental graphics, vehicle livery, and brand style guides.' },
      { id: 'b4', title: 'Graphic Design', description: 'Brochures, annual report layouts, executive presentation decks, and event collateral.' },
      { id: 'b5', title: 'Marketing Materials', description: 'Billboards, flyers, roll-up banners, merchandise design, and promotional print assets.' },
    ],
    deliverables: ['Vector source files (AI, EPS, SVG)', 'Brand Guideline PDF', 'Print-ready prepress files', 'Digital social assets'],
    typicalTurnaround: '10 to 21 business days with collaborative revision milestones',
  },
  {
    id: 'digital-content',
    title: 'Digital Content',
    tagline: 'High-frequency, high-engagement creative media engineered for modern feeds.',
    iconName: 'Smartphone',
    services: [
      { id: 'd1', title: 'Social Media Content', description: 'Curated monthly content batches designed to elevate presence across Instagram, LinkedIn, and TikTok.' },
      { id: 'd2', title: 'Promotional Campaigns', description: 'Targeted multi-format digital asset packs for seasonal launches and conversions.' },
      { id: 'd3', title: 'Short-Form Video Production', description: 'Hook-driven vertical video reels, trends adaptations, and informative micro-explainers.' },
      { id: 'd4', title: 'Behind-The-Scenes Content', description: 'Authentic backstage glimpses and creator process footage that deepen audience trust.' },
    ],
    deliverables: ['Batch-rendered 9:16 vertical videos', 'Carousel graphic suites', 'Caption & hashtag briefs', 'Content calendar templates'],
    typicalTurnaround: 'Weekly or monthly retainer schedules with rapid 48-hour turnarounds',
  },
  {
    id: 'livestreaming',
    title: 'Livestreaming and Event Media',
    tagline: 'Broadcast-tier live transmission with redundant connectivity and multi-camera switching.',
    iconName: 'Radio',
    services: [
      { id: 'l1', title: 'Professional Livestreaming', description: 'Simultaneous multi-destination broadcasts to YouTube, Facebook, LinkedIn, and private secure portals.' },
      { id: 'l2', title: 'Church Livestreaming', description: 'Sunday worship broadcasts, mid-week services, and international conventions with crystal-clear acoustics.' },
      { id: 'l3', title: 'Multi-Camera Event Production', description: 'Live switching across up to 8 cinema feeds, wireless roaming cameras, and instant replay.' },
      { id: 'l4', title: 'Hybrid Event Coverage', description: 'Seamless two-way integration linking physical ballrooms with remote global Zoom/Teams participants.' },
    ],
    deliverables: ['Full uncompressed 1080p/4K master recording', 'Live audio mix masters', 'Instant keynote clips', 'Broadcast telemetry reports'],
    typicalTurnaround: 'Master archive delivered immediately on-site; highlight reels within 48 hours',
  },
  {
    id: 'additional',
    title: 'Additional Services',
    tagline: 'Specialized capabilities that elevate productions to international benchmark standards.',
    iconName: 'Sparkles',
    services: [
      { id: 'a1', title: 'Drone Production', description: 'Certified commercial aerial cinematography capturing dramatic landscapes and infrastructure.' },
      { id: 'a2', title: 'Creative Direction', description: 'Concept development, moodboarding, location scouting, casting, and on-set art direction.' },
      { id: 'a3', title: 'Media Consultancy', description: 'Strategic advisory for organizations seeking to establish or modernize in-house media operations.' },
    ],
    deliverables: ['Raw & graded aerial footage', 'Comprehensive creative treatment decks', 'Strategic roadmap reports'],
    typicalTurnaround: 'Tailored to project milestones',
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Kwesi Mensah',
    role: 'Director of External Relations',
    organisation: 'West African Sustainable Energy Consortium',
    quote:
      'DAVEAK-MULTIMEDIA executed our 3-day regional summit with unmatched precision. Their ability to deliver television-grade livestreaming alongside same-day press photos allowed our communications team to lead news cycles across Ghana and Nigeria.',
    projectType: 'Institutional Conference Documentation & Broadcast',
  },
  {
    id: 'test-2',
    name: 'Grace Osei-Bonsu',
    role: 'Head of Brand & Communications',
    organisation: 'Apex Retail & Lifestyle Group',
    quote:
      'From creative direction to the final color grade, the DAVEAK team worked with incredible speed without sacrificing a single detail of our visual standard. Our Q4 campaign impressions exceeded projections by over 30%.',
    projectType: 'Commercial Video & Product Photography',
  },
  {
    id: 'test-3',
    name: 'Rev. Emmanuel Darko',
    role: 'Senior Pastor',
    organisation: 'Grace Chapel International',
    quote:
      'The multi-camera broadcast upgrade transformed our global church stream. DAVEAK-MULTIMEDIA brought technical excellence and spiritual reverence to our annual convention, reaching thousands across Europe and the Americas seamlessly.',
    projectType: 'Church Livestreaming & Convention Media',
  },
  {
    id: 'test-4',
    name: 'Nana Yaw & Dr. Abena Ofori',
    role: 'Couple',
    organisation: 'Accra',
    quote:
      'Looking through our wedding film brought back every emotion. They captured our traditional Akan kente ceremony and our reception with breathtaking cinematic beauty. Truly unforgettable work.',
    projectType: 'Luxury Wedding Cinematography',
  },
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-101',
    fullName: 'Kofi Asare Boateng',
    organisation: 'Ghana Trade & Innovation Council',
    email: 'k.asare@gtic-gov.org',
    phone: '+233 24 555 0192',
    serviceRequired: 'Corporate and Institutional Media',
    secondaryServices: ['Livestreaming and Event Media', 'Drone Production'],
    projectDescription:
      'Documentation and live broadcast for the upcoming Africa-Europe Trade Summit holding in Accra. Anticipating 450 delegates and high-level ministerial addresses.',
    projectDate: '2026-08-15',
    location: 'Accra International Conference Centre (AICC)',
    budgetRange: 'GHS 45,000 - 70,000',
    urgency: 'priority',
    status: 'new',
    adminNotes: 'High priority corporate lead. Requested preliminary technical rider by Friday.',
    createdAt: '2026-11-18T14:22:00.000Z',
  },
  {
    id: 'enq-102',
    fullName: 'Akua Sarpong',
    organisation: 'Heritage Botanical Care',
    email: 'akua@heritagebotanicals.com',
    phone: '+233 50 234 5678',
    serviceRequired: 'Photography',
    secondaryServices: ['Videography and Film', 'Digital Content'],
    projectDescription:
      'New product line launch of organic shea skin serums. Need high-end packaging studio photography, model beauty portraits, and 6 short TikTok/Reels commercials.',
    projectDate: '2026-06-10',
    location: 'DAVEAK Studio, Accra',
    budgetRange: 'GHS 15,000 - 25,000',
    urgency: 'standard',
    status: 'proposal_sent',
    adminNotes: 'Sent tiered studio packages (Starter vs Signature). Follow up on Monday.',
    createdAt: '2026-11-15T09:10:00.000Z',
  },
];
