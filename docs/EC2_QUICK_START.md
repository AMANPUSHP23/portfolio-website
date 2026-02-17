# 🚀 QUICK START: Deploy from AWS EC2

**Save this file - it has everything you need!**

---

## 📋 One-Time Setup (Do This First)

### 1. Launch EC2 Instance
```
Go to: https://console.aws.amazon.com/ec2/
Click: Launch Instances
Select: Ubuntu 22.04 LTS
Type: t3.micro (FREE)
Storage: 8GB (FREE)
Security: SSH from your IP, HTTPS
Key Pair: Create "portfolio-deploy-key" (download .pem file)
Launch!
```

### 2. Get Your Instance IP
```
EC2 Dashboard → Your Instance → Copy "Public IPv4 address"
Example: 54.123.45.67
```

### 3. Connect via SSH
```bash
# From your laptop:
ssh -i "portfolio-deploy-key.pem" ubuntu@54.123.45.67
```

---

## 🛠️ Install Everything (Run on EC2)

```bash
# Copy-paste this entire block into your EC2 SSH terminal:

sudo apt-get update && sudo apt-get upgrade -y

sudo apt-get install -y git curl wget unzip jq python3-pip

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install && aws --version

wget https://releases.hashicorp.com/terraform/1.14.5/terraform_1.14.5_linux_amd64.zip
unzip terraform_1.14.5_linux_amd64.zip && sudo mv terraform /usr/local/bin/ && terraform --version

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/ && kubectl version --client

curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash && helm version

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "✅ All tools installed!"
```

---

## 🔑 Configure AWS Credentials (Run on EC2)

```bash
# Get credentials from: AWS Console → IAM → Users → Your User → Security credentials
# Click "Create access key" and copy both values

aws configure
# Paste: Access Key ID
# Paste: Secret Access Key
# Region: us-east-1
# Output: json

# Verify it worked:
aws sts get-caller-identity
```

---

## 📥 Clone & Deploy (Run on EC2)

```bash
# Clone your repository
cd /home/ubuntu
git clone https://github.com/AMANPUSHP23/portfolio-website.git
cd portfolio-website
git checkout Aws-project

# Deploy infrastructure (takes ~20 minutes)
cd terraform
terraform init
terraform validate
terraform plan -var-file=terraform.prod.tfvars -out=tfplan

# Review the plan - should show:
# ✅ 1 EKS cluster
# ✅ 1 node (m7i-flex.large)
# ❌ NO NAT Gateway
# ❌ NO ALB
# ❌ NO monitoring stack

# If plan looks good, apply it:
terraform apply tfplan

echo "✅ Infrastructure deployed! (EKS will take 15-20 minutes to initialize)"

# Wait for EKS to be ready:
aws eks describe-cluster --name portfolio-eks --query 'cluster.status'
# Wait until it shows: "ACTIVE"
```

---

## 🎯 Deploy Your App (Run on EC2)

```bash
# Configure kubectl
aws eks update-kubeconfig --name portfolio-eks --region us-east-1

# Verify cluster is ready
kubectl get nodes
# Should show 1 node

# Deploy application with Helm
cd /home/ubuntu/portfolio-website/helm
helm install portfolio ./portfolio \
  -n portfolio \
  --create-namespace \
  -f portfolio/values.yaml

# Wait for pod to be ready
kubectl get pods -n portfolio -w
# Press Ctrl+C when you see: portfolio-xxx   1/1   Running

# Get your app's access details
kubectl get svc -n portfolio
# Copy the NodePort (e.g., 30000)

kubectl get nodes -o wide
# Copy the INTERNAL-IP (e.g., 10.0.1.100)

echo "✅ App deployed! Access at: http://10.0.1.100:30000"
```

---

## 🌐 Access Your Application

```bash
# From the output above, you have:
# NodeIP: 10.0.1.100 (or similar)
# NodePort: 30000 (or 30001, 30002, etc.)

# Access locally on EC2:
curl http://10.0.1.100:30000

# Access from your laptop:
# Option 1: SSH tunnel
ssh -i "portfolio-deploy-key.pem" -L 8080:10.0.1.100:30000 ubuntu@54.123.45.67
# Then visit: http://localhost:8080

# Option 2: Open security group
# EC2 Dashboard → Security Groups → Add inbound rule
# Type: Custom TCP
# Port: 30000 (the NodePort)
# Source: Your IP (0.0.0.0/0 = anyone)
# Then visit: http://54.123.45.67:30000
```

