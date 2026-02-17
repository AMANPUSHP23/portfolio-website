# 🚀 Deploy from AWS EC2 (Free Tier)

Your code is on GitHub. Now deploy directly from an EC2 instance in AWS!

---

## ✅ Architecture Overview

```
Your GitHub Repo
        ↓
   [EC2 Instance] ← Runs deployment
        ↓
   Terraform Deploy
        ↓
  [EKS Cluster] + [ALB] + [RDS] etc.
```

**Cost**: ~$11/month total  
**Time**: ~45 minutes to deploy  
**No local tools needed**: EC2 has everything!

---

## 🎯 Step 1: Launch an EC2 Bastion Host

This is a small EC2 instance that will deploy your infrastructure.

### Option A: Using AWS Console

1. **Go to EC2 Dashboard**: https://console.aws.amazon.com/ec2/
2. **Click "Launch Instances"**
3. **Choose AMI**: 
   - Select **Ubuntu 22.04 LTS** (Free Tier eligible)
   - Architecture: **64-bit (x86)**
4. **Instance Type**: **t3.micro** (FREE for 12 months)
5. **Storage**: Keep default (8GB, FREE)
6. **Security Group**:
   - Allow SSH (port 22) from your IP
   - Allow HTTPS (port 443) for API calls
7. **Key Pair**: 
   - Create new: `portfolio-deploy-key`
   - Download `.pem` file (keep it safe!)
8. **Launch Instance**

### Option B: Using AWS CLI (Faster)

```bash
# Run from your laptop
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.micro \
  --key-name portfolio-deploy-key \
  --security-groups portfolio-deployer \
  --region us-east-1 \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=portfolio-deployer}]'

# Note: Get the Instance ID from output
```

---

## 🔑 Step 2: Connect to Your EC2 Instance

### If you have the `.pem` key file:

```bash
# Set correct permissions (Windows)
# In your terminal, download the key file, then:
ssh -i "portfolio-deploy-key.pem" ubuntu@<your-ec2-public-ip>

# For Windows PowerShell:
# Right-click .pem file → Properties → Security → Advanced
# Remove inherited permissions, give only your user Full Control
```

### Find Your EC2 Public IP:
1. Go to EC2 Dashboard
2. Find your instance "portfolio-deployer"
3. Copy "Public IPv4 address"

---

## 📦 Step 3: Install Tools on EC2

Once you're SSH'd into the EC2 instance:

```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install required tools
sudo apt-get install -y \
  git \
  curl \
  wget \
  unzip \
  jq \
  python3-pip

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version

# Install Terraform
wget https://releases.hashicorp.com/terraform/1.14.5/terraform_1.14.5_linux_amd64.zip
unzip terraform_1.14.5_linux_amd64.zip
sudo mv terraform /usr/local/bin/
terraform --version

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client

# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version

# Install Node.js (for frontend build if needed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "✅ All tools installed!"
```

---

## 🔐 Step 4: Configure AWS Credentials on EC2

These credentials let Terraform deploy AWS resources.

### Get Your AWS Access Keys:
1. Go to AWS Console → IAM → Users → Your User
2. Security credentials → Access keys → Create access key
3. Copy: **Access Key ID** and **Secret Access Key**

### Configure on EC2:

```bash
# Run this on the EC2 instance
aws configure

# Enter:
# AWS Access Key ID: [PASTE YOUR ACCESS KEY]
# AWS Secret Access Key: [PASTE YOUR SECRET KEY]
# Default region: us-east-1
# Default output format: json

# Verify it worked:
aws sts get-caller-identity
# Should show your AWS account info
```

---

## 🛠️ Step 5: Clone Your GitHub Repository

```bash
# On the EC2 instance:
cd /home/ubuntu
git clone https://github.com/AMANPUSHP23/portfolio-website.git
cd portfolio-website

# Switch to Aws-project branch
git checkout Aws-project

# Verify files are there
ls -la terraform/
ls -la helm/
ls -la docs/
```

---

## 🌍 Step 6: Deploy Infrastructure with Terraform

