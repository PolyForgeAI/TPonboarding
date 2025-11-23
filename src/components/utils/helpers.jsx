// Validators
export const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
export const validatePhone = (p) => p.replace(/\D/g, '').length >= 10;
export const validateRequired = (v) => v?.toString().trim().length > 0;
export const validateZip = (z) => /^\d{5}(-\d{4})?$/.test(z);
export const validateUrl = (u) => { try { new URL(u); return true; } catch { return false; } };

// Formatters
export const formatCurrency = (a, c = 'USD') => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: c }).format(a);

export const formatDate = (d, f = 'short') => {
  const formats = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' }
  };
  return new Intl.DateFormat('en-US', formats[f] || formats.short).format(new Date(d));
};

export const formatPhone = (p) => {
  const c = p.replace(/\D/g, '');
  const m = c.match(/^(\d{3})(\d{3})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : p;
};

export const truncate = (t, l = 100) => t.length > l ? t.substring(0, l) + '...' : t;
export const capitalize = (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();

// API helpers
import { base44 } from "@/api/base44Client";

export const fetchSubmission = (q) => 
  base44.entities.OnboardingSubmission.filter(q).then(s => s?.[0]);

export const updateSubmission = (id, d) => 
  base44.entities.OnboardingSubmission.update(id, d);

export const fetchMaterials = (cat) => 
  base44.entities.Material.filter({ category: cat, is_active: true }, 'sort_order', 50);

export const uploadFile = (f) => 
  base44.integrations.Core.UploadFile({ file: f });

export const generateImage = (p) => 
  base44.integrations.Core.GenerateImage({ prompt: p });

export const invokeLLM = (p, opts = {}) => 
  base44.integrations.Core.InvokeLLM({ prompt: p, ...opts });

export const sendEmail = (to, subj, body) => 
  base44.integrations.Core.SendEmail({ to, subject: subj, body });