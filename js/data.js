"use strict";

window.CATEGORIES = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "fullstack", label: "Full Stack" },
    { key: "game", label: "Game" },
    { key: "ai", label: "AI" }
];

window.PROJECTS = [
    {
        id: "portfolio-website",
        title: "Portfolio Website",
        cover: "images/projects/cover1.png",
        categories: ["frontend"],
        tags: ["HTML", "CSS", "JavaScript"],
        live: "https://omeroztprk.github.io",
        repo: "https://github.com/omeroztprk/portfolio-website",
        badges: ["featured"]

    },
    {
        id: "admin-panel-dashboard",
        title: "Admin Panel Dashboard",
        cover: "images/projects/cover2.png",
        categories: ["fullstack", "ai"],
        tags: ["Node.js", "Express", "MongoDB", "Angular", "OpenAI API"],
        live: "#",
        repo: "https://github.com/omeroztprk/admin-panel-dashboard",
        badges: ["new"]
    },
    {
        id: "Chatbot",
        title: "Chatbot",
        cover: "images/projects/cover3.png",
        categories: ["fullstack", "ai"],
        tags: ["Node.js", "Express", "MongoDB", "Angular", "OpenAI API"],
        live: "#",
        repo: "https://github.com/omeroztprk/chatbot",
        badges: ["new"]
    },
    {
        id: "simon-game-modern",
        title: "Simon Game Modern",
        cover: "images/projects/cover4.png",
        categories: ["game"],
        tags: ["HTML", "CSS", "JavaScript"],
        live: "#",
        repo: "https://github.com/omeroztprk/simon-game-modern",
        badges: []
    },
    {
        id: "p5",
        title: "Auth Service",
        categories: ["backend"],
        tags: ["JWT", "OAuth2", "Redis"],
        live: "#",
        repo: "#"
    },
    {
        id: "p6",
        title: "Blog Platform",
        categories: ["fullstack"],
        tags: ["Next.js", "Prisma"],
        live: "#",
        repo: "#"
    },
    {
        id: "p7",
        title: "Charts Dashboard",
        cover: "images/projects/dashboard.jpg",
        categories: ["frontend"],
        tags: ["React", "D3"],
        live: "#",
        repo: "#"
    },
    {
        id: "p8",
        title: "Payments Service",
        cover: "images/projects/payments.jpg",
        categories: ["backend"],
        tags: ["Stripe", "Koa"],
        live: "#",
        repo: "#"
    }
];
