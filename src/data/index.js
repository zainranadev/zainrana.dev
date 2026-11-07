export const profile = {
  name: "Zainranadev",
  role: "MERN stack developer",
  pitch:
"Every interface is a hundred small decisions pretending to be one simple one. I make the decisions.",
  location: "Lahore, Pakistan",
  resumeUrl: "/Zain_Ul_Abideen_Resume.pdf",
  email: "zainrana.dev@gmail.com",
  github: "https://github.com/zainranadev",
  linkedin: "https://www.linkedin.com/in/zain-ul-abideen-0759472a9/",
  whatsapp: "https://wa.me/923251575822",
};

export const stats = [
  { label: "Projects shipped", value: 15, suffix: "" },
  { label: "Mongoose collections", value: 6, suffix: "" },
  { label: "Years coding", value: 3, suffix: "+" },
];

export const skills = [
  {
    group: "Frontend",
    items: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "Vite", "HTML5", "CSS", "Figma"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Zod", "JWT", "Socket.io", "PHP", "MySQL"],
  },
  {
    group: "Tools & Languages",
    items: ["Git", "C++", "Python", "Cloudinary", "Gemini AI", "Axios", "EmailJS", "Cisco Packet Tracer"],
  },
];

export const projects = [
  // ── Highlighted Projects (Top 7) ─────────────────────────────
  {
    id: "sportrix",
    name: "Sportrix",
    tag: "FULL-STACK",
    featured: true,
    year: "2026",
    description:
      "An AI-powered sports club and tournament management system with live scoring, club management, league scheduling, and AI-generated sports articles.",
    highlights: [
      "Real-time WebSocket scoring via Socket.io across live matches",
      "Google Gemini AI integration for auto-generated news and a support chatbot",
      "JWT-based role access control for admins, clubs, and players",
      "MongoDB across six collections: users, clubs, players, events, leagues, news",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Socket.io",
      "Google Gemini AI",
      "Cloudinary",
    ],
    links: {
      demo: "#",
      code: "https://github.com/zainranadev/Sportrix-AI-Powered-Sports-Management-System",
    },
  },
  {
    id: "onyra",
    name: "Onyra",
    tag: "FULL-STACK",
    featured: true,
    year: "2026",
    description:
      "A full-stack e-commerce application with product browsing, cart, wishlist, checkout, orders, reviews, and an admin dashboard.",
    highlights: [
      "Complete storefront flow covering browsing, wishlist, cart, checkout, and reviews",
      "Admin dashboard for managing products, inventory, and customer orders",
      "End-to-end schema validation and type safety with TypeScript, Mongoose, and Zod",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Zod",
      "Axios",
    ],
    links: {
      demo: "#",
      code: "https://github.com/zainranadev/onyra",
    },
  },
  {
    id: "the-digital-journal",
    name: "The Digital Journal / Pressroom",
    tag: "FULL-STACK",
    featured: true,
    year: "2026",
    description:
      "A full-stack blogging platform where users can create, edit, publish, search, like, and manage blog posts.",
    highlights: [
      "Rich post creation, editing, and publishing workflows",
      "Interactive reader experience with full-text search and post likes",
      "RESTful Express & MongoDB backend with Zod validation",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Zod",
    ],
    links: {
      demo: "#",
      code: "https://github.com/zainranadev/The-Digital-Journal",
    },
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio Website",
    tag: "FRONTEND",
    featured: true,
    year: "2026",
    description:
      "A personal developer portfolio showcasing skills, experience, projects, and interactive 3D contact credentials.",
    highlights: [
      "Interactive 3D lanyard contact cards and smooth Framer Motion transitions",
      "Dynamic project filtering and live search across tech stacks",
    ],
    stack: ["React", "JavaScript", "Vite", "Tailwind CSS", "Framer Motion", "Three.js"],
    links: {
      demo: "https://zainranadev.vercel.app/",
      code: "https://github.com/zainranadev/zainrana.dev",
    },
  },
  {
    id: "students-automation",
    name: "Students Automation",
    tag: "AUTOMATION",
    featured: true,
    year: "2025",
    description:
      "An application that automatically processes student information and fills student forms using submitted data.",
    highlights: [
      "Automated form-filling pipeline driven by student-provided data",
      "Eliminates repetitive manual data entry for student workflows",
    ],
    stack: ["React", "JavaScript", "Vite", "HTML", "CSS"],
    links: {
      demo: "https://student-intake.umerfarooq-dev.workers.dev/app",
      code: "https://github.com/zainranadev/Students-Automation",
    },
  },
  {
    id: "taskleader",
    name: "Taskleader",
    tag: "WEB APP",
    featured: true,
    year: "2025",
    description:
      "A task management application for creating, organizing, and tracking daily tasks.",
    highlights: [
      "Clean task dashboard for organizing and tracking daily workflows",
      "Fast client-side state updates and intuitive task controls",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    links: {
      demo: "https://taskleader.vercel.app/",
      code: "https://github.com/zainranadev/Taskleader",
    },
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    tag: "WEB APP",
    featured: true,
    year: "2025",
    description:
      "A browser-based application for generating memes using images and custom text.",
    highlights: [
      "Interactive meme editor using HTML5 Canvas and image APIs",
      "Custom text positioning and instant image preview",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Canvas API"],
    links: {
      demo: "https://memegenie-gilt.vercel.app/",
      code: "https://github.com/zainranadev/Meme-Generator",
    },
  },

  // ── Additional Projects ──────────────────────────────────────
  {
    id: "food-platform",
    name: "Foodweb",
    tag: "FRONTEND",
    featured: false,
    year: "2025",
    description:
      "A responsive food website interface built with React and Vite.",
    highlights: [
      "React.js frontend with reusable, state-driven components",
      "Responsive layout tailored for browsing menus and food items",
    ],
    stack: ["React", "JavaScript", "Vite", "CSS"],
    links: {
      demo: "#",
      code: "https://github.com/zainranadev/Foodweb",
    },
  },
  
  {
    id: "nextcent-ui",
    name: "Nextcent UI",
    tag: "FRONTEND",
    featured: false,
    year: "2025",
    description:
      "A responsive landing page design for a modern business or technology product.",
    highlights: [
      "Pixel-accurate responsive landing page layout across mobile and desktop",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    links: {
      demo: "https://nextcent-ui.vercel.app/",
      code: "https://github.com/zainranadev/Nextcent-UI",
    },
  },
  {
    id: "dead-signal",
    name: "Dead Signal",
    tag: "FRONTEND",
    featured: false,
    year: "2025",
    description:
      "A dark-themed web project with an interactive interface and visual experience.",
    highlights: [
      "Atmospheric dark interface with custom interactive visual effects",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    links: {
      demo: "https://dead-signal-chi.vercel.app/",
      code: "https://github.com/zainranadev/Dead-Signal",
    },
  },
  {
    id: "multitask-calculator",
    name: "Multitask Calculator",
    tag: "UTILITY",
    featured: false,
    year: "2024",
    description:
      "A multi-purpose calculator with basic operations, interest calculation, and unit conversion features.",
    highlights: [
      "Basic arithmetic, simple & compound interest, and unit conversion in one app",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    links: {
      demo: "https://multitask-calculator-omega.vercel.app/",
      code: "https://github.com/zainranadev/-multitask-calculator",
    },
  },
 
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
