# DevOps Infrastructure Setup Guide

This guide provides step-by-step instructions to set up the complete DevOps infrastructure for the portfolio website as shown in the Architecture Diagram.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture Overview](#architecture-overview)
- [Local Development Setup](#local-development-setup)
- [AWS Infrastructure Setup](#aws-infrastructure-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Logging](#monitoring--logging)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

1. **Docker & Docker Compose**
   ```bash
   docker --version  # v20.10+
   docker-compose --version  # v2.0+
   ```

2. **Kubernetes Tools**
   ```bash
   kubectl version --client
   helm version
   ```

3. **Terraform**
   ```bash
   terraform version  # v1.5.0+
   ```

4. **AWS CLI**
   ```bash
   aws --version  # v2.0+
   aws configure  # Set up AWS credentials
   ```

5. **Git**
   ```bash
   git --version
   ```

### AWS Account Requirements

- AWS account with appropriate IAM permissions
- VPC with internet connectivity
- S3 bucket for Terraform state (optional but recommended)
- ECR repository for Docker images (or use GitHub Container Registry)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      End Users                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │   ALB (Application Load        │
        │   Balancer)                    │
        └────────────┬───────────────────┘
                     │
        ┌────────────▼──────────────────┐
        │  AWS EKS Cluster              │
        │  ┌──────────────────────────┐ │
        │  │  Kubernetes Namespaces   │ │
        │  │  ┌────────────────────┐  │ │
        │  │  │ portfolio-app (3x) │  │ │
        │  │  └────────────────────┘  │ │
        │  │  ┌────────────────────┐  │ │
        │  │  │ Monitoring Stack   │  │ │
        │  │  │ (Prometheus, Loki) │  │ │
        │  │  └────────────────────┘  │ │
        │  └──────────────────────────┘ │
        └───────────┬──────────────────┘
                    │
        ┌───────────▼──────────────┐
        │  Bastion Host (Optional) │
        └──────────────────────────┘
```

## Local Development Setup

### 1. Build Docker Image

```bash
cd /path/to/portfolio2

# Build the image
docker build -t portfolio:latest .

# Test the image
docker run -p 3000:3000 portfolio:latest
```

### 2. Run with Docker Compose (Local Dev)

```bash
# Start all services with monitoring
docker-compose up -d

# View logs
docker-compose logs -f app

# Access the application
# App: http://localhost:3000
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001 (admin/admin)
# Loki: http://localhost:3100

# Stop services
docker-compose down
```

### 3. Verify Local Setup

```bash
# Check container health
docker-compose ps

# Check application
curl http://localhost:3000

# Check monitoring stack
curl http://localhost:9090/api/v1/targets
```

## AWS Infrastructure Setup

### 1. Initial AWS Setup

```bash
# Configure AWS credentials
aws configure
# Enter: AWS Access Key ID
# Enter: AWS Secret Access Key
# Enter: Default region (us-east-1)
# Enter: Default output format (json)

# Verify credentials
aws sts get-caller-identity
```

### 2. Create Terraform State Backend (Recommended)

```bash
# Create S3 bucket for state
aws s3 mb s3://portfolio-terraform-state-$(date +%s) --region us-east-1

# Create DynamoDB table for state locking
aws dynamodb create-table \
  --table-name portfolio-terraform-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --region us-east-1
```

### 3. Initialize and Plan Terraform

```bash
cd terraform

# Initialize Terraform
terraform init

# Format Terraform files
terraform fmt -recursive

# Validate configuration
terraform validate

# Plan infrastructure
terraform plan -var-file=terraform.prod.tfvars -out=tfplan

# Review the plan carefully
```

### 4. Apply Terraform Configuration

```bash
# Apply the plan
terraform apply tfplan

# Wait for EKS cluster creation (15-20 minutes)

# Export outputs
terraform output -json > outputs.json

# Get kubeconfig
aws eks update-kubeconfig --region us-east-1 --name portfolio-eks
```

### 5. Verify AWS Infrastructure

```bash
# Check EKS cluster
aws eks describe-cluster --name portfolio-eks --region us-east-1

# Check node groups
aws eks describe-nodegroup --cluster-name portfolio-eks --nodegroup-name portfolio-node-group

# Verify kubectl connection
kubectl get nodes
kubectl get namespaces
```

## Kubernetes Deployment

### 1. Create Namespaces and Resources

```bash
# Create portfolio namespace
kubectl apply -f k8s/namespace.yaml

# Create configuration and policies
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/network-policy.yaml
kubectl apply -f k8s/policy.yaml
```

### 2. Push Docker Image to ECR

```bash
# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Create ECR repository
aws ecr create-repository --repository-name portfolio --region us-east-1

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com

# Build and push image
docker build -t ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest .
docker push ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest
```

### 3. Deploy with Helm

```bash
# Add Helm repository (if using external repo)
helm repo add portfolio https://your-helm-repo
helm repo update

# Install using local Helm chart
helm install portfolio ./helm/portfolio \
  --namespace portfolio \
  --values helm/portfolio/values.yaml

# Verify Helm release
helm list -n portfolio
helm status portfolio -n portfolio

# Get service endpoint
kubectl get service portfolio-service -n portfolio
```

### 4. Verify Kubernetes Deployment

```bash
# Check deployments
kubectl get deployments -n portfolio
kubectl describe deployment portfolio-app -n portfolio

# Check pods
kubectl get pods -n portfolio
kubectl logs -n portfolio -f deployment/portfolio-app

# Check services
kubectl get svc -n portfolio
kubectl get ingress -n portfolio

# Check HPA status
kubectl get hpa -n portfolio
```

## CI/CD Pipeline

### 1. GitHub Actions Setup

The repository includes GitHub Actions workflows:

- **docker-build.yml**: Builds and pushes Docker images
- **deploy-k8s.yml**: Deploys to Kubernetes
- **deploy-terraform.yml**: Manages infrastructure
- **test.yml**: Runs tests and security scans

### 2. Configure GitHub Secrets

Add these secrets to your GitHub repository:

```bash
AWS_ROLE_ARN          # IAM role for GitHub Actions (with OIDC)
AWS_REGION            # us-east-1
EKS_CLUSTER_NAME      # portfolio-eks
TF_STATE_BUCKET       # Your terraform state bucket
SLACK_WEBHOOK         # Optional: Slack notifications
SNYK_TOKEN            # Optional: Security scanning
```

### 3. Setup GitHub Actions OIDC (Recommended)

```bash
# Create OIDC provider
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1

# Create IAM role for GitHub Actions
aws iam create-role \
  --role-name github-actions-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Federated": "arn:aws:iam::'${ACCOUNT_ID}':oidc-provider/token.actions.githubusercontent.com"
        },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition": {
          "StringLike": {
            "token.actions.githubusercontent.com:sub": "repo:AMANPUSHP23/portfolio-website:*"
          }
        }
      }
    ]
  }'

