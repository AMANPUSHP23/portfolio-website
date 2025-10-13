import { 
  Code2, FileCode, Server, Container, GitBranch, 
  Database, Palette, Cloud, Settings, Workflow,
  Terminal, Wrench, Users, Lightbulb, Target,
  MessageSquare, Puzzle, Boxes
} from 'lucide-react';

export const skillCategories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills'];

export const allSkills = [
  // Programming Languages (Backend)
  {
    name: 'Java',
    level: 85,
    icon: Code2,
    category: 'Backend'
  },
  {
    name: 'Python',
    level: 80,
    icon: Code2,
    category: 'Backend'
  },
  {
    name: 'C',
    level: 75,
    icon: Code2,
    category: 'Backend'
  },
  {
    name: 'Node.js',
    level: 85,
    icon: Server,
    category: 'Backend'
  },
  {
    name: 'Express.js',
    level: 85,
    icon: Server,
    category: 'Backend'
  },
  // Frontend
  {
    name: 'ReactJS',
    level: 90,
    icon: Code2,
    category: 'Frontend'
  },
  {
    name: 'HTML',
    level: 95,
    icon: FileCode,
    category: 'Frontend'
  },
  {
    name: 'CSS',
    level: 90,
    icon: Palette,
    category: 'Frontend'
  },
  {
    name: 'JavaScript',
    level: 90,
    icon: Code2,
    category: 'Frontend'
  },
  {
    name: 'Tailwind CSS',
    level: 90,
    icon: Palette,
    category: 'Frontend'
  },
  {
    name: 'Bootstrap',
    level: 85,
    icon: Palette,
    category: 'Frontend'
  },
  // Database
  {
    name: 'SQL',
    level: 85,
    icon: Database,
    category: 'Database'
  },
  {
    name: 'Oracle',
    level: 75,
    icon: Database,
    category: 'Database'
  },
  {
    name: 'MongoDB',
    level: 85,
    icon: Database,
    category: 'Database'
  },
  {
    name: 'MySQL',
    level: 85,
    icon: Database,
    category: 'Database'
  },
  {
    name: 'PostgreSQL',
    level: 80,
    icon: Database,
    category: 'Database'
  },
  {
    name: 'AWS RDS',
    level: 85,
    icon: Database,
    category: 'Database'
  },
  {
    name: 'Dynamo DB',
    level: 80,
    icon: Database,
    category: 'Database'
  },
  // DevOps
  {
    name: 'AWS',
    level: 90,
    icon: Cloud,
    category: 'DevOps'
  },
  {
    name: 'Docker',
    level: 90,
    icon: Container,
    category: 'DevOps'
  },
  {
    name: 'Kubernetes',
    level: 85,
    icon: Boxes,
    category: 'DevOps'
  },
  {
    name: 'Jenkins',
    level: 85,
    icon: Settings,
    category: 'DevOps'
  },
  {
    name: 'Github Action',
    level: 90,
    icon: Workflow,
    category: 'DevOps'
  },
  // Tools
  {
    name: 'Git',
    level: 90,
    icon: GitBranch,
    category: 'Tools'
  },
  {
    name: 'Github',
    level: 90,
    icon: GitBranch,
    category: 'Tools'
  },
  {
    name: 'Linux',
    level: 80,
    icon: Terminal,
    category: 'Tools'
  },
  {
    name: 'Postman',
    level: 85,
    icon: Wrench,
    category: 'Tools'
  },
  {
    name: 'Figma',
    level: 75,
    icon: Palette,
    category: 'Tools'
  },
  // Soft Skills
  {
    name: 'Leadership',
    level: 85,
    icon: Users,
    category: 'Soft Skills'
  },
  {
    name: 'Critical Thinking',
    level: 90,
    icon: Lightbulb,
    category: 'Soft Skills'
  },
  {
    name: 'Collaboration',
    level: 90,
    icon: Users,
    category: 'Soft Skills'
  },
  {
    name: 'Adaptability',
    level: 85,
    icon: Target,
    category: 'Soft Skills'
  },
  {
    name: 'Problem-Solving',
    level: 95,
    icon: Puzzle,
    category: 'Soft Skills'
  },
  {
    name: 'Public Speaking',
    level: 80,
    icon: MessageSquare,
    category: 'Soft Skills'
  }
];
