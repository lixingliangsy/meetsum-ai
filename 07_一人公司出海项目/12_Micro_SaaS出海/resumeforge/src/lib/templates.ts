export interface ResumeTemplate {
  id: string
  name: string
  category: 'professional' | 'creative' | 'minimal'
  description: string
  thumbnail: string
  styles: {
    font: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    layout: 'single' | 'two-column'
  }
}

export const resumeTemplates: ResumeTemplate[] = [
  // Professional Templates
  {
    id: 'classic-pro',
    name: 'Classic Professional',
    category: 'professional',
    description: 'Timeless design trusted by Fortune 500 companies',
    thumbnail: '/templates/classic-pro.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#1a1a2e',
      secondaryColor: '#16213e',
      accentColor: '#0f3460',
      layout: 'single'
    }
  },
  {
    id: 'modern-executive',
    name: 'Modern Executive',
    category: 'professional',
    description: 'Clean layout for senior professionals',
    thumbnail: '/templates/modern-executive.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#1f2937',
      secondaryColor: '#374151',
      accentColor: '#3b82f6',
      layout: 'single'
    }
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'professional',
    description: 'Professional blue theme for business roles',
    thumbnail: '/templates/corporate-blue.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#1e3a5f',
      secondaryColor: '#2c5282',
      accentColor: '#3182ce',
      layout: 'single'
    }
  },
  {
    id: 'minimal-pro',
    name: 'Minimal Professional',
    category: 'professional',
    description: 'Clean and minimal for maximum readability',
    thumbnail: '/templates/minimal-pro.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#111827',
      secondaryColor: '#374151',
      accentColor: '#6b7280',
      layout: 'single'
    }
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    category: 'professional',
    description: 'Traditional serif fonts for conservative industries',
    thumbnail: '/templates/elegant-serif.jpg',
    styles: {
      font: 'Georgia, serif',
      primaryColor: '#1a1a1a',
      secondaryColor: '#4a4a4a',
      accentColor: '#8b4513',
      layout: 'single'
    }
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead',
    category: 'professional',
    description: 'Optimized for tech industry professionals',
    thumbnail: '/templates/tech-lead.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#0f172a',
      secondaryColor: '#1e293b',
      accentColor: '#10b981',
      layout: 'single'
    }
  },
  {
    id: 'finance-pro',
    name: 'Finance Pro',
    category: 'professional',
    description: 'Trusted by banking and finance professionals',
    thumbnail: '/templates/finance-pro.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#064e3b',
      secondaryColor: '#065f46',
      accentColor: '#059669',
      layout: 'single'
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    category: 'professional',
    description: 'Designed for medical and healthcare professionals',
    thumbnail: '/templates/healthcare.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      layout: 'single'
    }
  },
  // Creative Templates
  {
    id: 'creative-burst',
    name: 'Creative Burst',
    category: 'creative',
    description: 'Bold colors for creative industries',
    thumbnail: '/templates/creative-burst.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#7c3aed',
      secondaryColor: '#8b5cf6',
      accentColor: '#a78bfa',
      layout: 'two-column'
    }
  },
  {
    id: 'designer-portfolio',
    name: 'Designer Portfolio',
    category: 'creative',
    description: 'Showcase your creative work beautifully',
    thumbnail: '/templates/designer-portfolio.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#be185d',
      secondaryColor: '#db2777',
      accentColor: '#f472b6',
      layout: 'two-column'
    }
  },
  {
    id: 'artistic-flow',
    name: 'Artistic Flow',
    category: 'creative',
    description: 'Fluid design for artists and designers',
    thumbnail: '/templates/artistic-flow.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#c2410c',
      secondaryColor: '#ea580c',
      accentColor: '#fb923c',
      layout: 'two-column'
    }
  },
  {
    id: 'startup-vibe',
    name: 'Startup Vibe',
    category: 'creative',
    description: 'Modern gradient design for startup enthusiasts',
    thumbnail: '/templates/startup-vibe.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#0891b2',
      secondaryColor: '#06b6d4',
      accentColor: '#67e8f9',
      layout: 'single'
    }
  },
  {
    id: 'bold-impact',
    name: 'Bold Impact',
    category: 'creative',
    description: 'Make a statement with bold typography',
    thumbnail: '/templates/bold-impact.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      accentColor: '#f87171',
      layout: 'single'
    }
  },
  // Minimal Templates
  {
    id: 'ultra-minimal',
    name: 'Ultra Minimal',
    category: 'minimal',
    description: 'Maximum whitespace, maximum impact',
    thumbnail: '/templates/ultra-minimal.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#000000',
      secondaryColor: '#333333',
      accentColor: '#666666',
      layout: 'single'
    }
  },
  {
    id: 'swiss-style',
    name: 'Swiss Style',
    category: 'minimal',
    description: 'Clean grid-based Swiss design',
    thumbnail: '/templates/swiss-style.jpg',
    styles: {
      font: 'Helvetica, Arial, sans-serif',
      primaryColor: '#1a1a1a',
      secondaryColor: '#4a4a4a',
      accentColor: '#e63946',
      layout: 'single'
    }
  },
  {
    id: 'mono-chrome',
    name: 'Monochrome',
    category: 'minimal',
    description: 'Elegant black and white design',
    thumbnail: '/templates/mono-chrome.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#000000',
      secondaryColor: '#404040',
      accentColor: '#808080',
      layout: 'single'
    }
  },
  {
    id: 'airy-light',
    name: 'Airy Light',
    category: 'minimal',
    description: 'Light and breathable layout',
    thumbnail: '/templates/airy-light.jpg',
    styles: {
      font: 'Inter, sans-serif',
      primaryColor: '#374151',
      secondaryColor: '#6b7280',
      accentColor: '#9ca3af',
      layout: 'single'
    }
  },
  {
    id: 'typography-focus',
    name: 'Typography Focus',
    category: 'minimal',
    description: 'Let your words speak for themselves',
    thumbnail: '/templates/typography-focus.jpg',
    styles: {
      font: 'Playfair Display, serif',
      primaryColor: '#1c1917',
      secondaryColor: '#44403c',
      accentColor: '#78716c',
      layout: 'single'
    }
  }
]

