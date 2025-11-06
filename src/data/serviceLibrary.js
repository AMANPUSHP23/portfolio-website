// Complete library of AWS and DevOps services for the architecture playground

export const serviceCategories = {
  compute: {
    name: 'Compute',
    color: 'orange',
    services: [
      { id: 'ec2', label: 'EC2', icon: '💻', description: 'Virtual servers in the cloud' },
      { id: 'lambda', label: 'Lambda', icon: '⚡', description: 'Serverless compute service' },
      { id: 'ecs', label: 'ECS', icon: '🐳', description: 'Container orchestration service' },
      { id: 'eks', label: 'EKS', icon: '☸️', description: 'Managed Kubernetes service' },
      { id: 'fargate', label: 'Fargate', icon: '📦', description: 'Serverless containers' },
      { id: 'batch', label: 'AWS Batch', icon: '📚', description: 'Batch computing at any scale' },
      { id: 'elasticbeanstalk', label: 'Elastic Beanstalk', icon: '🪴', description: 'PaaS for web apps' },
      { id: 'autoscaling', label: 'Auto Scaling', icon: '📈', description: 'Scale compute capacity automatically' },
    ],
  },
  storage: {
    name: 'Storage',
    color: 'green',
    services: [
      { id: 's3', label: 'S3', icon: '🗄️', description: 'Object storage service' },
      { id: 'ebs', label: 'EBS', icon: '💾', description: 'Block storage for EC2' },
      { id: 'efs', label: 'EFS', icon: '📁', description: 'Elastic file system' },
      { id: 'glacier', label: 'Glacier', icon: '🧊', description: 'Archive storage' },
      { id: 'fsx', label: 'FSx', icon: '🧮', description: 'High-performance file systems' },
      { id: 'storagegateway', label: 'Storage Gateway', icon: '🧱', description: 'Hybrid cloud storage' },
      { id: 'backup', label: 'AWS Backup', icon: '🛟', description: 'Centralized backup' },
    ],
  },
  database: {
    name: 'Database',
    color: 'blue',
    services: [
      { id: 'rds', label: 'RDS', icon: '🗃️', description: 'Managed relational database' },
      { id: 'dynamodb', label: 'DynamoDB', icon: '⚡', description: 'NoSQL database' },
      { id: 'elasticache', label: 'ElastiCache', icon: '🔥', description: 'In-memory cache' },
      { id: 'aurora', label: 'Aurora', icon: '🌟', description: 'MySQL/PostgreSQL compatible' },
      { id: 'mongodb', label: 'MongoDB', icon: '🍃', description: 'Document database' },
      { id: 'aurora-serverless', label: 'Aurora Serverless', icon: '✨', description: 'On-demand auto-scaling Aurora' },
      { id: 'neptune', label: 'Neptune', icon: '🔗', description: 'Graph database' },
      { id: 'opensearch', label: 'OpenSearch', icon: '🔎', description: 'Search & analytics engine' },
    ],
  },
  networking: {
    name: 'Networking',
    color: 'purple',
    services: [
      { id: 'vpc', label: 'VPC', icon: '🌐', description: 'Virtual private cloud' },
      { id: 'cloudfront', label: 'CloudFront', icon: '⚡', description: 'Content delivery network' },
      { id: 'route53', label: 'Route 53', icon: '🌐', description: 'DNS service' },
      { id: 'alb', label: 'ALB', icon: '⚖️', description: 'Application load balancer' },
      { id: 'nlb', label: 'NLB', icon: '⚖️', description: 'Network load balancer' },
      { id: 'apigateway', label: 'API Gateway', icon: '🚪', description: 'API management' },
      { id: 'natgw', label: 'NAT Gateway', icon: '🧩', description: 'Outbound internet for private subnets' },
      { id: 'tgw', label: 'Transit Gateway', icon: '🛤️', description: 'Network hub for VPCs' },
      { id: 'vpn', label: 'VPN', icon: '🛰️', description: 'Site-to-site VPN' },
      { id: 'directconnect', label: 'Direct Connect', icon: '🔌', description: 'Dedicated network link' },
      { id: 'cloudmap', label: 'Cloud Map', icon: '🗺️', description: 'Service discovery' },
    ],
  },
  cicd: {
    name: 'CI/CD',
    color: 'red',
    services: [
      { id: 'jenkins', label: 'Jenkins', icon: '🔨', description: 'Automation server' },
      { id: 'github', label: 'GitHub', icon: '🐙', description: 'Source control' },
      { id: 'gitlab', label: 'GitLab', icon: '🦊', description: 'DevOps platform' },
      { id: 'argocd', label: 'ArgoCD', icon: '🚀', description: 'GitOps CD tool' },
      { id: 'codepipeline', label: 'CodePipeline', icon: '🔄', description: 'AWS CI/CD service' },
      { id: 'codebuild', label: 'CodeBuild', icon: '🏗️', description: 'Build service' },
      { id: 'codedeploy', label: 'CodeDeploy', icon: '📦', description: 'Automated application deployments' },
      { id: 'gha', label: 'GitHub Actions', icon: '⚙️', description: 'CI/CD workflows' },
      { id: 'bitbucket', label: 'Bitbucket', icon: '🧵', description: 'Source control & pipelines' },
      { id: 'fluxcd', label: 'FluxCD', icon: '🌀', description: 'GitOps CD for Kubernetes' },
      { id: 'argo-rollouts', label: 'Argo Rollouts', icon: '🎯', description: 'Progressive delivery for K8s' },
    ],
  },
  monitoring: {
    name: 'Monitoring',
    color: 'yellow',
    services: [
      { id: 'cloudwatch', label: 'CloudWatch', icon: '📊', description: 'Monitoring & logs' },
      { id: 'prometheus', label: 'Prometheus', icon: '🔥', description: 'Metrics collection' },
      { id: 'grafana', label: 'Grafana', icon: '📈', description: 'Visualization platform' },
      { id: 'elk', label: 'ELK Stack', icon: '🔍', description: 'Log analytics' },
      { id: 'datadog', label: 'Datadog', icon: '🐕', description: 'Full-stack monitoring' },
      { id: 'xray', label: 'X-Ray', icon: '🧬', description: 'Distributed tracing' },
      { id: 'otel', label: 'OpenTelemetry', icon: '🧪', description: 'Telemetry standard' },
      { id: 'loki', label: 'Loki', icon: '🗂️', description: 'Promtail + Loki logs' },
      { id: 'newrelic', label: 'New Relic', icon: '💠', description: 'APM & observability' },
    ],
  },
  security: {
    name: 'Security',
    color: 'pink',
    services: [
      { id: 'iam', label: 'IAM', icon: '🔐', description: 'Identity & access management' },
      { id: 'waf', label: 'WAF', icon: '🛡️', description: 'Web application firewall' },
      { id: 'secrets', label: 'Secrets Manager', icon: '🔑', description: 'Secrets storage' },
      { id: 'kms', label: 'KMS', icon: '🔒', description: 'Key management service' },
      { id: 'guardduty', label: 'GuardDuty', icon: '👮', description: 'Threat detection' },
      { id: 'securityhub', label: 'Security Hub', icon: '🧰', description: 'Security posture management' },
      { id: 'inspector', label: 'Inspector', icon: '🔎', description: 'Automated security assessment' },
      { id: 'cognito', label: 'Cognito', icon: '🪪', description: 'User identity and auth' },
      { id: 'config', label: 'AWS Config', icon: '🧭', description: 'Resource config & compliance' },
      { id: 'cloudtrail', label: 'CloudTrail', icon: '👣', description: 'Audit logs & governance' },
      { id: 'vault', label: 'Vault', icon: '🏦', description: 'Secrets & encryption management' },
    ],
  },
  containers: {
    name: 'Containers',
    color: 'cyan',
    services: [
      { id: 'docker', label: 'Docker', icon: '🐳', description: 'Container platform' },
      { id: 'k8s', label: 'Kubernetes', icon: '☸️', description: 'Container orchestration' },
      { id: 'helm', label: 'Helm', icon: '⎈', description: 'K8s package manager' },
      { id: 'ecr', label: 'ECR', icon: '📦', description: 'Container registry' },
      { id: 'dockerhub', label: 'Docker Hub', icon: '🐋', description: 'Container registry' },
      { id: 'istio', label: 'Istio', icon: '🧭', description: 'Service mesh' },
      { id: 'linkerd', label: 'Linkerd', icon: '🧵', description: 'Ultralight service mesh' },
    ],
  },
  messaging: {
    name: 'Messaging',
    color: 'yellow',
    services: [
      { id: 'sqs', label: 'SQS', icon: '📬', description: 'Message queuing' },
      { id: 'sns', label: 'SNS', icon: '📣', description: 'Pub/Sub notifications' },
      { id: 'eventbridge', label: 'EventBridge', icon: '🕸️', description: 'Event bus & routing' },
      { id: 'kinesis', label: 'Kinesis', icon: '🌊', description: 'Real-time data streams' },
      { id: 'msk', label: 'MSK (Kafka)', icon: '🧯', description: 'Managed Kafka' },
      { id: 'rabbitmq', label: 'RabbitMQ', icon: '🐰', description: 'Message broker' },
    ],
  },
  serverless: {
    name: 'Serverless',
    color: 'pink',
    services: [
      { id: 'stepfunctions', label: 'Step Functions', icon: '🧩', description: 'Serverless workflows' },
      { id: 'appsync', label: 'AppSync', icon: '🧷', description: 'Managed GraphQL' },
    ],
  },
  analytics: {
    name: 'Analytics',
    color: 'blue',
    services: [
      { id: 'athena', label: 'Athena', icon: '🏹', description: 'Serverless SQL on S3' },
      { id: 'glue', label: 'Glue', icon: '🧪', description: 'Serverless data integration' },
      { id: 'redshift', label: 'Redshift', icon: '🧱', description: 'Data warehouse' },
      { id: 'quicksight', label: 'QuickSight', icon: '📊', description: 'Business intelligence' },
    ],
  },
  iac: {
    name: 'Infrastructure as Code',
    color: 'purple',
    services: [
      { id: 'terraform', label: 'Terraform', icon: '🟪', description: 'IaC provisioning' },
      { id: 'cloudformation', label: 'CloudFormation', icon: '🧱', description: 'AWS IaC templates' },
      { id: 'pulumi', label: 'Pulumi', icon: '🟣', description: 'IaC in real languages' },
      { id: 'ansible', label: 'Ansible', icon: '🅰️', description: 'Config management & automation' },
      { id: 'packer', label: 'Packer', icon: '📦', description: 'Golden image builds' },
    ],
  },
  artifacts: {
    name: 'Artifacts',
    color: 'green',
    services: [
      { id: 'artifactory', label: 'Artifactory', icon: '🏗️', description: 'Universal artifact repo' },
      { id: 'nexus', label: 'Nexus', icon: '🧰', description: 'Repository manager' },
    ],
  },
  platform: {
    name: 'Platform & Ops',
    color: 'orange',
    services: [
      { id: 'ssm', label: 'Systems Manager', icon: '🛠️', description: 'SSM, Session Manager, Patch' },
    ],
  },
  cost: {
    name: 'Cost & Usage',
    color: 'cyan',
    services: [
      { id: 'costexplorer', label: 'Cost Explorer', icon: '💹', description: 'Cost analysis & reports' },
      { id: 'budgets', label: 'Budgets', icon: '💰', description: 'Alerts for cost & usage' },
    ],
  },
};