# Attach policies
aws iam attach-role-policy \
  --role-name github-actions-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser

aws iam attach-role-policy \
  --role-name github-actions-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSFullAccess

aws iam attach-role-policy \
  --role-name github-actions-role \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

## Monitoring & Logging

### 1. Deploy Monitoring Stack

```bash
# Create monitoring namespace
kubectl create namespace monitoring

# Apply monitoring configurations
kubectl apply -f k8s/monitoring/rbac.yaml
kubectl apply -f k8s/monitoring/prometheus-config.yaml
kubectl apply -f k8s/monitoring/prometheus.yaml
kubectl apply -f k8s/monitoring/grafana.yaml
```

### 2. Access Monitoring Services

```bash
# Port forward Prometheus
kubectl port-forward -n monitoring svc/prometheus 9090:9090 &

# Port forward Grafana
kubectl port-forward -n monitoring svc/grafana 3000:3000 &

# Access dashboards
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3000
```

### 3. Configure Grafana Data Source

1. Login to Grafana (admin/admin)
2. Go to Configuration → Data Sources
3. Add Prometheus:
   - URL: `http://prometheus:9090`
   - Save & Test

### 4. Create Dashboards

Import sample dashboards or create custom ones for monitoring:
- Pod CPU usage
- Pod memory usage
- Request latency
- Error rates

### 5. CloudWatch Integration

```bash
# Configure CloudWatch Logs
# Update terraform/monitoring.tf with proper IAM roles

# View EKS logs
aws logs tail /aws/eks/portfolio-eks/cluster --follow
```

## Troubleshooting

### Common Issues

#### 1. EKS Cluster Creation Fails

```bash
# Check Terraform state
terraform show

# Check AWS resources
aws eks list-clusters

# Review CloudFormation events
aws cloudformation describe-stack-events --stack-name eks-portfolio-cluster
```

#### 2. Pods Not Running

```bash
# Check pod events
kubectl describe pod <pod-name> -n portfolio

# Check logs
kubectl logs <pod-name> -n portfolio

# Check resource allocation
kubectl top pods -n portfolio
```

#### 3. ALB Not Routing Traffic

```bash
# Check ALB
aws elbv2 describe-load-balancers

# Check target groups
aws elbv2 describe-target-groups

# Check security groups
aws ec2 describe-security-groups
```

#### 4. Monitoring Not Working

```bash
# Check Prometheus targets
kubectl port-forward -n monitoring svc/prometheus 9090:9090
# Visit http://localhost:9090/targets

# Check Promtail logs
kubectl logs -n monitoring -f -l app=promtail
```

### Cleanup & Destroy

```bash
# Remove Kubernetes resources
helm uninstall portfolio -n portfolio
kubectl delete namespace portfolio monitoring

# Destroy infrastructure
cd terraform
terraform destroy -var-file=terraform.prod.tfvars

# Remove S3 state bucket
aws s3 rm s3://portfolio-terraform-state-* --recursive
aws s3 rb s3://portfolio-terraform-state-*

# Delete DynamoDB table
aws dynamodb delete-table --table-name portfolio-terraform-lock
```

## Security Best Practices

1. **Network Security**
   - Use private subnets for EKS nodes
   - Configure security groups properly
   - Enable VPC Flow Logs

2. **Identity & Access**
   - Use IAM roles, not access keys
   - Enable RBAC in Kubernetes
   - Use NetworkPolicies

3. **Data Protection**
   - Enable S3 encryption
   - Use TLS for communication
   - Rotate credentials regularly

4. **Monitoring**
   - Monitor all API calls with CloudTrail
   - Set up alerts for security events
   - Review logs regularly

## Additional Resources

- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

## Support & Contribution

For issues or questions:
1. Check the troubleshooting section
2. Review logs and events
3. Open an issue on GitHub
4. Contact the DevOps team

---

**Last Updated**: February 2026
**Maintainer**: DevOps Team
