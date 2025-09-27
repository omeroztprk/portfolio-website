"use strict";

// ===========================================
// HOME SECTION DATA
// ===========================================
window.HOME_DATA = {
  name: "Ömer Öztoprak",
  title: "Welcome to My Portfolio",
  description: "Explore my projects and get inspired.",
  typewriter: [
    "Full Stack Developer",
    "Frontend Specialist",
    "Backend Engineer",
    "Mobile Developer",
    "AI Enthusiast"
  ]
};

// ===========================================
// ABOUT SECTION DATA
// ===========================================
window.ABOUT_DATA = {
  profileImage: "assets/images/profile.jpg",
  description: [
    "Hello, I'm Ömer. I am a software developer who graduated from Beykent University Software Engineering department. During my education, I didn't limit myself to just theoretical knowledge, but developed many independent projects to improve both my technical and practical skills.",
    "Focusing on both frontend and backend technologies in software development, I have conducted in-depth studies on the path to becoming a fully equipped full-stack developer. I specialize in modern JavaScript frameworks, cloud technologies, and creating scalable applications.",
    "I am always eager to learn new technologies and improve myself. I am excited about the opportunity to contribute to innovative projects and collaborate with dynamic teams in the ever-evolving tech industry."
  ],
  resumeLink: "assets/resume.pdf"
};

// ===========================================
// SOCIAL LINKS DATA (Shared between About & Footer)
// ===========================================
window.SOCIAL_DATA = [
  {
    name: "GitHub",
    url: "https://github.com/omeroztprk",
    icon: "fab fa-github",
    class: "icon-github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/omeroztoprak",
    icon: "fab fa-linkedin",
    class: "icon-linkedin"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/omeroztprk",
    icon: "fab fa-x-twitter",
    class: "icon-x-twitter"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/omeroztprk",
    icon: "fab fa-instagram",
    class: "icon-instagram"
  }
];