export const getTemplatesByCategory = (category: ResumeTemplate['category']) => {
  return resumeTemplates.filter(t => t.category === category)
}

export const getTemplateById = (id: string) => {
  return resumeTemplates.find(t => t.id === id)
}

export const categories = [
  { id: 'professional', name: 'Professional', count: resumeTemplates.filter(t => t.category === 'professional').length },
  { id: 'creative', name: 'Creative', count: resumeTemplates.filter(t => t.category === 'creative').length },
  { id: 'minimal', name: 'Minimal', count: resumeTemplates.filter(t => t.category === 'minimal').length }
]

// ATS Keywords for different industries
export const atsKeywords: Record<string, string[]> = {
  'software-engineering': [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
    'CI/CD', 'Agile', 'Scrum', 'Git', 'REST API', 'GraphQL', 'MongoDB', 'PostgreSQL'
  ],
  'data-science': [
    'Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Pandas', 'NumPy', 'Scikit-learn', 'Data Visualization', 'Statistics', 'Big Data'
  ],
  'marketing': [
    'SEO', 'SEM', 'Google Analytics', 'Social Media', 'Content Marketing', 'Email Marketing',
    'Brand Management', 'Market Research', 'Campaign Management', 'ROI Analysis'
  ],
  'finance': [
    'Financial Analysis', 'Excel', 'Bloomberg', 'Risk Management', 'Investment Banking',
    'Portfolio Management', 'CFA', 'CPA', 'Financial Modeling', 'Valuation'
  ],
  'healthcare': [
    'Patient Care', 'Electronic Health Records', 'HIPAA', 'Clinical Research',
    'Medical Terminology', 'Healthcare Administration', 'Quality Assurance'
  ],
  'general': [
    'Leadership', 'Communication', 'Project Management', 'Problem Solving', 'Teamwork',
    'Time Management', 'Microsoft Office', 'Strategic Planning', 'Analysis'
  ]
}

// Resume sections structure
export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedIn?: string
    website?: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    achievements: string[]
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
  }>
  skills: string[]
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
  }>
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
}
