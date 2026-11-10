export interface Project {
  id: string;
  title: string;
  date: string;
  synopsis: string;
  image: string;
  tags: string[];
  featured: boolean;
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  technologies: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: "Work" | "Organization";
  period: string;
  location: string;
  synopsis: string;
  featured: boolean;
  achievements: string[];
  description: string;
  skills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    iconName?: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "Certification" | "Leadership" | "Award";
  description: string;
  credentialUrl?: string;
}

export const PROFILE_DATA = {
  name: "Zhafa",
  fullName: "Muhammad Zhafarul Maahiy",
  title: "Informatics Graduate | Data Science & Software Developer",
  tagline: "Bachelor of Informatics graduate from Andalas University (Cumlaude) with proven expertise in Deep Learning, Voice Cloning, and Full-Stack Software Development.",
  bio: "Bachelor of Informatics graduate from Andalas University (Cumlaude, GPA 3.78/4.00) with a strong passion for Data Science and Artificial Intelligence. Possesses hands-on experience in Deep Learning research, particularly in developing an Indonesian emotional voice cloning model based on the YourTTS (VITS) architecture. In addition to AI research, has professional experience in software development, backend systems, API integration, and database management across government and enterprise projects.",
  location: "Padang, Sumatera Barat, Indonesia",
  phone: "+62 857-6204-5359",
  email: "mzhafarulmaahiy@gmail.com",
  socialLinks: {
    github: "https://github.com/glifordosade",
    linkedin: "https://www.linkedin.com/in/zhafarul-maahiy",
    email: "mailto:mzhafarulmaahiy@gmail.com"
  },
  stats: [
    { label: "GPA (Cumlaude)", value: "3.78" },
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "6+" },
    { label: "Technologies", value: "20+" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "voice-cloning-yourtts",
    title: "Indonesian Emotional Voice Cloning (YourTTS)",
    date: "November 2025 – May 2026",
    synopsis: "Deep learning research developing an Indonesian emotional voice cloning model based on the YourTTS (VITS) architecture with multi-emotion conditioning across 5 emotional states.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "PyTorch", "YourTTS", "VITS", "FastAPI", "Next.js", "Google Colab"],
    featured: true,
    category: "AI & Deep Learning",
    githubUrl: "https://github.com/glifordosade",
    overview: "Undergraduate thesis project developing an end-to-end Indonesian emotional voice cloning model. The system extends the YourTTS architecture (an extension of VITS - Variational Inference with Adversarial Learning for End-to-End Text-to-Speech) to synthesize natural-sounding speech from unseen Indonesian speakers conditioned across five emotional expressions: neutral, happy, disgust, surprise, and disappointment. Includes automated audio preprocessing, FastAPI model serving, and an interactive Next.js web application.",
    challenges: [
      "Preprocessing and organizing raw Indonesian speech datasets with consistent sampling rates, duration filtering, and waveform normalization.",
      "Incorporating emotion conditioning vectors without deteriorating speaker identity and vocal characteristics.",
      "Exposing computationally intensive deep learning models via low-latency API endpoints for interactive web use."
    ],
    solutions: [
      "Engineered automated preprocessing scripts in Python to perform audio segmentation, denoising, and format standardization.",
      "Trained and fine-tuned YourTTS with emotion embeddings using GPU compute in Google Colab.",
      "Built a FastAPI inference backend connected to a responsive Next.js web interface allowing audio upload, text input, and emotion selection."
    ],
    outcomes: [
      "Successfully synthesized high-fidelity speech resembling target speakers across five distinct emotions.",
      "Completed undergraduate thesis at Andalas University with Cumlaude distinction (GPA: 3.78/4.00)."
    ],
    technologies: ["Python", "PyTorch", "YourTTS", "VITS", "FastAPI", "Next.js", "Tailwind CSS", "Google Colab", "Docker"]
  },
  {
    id: "sippak-kepegawaian",
    title: "SIPPAK – Personnel Administration System",
    date: "February 2024 – October 2024",
    synopsis: "Web-based enterprise management system designed to digitize and automate employee administration, promotions, leave processing, and retirement for West Sumatra Provincial Government.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript", "REST API"],
    featured: true,
    category: "Enterprise Systems",
    overview: "SIPPAK (Sistem Informasi Pengelolaan dan Pelayanan Administrasi Kepegawaian) was built under contract for the West Sumatra Provincial Government Secretariat. The application replaces manual paperwork with a centralized digital platform for employee promotion workflows, official leave management, retirement verification, and administrative correspondence.",
    challenges: [
      "Translating complex public sector bureaucratic workflows and administrative criteria into intuitive software modules.",
      "Structuring relational database schemas to handle thousands of historical personnel records, attachments, and confidential documents."
    ],
    solutions: [
      "Designed normalized MySQL database schemas with strict foreign key constraints and audit logging.",
      "Built modular Laravel backend services with robust CRUD operations and automated status transitions.",
      "Created a responsive, modern interface with Tailwind CSS and collaborated closely with government administrative staff."
    ],
    outcomes: [
      "Successfully digitized manual personnel services across the West Sumatra Provincial Government Secretariat.",
      "Substantially reduced processing times for employee leave requests, promotions, and document verification."
    ],
    technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript", "HTML5/CSS3", "Git"]
  },
  {
    id: "monstrack-platform",
    title: "Monstrack Platform & Landing Page",
    date: "July 2025 – August 2025",
    synopsis: "Responsive product landing page and administrative dashboard for Monstrack, built with Laravel, PostgreSQL, Filament admin CMS, and Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["Laravel", "PostgreSQL", "Filament", "Tailwind CSS", "PHP"],
    featured: true,
    category: "Web Development",
    overview: "Developed during a software development internship at PT. Imani Prima (Product & Business division). Developed and maintained the responsive public landing page for Monstrack, integrated a secure Laravel backend with PostgreSQL, and crafted a comprehensive administrative dashboard using Filament to facilitate content management and operational tracking.",
    challenges: [
      "Delivering a visually appealing, responsive landing page consistent across desktop and mobile devices.",
      "Providing non-technical business operators with a seamless interface to manage site content without developer assistance."
    ],
    solutions: [
      "Built custom UI components using Tailwind CSS adhering to product branding standards.",
      "Implemented Filament admin panels with tailored CRUD forms, tables, and validation logic.",
      "Optimized PostgreSQL queries through Laravel Eloquent relationships for efficient data retrieval."
    ],
    outcomes: [
      "Delivered a modern, production-ready landing page and content management portal for Monstrack.",
      "Streamlined daily content updates and administrative workflows for the product team."
    ],
    technologies: ["Laravel", "PostgreSQL", "Filament PHP", "Tailwind CSS", "PHP", "Git", "Docker"]
  },
  {
    id: "bumnag-matua-mudiak",
    title: "BUMNag Sepakat Matua Mudiak Web Portal",
    date: "January 2025 – February 2025",
    synopsis: "Web portal for village-owned enterprise BUMNag Matua Mudiak Sakato to showcase local business units, products, services, and community articles.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Laravel", "PostgreSQL", "Tailwind CSS", "PHP"],
    featured: false,
    category: "Web Development",
    githubUrl: "https://github.com/glifordosade",
    overview: "Developed during community service (KKN) from Andalas University. The web application establishes a digital presence for village enterprise BUMNag Matua Mudiak Sakato, showcasing business units, product catalogs, and community activities, accompanied by an article publication system.",
    challenges: [
      "Creating an intuitive digital catalog easily browsed by rural community members on mobile devices.",
      "Providing simple content publishing tools for village administrators."
    ],
    solutions: [
      "Built a mobile-first responsive layout with Tailwind CSS.",
      "Implemented content management features in Laravel for publishing articles, uploading imagery, and updating business unit profiles."
    ],
    outcomes: [
      "Enhanced online exposure for local village products and business enterprises.",
      "Delivered full documentation and operational handover to village management."
    ],
    technologies: ["Laravel", "PostgreSQL", "Tailwind CSS", "PHP", "JavaScript"]
  },
  {
    id: "pimol-car-rent",
    title: "Pimol Car Rental Mobile Application",
    date: "September 2024 – December 2024",
    synopsis: "Native Android car rental mobile app featuring vehicle catalog browsing, booking workflows, custom Figma UI/UX design, and PHP REST API integration.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    tags: ["Android Studio", "Java", "PHP", "MySQL", "Figma", "REST API"],
    featured: false,
    category: "Mobile Application",
    githubUrl: "https://github.com/glifordosade",
    overview: "Built as an end-to-end mobile development project. Spanning wireframing and interactive prototyping in Figma, native Android client engineering in Java, and backend server development with a PHP REST API and MySQL database.",
    challenges: [
      "Ensuring seamless synchronization of vehicle rental availability and booking statuses between mobile clients and the backend database.",
      "Designing an intuitive mobile checkout and vehicle selection flow."
    ],
    solutions: [
      "Designed high-fidelity mockups in Figma before developing XML layouts in Android Studio.",
      "Created lightweight REST API endpoints in PHP to manage authentication, vehicle listings, and booking data.",
      "Utilized asynchronous network requests to fetch and submit rental orders reliably."
    ],
    outcomes: [
      "Delivered a fully functional native mobile car rental application with real-time database connectivity."
    ],
    technologies: ["Android Studio", "Java", "PHP", "MySQL", "Figma", "REST API", "Git"]
  },
  {
    id: "ecommerce-lazada-app",
    title: "E-Commerce Web Application (Lazada-Inspired)",
    date: "March 2024 – June 2024",
    synopsis: "Web marketplace application replicating online shopping mechanics with product catalogs, shopping cart, checkout handling, and relational MySQL database.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    featured: false,
    category: "Web Development",
    githubUrl: "https://github.com/glifordosade",
    overview: "Academic web programming project implementing complete e-commerce marketplace operations. Features product catalogs, category filtering, cart management, transaction simulation, and relational database schema design in MySQL.",
    challenges: [
      "Managing session states for user shopping carts across multiple browsing pages.",
      "Maintaining referential integrity between customer profiles, order history, and product inventory."
    ],
    solutions: [
      "Engineered relational MySQL schemas with structured foreign keys and transaction tables.",
      "Developed PHP backend controllers and data validation routines."
    ],
    outcomes: [
      "Successfully implemented full shopping cart and order processing workflows.",
      "Practiced collaborative Git workflows within a development team."
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Git"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "pt-imani-prima",
    role: "Software Developer (Intern)",
    company: "PT. Imani Prima (Product and Business)",
    type: "Work",
    period: "July 2025 – August 2025",
    location: "Jakarta Selatan, Indonesia",
    synopsis: "Developed the Monstrack responsive landing page, Laravel and PostgreSQL backend functionality, and an administrative dashboard using Filament.",
    featured: true,
    achievements: [
      "Developed and maintained the landing page for Monstrack, delivering a responsive, user-friendly, and modern interface with Tailwind CSS.",
      "Built web application backend using Laravel and PostgreSQL, implementing database schema integration and business logic.",
      "Designed and developed an administrative dashboard using Filament to streamline content management and operations.",
      "Implemented CRUD functionality and database interactions to support platform content management.",
      "Collaborated with product and business teams to translate requirements into technical solutions, participating in testing and optimization."
    ],
    description: "During my internship at PT. Imani Prima within the Product and Business division, I was responsible for engineering web interfaces and backend functionality for Monstrack. I created a high-performing landing page using Tailwind CSS, implemented relational data models in PostgreSQL, and built an internal admin dashboard with Filament PHP.",
    skills: ["Laravel", "PHP", "PostgreSQL", "Filament", "Tailwind CSS", "Database Management", "Git"]
  },
  {
    id: "west-sumatra-provincial-govt",
    role: "Software Developer Project Manager (Contract)",
    company: "West Sumatra Provincial Government",
    type: "Work",
    period: "February 2024 – October 2024",
    location: "Padang, Indonesia",
    synopsis: "Led development of SIPPAK to digitize and automate personnel administration, promotion, leave management, and retirement processing.",
    featured: true,
    achievements: [
      "Developed SIPPAK (Sistem Informasi Pengelolaan dan Pelayanan Administrasi Kepegawaian) to digitize employee administration for the West Sumatra Provincial Government Secretariat.",
      "Built core administration modules for civil servant promotion, leave management, retirement processing, and official correspondence.",
      "Designed relational database structures in MySQL to securely manage employee records and administrative workflows.",
      "Implemented CRUD operations and strict data validation routines, improving the consistency of government personnel records.",
      "Conducted system testing, debugging, and continuous maintenance to ensure high usability for administrative staff."
    ],
    description: "Contracted as Software Developer Project Manager for the West Sumatra Provincial Government Secretariat. Spearheaded the digital transformation of manual bureaucracy into a centralized, web-based employee administration portal, coordinating technical implementation, database architecture, and user acceptance testing.",
    skills: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Project Management", "System Architecture", "Database Design"]
  },
  {
    id: "hmif-andalas-university",
    role: "Information and Media Member",
    company: "HMIF Andalas University (Informatics Student Association)",
    type: "Organization",
    period: "June 2023 – August 2024",
    location: "Padang, Indonesia",
    synopsis: "Managed and published digital communication content, organizational visual branding, and social media campaigns.",
    featured: true,
    achievements: [
      "Managed and distributed organizational information through social media and digital communication channels for HMIF.",
      "Designed visual content and promotional materials using Figma and Canva for academic programs, events, and student announcements.",
      "Collaborated across organizational divisions to ensure accurate and timely publication of official student media.",
      "Documented and archived academic, organizational, and community activities, managing digital media assets."
    ],
    description: "Active member of the Information and Media division in the Informatics Student Association (HMIF) at Andalas University. Focused on creative digital marketing, graphic design in Figma, and maintaining clear communication channels for the student body.",
    skills: ["Media Management", "Figma", "Digital Content Creation", "Canva", "Team Collaboration", "Public Communication"]
  },
  {
    id: "kkn-andalas-bumnag",
    role: "Web Developer (KKN Community Service)",
    company: "BUMNag Matua Mudiak Sakato / Andalas University",
    type: "Organization",
    period: "January 2025 – February 2025",
    location: "Agam, Sumatera Barat, Indonesia",
    synopsis: "Engineered web portal and digital marketing platform for village-owned enterprise BUMNag Matua Mudiak Sakato.",
    featured: false,
    achievements: [
      "Built a responsive web landing page and business unit directory for BUMNag Matua Mudiak Sakato.",
      "Implemented an article publication system using Laravel, PostgreSQL, and Tailwind CSS for village announcements.",
      "Facilitated technology transfer and training sessions for village enterprise staff."
    ],
    description: "Executed community development programs through Andalas University's KKN initiative in Nagari Matua Mudiak, focusing on digital transformation and expanding online visibility for village-owned enterprises.",
    skills: ["Laravel", "Tailwind CSS", "PostgreSQL", "Community Service", "Web Development"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages used for data analysis, deep learning pipelines, backend services, and application development.",
    skills: [
      { name: "Python", level: "Expert", iconName: "Terminal" },
      { name: "PHP", level: "Expert", iconName: "Code2" },
      { name: "JavaScript / Node.js", level: "Advanced", iconName: "FileCode" },
      { name: "TypeScript", level: "Advanced", iconName: "Binary" },
      { name: "Go (Golang)", level: "Advanced", iconName: "Cpu" },
      { name: "Java", level: "Intermediate", iconName: "Code2" },
      { name: "C#", level: "Intermediate", iconName: "Binary" },
      { name: "Rust", level: "Intermediate", iconName: "Cpu" }
    ]
  },
  {
    title: "Data Science & Artificial Intelligence",
    description: "Deep learning models, speech processing, statistical data analysis, and machine learning pipelines.",
    skills: [
      { name: "Deep Learning (YourTTS/VITS)", level: "Advanced", iconName: "Brain" },
      { name: "PyTorch", level: "Advanced", iconName: "Activity" },
      { name: "Machine Learning (Scikit-Learn)", level: "Advanced", iconName: "BarChart" },
      { name: "Pandas & NumPy", level: "Expert", iconName: "Database" },
      { name: "Data Processing & Validation", level: "Expert", iconName: "Layers" },
      { name: "Data Visualization (Seaborn)", level: "Advanced", iconName: "BarChart" }
    ]
  },
  {
    title: "Frameworks & Web Development",
    description: "Modern full-stack web and backend frameworks for building robust applications and APIs.",
    skills: [
      { name: "Laravel", level: "Expert", iconName: "Rocket" },
      { name: "Next.js & React", level: "Advanced", iconName: "Globe" },
      { name: "Tailwind CSS", level: "Expert", iconName: "Palette" },
      { name: "FastAPI", level: "Advanced", iconName: "Zap" },
      { name: "Astro.js", level: "Advanced", iconName: "Sparkles" },
      { name: "Vue.js & Nest.js", level: "Intermediate", iconName: "Layers" },
      { name: "Gin (Go Framework)", level: "Intermediate", iconName: "Server" },
      { name: "React Native & Flutter", level: "Intermediate", iconName: "Box" }
    ]
  },
  {
    title: "Database, Tools & Platforms",
    description: "Relational/NoSQL databases, containerization, developer tools, and design software.",
    skills: [
      { name: "PostgreSQL", level: "Expert", iconName: "Database" },
      { name: "MySQL", level: "Expert", iconName: "Database" },
      { name: "MongoDB", level: "Intermediate", iconName: "Database" },
      { name: "Docker", level: "Advanced", iconName: "Container" },
      { name: "Git & GitHub / GitLab", level: "Expert", iconName: "Network" },
      { name: "Google Colab & Jupyter", level: "Expert", iconName: "Terminal" },
      { name: "Figma & Canva", level: "Advanced", iconName: "Palette" },
      { name: "VS Code & Electron/Tauri", level: "Advanced", iconName: "Wrench" }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "degree-andalas-informatics",
    title: "Bachelor of Informatics – Cumlaude (GPA: 3.78/4.00)",
    issuer: "Andalas University",
    date: "2022–2026",
    category: "Award",
    description: "Graduated with Cumlaude distinction. Thesis: 'Development Of An Indonesian Emotional Voice Cloning Model Based On The YourTTS Architecture'.",
    credentialUrl: "https://www.unand.ac.id"
  },
  {
    id: "cert-oracle-sql",
    title: "Database Programming with SQL",
    issuer: "Oracle Academy",
    date: "July 2023",
    category: "Certification",
    description: "Certified competency in relational database concepts, complex SQL querying, table joins, subqueries, and database constraints.",
    credentialUrl: "https://academy.oracle.com"
  },
  {
    id: "cert-oracle-design",
    title: "Database Design",
    issuer: "Oracle Academy",
    date: "April 2023",
    category: "Certification",
    description: "Certified mastery of Entity-Relationship Modeling (ERD), normalization forms (1NF, 2NF, 3NF), and relational database architecture.",
    credentialUrl: "https://academy.oracle.com"
  },
  {
    id: "cert-codepolitan-fullstack",
    title: "Fullstack Web Course",
    issuer: "CodePolitan",
    date: "2023",
    category: "Certification",
    description: "Comprehensive certification covering end-to-end full-stack web engineering, frontend UI/UX, backend API design, and database integration.",
    credentialUrl: "https://www.codepolitan.com"
  },
  {
    id: "org-hmif-media",
    title: "Information & Media Division Member",
    issuer: "HMIF Andalas University",
    date: "2023–2024",
    category: "Leadership",
    description: "Active contributor leading visual design, social media content strategies, and academic publications for the Informatics Student Association."
  }
];
