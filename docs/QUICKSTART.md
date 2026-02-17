# Quick Start Guide - DevOps Infrastructure

This guide provides a quick overview to get started with the DevOps infrastructure.

## 🚀 5-Minute Quick Start (Local)

```bash
# 1. Navigate to project directory
cd portfolio2

# 2. Build Docker image
docker build -t portfolio:latest .

# 3. Run with Docker Compose
docker-compose up -d

# 4. Access services
echo "App: http://localhost:3000"
echo "Prometheus: http://localhost:9090"
echo "Grafana: http://localhost:3001"

# 5. Check logs
docker-compose logs -f app
```

## 📋 Prerequisites Checklist

- [ ] Docker & Docker Compose installed
- [ ] kubectl configured
- [ ] Helm installed
- [ ] Terraform installed
- [ ] AWS CLI configured with credentials

## 🏗️ Full Infrastructure Deployment (AWS)

### Step 1: Prepare AWS Environment

```bash
# Set variables
export AWS_REGION=us-east-1
export PROJECT_NAME=portfolio

# Verify AWS access
aws sts get-caller-identity
```

### Step 2: Setup Terraform

```bash
cd terraform

# Initialize
terraform init

# Plan
terraform plan -var-file=terraform.prod.tfvars -out=tfplan

# Apply (takes ~20 minutes)
terraform apply tfplan
```

### Step 3: Configure kubectl

```bash
# Get kubeconfig
aws eks update-kubeconfig --region us-east-1 --name portfolio-eks

# Verify connection
kubectl get nodes
```

### Step 4: Deploy Application

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Or use Helm
helm install portfolio helm/portfolio -n portfolio --create-namespace

# Verify deployment
kubectl get pods -n portfolio
```

### Step 5: Setup Monitoring

```bash
# Deploy monitoring stack
kubectl create namespace monitoring
kubectl apply -f k8s/monitoring/

# Access dashboards
kubectl port-forward -n monitoring svc/prometheus 9090:9090 &
kubectl port-forward -n monitoring svc/grafana 3000:3000 &
```

## 📊 Architecture Components

```
Internet → ALB → EKS Cluster → Portfolio App (3 replicas)
                     ↓
                  Monitoring Stack (Prometheus + Grafana)
                     ↓
                  Logging Stack (Loki + Promtail)
```

## 🔍 Monitoring & Logs

### Prometheus Metrics

```bash
# Port forward
kubectl port-forward -n monitoring svc/prometheus 9090:9090

# View targets: http://localhost:9090/targets
# View metrics: http://localhost:9090/api/v1/targets
```

### Grafana Dashboards

```bash
# Port forward
kubectl port-forward -n monitoring svc/grafana 3000:3000

# Access: http://localhost:3000
# Default credentials: admin/admin
```

### View Application Logs

```bash
# Recent logs
kubectl logs -n portfolio deployment/portfolio-app

# Follow logs
kubectl logs -n portfolio -f deployment/portfolio-app

# Logs from specific pod
kubectl logs -n portfolio -f <pod-name>
```

## 🔄 CI/CD Workflows

GitHub Actions automatically triggers on:
- **Push to main**: Build Docker image, Deploy to K8s
- **Pull requests**: Run tests, Build image (no push)
- **Terraform changes**: Plan infrastructure changes

### Manual Deployment

```bash
# Using GitHub CLI
gh workflow run deploy-k8s.yml --ref main

# Or deploy with Helm
helm upgrade portfolio helm/portfolio -n portfolio
```

## 📈 Scaling

```bash
# Manual scale
kubectl scale deployment portfolio-app --replicas=5 -n portfolio

# Auto-scaling status
kubectl get hpa -n portfolio
kubectl describe hpa portfolio-hpa -n portfolio
```

## 🧹 Cleanup

```bash
# Remove Kubernetes resources
kubectl delete namespace portfolio monitoring

# Destroy AWS infrastructure
cd terraform
terraform destroy -var-file=terraform.prod.tfvars

# Remove docker-compose resources
docker-compose down -v
```

## 🆘 Common Commands

```bash
# Check cluster status
kubectl cluster-info
kubectl get nodes

# View deployments
kubectl get deployments -n portfolio

# Check service endpoints
kubectl get svc -n portfolio
kubectl get ingress -n portfolio

# View resource usage
kubectl top nodes
kubectl top pods -n portfolio

# Debug pod issues
kubectl describe pod <pod-name> -n portfolio
kubectl exec -it <pod-name> -n portfolio -- /bin/sh
```

## 📚 Detailed Guides

For comprehensive setup instructions, see:
- [Full DevOps Setup Guide](DEVOPS_SETUP.md)
- [Architecture Documentation](../docs/architecture.md)

## 🚨 Troubleshooting

### Pods not starting?
```bash
kubectl describe pod <pod-name> -n portfolio
kubectl logs <pod-name> -n portfolio
```

### ALB not accessible?
```bash
aws elbv2 describe-load-balancers
aws elbv2 describe-target-groups
```

### Monitoring not working?
```bash
kubectl get pods -n monitoring
kubectl logs -n monitoring <pod-name>
```

## 📞 Support

For detailed help:
1. Review DEVOPS_SETUP.md
2. Check pod logs and events
3. Run `kubectl describe` on resources
4. Check AWS CloudWatch logs

---

**Quick Links**:
- [Full Documentation](DEVOPS_SETUP.md)
- [Kubernetes Manifests](../k8s/)
- [Terraform Code](../terraform/)
- [Helm Charts](../helm/)
