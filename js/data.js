"use strict";

window.TYPEWRITER_ITEMS = [
  "Full Stack Developer",
  "Frontend Specialist",
  "Backend Engineer",
  "UI/UX Enthusiast",
  "Problem Solver"
];

window.CATEGORIES = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "fullstack", label: "Full Stack" },
  { key: "game", label: "Game" },
  { key: "mobile", label: "Mobile" },
  { key: "ai", label: "AI" }
];

window.PROJECTS = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: `
    A personal portfolio website with a modern and minimalist design. Built using HTML, CSS, and JavaScript, this site stands out with its user-friendly interface and fast loading times. It includes sections such as project showcases, skills, and contact information. Thanks to its responsive design, it looks perfect on all devices. Additionally, SEO optimization ensures better visibility in search engines.  

    Overall, this project serves as both a strong tool for personal branding and an example of modern web development principles. It provides an effective online showcase, particularly valuable for job interviews and professional networking.  
    `,
    cover: "images/projects/portfolio-website/cover.png",
    images: [
      "images/projects/portfolio-website/image1.png",
      "images/projects/portfolio-website/image2.png",
      "images/projects/portfolio-website/image3.png",
      "images/projects/portfolio-website/image4.png",
      "images/projects/portfolio-website/image5.png",
      "images/projects/portfolio-website/image6.png",
      "images/projects/portfolio-website/image7.png",
      "images/projects/portfolio-website/image8.png",
      "images/projects/portfolio-website/image9.png"
    ],
    categories: ["frontend"],
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://omeroztprk.github.io",
    repo: "https://github.com/omeroztprk/portfolio-website",
    badges: ["featured"]
  },

  {
    id: "admin-panel-dashboard",
    title: "Admin Panel Dashboard",
    description: `
    A powerful administration panel developed to simplify user, content, and system management. It offers features such as role-based authorization, dynamic tables and charts for data visualization, and a real-time notification system.  

    On the backend, a robust API layer was built with Node.js and Express. The frontend was implemented with Angular, providing a modular and fast user interface. JWT-based authentication ensures maximum security.  

    This dashboard helps organizations improve operational efficiency with a scalable and reliable management solution.  
    `,
    cover: "images/projects/admin-panel-dashboard/cover.png",
    images: [
      "images/projects/admin-panel-dashboard/image1.png",
      "images/projects/admin-panel-dashboard/image2.png",
      "images/projects/admin-panel-dashboard/image3.png",
      "images/projects/admin-panel-dashboard/image4.png",
      "images/projects/admin-panel-dashboard/image5.png",
      "images/projects/admin-panel-dashboard/image6.png"
    ],
    categories: ["fullstack"],
    tags: ["Node.js", "Express", "MongoDB", "Angular"],
    live: "#",
    repo: "https://github.com/omeroztprk/admin-panel-dashboard",
    badges: ["new"]
  },

  {
    id: "chatbot",
    title: "Chatbot",
    description: `
    An intelligent chatbot developed using the OpenAI API, capable of generating context-aware and real-time responses. It provides meaningful answers to user queries and offers a personalized experience with multi-session support.  

    The backend services were built with Express.js and MongoDB to ensure secure data storage. The frontend was designed with Angular to deliver a responsive and user-friendly interface.  

    This project represents a modern example of AI-driven customer support systems.  
    `,
    cover: "images/projects/chatbot/cover.png",
    images: [
      "images/projects/chatbot/image1.png",
      "images/projects/chatbot/image2.png",
      "images/projects/chatbot/image3.png",
      "images/projects/chatbot/image4.png",
      "images/projects/chatbot/image5.png",
      "images/projects/chatbot/image6.png"
    ],
    categories: ["ai", "fullstack"],
    tags: ["Node.js", "Express", "MongoDB", "Angular", "OpenAI API"],
    live: "#",
    repo: "https://github.com/omeroztprk/chatbot",
    badges: ["new"]
  },

  {
    id: "simon-game-modern",
    title: "Simon Game Modern",
    description: `
    A modernized web version of the classic Simon Says game. Players earn points by correctly repeating color and sound sequences.  

    Developed with HTML, CSS, and JavaScript, it features a responsive design for smooth gameplay on mobile devices as well. The minimalist yet fun interface makes the game easy to learn and play.  

    This project was created both as an entertaining experience and as practice for event handling and DOM manipulation in JavaScript.  
    `,
    cover: "images/projects/simon-game-modern/cover.png",
    images: [
      "images/projects/simon-game-modern/image1.png",
      "images/projects/simon-game-modern/image2.png",
      "images/projects/simon-game-modern/image3.png",
      "images/projects/simon-game-modern/image4.png",
      "images/projects/simon-game-modern/image5.png",
      "images/projects/simon-game-modern/image6.png"
    ],
    categories: ["game"],
    tags: ["HTML", "CSS", "JavaScript"],
    live: "#",
    repo: "https://github.com/omeroztprk/simon-game-modern",
    badges: []
  },

  {
    id: "auth-service",
    title: "Authentication Service",
    description: `
    An authentication service based on JWT and OAuth2. Session management was implemented with Redis, enabling scalability in high-traffic environments.  

    Built with an API-first approach, it allows seamless integration with other microservices. Designed with security standards in mind, this service provides a reliable solution that simplifies user authentication processes.  
    `,
    cover: "images/projects/auth-service/cover.png",
    images: [
      "images/projects/auth-service/image1.png",
      "images/projects/auth-service/image2.png",
      "images/projects/auth-service/image3.png"
    ],
    categories: ["backend"],
    tags: ["JWT", "OAuth2", "Redis", "Node.js"],
    live: "#",
    repo: "#",
    badges: []
  },

  {
    id: "blog-platform",
    title: "Blog Platform",
    description: `
    A fully featured blog platform built with Next.js and Prisma. Users can write articles, leave comments, and explore content through a tag system.  

    Designed with performance and scalability in mind, this project demonstrates modern full-stack development practices.  
    `,
    cover: "images/projects/blog-platform/cover.png",
    images: [
      "images/projects/blog-platform/image1.png",
      "images/projects/blog-platform/image2.png",
      "images/projects/blog-platform/image3.png"
    ],
    categories: ["fullstack"],
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    live: "#",
    repo: "#",
    badges: []
  },

  {
    id: "charts-dashboard",
    title: "Charts Dashboard",
    description: `
    An interactive data visualization dashboard built with React and D3.js. Users can explore datasets through various charts, apply filters, and perform interactive analysis.  

    Thanks to its responsive design, it works seamlessly across different devices. The modular and extensible code structure makes it easy to add new chart types.  

    This project demonstrates a modern dashboard approach for data-driven applications.  
    `,
    cover: "images/projects/charts-dashboard/cover.png",
    images: [
      "images/projects/charts-dashboard/image1.png",
      "images/projects/charts-dashboard/image2.png",
      "images/projects/charts-dashboard/image3.png"
    ],
    categories: ["frontend"],
    tags: ["React", "D3.js"],
    live: "#",
    repo: "#",
    badges: []
  },

  {
    id: "payments-service",
    title: "Payments Service",
    description: `
    A payment infrastructure service with Stripe integration. Users can securely pay with credit cards, and subscription management enables recurring payments.  

    Real-time transaction monitoring is achieved through a webhook-based notification system. The backend was built using the Koa framework and PostgreSQL.  

    This project delivers a scalable, secure, and easily integrable solution for payment processing.  
    `,
    cover: "images/projects/payments-service/cover.png",
    images: [
      "images/projects/payments-service/image1.png",
      "images/projects/payments-service/image2.png",
      "images/projects/payments-service/image3.png"
    ],
    categories: ["backend"],
    tags: ["Stripe", "Koa", "PostgreSQL"],
    live: "#",
    repo: "#",
    badges: []
  }
];
