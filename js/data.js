export const data = {
  home: {
    title: "Welcome to My Portfolio",
    name: "Ömer Öztoprak",
    description: "Explore my projects and get to know me better.",
    professions: [
      "Full Stack Developer",
      "AI-Powered App Creator",
      "Game Dev Enthusiast"
    ],
    buttons: [
      { text: "View Projects", href: "#projects", type: "primary" },
      { text: "Contact Me", href: "#contact", type: "secondary" }
    ]
  },

  about: {
    image: "./assets/images/profile.png",
    name: "Ömer Öztoprak",
    bio: [
      "I'm a passionate Full Stack Developer with a knack for creating dynamic and responsive web applications. With a strong foundation in both frontend and backend technologies, I thrive on building seamless user experiences.",
      "My journey in tech has led me to explore the exciting world of AI-powered applications and game development. I enjoy leveraging modern frameworks and tools to bring innovative ideas to life.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or indulging in my love for gaming."
    ],
    resumeUrl: "/assets/pdf/cv.pdf",
    social: [
      { platform: "GitHub", url: "#", icon: "fab fa-github", color: "#171515" },
      { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin", color: "#0077B5" },
      { platform: "Twitter", url: "#", icon: "fab fa-x-twitter", color: "#000000" },
      { platform: "Instagram", url: "#", icon: "fab fa-instagram", color: "linear-gradient(45deg,#833AB4,#FD1D1D,#FCAF45)" }
    ]
  },

  skills: [
    {
      category: "Frontend",
      icon: "fas fa-code",
      skills: [
        { name: "HTML5", icon: "devicon-html5-plain colored" },
        { name: "CSS3", icon: "devicon-css3-plain colored" },
        { name: "JavaScript", icon: "devicon-javascript-plain colored" },
        { name: "React", icon: "devicon-react-original colored" },
        { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
        { name: "Tailwind", icon: "devicon-tailwindcss-plain colored" }
      ]
    },
    {
      category: "Backend",
      icon: "fas fa-server",
      skills: [
        { name: "Node.js", icon: "devicon-nodejs-plain colored" },
        { name: "Python", icon: "devicon-python-plain colored" },
        { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
        { name: "MySQL", icon: "devicon-mysql-plain colored" },
        { name: "Express", icon: "devicon-express-original" },
        { name: "Django", icon: "devicon-django-plain colored" }
      ]
    },
    {
      category: "Tools",
      icon: "fas fa-tools",
      skills: [
        { name: "Git", icon: "devicon-git-plain colored" },
        { name: "VS Code", icon: "devicon-vscode-plain colored" },
        { name: "Docker", icon: "devicon-docker-plain colored" },
        { name: "Figma", icon: "devicon-figma-plain colored" },
        { name: "GitHub", icon: "devicon-github-original" },
        { name: "NPM", icon: "devicon-npm-original-wordmark colored" }
      ]
    }
  ],

  projectFilters: [
    { key: 'all', label: 'All' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'backend', label: 'Backend' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'game', label: 'Game Dev' },
    { key: 'ai', label: 'AI / ML' },
  ],

  defaultImage: "./assets/images/default.png",

  projects: [
    {
      id: "realtime-chat-app",
      title: "Realtime Chat App",
      tags: "Node.js, Express, Socket.IO, MongoDB",
      description: "Realtime private/public rooms with delivery receipts, presence, and typing indicators. Includes JWT-based authentication, rate limiting, and message persistence with pagination. Built to scale with namespaces and rooms, featuring optimistic UI updates, admin moderation tools, and secure file sharing.",
      category: ["fullstack"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "ecommerce-dashboard",
      title: "E‑Commerce Dashboard",
      tags: "React, Chart.js, REST, JWT",
      description: "A KPI‑driven analytics suite for tracking sales, funnels, and inventory health. Offers cohort analysis, time‑range comparisons, and permission‑based views. CSV/Excel export, saved filters, and dark mode provide a polished and productive operator experience.",
      category: ["frontend"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "rest-api-boilerplate",
      title: "RESTful API Boilerplate",
      tags: "Node.js, Express, Prisma, PostgreSQL",
      description: "Production‑ready foundation with layered architecture, OpenAPI/Swagger docs, and structured logging. Centralized error handling, request validation, and RBAC authorization included. Ships with Docker config, seed scripts, and CI‑friendly integration tests.",
      category: ["backend"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "task-manager-mobile",
      title: "Task Manager Mobile",
      tags: "React Native, Redux Toolkit, AsyncStorage",
      description: "Offline‑first to‑do manager with category filters, reminders, and calendar view. Supports drag‑and‑drop prioritization, push notifications, and background sync. Lightweight storage with seamless conflict resolution and optional biometric lock.",
      category: ["mobile"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "image-classifier-ml",
      title: "Image Classifier",
      tags: "TensorFlow.js, CNN, Data Augmentation",
      description: "On‑device image classification with transfer learning and live webcam inference. Includes augmentation pipeline, training metrics, and confusion matrix. Privacy‑first design: no server upload required and model caching for quick reuse.",
      category: ["ai"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      tags: "HTML5, CSS3, JavaScript",
      description: "Responsive portfolio with category filters, modal gallery, and smooth hash routing. High Lighthouse scores, accessibility‑minded semantics, and keyboard navigation. Modular JS architecture for scalability and easy content updates.",
      category: ["frontend"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "blog-cms",
      title: "Blog CMS",
      tags: "Next.js, Prisma, PostgreSQL, Auth",
      description: "Content platform with MDX editor, role‑based permissions, and scheduled publishing. Offers preview mode, image optimization, and incremental static regeneration. Webhooks and audit logs enable integrations and accountability.",
      category: ["fullstack"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "realtime-analytics-service",
      title: "Realtime Analytics Service",
      tags: "Node.js, WebSocket, Redis, Nginx",
      description: "Event ingestion pipeline with batching, backpressure, and fault tolerance. Live dashboards, anomaly alerts, and multi‑tenant isolation. Efficient retention policies, privacy controls, and export endpoints for BI tools.",
      category: ["backend"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "weather-app",
      title: "Weather App",
      tags: "Vue 3, Vite, REST, PWA",
      description: "PWA with geolocation search, hourly/daily forecasts, and graceful offline caching. Add‑to‑home‑screen support, responsive charts, and accessible color contrasts. Robust error handling and optimistic UI for location updates.",
      category: ["frontend", "mobile"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "chatbot-assistant",
      title: "Chatbot Assistant",
      tags: "Node.js, NLP, Webhooks",
      description: "Context‑aware assistant with multi‑channel delivery (web, WhatsApp, Telegram). Features fallbacks, quick replies, and analytics for intent performance. Extensible webhook/plugin system and secure secrets management.",
      category: ["ai", "backend"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    },
    {
      id: "finance-tracker",
      title: "Finance Tracker",
      tags: "React, IndexedDB, Charts",
      description: "Personal finance app for budgeting and insights with clear visualizations. Supports recurring transactions, categories, and multi‑currency. Offline‑capable with IndexedDB and privacy‑friendly local data storage.",
      category: ["fullstack", "mobile"],
      images: [],
      links: [
        { url: "#", icon: "fas fa-play-circle" },
        { url: "#", icon: "fab fa-github" }
      ]
    }
  ],

  contact: {
    description: "If you have any questions, collaboration ideas, or feedback, feel free to reach out. I’m happy to discuss projects of any size and explore how we can build something impactful together.",
    contactMethods: [
      {
        type: "Email",
        value: "example@email.com",
        icon: "fas fa-envelope",
        href: "mailto:example@email.com",
        display: "example@email.com"
      },
      {
        type: "Location",
        value: "Istanbul, Turkey",
        icon: "fas fa-map-marker-alt",
        href: null,
        display: "Istanbul, Turkey"
      }
    ]
  }
};