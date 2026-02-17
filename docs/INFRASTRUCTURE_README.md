# DevOps Infrastructure - Complete Setup

This directory contains the complete DevOps infrastructure code for deploying the portfolio website on AWS EKS with Kubernetes, Helm, and comprehensive monitoring.

## 📁 Directory Structure

```
.
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Local development stack
├── .dockerignore                 # Docker build excludes
├── k8s/                          # Kubernetes manifests
│   ├── namespace.yaml            # Namespace and config
│   ├── deployment.yaml           # Application deployment
│   ├── service.yaml              # Kubernetes services
│   ├── hpa.yaml                  # Auto-scaling config
│   ├── network-policy.yaml       # Network policies
│   ├── policy.yaml               # Pod policies and quotas
│   └── monitoring/               # Monitoring resources
│       ├── prometheus-config.yaml
│       ├── prometheus.yaml
│       ├── grafana.yaml
│       └── rbac.yaml
├── helm/                         # Helm charts
│   └── portfolio/
│       ├── Chart.yaml            # Chart metadata
│       ├── values.yaml           # Default values
│       └── templates/            # K8s templates
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── ingress.yaml
│           ├── hpa.yaml
│           ├── pdb.yaml
│           ├── network-policy.yaml
│           ├── serviceaccount.yaml
│           └── _helpers.tpl
├── terraform/                    # Infrastructure as Code
│   ├── main.tf                   # Providers setup
│   ├── variables.tf              # Input variables
│   ├── vpc.tf                    # VPC and networking
│   ├── eks.tf                    # EKS cluster setup
│   ├── alb.tf                    # Load balancer config
│   ├── monitoring.tf             # Monitoring setup
│   ├── outputs.tf                # Output values
│   ├── terraform.dev.tfvars      # Dev environment config
│   └── terraform.prod.tfvars     # Prod environment config
├── .github/workflows/            # CI/CD pipelines
│   ├── docker-build.yml          # Docker build & push
│   ├── deploy-k8s.yml            # K8s deployment
│   ├── deploy-terraform.yml      # Infrastructure deployment
│   └── test.yml                  # Tests and security scans
├── monitoring/                   # Monitoring configuration
│   ├── prometheus.yml            # Prometheus scrape config
│   ├── loki-config.yml           # Loki config
│   └── promtail-config.yml       # Promtail config
├── scripts/                      # Helper scripts
│   ├── deploy.sh                 # Interactive deployment script
│   └── local-dev-setup.sh        # Local environment setup
└── docs/                         # Documentation
    ├── DEVOPS_SETUP.md           # Comprehensive setup guide
    ├── QUICKSTART.md             # Quick start guide
    └── README.md                 # This file
```

## 🎯 Architecture

The infrastructure implements a production-ready architecture:

```
┌─────────────────┐
│   End Users     │
└────────┬────────┘
         │ Internet
         ▼
┌─────────────────┐
│  Route 53 (DNS) │
└────────┬────────┘
         │
         ▼
┌────────────────────────────┐
│  AWS ALB                   │
│  (Application Load         │
│   Balancer)                │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│  AWS VPC                           │
│  ┌──────────────┐ ┌──────────────┐│
│  │ Public       │ │ Private      ││
│  │ Subnets      │ │ Subnets      ││
│  │              │ │              ││
│  │ ┌──────────┐ │ │ ┌──────────┐││
│  │ │ NAT      │ │ │ │ EKS      │││
│  │ │ Gateway  │─┼─┤ │ Cluster  │││
│  │ │          │ │ │ │          │││
│  │ │ Bastion  │ │ │ │ Pods     │││
│  │ │ (opt)    │ │ │ │          │││
│  │ └──────────┘ │ │ └──────────┘││
│  └──────────────┘ └──────────────┘│
│                                    │
│  ┌──────────────────────────────┐ │
│  │ Monitoring Stack              │ │
│  │ (Prometheus, Loki, Grafana)   │ │
│  └──────────────────────────────┘ │
└────────────────────────────────────┘
         │
         ▼
┌──────────────────────────┐
│ S3 (Terraform state,    │
│    logs, artifacts)     │
└──────────────────────────┘
```

## 🚀 Quick Start

### Option 1: Local Development

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run local setup
./scripts/local-dev-setup.sh

# Access services
# App: http://localhost:3000
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001
```

### Option 2: AWS Deployment

```bash
# Check prerequisites
./scripts/deploy.sh

# Follow the interactive menu
```

### Option 3: Manual Commands

```bash
# Build Docker image
docker build -t portfolio:latest .

# Deploy infrastructure
cd terraform
terraform init
terraform plan -var-file=terraform.prod.tfvars
terraform apply

# Configure kubectl
aws eks update-kubeconfig --region us-east-1 --name portfolio-eks