---

## 💰 Verify Costs

```bash
# On your EC2 instance, check costs:
aws ce get-cost-and-usage \
  --time-period Start=2026-02-01,End=2026-02-28 \
  --granularity DAILY \
  --metrics "UnblendedCost" \
  --group-by Type=DIMENSION,Key=SERVICE

# Should show:
# - EKS: ~$0 (free for 12 months)
# - EC2 (node): ~$9.50 (m7i-flex.large)
# - Total: ~$10/month ✅

# When done with deployment, terminate the bastion EC2:
# EC2 Console → Your bastion instance → Instance State → Terminate
# (Save money - you don't need it anymore after deployment)
```

---

## 🔄 Update Your App (Later, When You Push New Code)

```bash
# On EC2, pull latest code:
cd /home/ubuntu/portfolio-website
git pull origin Aws-project

# Update Helm release:
helm upgrade portfolio ./helm/portfolio \
  -n portfolio \
  -f helm/portfolio/values.yaml

# Check rollout:
kubectl rollout status deployment/portfolio -n portfolio
```

---

## 🗑️ Clean Up (Only if You Want to Delete Everything)

```bash
# Delete Kubernetes stuff
helm uninstall portfolio -n portfolio
kubectl delete namespace portfolio

# Delete AWS infrastructure
cd /home/ubuntu/portfolio-website/terraform
terraform destroy -var-file=terraform.prod.tfvars

# Terminate EC2 bastion (do this last)
# EC2 Console → Instances → Select bastion → Terminate
```

---

## ⏱️ Timeline

| Step | Time | What Happens |
|------|------|-------------|
| Launch EC2 | 5 min | Instance boots up |
| Install tools | 10 min | Downloads and installs terraform, kubectl, helm, aws-cli |
| Configure AWS | 5 min | Adds your credentials |
| Clone repo | 1 min | Downloads code from GitHub |
| Terraform init | 2 min | Prepares Terraform |
| Terraform apply | 20 min | **Creates EKS cluster (longest step)** |
| Helm deploy | 5 min | Deploys your app |
| **TOTAL** | **~48 min** | **Your app is live!** |

---

## 🆘 Troubleshooting

### "Connection refused" when SSH
- ✅ Check security group allows SSH from your IP
- ✅ Check instance is running
- ✅ Check you're using the right .pem file

### "terraform apply stuck for 20+ minutes"
- ✅ This is normal for EKS cluster creation
- ✅ Let it run
- ✅ If it times out, run again: `terraform apply tfplan`

### "Pod stuck in Pending"
```bash
kubectl describe pod <pod-name> -n portfolio
# Shows why it can't start (usually CPU/memory)
```

### "Can't access app via NodePort"
```bash
# Check service
kubectl get svc -n portfolio -o wide
# Check node
kubectl get nodes -o wide
# Test from EC2: curl http://<node-ip>:<port>
# Check security group allows the port
```

---

## 📚 Full Documentation

After deployment, read these for more details:

- `docs/EC2_DEPLOYMENT_GUIDE.md` - Full step-by-step guide
- `docs/FREE_TIER_DEPLOYMENT_GUIDE.md` - Free tier optimization details
- `docs/AWS_COST_OPTIMIZATION.md` - Cost breakdown and analysis
- `docs/DEVOPS_SETUP.md` - Architecture and component details

---

## 🎯 Key Points

✅ **Cost**: ~$11/month (within your $74 budget)  
✅ **Deployment**: From EC2, no local tools needed  
✅ **Instance**: m7i-flex.large (your maximum allowed)  
✅ **Time**: ~45 minutes total  
✅ **Scalable**: Can upgrade later when free tier expires  

---

## 💬 Your GitHub Branch

**Repository**: AMANPUSHP23/portfolio-website  
**Branch**: Aws-project  
**Status**: ✅ Ready to deploy  

All code is on GitHub - no local storage needed!

---

**Happy Deploying! 🚀**
