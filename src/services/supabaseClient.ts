import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://pcledpgnqxgcjfesoqyw.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbGVkcGducXhnY2pmZXNvcXl3Iiwicm9sZSI6InBjbGVkcGducXhnY2pmZXNvcXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMzE0MzQsImV4cCI6MjExMDcwNzQzNH0.ThEeABdmRmwlYLWA74yThla7SOC8MGJAamwr37XrrN4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
