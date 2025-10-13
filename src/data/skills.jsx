import { 
  Code, Palette, Server, Database, GitBranch, Cloud, 
  Container, Boxes, Settings, Workflow, Terminal, 
  Wrench, Users, Lightbulb, Target, MessageSquare, Puzzle,
  FileCode, HardDrive, Zap, Network, Box, FileJson, Shield
} from 'lucide-react';

export const allSkills = [
  // Backend
  { name: "Java", level: 85, icon: Code, category: "Backend" },
  { name: "Python", level: 80, icon: Code, category: "Backend" },
  { name: "C", level: 75, icon: Code, category: "Backend" },
  { name: "Node.js", level: 85, icon: Server, category: "Backend" },
  { name: "Express.js", level: 85, icon: Server, category: "Backend" },
  
  // Frontend
  { name: "ReactJS", level: 90, icon: Code, category: "Frontend" },
  { name: "HTML", level: 95, icon: FileCode, category: "Frontend" },
  { name: "CSS", level: 90, icon: Palette, category: "Frontend" },
  { name: "JavaScript", level: 90, icon: Code, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, icon: Palette, category: "Frontend" },
  { name: "Bootstrap", level: 85, icon: Palette, category: "Frontend" },
  
  // Database
  { name: "SQL", level: 85, icon: Database, category: "Database" },
  { name: "Oracle", level: 75, icon: Database, category: "Database" },
  { name: "MongoDB", level: 85, icon: Database, category: "Database" },
  { name: "MySQL", level: 85, icon: Database, category: "Database" },
  { name: "PostgreSQL", level: 80, icon: Database, category: "Database" },
  { name: "AWS RDS", level: 85, icon: Database, category: "Database" },
  { name: "Dynamo DB", level: 80, icon: Database, category: "Database" },
  { name: "Aurora MySQL", level: 85, icon: Database, category: "Database" },
  
  // Cloud
  { name: "AWS", level: 90, icon: Cloud, category: "Cloud" },
  
  // AWS Services - Compute & Networking
  { name: "EC2", level: 88, icon: Server, category: "AWS Services" },
  { name: "Lambda", level: 85, icon: Zap, category: "AWS Services" },
  { name: "Elastic Beanstalk", level: 80, icon: Box, category: "AWS Services" },
  { name: "ECS", level: 82, icon: Container, category: "AWS Services" },
  { name: "EKS", level: 80, icon: Boxes, category: "AWS Services" },
  { name: "VPC", level: 85, icon: Network, category: "AWS Services" },
  { name: "Route 53", level: 85, icon: Network, category: "AWS Services" },
  { name: "CloudFront", level: 85, icon: Cloud, category: "AWS Services" },
  { name: "ELB", level: 83, icon: Network, category: "AWS Services" },
  { name: "Auto Scaling", level: 82, icon: Settings, category: "AWS Services" },
  
  // AWS Services - Storage
  { name: "S3", level: 90, icon: HardDrive, category: "AWS Services" },
  { name: "EBS", level: 80, icon: HardDrive, category: "AWS Services" },
  
  // AWS Services - API & Integration
  { name: "API Gateway", level: 83, icon: Network, category: "AWS Services" },
  { name: "SNS", level: 75, icon: MessageSquare, category: "AWS Services" },
  { name: "SQS", level: 75, icon: MessageSquare, category: "AWS Services" },
  
  // AWS Services - Security & Monitoring
  { name: "IAM", level: 88, icon: Shield, category: "AWS Services" },
  { name: "CloudWatch", level: 85, icon: Settings, category: "AWS Services" },
  { name: "CloudTrail", level: 80, icon: FileCode, category: "AWS Services" },
  { name: "Systems Manager", level: 78, icon: Settings, category: "AWS Services" },
  
  // AWS Services - IaC & DevOps
  { name: "CloudFormation", level: 82, icon: FileJson, category: "AWS Services" },
  { name: "CodePipeline", level: 80, icon: Workflow, category: "AWS Services" },
  { name: "CodeBuild", level: 78, icon: Settings, category: "AWS Services" },
  { name: "ECR", level: 85, icon: Container, category: "AWS Services" },
  
  // DevOps
  { name: "Docker", level: 90, icon: Container, category: "DevOps" },
  { name: "Docker Compose", level: 85, icon: Container, category: "DevOps" },
  { name: "Kubernetes", level: 85, icon: Boxes, category: "DevOps" },
  { name: "Helm", level: 75, icon: Box, category: "DevOps" },
  { name: "Terraform", level: 90, icon: FileJson, category: "DevOps" },
  { name: "Ansible", level: 75, icon: Settings, category: "DevOps" },
  { name: "Bash Scripting", level: 85, icon: Terminal, category: "DevOps" },
  { name: "Nginx", level: 80, icon: Server, category: "DevOps" },
  { name: "Prometheus", level: 70, icon: Settings, category: "DevOps" },
  { name: "Grafana", level: 70, icon: Settings, category: "DevOps" },
  { name: "GitLab CI/CD", level: 75, icon: Workflow, category: "DevOps" },
  
  // CI/CD
  { name: "Jenkins", level: 85, icon: Settings, category: "CI/CD" },
  { name: "Github Action", level: 90, icon: Workflow, category: "CI/CD" },
  { name: "CI/CD Pipelines", level: 92, icon: Workflow, category: "CI/CD" },
  
  // Infrastructure & Automation
  { name: "Infrastructure as Code", level: 90, icon: Code, category: "Infrastructure" },
  { name: "Automation", level: 90, icon: Settings, category: "Infrastructure" },
  { name: "Security & Scalability", level: 88, icon: Shield, category: "Infrastructure" },
  { name: "HTTPS & Health Checks", level: 85, icon: Shield, category: "Infrastructure" },
  { name: "Cost Optimization", level: 82, icon: Lightbulb, category: "Infrastructure" },
  
  // Tools
  { name: "Git", level: 90, icon: GitBranch, category: "Tools" },
  { name: "Github", level: 90, icon: GitBranch, category: "Tools" },
  { name: "Linux", level: 80, icon: Terminal, category: "Tools" },
  { name: "Postman", level: 85, icon: Wrench, category: "Tools" },
  { name: "Figma", level: 75, icon: Palette, category: "Tools" },
  
  // Soft Skills
  { name: "Leadership", level: 85, icon: Users, category: "Soft Skills" },
  { name: "Critical Thinking", level: 90, icon: Lightbulb, category: "Soft Skills" },
  { name: "Collaboration", level: 90, icon: Users, category: "Soft Skills" },
  { name: "Adaptability", level: 85, icon: Target, category: "Soft Skills" },
  { name: "Problem-Solving", level: 95, icon: Puzzle, category: "Soft Skills" },
  { name: "Public Speaking", level: 80, icon: MessageSquare, category: "Soft Skills" },
];

export const skillCategories = ["Cloud", "AWS Services", "DevOps", "CI/CD", "Infrastructure", "Database", "Backend", "Frontend", "Tools", "Soft Skills"];
