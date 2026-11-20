import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Ensure data and uploads directory exist
const dataDir = path.resolve(__dirname, 'data');
const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage for media uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    cb(null, `${Date.now()}_${safeName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are supported.'));
    }
  },
});

// JSON and form body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploads and src assets
app.use('/uploads', express.static(uploadsDir));
app.use('/src/assets', express.static(path.resolve(__dirname, 'src/assets')));

// Database file persistence
const dbPath = path.join(dataDir, 'db.json');

function readDb() {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return null;
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

// Initialize seed data in db if empty
const existingDb = readDb();
if (!existingDb) {
  const seedDb = {
    settings: {
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
    },
    enquiries: [],
    projects: [],
  };
  writeDb(seedDb);
}

// --- API ROUTES ---

// Health & Status
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', agency: 'DAVEAK-MULTIMEDIA', timestamp: new Date().toISOString() });
});

// Media upload endpoint
app.post('/api/upload', upload.single('media'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No media file uploaded.' });
    return;
  }
  const publicUrl = `/uploads/${req.file.filename}`;
  res.json({ url: publicUrl, filename: req.file.filename, size: req.file.size });
});

// Enquiries
app.get('/api/enquiries', (_req: Request, res: Response) => {
  const db = readDb() || { enquiries: [] };
  res.json(db.enquiries || []);
});

app.post('/api/enquiries', (req: Request, res: Response) => {
  const { fullName, email, phone, serviceRequired, projectDescription, projectDate, location, organisation, budgetRange, urgency } = req.body;

  // Validation
  if (!fullName || !email || !phone || !serviceRequired || !projectDescription) {
    res.status(400).json({ error: 'Required fields missing.' });
    return;
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address provided.' });
    return;
  }

  const db = readDb() || { enquiries: [] };
  const newEnquiry = {
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    fullName,
    organisation: organisation || '',
    email,
    phone,
    serviceRequired,
    projectDescription,
    projectDate: projectDate || '',
    location: location || 'Accra, Ghana',
    budgetRange: budgetRange || '',
    urgency: urgency || 'standard',
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  db.enquiries = [newEnquiry, ...(db.enquiries || [])];
  writeDb(db);

  // Simulated email dispatch to business inbox
  console.log(`[EMAIL NOTIFICATION] New enquiry from ${fullName} (${organisation || 'Individual'}) <${email}> regarding "${serviceRequired}".`);

  res.status(201).json({
    success: true,
    message: 'Thank you. Your project enquiry has been submitted. Our production team will contact you within 24 hours.',
    enquiry: newEnquiry,
  });
});

app.patch('/api/enquiries/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const db = readDb() || { enquiries: [] };
  const enquiries = db.enquiries || [];
  const index = enquiries.findIndex((e: any) => e.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Enquiry not found.' });
    return;
  }

  enquiries[index].status = status || enquiries[index].status;
  if (adminNotes !== undefined) {
    enquiries[index].adminNotes = adminNotes;
  }
  db.enquiries = enquiries;
  writeDb(db);

  res.json(enquiries[index]);
});

app.delete('/api/enquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb() || { enquiries: [] };
  db.enquiries = (db.enquiries || []).filter((e: any) => e.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// Projects
app.get('/api/projects', (_req: Request, res: Response) => {
  const db = readDb() || {};
  res.json(db.projects && db.projects.length > 0 ? db.projects : []);
});

app.post('/api/projects', (req: Request, res: Response) => {
  const db = readDb() || { projects: [] };
  const newProject = {
    ...req.body,
    id: req.body.id || `proj-${Date.now()}`,
  };
  db.projects = [newProject, ...(db.projects || [])];
  writeDb(db);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb() || { projects: [] };
  const projects = db.projects || [];
  const index = projects.findIndex((p: any) => p.id === id);

  if (index === -1) {
    projects.push({ ...req.body, id });
  } else {
    projects[index] = { ...req.body, id };
  }
  db.projects = projects;
  writeDb(db);
  res.json(req.body);
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb() || { projects: [] };
  db.projects = (db.projects || []).filter((p: any) => p.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// Settings
app.get('/api/settings', (_req: Request, res: Response) => {
  const db = readDb() || {};
  res.json(db.settings || {});
});

app.put('/api/settings', (req: Request, res: Response) => {
  const db = readDb() || {};
  db.settings = { ...db.settings, ...req.body };
  writeDb(db);
  res.json(db.settings);
});

// Dynamic Sitemap XML
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || 'https://daveakmultimedia.com';
  const urls = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/corporate',
    '/brands',
    '/churches',
    '/personal',
    '/quote',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${u === '' ? '1.0' : u === '/quote' || u === '/services' ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Dynamic Robots.txt
app.get('/robots.txt', (_req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || 'https://daveakmultimedia.com';
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`);
});

// Production static serving or Vite middleware integration
async function setupServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DAVEAK-MULTIMEDIA Server running on port ${PORT} (Prod: ${isProd})`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
});
