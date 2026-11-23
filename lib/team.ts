export const TEAM_PHOTO_SRC = '/team/brandon-thompson.jpg';

export type ResumeRole = { title: string; org: string; bullets: string[] };

export const resume = {
  name: 'Brandon Thompson',
  headline: 'Founder, AI Solutions Specialist & Tattoo Artist',
  location: 'Canton, Ohio',
  phone: '234-804-8731',
  emails: ['whysoaillc@gmail.com', 'whysoai-llc@outlook.com'],
  summary:
    'Visionary entrepreneur and Founder of Why So AI LLC, bringing extensive hands-on experience in generative AI model training, dataset curation, and continuous model evaluation across platforms like GitHub. Combines strong technical capabilities in AI workflows, automation, and electronic engineering with proven leadership in business operations. Adept at leveraging emerging AI technologies and developer tools to architect scalable, real-world AI solutions and software integrations.',
  competencies: [
    {
      group: 'AI Development & Training',
      items: ['Generative AI Model Training', 'RLHF & Prompt Engineering', 'GitHub Repository & Code Management', 'AI Workflow Automation', 'Predictive Analytics', 'Custom AI Software Integration', 'Python', 'JavaScript', 'TypeScript'],
    },
    { group: 'Electronics & Engineering', items: ['Electronic Engineering Fundamentals', 'Circuit Design & Analysis'] },
    { group: 'Business & Leadership', items: ['Entrepreneurship', 'AI Strategy Consulting', 'Brand Building', 'Client Relations', 'Multitasking'] },
    { group: 'Creative & Technical', items: ['Tattoo Design & Application', 'Studio Management', 'Digital Music Production'] },
  ],
  experience: [
    {
      title: 'Founder & AI Solutions Lead',
      org: 'Why So AI LLC',
      bullets: [
        'Founded and lead an emerging AI development company specializing in custom AI workflows, automation tools, and strategic AI integrations for businesses.',
        'Oversee core product vision, system architecture, and technical execution across software and AI projects.',
      ],
    },
    {
      title: 'Generative AI Training Specialist & Developer',
      org: 'Freelance / GitHub & Independent AI Projects',
      bullets: [
        'Completed extensive AI model training, fine-tuning, and evaluation focusing on LLM performance, response accuracy, and prompt optimization.',
        'Managed and deployed AI scripts, automation tools, and code repositories using GitHub for version control and collaborative development.',
        'Engineered automated workflows and integration pipelines using Python, JavaScript, and TypeScript.',
      ],
    },
    {
      title: 'Tattoo Artist & Business Owner',
      org: 'Why So Inky LLC (4 Years)',
      bullets: [
        'Oversee all studio operations, client consultations, custom artwork design, and execution.',
        'Direct brand strategy, appointment scheduling, and digital marketing to consistently expand client acquisition.',
      ],
    },
    {
      title: 'Customer Service Representative & Crew Member',
      org: "Wendy's (3 Years)",
      bullets: ['Managed high-volume customer transactions, operated POS systems, and maintained quality standards under fast-paced conditions.'],
    },
    {
      title: 'Customer Service Representative & Sales Associate',
      org: 'Various Retail & Service Leaders (BP, Circle K, Dollar Tree, Little Caesars)',
      bullets: [
        'Delivered top-tier customer service, managed register drawers, and drove store inventory management.',
        'Applied strong interpersonal communication to resolve high-friction client concerns.',
      ],
    },
  ] satisfies ResumeRole[],
  education: [
    'Degree Program (In Progress) — South University',
    'Coursework in Electronic Engineering Technology (1 Year) — Kent State University',
    'Career Technical Training — R.G. Drage Career Technical Center',
    'High School Diploma',
  ],
};