// Color mapping for visual consistency
export const colorStyles = {
  orange: 'bg-orange-500/10 border-orange-500 hover:bg-orange-500/20',
  green: 'bg-green-500/10 border-green-500 hover:bg-green-500/20',
  blue: 'bg-blue-500/10 border-blue-500 hover:bg-blue-500/20',
  purple: 'bg-purple-500/10 border-purple-500 hover:bg-purple-500/20',
  red: 'bg-red-500/10 border-red-500 hover:bg-red-500/20',
  yellow: 'bg-yellow-500/10 border-yellow-500 hover:bg-yellow-500/20',
  pink: 'bg-pink-500/10 border-pink-500 hover:bg-pink-500/20',
  cyan: 'bg-cyan-500/10 border-cyan-500 hover:bg-cyan-500/20',
};

// Pre-made templates users can start from
export const templates = {
  blank: {
    name: 'Blank Canvas',
    description: 'Start from scratch',
    nodes: [],
    edges: [],
  },
  webApp: {
    name: 'Web Application',
    description: 'Basic web app architecture',
    nodes: [
      {
        id: '1',
        type: 'custom',
        position: { x: 250, y: 50 },
        data: {
          label: 'CloudFront',
          icon: '⚡',
          subtitle: 'CDN',
          style: 'bg-blue-500/10 border-blue-500',
        },
      },
      {
        id: '2',
        type: 'custom',
        position: { x: 250, y: 150 },
        data: {
          label: 'ALB',
          icon: '⚖️',
          subtitle: 'Load Balancer',
          style: 'bg-purple-500/10 border-purple-500',
        },
      },
      {
        id: '3',
        type: 'custom',
        position: { x: 250, y: 250 },
        data: {
          label: 'EC2',
          icon: '💻',
          subtitle: 'Web Server',
          style: 'bg-orange-500/10 border-orange-500',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true },
      { id: 'e2-3', source: '2', target: '3', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true },
    ],
  },
  cicd: {
    name: 'CI/CD Pipeline',
    description: 'Basic deployment pipeline',
    nodes: [
      {
        id: '1',
        type: 'custom',
        position: { x: 50, y: 150 },
        data: {
          label: 'GitHub',
          icon: '🐙',
          subtitle: 'Source',
          style: 'bg-gray-500/10 border-gray-500',
        },
      },
      {
        id: '2',
        type: 'custom',
        position: { x: 200, y: 150 },
        data: {
          label: 'Jenkins',
          icon: '🔨',
          subtitle: 'Build',
          style: 'bg-red-500/10 border-red-500',
        },
      },
      {
        id: '3',
        type: 'custom',
        position: { x: 350, y: 150 },
        data: {
          label: 'Docker',
          icon: '🐳',
          subtitle: 'Package',
          style: 'bg-cyan-500/10 border-cyan-500',
        },
      },
      {
        id: '4',
        type: 'custom',
        position: { x: 500, y: 150 },
        data: {
          label: 'Kubernetes',
          icon: '☸️',
          subtitle: 'Deploy',
          style: 'bg-blue-500/10 border-blue-500',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true },
      { id: 'e2-3', source: '2', target: '3', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true },
      { id: 'e3-4', source: '3', target: '4', sourceHandle: 'right-source', targetHandle: 'left-target', animated: true },
    ],
  },
  microservices: {
    name: 'Microservices',
    description: 'Microservices architecture',
    nodes: [
      {
        id: '1',
        type: 'custom',
        position: { x: 250, y: 50 },
        data: {
          label: 'API Gateway',
          icon: '🚪',
          subtitle: 'Entry Point',
          style: 'bg-purple-500/10 border-purple-500',
        },
      },
      {
        id: '2',
        type: 'custom',
        position: { x: 100, y: 150 },
        data: {
          label: 'Service A',
          icon: '📦',
          subtitle: 'Microservice',
          style: 'bg-blue-500/10 border-blue-500',
        },
      },
      {
        id: '3',
        type: 'custom',
        position: { x: 250, y: 150 },
        data: {
          label: 'Service B',
          icon: '📦',
          subtitle: 'Microservice',
          style: 'bg-blue-500/10 border-blue-500',
        },
      },
      {
        id: '4',
        type: 'custom',
        position: { x: 400, y: 150 },
        data: {
          label: 'Service C',
          icon: '📦',
          subtitle: 'Microservice',
          style: 'bg-blue-500/10 border-blue-500',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', sourceHandle: 'bottom-source', targetHandle: 'top-target', animated: true },
      { id: 'e1-3', source: '1', target: '3', sourceHandle: 'bottom-source', targetHandle: 'top-target', animated: true },
      { id: 'e1-4', source: '1', target: '4', sourceHandle: 'bottom-source', targetHandle: 'top-target', animated: true },
    ],
  },
};
