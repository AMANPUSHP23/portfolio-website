
import React from "react";

export const projectCategories = ["All", "Cloud & DevOps", "Full Stack (MERN)"];

export const projects = [
  // Cloud & DevOps Projects
  {
    id: 1,
    title: "VProfile Web Application Deployment on AWS (DevOps & Cloud Automation)",
    description: "Deployed and automated a multi-tier web application on AWS using EC2, ALB, Auto Scaling, and Route 53, integrating MySQL, Memcached, RabbitMQ, and Tomcat for optimized performance. Implemented artifact deployment with Maven → S3, ensured HTTPS security, health checks, and cost-efficient scaling for high availability.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    tags: ["AWS", "EC2", "S3", "ALB", "Auto Scaling", "Route 53", "MySQL", "Tomcat", "Maven", "DevOps"],
    category: "Cloud & DevOps",
    liveUrl: "#",
    repoUrl: "https://github.com/AMANPUSHP23/vprofile-project-awsliftandshift.git",
  },
  {
    id: 2,
    title: "CI/CD Pipeline with Jenkins",
    description: "Built end-to-end CI/CD pipeline using Jenkins, Docker, and GitHub Actions. Automated testing, building, and deployment to AWS EC2 with automated rollback capabilities.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80",
    tags: ["Jenkins", "Docker", "GitHub Actions", "CI/CD", "AWS"],
    category: "Cloud & DevOps",
    liveUrl: "#",
    repoUrl: "https://github.com/AMANPUSHP23/cicd-jenkins-pipeline",
  },
  {
    id: 3,
    title: "Kubernetes Microservices Deployment",
    description: "Deployed microservices architecture on Kubernetes cluster. Implemented Helm charts, auto-scaling, monitoring with Prometheus/Grafana, and service mesh with Istio.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80",
    tags: ["Kubernetes", "Docker", "Helm", "Prometheus", "Grafana"],
    category: "Cloud & DevOps",
    liveUrl: "#",
    repoUrl: "https://github.com/AMANPUSHP23/k8s-microservices",
  },
  {
    id: 4,
    title: "Docker Containerization & Orchestration",
    description: "Containerized multi-tier application using Docker and Docker Compose. Optimized images, implemented health checks, and set up multi-stage builds for production deployment.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=600&q=80",
    tags: ["Docker", "Docker Compose", "Nginx", "Container"],
    category: "Cloud & DevOps",
    liveUrl: "#",
    repoUrl: "https://github.com/AMANPUSHP23/docker-app-deployment",
  },
  
  // MERN Stack Projects
  {
    id: 5,
    title: "Routinezen",
    description: "A cutting-edge, futuristic web app for tracking and managing daily routines. Built with React and a powerful tech stack, RoutineZen blends sleek design and smooth animations to deliver an immersive user experience.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Stripe"],
    category: "Full Stack (MERN)",
    liveUrl: "https://routinezen.netlify.app/",
    repoUrl: "https://github.com/AMANPUSHP23/RoutineZen.git",
  },
  {
    id: 6,
    title: "AI-planner",
    description: "The AI-Planner Dashboard is a futuristic platform that merges AI automation, sleek UI, and real-time interactions to streamline social media strategy and personal planning, simulating SaaS features and OpenAI-powered capabilities.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Socket.io"],
    category: "Full Stack (MERN)",
    liveUrl: "https://ai-planner-app.netlify.app/",
    repoUrl: "https://github.com/AMANPUSHP23/AI-planner.git",
  },
  {
    id: 7,
    title: "PushpSetu",
    description: "PUSHP SETU is a futuristic House Management System that simplifies household tasks like tracking chores, managing expenses, and organizing inventory through a sleek, responsive interface designed to streamline and smarten daily living.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "JWT"],
    category: "Full Stack (MERN)",
    liveUrl: "https://pushp-setu.netlify.app/",
    repoUrl: "https://github.com/AMANPUSHP23/Pushp-Setu.git",
  },
  {
    id: 8,
    title: "Personal Portfolio Website",
    description: "This modern portfolio website showcasing my skills and projects. Built with React, TailwindCSS, and Framer Motion for smooth animations and responsive design.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "TailwindCSS", "Framer Motion", "Responsive"],
    category: "Full Stack (MERN)",
    liveUrl: "https://amanpushp23.netlify.app/",
    repoUrl: "https://github.com/AMANPUSHP23/portfolio-amanpushp.git",
  },

    {
    id: 9,
    title: "Lifeline",
    description: "A modern web-based Blood Bank Management System designed to streamline blood donation and transfusion by connecting donors, recipients, and hospitals in real time with intuitive UI, smart search, and efficient coordination.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "JWT"],
    category: "Full Stack (MERN)",
    liveUrl: "https://lifeline-blood-system.netlify.app/",
    repoUrl: "https://github.com/AMANPUSHP23/LifeLine-Blood-System.git",
  },

    {
    id: 10,
    title: "JobQuest",
    description: "JobQuest is an advanced job-hunting platform featuring seamless user login, real-time job listings, smart filtering, and modern design—crafted using the MERN stack for a smooth, responsive, and secure experience.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "TailwindCSS", "Framer Motion", "Responsive"],
    category: "Full Stack (MERN)",
    liveUrl: "https://jobquesthunt.netlify.app/register",
    repoUrl: "https://github.com/AMANPUSHP23/JobQuest.git",
  },

  {
    id: 11,
    title: "Food Delight",
    description: "A web application for exploring and ordering meals, offering a wide range of recipes from various cuisines. Built to provide a user-friendly platform for users to discover and indulge in culinary delights.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "TailwindCSS", "Framer Motion", "Responsive"],
    category: "Full Stack (MERN)",
    liveUrl: "#",
    repoUrl: "https://github.com/AMANPUSHP23/foodapp.git",
  },

  {
    id: 12,
    title: "Lime Road Clone",
    description: "A shopping website clone built with React, featuring product browsing, user authentication, wishlist management, and dynamic data handling using JSON-Server APIs. Includes a responsive UI designed with Bootstrap and Chakra UI.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "TailwindCSS", "Framer Motion", "Responsive"],
    category: "Full Stack (MERN)",
    liveUrl: "#",
    repoUrl: "https://github.com/AMANPUSHP23/limeroad_clone.com.git",
  },


];
