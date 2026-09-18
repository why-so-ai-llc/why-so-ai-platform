export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  outcomes: string[];
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  usesLocalStorage?: boolean;
  externalDemo?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  icon: string;
  content: string[];
};

export const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact', href: '/contact' },
] as const;

export const services: Service[] = [
  {
    slug: 'ai-support',
    name: 'AI Software Support',
    description: 'Managed support, audits, and roadmap guidance for teams already shipping AI features.',
    icon: '🤖',
    outcomes: ['Operational reviews', 'Model integration support', 'Incident triage playbooks'],
  },
  {
    slug: 'automation',
    name: 'Digital Automation',
    description: 'Automate repetitive business workflows with clear ROI and maintainable tooling.',
    icon: '⚙️',
    outcomes: ['Process mapping', 'Automation design', 'Implementation oversight'],
  },
  {
    slug: 'workflows',
    name: 'Workflow Creation',
    description: 'Design AI-assisted workflows for sales, support, operations, and internal knowledge work.',
    icon: '🔄',
    outcomes: ['Workflow discovery', 'Prompt/system design', 'Team enablement'],
  },
  {
    slug: 'integration',
    name: 'Custom AI Integration',
    description: 'Embed AI into your existing products and internal systems without replacing your stack.',
    icon: '🔗',
    outcomes: ['API integration strategy', 'Custom UX flows', 'Deployment planning'],
  },
  {
    slug: 'content-tools',
    name: 'AI Content & Tools',
    description: 'Ship branded templates and lightweight AI utilities that support marketing and operations.',
    icon: '📊',
    outcomes: ['Template libraries', 'Tooling prototypes', 'Content operations support'],
  },
];

export const tools: Tool[] = [
  {
    slug: 'todo',
    name: 'Todo List',
    description: 'A lightweight task tracker stored locally in your browser.',
    icon: '✅',
    category: 'Productivity',
    usesLocalStorage: true,
  },
  {
    slug: 'notes',
    name: 'Notes App',
    description: 'Capture and filter short notes without sending data to a backend.',
    icon: '📝',
    category: 'Productivity',
    usesLocalStorage: true,
  },
  {
    slug: 'bookmarks',
    name: 'Bookmarks Manager',
    description: 'Store, label, and revisit useful links with basic validation.',
    icon: '🔖',
    category: 'Productivity',
    usesLocalStorage: true,
  },
  {
    slug: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Run a simple focus timer in the browser with preset work and break intervals.',
    icon: '⏱️',
    category: 'Focus',
  },
  {
    slug: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Track simple expenses locally and review category totals.',
    icon: '💳',
    category: 'Finance',
    usesLocalStorage: true,
  },
  {
    slug: 'weather',
    name: 'Weather Snapshot',
    description: 'Public API demo using Open-Meteo with graceful error handling.',
    icon: '🌤️',
    category: 'Public API Demo',
    externalDemo: 'https://open-meteo.com/',
  },
  {
    slug: 'calculator',
    name: 'Calculator',
    description: 'Run quick arithmetic in a small browser calculator.',
    icon: '🧮',
    category: 'Utilities',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Generate stronger passwords locally with a browser-first secure random fallback.',
    icon: '🔐',
    category: 'Security',
    usesLocalStorage: true,
  },
  {
    slug: 'joke-generator',
    name: 'Joke Generator',
    description: 'Public API demo using the Official Joke API with timeout and error states.',
    icon: '😄',
    category: 'Public API Demo',
    externalDemo: 'https://official-joke-api.appspot.com/',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-business-automation',
    title: 'The Future of Business Automation',
    excerpt: 'A practical look at where automation helps first and where human review still matters.',
    date: 'Sep 15, 2026',
    category: 'Automation',
    readTime: '5 min read',
    icon: '🤖',
    content: [
      'Automation delivers the most value when teams start with repeatable internal processes and clear approval checkpoints.',
      'Why So AI focuses on workflows that reduce manual overhead without removing the people responsible for customer, finance, or compliance decisions.',
    ],
  },
  {
    slug: 'custom-ai-integration-best-practices',
    title: 'Custom AI Integration Best Practices',
    excerpt: 'How to introduce AI features into existing systems without creating fragile dependencies.',
    date: 'Sep 10, 2026',
    category: 'Integration',
    readTime: '8 min read',
    icon: '🔗',
    content: [
      'Successful AI integrations begin with a narrow workflow, a measurable goal, and a rollback plan.',
      'A production-ready integration should define logging, fallback behavior, and ownership before adding additional prompts or providers.',
    ],
  },
  {
    slug: 'measuring-ai-roi',
    title: 'AI ROI: Measuring Success',
    excerpt: 'Simple measures for evaluating delivery speed, quality, and operating cost after AI adoption.',
    date: 'Sep 5, 2026',
    category: 'Strategy',
    readTime: '6 min read',
    icon: '📊',
    content: [
      'ROI should combine time saved, throughput gained, risk reduced, and the support burden the system creates.',
      'The clearest business cases come from teams that instrument baseline metrics before introducing new AI steps.',
    ],
  },
];

export const featuredToolSlugs = ['todo', 'notes', 'bookmarks'] as const;

export const businessRoutes = [
  '/',
  '/services',
  '/pricing',
  '/case-studies',
  '/blog',
  '/features',
  '/contact',
  '/dashboard',
  '/documentation',
  '/tools',
] as const;

export const serviceRoutes = services.map((service) => `/services/${service.slug}`);
export const toolRoutes = tools.map((tool) => `/${tool.slug}`);
export const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllKnownRoutes() {
  return [...businessRoutes, ...serviceRoutes, ...toolRoutes, ...blogRoutes];
}