// ===========================================
// SKILLS SECTION DATA
// ===========================================
window.SKILLS_DATA = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "fas fa-code",
    skills: [
      { name: "HTML5", icon: "devicon-html5-plain colored", tooltip: "HTML5" },
      { name: "CSS3", icon: "devicon-css3-plain colored", tooltip: "CSS3" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored", tooltip: "JavaScript" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored", tooltip: "TypeScript" },
      { name: "React", icon: "devicon-react-original colored", tooltip: "React" },
      { name: "Vue.js", icon: "devicon-vuejs-plain colored", tooltip: "Vue.js" },
      { name: "Angular", icon: "devicon-angularjs-plain colored", tooltip: "Angular" },
      { name: "Next.js", icon: "devicon-nextjs-plain colored", tooltip: "Next.js" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: "fas fa-database",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored", tooltip: "Node.js" },
      { name: "Express", icon: "devicon-express-original", tooltip: "Express" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored", tooltip: "MongoDB" },
      { name: "MySQL", icon: "devicon-mysql-plain colored", tooltip: "MySQL" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", tooltip: "PostgreSQL" },
      { name: "Python", icon: "devicon-python-plain colored", tooltip: "Python" },
      { name: "Redis", icon: "devicon-redis-plain colored", tooltip: "Redis" },
      { name: "GraphQL", icon: "devicon-graphql-plain colored", tooltip: "GraphQL" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Others",
    icon: "fas fa-tools",
    skills: [
      { name: "Git", icon: "devicon-git-plain colored", tooltip: "Git" },
      { name: "GitHub", icon: "devicon-github-plain colored", tooltip: "GitHub" },
      { name: "Docker", icon: "devicon-docker-plain colored", tooltip: "Docker" },
      { name: "AWS", icon: "devicon-amazonwebservices-plain colored", tooltip: "AWS" },
      { name: "Firebase", icon: "devicon-firebase-plain colored", tooltip: "Firebase" },
      { name: "Figma", icon: "devicon-figma-plain colored", tooltip: "Figma" },
      { name: "Postman", icon: "devicon-postman-plain colored", tooltip: "Postman" },
      { name: "VSCode", icon: "devicon-vscode-plain colored", tooltip: "VSCode" }
    ]
  }
];

// ===========================================
// CONTACT SECTION DATA  
// ===========================================
window.CONTACT_DATA = {
  description: "Let's get in touch! Feel free to reach out to me through any of the channels below. I'm always open to discussing new opportunities, collaborations, or just having a friendly conversation about technology and development.",
  contacts: [
    {
      id: "email",
      title: "Email",
      icon: "fas fa-envelope",
      type: "link",
      value: "omer.oztoprak@example.com",
      href: "mailto:omer.oztoprak@example.com"
    },
    {
      id: "location",
      title: "Location",
      icon: "fas fa-map-marker-alt",
      type: "text",
      value: "Istanbul, Turkey"
    }
  ]
};

// ===========================================
// PROJECTS DATA (Categories + Projects Combined)
// ===========================================
window.PROJECTS_DATA = {
  categories: [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "fullstack", label: "Full Stack" },
    { key: "game", label: "Game" },
    { key: "mobile", label: "Mobile" },
    { key: "ai", label: "AI" },
  ],

  defaults: {
    project: "assets/images/projects/defaults/project-default.png",
    empty: "assets/images/projects/defaults/empty-default.png"
  },

  projects: [
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description: [
        "A modern and responsive personal portfolio website showcasing my skills, projects, and professional journey as a full-stack developer. Built with clean HTML5, advanced CSS3, and vanilla JavaScript to demonstrate fundamental web development expertise without relying on external frameworks or libraries.",
        "The site features a sleek dark theme with smooth animations, interactive project galleries, and a comprehensive skills showcase. It includes sections for About, Skills, Projects, and Contact information, all optimized for both desktop and mobile experiences. The design philosophy emphasizes minimalism while maintaining visual appeal through carefully crafted hover effects and transitions.",
        "Key features include dynamic content rendering through modular JavaScript architecture, smooth scrolling navigation with intersection observers, advanced project filtering system with category-based organization, and responsive design that adapts seamlessly across all devices from mobile phones to large desktop screens. The codebase emphasizes clean architecture, performance optimization, and accessibility standards.",
        "The development process involved implementing custom CSS Grid and Flexbox layouts for optimal responsiveness, creating reusable JavaScript modules for maintainable code structure, optimizing images and assets for fast loading times, and ensuring cross-browser compatibility across modern web browsers.",
        "Technical highlights include custom CSS animations without external libraries, vanilla JavaScript DOM manipulation and event handling, semantic HTML structure for better SEO performance, Progressive Web App features for enhanced user experience, and comprehensive error handling and loading states.",
        "The project demonstrates proficiency in frontend fundamentals and serves as a testament to creating sophisticated web applications using core web technologies. It showcases best practices in web development including code organization, performance optimization, accessibility compliance, and modern web standards implementation."
      ],
      cover: "assets/images/projects/portfolio-website/cover.png",
      images: [
        "assets/images/projects/portfolio-website/image1.png",
        "assets/images/projects/portfolio-website/image2.png",
        "assets/images/projects/portfolio-website/image3.png",
        "assets/images/projects/portfolio-website/image4.png",
        "assets/images/projects/portfolio-website/image5.png",
        "assets/images/projects/portfolio-website/image6.png",
        "assets/images/projects/portfolio-website/image7.png",
        "assets/images/projects/portfolio-website/image8.png",
        "assets/images/projects/portfolio-website/image9.png"
      ],
      categories: ["frontend"],
      tags: ["HTML", "CSS", "JavaScript"],
      live: "https://omeroztprk.github.io",
      repo: "https://github.com/omeroztprk/portfolio-website",
      badges: ["featured"]
    },
    {
      id: "e-commerce-platform",
      title: "E-Commerce Platform",
      description: [
        "A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, product management, shopping cart functionality, and secure payment processing through Stripe integration.",
        "The platform includes an admin dashboard for inventory management, order tracking, and analytics. It supports multiple payment methods and provides real-time notifications for order updates.",
        "Built with scalability in mind, the application uses MongoDB for data storage and Redis for caching to ensure optimal performance even under high traffic loads."
      ],
      cover: "assets/images/projects/e-commerce-platform/cover.png",
      images: [
        "assets/images/projects/e-commerce-platform/image1.png",
        "assets/images/projects/e-commerce-platform/image2.png",
        "assets/images/projects/e-commerce-platform/image3.png",
        "assets/images/projects/e-commerce-platform/image4.png",
        "assets/images/projects/e-commerce-platform/image5.png",
        "assets/images/projects/e-commerce-platform/image6.png",
        "assets/images/projects/e-commerce-platform/image7.png",
        "assets/images/projects/e-commerce-platform/image8.png",
        "assets/images/projects/e-commerce-platform/image9.png"
      ],
      categories: ["fullstack"],
      tags: ["React", "Node.js", "MongoDB", "Stripe", "Express", "Redux"],
      live: "#",
      repo: "https://github.com/omeroztprk/e-commerce-platform",
      badges: ["new"]
    },
    {
      id: "weather-forecast-app",
      title: "Weather Forecast App",
      description: [
        "A responsive weather application that provides current weather conditions and 7-day forecasts for any location worldwide. Built with vanilla JavaScript and integrates with OpenWeatherMap API.",
        "Features include location-based weather detection, beautiful weather animations, temperature unit conversion, and favorite locations management with local storage.",
        "The app includes offline support through service workers and provides weather alerts for severe conditions. The interface adapts to different weather conditions with dynamic backgrounds."
      ],
      cover: "assets/images/projects/weather-forecast-app/cover.png",
      images: [
        "assets/images/projects/weather-forecast-app/image1.png",
        "assets/images/projects/weather-forecast-app/image2.png",
        "assets/images/projects/weather-forecast-app/image3.png"
      ],
      categories: ["frontend"],
      tags: ["JavaScript", "CSS3", "API Integration", "PWA", "Geolocation"],
      live: "https://omeroztprk-weather.netlify.app",
      repo: "https://github.com/omeroztprk/weather-forecast-app",
      badges: ["new"]
    },
    {
      id: "task-management-api",
      title: "Task Management API",
      description: [
        "A robust RESTful API for task management applications, built with Node.js, Express, and MongoDB. Supports user authentication, task CRUD operations, team collaboration, and project organization.",
        "Features include JWT-based authentication, role-based access control, file attachments, due date notifications, and comprehensive logging for audit trails.",
        "The API is fully documented with Swagger and includes comprehensive unit and integration tests. It supports real-time updates through WebSocket connections."
      ],
      cover: "assets/images/projects/task-management-api/cover.png",
      images: [
        "assets/images/projects/task-management-api/image1.png",
        "assets/images/projects/task-management-api/image2.png",
        "assets/images/projects/task-management-api/image3.png",
        "assets/images/projects/task-management-api/image4.png"
      ],
      categories: ["backend"],
      tags: ["Node.js", "Express", "MongoDB", "JWT", "WebSocket", "Swagger"],
      live: "#",
      repo: "https://github.com/omeroztprk/task-management-api",
      badges: []
    },
    {
      id: "chat-application",
      title: "Real-Time Chat Application",
      description: [
        "A modern real-time chat application built with React and Socket.IO, supporting multiple chat rooms, direct messaging, file sharing, and emoji reactions.",
        "Features include user presence indicators, typing indicators, message encryption, and push notifications. The application supports both text and voice messages.",
        "Built with a microservices architecture using Docker containers, ensuring scalability and easy deployment. Includes moderation tools and message filtering."
      ],
      cover: "assets/images/projects/chat-application/cover.png",
      images: [
        "assets/images/projects/chat-application/image1.png",
        "assets/images/projects/chat-application/image2.png",
        "assets/images/projects/chat-application/image3.png"
      ],
      categories: ["fullstack"],
      tags: ["React", "Socket.IO", "Node.js", "MongoDB", "Docker", "WebRTC"],
      live: "#",
      repo: "https://github.com/omeroztprk/chat-application",
      badges: []
    },
    {
      id: "ai-image-generator",
      title: "AI Image Generator",
      description: [
        "An AI-powered image generation application that creates unique artwork from text descriptions using OpenAI's DALL-E API. Built with React and features a clean, intuitive interface.",
        "Users can generate, edit, and save images with various styles and parameters. The application includes image history, favorite collections, and social sharing capabilities.",
        "Implements advanced features like image enhancement, style transfer, and batch generation. Includes user accounts with credit-based usage tracking."
      ],
      cover: "assets/images/projects/ai-image-generator/cover.png",
      images: [
        "assets/images/projects/ai-image-generator/image1.png",
        "assets/images/projects/ai-image-generator/image2.png",
        "assets/images/projects/ai-image-generator/image3.png",
        "assets/images/projects/ai-image-generator/image4.png"
      ],
      categories: ["ai", "frontend"],
      tags: ["React", "OpenAI API", "Node.js", "Express", "AWS S3"],
      live: "#",
      repo: "https://github.com/omeroztprk/ai-image-generator",
      badges: []
    },
    {
      id: "mobile-fitness-tracker",
      title: "Mobile Fitness Tracker",
      description: [
        "A cross-platform mobile fitness application built with React Native, featuring workout tracking, nutrition logging, progress analytics, and social features for fitness enthusiasts.",
        "Integrates with various fitness APIs and wearable devices to provide comprehensive health data. Includes personalized workout plans and nutrition recommendations.",
        "Features offline capability, data synchronization across devices, and gamification elements to motivate users. Includes social challenges and leaderboards."
      ],
      cover: "assets/images/projects/mobile-fitness-tracker/cover.png",
      images: [
        "assets/images/projects/mobile-fitness-tracker/image1.png",
        "assets/images/projects/mobile-fitness-tracker/image2.png",
        "assets/images/projects/mobile-fitness-tracker/image3.png"
      ],
      categories: ["mobile", "fullstack"],
      tags: ["React Native", "Firebase", "Redux", "Health Kit", "Charts"],
      live: "#",
      repo: "https://github.com/omeroztprk/mobile-fitness-tracker",
      badges: []
    },
    {
      id: "blockchain-voting-system",
      title: "Blockchain Voting System",
      description: [
        "A secure and transparent voting system built on Ethereum blockchain, ensuring tamper-proof elections with smart contract integration and decentralized architecture.",
        "Features include voter authentication, anonymous voting, real-time results, and comprehensive audit trails. The system ensures complete transparency while maintaining voter privacy.",
        "Built with Solidity smart contracts, Web3.js integration, and a React frontend. Includes admin dashboard for election management and voter verification."
      ],
      cover: "assets/images/projects/blockchain-voting-system/cover.png",
      images: [
        "assets/images/projects/blockchain-voting-system/image1.png",
        "assets/images/projects/blockchain-voting-system/image2.png",
        "assets/images/projects/blockchain-voting-system/image3.png",
        "assets/images/projects/blockchain-voting-system/image4.png"
      ],
      categories: ["fullstack"],
      tags: ["Solidity", "Ethereum", "Web3.js", "React", "Truffle", "MetaMask"],
      live: "#",
      repo: "https://github.com/omeroztprk/blockchain-voting-system",
      badges: []
    },
    {
      id: "expense-tracker-pwa",
      title: "Expense Tracker PWA",
      description: [
        "A Progressive Web Application for personal expense tracking with offline capability, budget management, and financial insights through interactive charts and analytics.",
        "Features include category-based expense tracking, budget alerts, recurring transaction support, and data export functionality. Works seamlessly across all devices.",
        "Built with service workers for offline functionality and includes push notifications for budget warnings. Supports multiple currencies and exchange rate conversion."
      ],
      cover: "assets/images/projects/expense-tracker-pwa/cover.png",
      images: [
        "assets/images/projects/expense-tracker-pwa/image1.png",
        "assets/images/projects/expense-tracker-pwa/image2.png",
        "assets/images/projects/expense-tracker-pwa/image3.png"
      ],
      categories: ["frontend"],
      tags: ["PWA", "JavaScript", "Chart.js", "IndexedDB", "Service Worker"],
      live: "https://omeroztprk-expense-tracker.netlify.app",
      repo: "https://github.com/omeroztprk/expense-tracker-pwa",
      badges: []
    },
    {
      id: "recipe-sharing-platform",
      title: "Recipe Sharing Platform",
      description: [
        "A social platform for food enthusiasts to share, discover, and rate recipes. Built with Vue.js frontend and Laravel backend, featuring user profiles, recipe collections, and cooking timers.",
        "Includes advanced search and filtering, nutritional information calculation, meal planning features, and social interactions like comments, ratings, and recipe favorites.",
        "Features image optimization, recipe scaling calculations, and integration with grocery delivery services. Includes admin moderation tools and content management."
      ],
      cover: "assets/images/projects/recipe-sharing-platform/cover.png",
      images: [
        "assets/images/projects/recipe-sharing-platform/image1.png",
        "assets/images/projects/recipe-sharing-platform/image2.png",
        "assets/images/projects/recipe-sharing-platform/image3.png",
        "assets/images/projects/recipe-sharing-platform/image4.png"
      ],
      categories: ["fullstack"],
      tags: ["Vue.js", "Laravel", "MySQL", "Cloudinary", "Stripe", "ElasticSearch"],
      live: "#",
      repo: "https://github.com/omeroztprk/recipe-sharing-platform",
      badges: []
    },
    {
      id: "music-streaming-api",
      title: "Music Streaming API",
      description: [
        "A comprehensive music streaming backend API built with Python Django, supporting audio file management, user playlists, recommendations, and streaming analytics.",
        "Features include audio compression and optimization, real-time streaming, user preferences learning, and social features like playlist sharing and collaborative playlists.",
        "Implements caching strategies for optimal performance, supports multiple audio formats, and includes artist dashboard with streaming analytics and revenue tracking."
      ],
      cover: "assets/images/projects/music-streaming-api/cover.png",
      images: [
        "assets/images/projects/music-streaming-api/image1.png",
        "assets/images/projects/music-streaming-api/image2.png",
        "assets/images/projects/music-streaming-api/image3.png"
      ],
      categories: ["backend"],
      tags: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "AWS S3"],
      live: "#",
      repo: "https://github.com/omeroztprk/music-streaming-api",
      badges: []
    },
    {
      id: "inventory-management-system",
      title: "Inventory Management System",
      description: [
        "A comprehensive inventory management system for small to medium businesses, built with React and Node.js, featuring stock tracking, supplier management, and automated reordering.",
        "Includes barcode scanning, low stock alerts, sales analytics, and integration with accounting systems. Supports multi-location inventory tracking and transfer management.",
        "Features role-based access control, audit logging, and customizable reporting. Includes mobile app for warehouse staff with offline capability."
      ],
      cover: "assets/images/projects/inventory-management-system/cover.png",
      images: [
        "assets/images/projects/inventory-management-system/image1.png",
        "assets/images/projects/inventory-management-system/image2.png",
        "assets/images/projects/inventory-management-system/image3.png"
      ],
      categories: ["fullstack"],
      tags: ["React", "Node.js", "MongoDB", "Express", "Chart.js", "PDF"],
      live: "#",
      repo: "https://github.com/omeroztprk/inventory-management-system",
      badges: []
    },
    {
      id: "social-media-dashboard",
      title: "Social Media Dashboard",
      description: [
        "A unified social media management dashboard that aggregates data from multiple platforms including Twitter, Instagram, and Facebook, providing analytics and scheduling capabilities.",
        "Features include post scheduling, engagement analytics, hashtag research, competitor analysis, and automated reporting. Supports team collaboration and client management.",
        "Built with microservices architecture, real-time data processing, and comprehensive API integrations. Includes white-label options for agencies."
      ],
      cover: "assets/images/projects/social-media-dashboard/cover.png",
      images: [
        "assets/images/projects/social-media-dashboard/image1.png",
        "assets/images/projects/social-media-dashboard/image2.png",
        "assets/images/projects/social-media-dashboard/image3.png",
        "assets/images/projects/social-media-dashboard/image4.png"
      ],
      categories: ["fullstack"],
      tags: ["React", "Node.js", "MongoDB", "Social APIs", "Bull Queue", "Docker"],
      live: "#",
      repo: "https://github.com/omeroztprk/social-media-dashboard",
      badges: []
    },
    {
      id: "augmented-reality-app",
      title: "Augmented Reality Shopping App",
      description: [
        "An innovative AR shopping application that allows users to visualize furniture and home decor in their space before purchasing, built with React Native and ARCore/ARKit.",
        "Features include 3D model rendering, room measurement, product customization, and social sharing of AR experiences. Integrates with e-commerce platforms for seamless purchasing.",
        "Includes machine learning for room recognition, realistic lighting and shadow effects, and multi-user AR sessions for collaborative shopping experiences."
      ],
      cover: "assets/images/projects/augmented-reality-app/cover.png",
      images: [
        "assets/images/projects/augmented-reality-app/image1.png",
        "assets/images/projects/augmented-reality-app/image2.png",
        "assets/images/projects/augmented-reality-app/image3.png"
      ],
      categories: ["mobile", "ai"],
      tags: ["React Native", "ARKit", "ARCore", "Three.js", "TensorFlow", "Firebase"],
      live: "#",
      repo: "https://github.com/omeroztprk/augmented-reality-app",
      badges: []
    }
  ]
};