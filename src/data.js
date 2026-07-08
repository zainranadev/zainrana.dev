export const profile = {
  name: "Zain.dev",
  role: "MERN stack developer",
  pitch:
"Every interface is a hundred small decisions pretending to be one simple one. I make the decisions.",
  location: "Lahore, Pakistan",
  resumeUrl: "/Zain_Ul_Abideen-Resume.pdf",
  email: "zainrana.dev@gmail.com",
  github: "https://github.com/zain-io-dev",
  linkedin: "https://www.linkedin.com/in/zain-ul-abideen-0759472a9/",
  whatsapp: "https://wa.me/923251575822",
};

export const stats = [
  { label: "Projects shipped", value: 4, suffix: "" },
  { label: "Mongoose collections", value: 6, suffix: "" },
  { label: "Years coding", value: 3, suffix: "+" },
];

export const skills = [
  {
    group: "Frontend",
    items: ["React.js", "JavaScript", "Tailwind CSS", "HTML5", "CSS", "Figma"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "PHP", "MongoDB", "MySQL"],
  },
  {
    group: "Tools & Languages",
    items: ["Git", "C++", "Python", "Cloudinary", "Cisco Packet Tracer"],
  },
];

export const projects = [
  {
    id: "sportrix",
    name: "Sportrix",
    tag: "REAL-TIME · AI",
    featured: true,
    year: "2026",
    description:
      "AI-powered sports club and tournament management platform. Final Year Project built on the MERN stack, handling live scoring, league operations, and AI-generated news for clubs and players.",
    highlights: [
      "Real-time WebSocket scoring via Socket.io across live matches",
      "Google Gemini AI integration for auto-generated news and a support chatbot",
      "JWT-based role access control for admins, clubs, and players",
      "MongoDB across six collections: users, clubs, players, events, leagues, news",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Gemini AI", "Cloudinary", "JWT"],
    links: { demo: "#", code: "https://github.com/zain-io-dev/Sportrix-AI-Powered-Sports-Management-System" },
  },
  {
    id: "food-platform",
    name: "Foodweb",
    tag: "FULL-STACK",
    featured: false,
    year: "2025",
    description:
      "A full-stack food ordering platform with a React frontend and an Express/MongoDB backend, covering browsing, cart, and order flows end to end.",
    highlights: [
      "React.js frontend with reusable, state-driven components",
      "REST API built on Node.js and Express.js",
      "MongoDB for menu, order, and user data",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    links: { demo: "#", code: "https://github.com/zain-io-dev/Foodweb" },
  },
  {
    id: "students-automation",
    name: "Students Automation",
    tag: "AUTOMATION",
    featured: false,
    year: "2024",
    description:
      "A Python automation tool that auto-fills student forms from collected data. Students provide their information once, and the system handles form filling automatically — removing repetitive manual entry.",
    highlights: [
      "Automated form-filling pipeline driven by student-provided data",
      "Eliminates repetitive manual data entry for student workflows",
      "Built with Python for fast and reliable automation",
    ],
    stack: ["Python"],
    links: { demo: "#", code: "https://github.com/zain-io-dev/Students-Automation" },
  },
  {
    id: "multitask-calculator",
    name: "Multitask Calculator",
    tag: "UTILITY",
    featured: false,
    year: "2024",
    description:
      "A multi-purpose calculator supporting basic arithmetic operations, interest calculation (simple and compound), and unit conversion features — all in a single utility app.",
    highlights: [
      "Basic arithmetic operations with clean calculation logic",
      "Simple and compound interest calculations",
      "Unit conversion across common measurement types",
    ],
    stack: ["Python"],
    links: { demo: "#", code: "https://github.com/zain-io-dev/-multitask-calculator" },
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