```bash
# Navigate to terraform directory
cd /home/ubuntu/portfolio-website/terraform

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan deployment (review what will be created)
terraform plan -var-file=terraform.prod.tfvars -out=tfplan

# Expected output:
# + aws_vpc.main
# + aws_subnet.public[0,1,2]
# + aws_subnet.private[0,1,2]
# + aws_eks_cluster.portfolio
# + aws_eks_node_group.portfolio
# (No NAT Gateway, No ALB - as optimized)
```

### Review the plan carefully! Should show:
- ✅ 1 EKS cluster
- ✅ 1 node group (m7i-flex.large)
- ✅ VPC with 6 subnets (3 public, 3 private)
- ✅ Security groups
- ❌ NO NAT Gateway (disabled)
- ❌ NO ALB (using NodePort)
- ❌ NO monitoring stack (using CloudWatch free tier)

### If plan looks good:

```bash
# Apply the configuration
terraform apply tfplan

# This will take ~15-20 minutes
# You'll see:
# ... Creating aws_vpc.main
# ... Creating aws_eks_cluster.portfolio
# ... Creating aws_eks_node_group.portfolio
# ... AWS deployment complete!

# Save the outputs
terraform output > /tmp/terraform_outputs.json
cat /tmp/terraform_outputs.json

# These outputs include:
# - EKS cluster name
# - EKS endpoint
# - Node group name
```

---

## 🎯 Step 7: Deploy Application with Helm

After Terraform completes:

```bash
# Configure kubectl to use your EKS cluster
aws eks update-kubeconfig \
  --name portfolio-eks \
  --region us-east-1

# Verify kubectl connection
kubectl get nodes
# Should show 1 node running

# Navigate to Helm chart
cd /home/ubuntu/portfolio-website/helm

# Install the portfolio application
helm install portfolio ./portfolio \
  -n portfolio \
  --create-namespace \
  -f portfolio/values.yaml

# Wait for pod to be ready
kubectl get pods -n portfolio -w
# Press Ctrl+C when pod is Running and 1/1 Ready

# Check service
kubectl get svc -n portfolio
# Note the NodePort number (e.g., 30000-32767)
```

---

## 🌐 Step 8: Access Your Application

```bash
# Get the node IP
kubectl get nodes -o wide
# Copy the EXTERNAL-IP or INTERNAL-IP

# Get the NodePort
kubectl get svc -n portfolio
# Copy the port number (e.g., 30000)

# Access your app:
# http://<node-ip>:<nodeport>
# Example: http://10.0.1.100:30000

# Or from your laptop:
# First, get the EC2 security group and allow traffic on that port
```

---

## 📊 Step 9: Verify Costs

Make sure everything is running and costs are under control:

```bash
# Check AWS costs
aws ce get-cost-and-usage \
  --time-period Start=2026-02-01,End=2026-02-28 \
  --granularity DAILY \
  --metrics "UnblendedCost" \
  --group-by Type=DIMENSION,Key=SERVICE

# Should show:
# - EC2: ~$0.50 (bastion host, cost for deployment only)
# - EKS: ~$0 (free for 12 months)
# - EC2 (for EKS node): ~$9.50 (m7i-flex.large)
# - Total: ~$10/month ✅

# Enable billing alert
aws budgets create-budget \
  --account-id $(aws sts get-caller-identity --query Account --output text) \
  --budget file:///tmp/budget.json \
  --notifications-with-subscribers file:///tmp/notifications.json
```

---

## 🔍 Step 10: Monitoring & Maintenance

### View Logs

```bash
# Application logs
kubectl logs -f deployment/portfolio -n portfolio

# All resources in namespace
kubectl get all -n portfolio

# Pod details
kubectl describe pod <pod-name> -n portfolio
```

### Update Application

```bash
# After pushing new code to GitHub:
cd /home/ubuntu/portfolio-website

# Pull latest changes
git pull origin Aws-project

# Upgrade Helm release
helm upgrade portfolio ./helm/portfolio \
  -n portfolio \
  -f helm/portfolio/values.yaml
```