# Deploy with Helm
helm install portfolio helm/portfolio -n portfolio --create-namespace
```

## 📋 Key Components

### Docker & Container Registry
- Multi-stage Dockerfile for optimized images
- Support for ECR and GitHub Container Registry
- Automated builds via GitHub Actions

### Kubernetes
- EKS cluster in AWS
- 3 replicas with auto-scaling (2-10 pods)
- Network policies and RBAC
- Resource quotas and limits
- Pod disruption budgets

### Helm
- Production-ready Helm chart
- Configurable values for different environments
- Support for Ingress, HPA, and PDB
- Network policies included

### Infrastructure as Code (Terraform)
- Complete VPC setup with public/private subnets
- NAT Gateways for private subnet egress
- EKS cluster and managed node groups
- Application Load Balancer (ALB)
- CloudWatch monitoring and logging
- S3 for state and logs

### CI/CD (GitHub Actions)
- Docker image building and pushing
- Automated Kubernetes deployment
- Infrastructure deployment with Terraform
- Testing and security scanning

### Monitoring & Logging
- Prometheus for metrics collection
- Grafana for visualization
- Loki for log aggregation
- Promtail for log shipping
- CloudWatch integration

## 🔐 Security Features

- Non-root container execution
- Read-only root filesystem
- Network policies for pod communication
- RBAC enabled
- IAM roles for service accounts
- Secrets management
- Security group restrictions
- VPC isolation with private subnets

## 📊 Monitoring & Observability

- **Prometheus**: Collects metrics from pods and nodes
- **Grafana**: Visualize metrics and logs
- **Loki**: Centralized log storage
- **CloudWatch**: AWS native monitoring
- Custom dashboards and alerts

## 🔄 Deployment Workflows

### Local Development
1. Push code to repository
2. Docker image builds automatically
3. Test locally with docker-compose
4. View logs and metrics in local stack

### Staging Environment
1. Push to develop branch
2. GitHub Actions builds and tests
3. Deploy to staging EKS cluster
4. Run integration tests

### Production Deployment
1. Create pull request
2. Code review and approval
3. Merge to main branch
4. GitHub Actions:
   - Builds Docker image
   - Runs security scans
   - Deploys to production EKS
   - Updates infrastructure if needed

## 🛠️ Common Operations

### Scale Application

```bash
# Manual scaling
kubectl scale deployment portfolio-app --replicas=5 -n portfolio

# Check auto-scaling
kubectl get hpa -n portfolio
kubectl describe hpa portfolio-hpa -n portfolio
```

### Monitor Deployment

```bash
# Check pod status
kubectl get pods -n portfolio

# View logs
kubectl logs -f deployment/portfolio-app -n portfolio

# Check metrics
kubectl top pods -n portfolio
```

### Update Deployment

```bash
# Update with Helm
helm upgrade portfolio helm/portfolio -n portfolio

# Or using kubectl
kubectl set image deployment/portfolio-app \
  portfolio=portfolio:v2.0 \
  -n portfolio
```

### Access Monitoring

```bash
# Prometheus
kubectl port-forward -n monitoring svc/prometheus 9090:9090

# Grafana
kubectl port-forward -n monitoring svc/grafana 3000:3000

# Access: http://localhost:3000 (admin/admin)
```

## 🧹 Cleanup

```bash
# Remove application
helm uninstall portfolio -n portfolio
kubectl delete namespace portfolio

# Remove monitoring
kubectl delete namespace monitoring

# Destroy infrastructure
cd terraform
terraform destroy -var-file=terraform.prod.tfvars

# Remove local containers
docker-compose down -v
```

## 📚 Documentation

- [Full Setup Guide](docs/DEVOPS_SETUP.md) - Comprehensive step-by-step guide
- [Quick Start](docs/QUICKSTART.md) - Fast setup for experienced users
- [Kubernetes Manifests](k8s/README.md) - K8s configuration details
- [Terraform Code](terraform/README.md) - Infrastructure code documentation

## 🐛 Troubleshooting

### Pods not starting?
```bash
kubectl describe pod <pod-name> -n portfolio
kubectl logs <pod-name> -n portfolio
```

### Service not accessible?
```bash
kubectl get svc -n portfolio
kubectl get ingress -n portfolio
aws elbv2 describe-load-balancers
```

### Monitoring issues?
```bash
kubectl get pods -n monitoring
kubectl logs -n monitoring -f prometheus-0
```

For more help, see the [Troubleshooting section](docs/DEVOPS_SETUP.md#troubleshooting) in the full setup guide.

## 📞 Support

- Review the documentation files
- Check pod logs and events
- Verify AWS resources
- Review GitHub Actions logs

## 🤝 Contributing

When modifying infrastructure:

1. Make changes in a feature branch
2. Run `terraform plan` and review
3. Test in development environment first
4. Create pull request for review
5. Deploy to staging after approval

## 📄 License

See LICENSE file in the repository

## 🔗 Resources

- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Kubernetes Documentation](https://kubernetes.io/)
- [Helm Documentation](https://helm.sh/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/)
- [Prometheus Docs](https://prometheus.io/docs/)
- [Grafana Docs](https://grafana.com/docs/)

---

**Created**: February 2026  
**Last Updated**: February 2026  
**Maintained By**: DevOps Team