### Scale Application

```bash
# Scale to 2 pods if needed:
kubectl scale deployment portfolio \
  --replicas=2 \
  -n portfolio

# Or update values.yaml and run:
helm upgrade portfolio ./helm/portfolio \
  -n portfolio \
  --set replicaCount=2
```

---

## 📋 Step 11: Cleanup (If Needed)

**WARNING**: This will delete everything and you won't be charged anymore.

```bash
# Delete Helm release
helm uninstall portfolio -n portfolio

# Delete Kubernetes namespace
kubectl delete namespace portfolio

# Destroy all AWS infrastructure
cd /home/ubuntu/portfolio-website/terraform
terraform destroy -var-file=terraform.prod.tfvars

# Terminate EC2 bastion instance (do this last)
# Go to EC2 Console → Your Instance → Instance State → Terminate
```

---

## ✅ Full Deployment Checklist

- [ ] EC2 instance launched (t3.micro)
- [ ] SSH key downloaded and permissions set
- [ ] SSH connection to EC2 working
- [ ] All tools installed (terraform, kubectl, helm, aws-cli)
- [ ] AWS credentials configured with `aws configure`
- [ ] Repository cloned from GitHub
- [ ] `terraform plan` reviewed and looks correct
- [ ] `terraform apply` completed successfully (15-20 min)
- [ ] EKS cluster ready: `kubectl get nodes` shows 1 node
- [ ] Helm chart installed: `kubectl get pods -n portfolio` shows Running pod
- [ ] Application accessible: Can reach NodePort URL
- [ ] Costs verified: ~$11/month total
- [ ] Billing alert configured
- [ ] SSH access to EC2 documented for future updates

---

## 🚨 Troubleshooting

### "Terraform timeout creating EKS cluster"
- EKS can take 15-20 minutes to initialize
- Run: `terraform apply` again (it will resume)
- Check progress: `aws eks describe-cluster --name portfolio-eks`

### "Pod stuck in Pending"
```bash
kubectl describe pod <pod-name> -n portfolio
# Common issue: Not enough CPU/memory
# Solution: Check node resources: kubectl top nodes
```

### "Can't connect to application via NodePort"
```bash
# Check if service is created
kubectl get svc -n portfolio

# Get node IP and port
kubectl get nodes -o wide
kubectl get svc -n portfolio -o wide

# Test locally on EC2 instance
curl http://localhost:30000
```

### "AWS credentials not working"
```bash
# Verify credentials
aws sts get-caller-identity

# If error, reconfigure
aws configure
# And enter your Access Key and Secret Key again
```

---

## 💰 Final Cost Summary

| Component | Monthly Cost | 12 Month Free Tier |
|-----------|--------------|------------------|
| **Bastion EC2 (t3.micro)** | $0 | ✅ Free (tear down after deploy) |
| **EKS Cluster** | $0 | ✅ Free (first 12 months) |
| **Worker Node (m7i-flex.large)** | $9.50 | ❌ Not free, but LOW cost |
| **Data Transfer** | $1-2 | Minimal |
| **CloudWatch** | $0 | ✅ Free tier sufficient |
| **────────────────** | **──────** | ─────────────── |
| **TOTAL** | **~$11/month** | ✅ **Within your $74 budget** |

**Remaining Budget**: ~$63/month for growth! 🎉

---

## 📞 Next Steps

1. **Immediately**:
   - Launch EC2 instance (t3.micro)
   - Download SSH key
   - Connect via SSH

2. **Within 30 minutes**:
   - Install all tools on EC2
   - Clone your GitHub repo
   - Run terraform init

3. **Next 20 minutes**:
   - Run terraform apply
   - Wait for EKS cluster to initialize

4. **Final 10 minutes**:
   - Deploy with Helm
   - Access your application

**Total deployment time**: ~45 minutes ⏱️

---

**Branch**: Aws-project  
**Repository**: AMANPUSHP23/portfolio-website  
**Status**: ✅ Ready to deploy from EC2  

Good luck! 🚀
