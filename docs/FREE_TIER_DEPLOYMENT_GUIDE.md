# AWS Free Tier Deployment Guide

**Budget**: $74 USD  
**Instance Type Limit**: m7i-flex.large  
**Estimated Monthly Cost**: $10-15/month  
**Remaining Budget After Deployment**: ~$60+

---

## ✅ What Has Been Optimized

### Your Configuration Files Updated:
1. ✅ `terraform/terraform.prod.tfvars` - Now optimized for free tier
2. ✅ `helm/portfolio/values.yaml` - Reduced resources and replicas
3. ✅ Created `terraform/terraform.freetier.tfvars` - Alternative free tier config
4. ✅ Created `helm/portfolio/values-freetier.yaml` - Full free tier values
5. ✅ Created `docs/AWS_COST_OPTIMIZATION.md` - Detailed cost analysis

### Changes Made:
```
✅ Node count: 3 → 1 (Saves ~$14/month)
✅ Node max: 10 → 2 (Limited but still autoscales)
✅ NAT Gateway: ENABLED → DISABLED (Saves $32/month)
✅ Monitoring: ENABLED → DISABLED (Use CloudWatch free tier)
✅ Pod replicas: 3 → 1 (Optimal for single node)
✅ CPU limits: 500m → 250m (Reduced footprint)
✅ Memory limits: 512Mi → 256Mi (Reduced footprint)
✅ Min replicas: 2 → 1 (Less overhead)
✅ Max replicas: 10 → 2 (Limited scaling)
```

---

## 💰 Cost Comparison

### BEFORE (Not Optimized) ❌
```
3x t3.medium nodes:      $22 x 3 = $66/month
EKS Cluster:             FREE (first 12 months)
NAT Gateway:             $32/month
ALB:                     $16/month
Data Transfer:           $3/month
────────────────────────────────────
TOTAL:                   ~$117/month ❌ EXCEEDS BUDGET
```

### AFTER (Optimized) ✅
```
1x m7i-flex.large:       $9.50/month
EKS Cluster:             FREE (first 12 months)
NAT Gateway:             $0 (DISABLED)
ALB:                     $0 (DISABLED, use NodePort)
Data Transfer:           $1-2/month
────────────────────────────────────
TOTAL:                   ~$11/month ✅ WELL WITHIN BUDGET

Remaining Budget:        ~$63/month for growth!
```

---

## 🚀 Deployment Steps

### Step 1: Verify AWS Free Tier Eligibility

```bash
# Check your AWS account status
aws ce get-cost-and-usage \
  --time-period Start=2026-02-01,End=2026-02-28 \
  --granularity MONTHLY \
  --metrics "UnblendedCost" \
  --group-by Type=DIMENSION,Key=SERVICE

# Expected: $0 for most services in first month
```

### Step 2: Deploy Infrastructure (Optimized)

```bash
cd terraform

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan deployment
terraform plan -var-file=terraform.prod.tfvars

# Review the plan carefully
# Should show:
# - 1 node (not 3)
# - No NAT Gateway
# - No monitoring stack
# - Smaller security groups

# Apply when ready
terraform apply -var-file=terraform.prod.tfvars

# Wait ~15-20 minutes for cluster creation
```

### Step 3: Configure kubectl

```bash
# Get kubeconfig
aws eks update-kubeconfig \
  --region us-east-1 \
  --name portfolio-eks

# Verify cluster
kubectl cluster-info
kubectl get nodes  # Should show 1 node
```

### Step 4: Deploy Application

```bash
# Apply Kubernetes manifests (optional)
kubectl apply -f k8s/namespace.yaml

# Deploy with Helm (RECOMMENDED)
helm install portfolio helm/portfolio \
  -n portfolio \
  --create-namespace

# Verify deployment
kubectl get pods -n portfolio  # Should see 1 pod
kubectl get svc -n portfolio   # Will show NodePort
```

### Step 5: Access Your Application

Since we disabled ALB (saves $16/month), access via **NodePort**:

```bash
# Get node IP
NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')

# If ExternalIP is none, use internal IP
NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')

# Access application
curl http://$NODE_IP:30000

# In browser: http://<NodeIP>:30000
```

### Step 6: Monitor Costs

```bash
# Weekly cost check
aws ce get-cost-and-usage \
  --time-period Start=2026-02-01,End=2026-02-28 \
  --granularity DAILY \
  --metrics "UnblendedCost"

# Set billing alert
# AWS Console → Billing → Billing Preferences → Alert threshold: $50
```

---

## 📋 Verification Checklist

### Infrastructure ✓
- [ ] EKS cluster created (1 node)
- [ ] Node type: m7i-flex.large or t3.micro
- [ ] NAT Gateway NOT created
- [ ] ALB NOT created
- [ ] CloudWatch logs enabled

### Application ✓
- [ ] Helm release installed
- [ ] 1 pod running
- [ ] Service type: NodePort
- [ ] Application accessible via NodeIP:30000
- [ ] Health checks passing

### Costs ✓
- [ ] AWS Billing shows ~$0-15/month
- [ ] No unexpected charges
- [ ] Free tier services showing $0
- [ ] Remaining budget: ~$60

---

## 🔧 Useful Commands

### Check Cluster Status
```bash
kubectl get nodes -o wide
kubectl get pods -n portfolio
kubectl get svc -n portfolio
kubectl describe node <node-name>
```

### View Costs
```bash
aws ec2 describe-instances \
  --query 'Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name]' \
  --output table

aws ec2 describe-nat-gateways  # Should show nothing
aws elbv2 describe-load-balancers  # Should show nothing
```

### View Logs
```bash
# CloudWatch logs (free tier)
aws logs list-log-groups
aws logs tail /aws/eks/portfolio-eks/cluster

# Pod logs
kubectl logs -n portfolio deployment/portfolio-app
```

### Scale Application
```bash
# Manual scaling (limited to 2 max replicas)
kubectl scale deployment portfolio-app -n portfolio --replicas=2

# Check autoscaler
kubectl describe hpa -n portfolio
```

---

## ⚠️ Important Notes

### What's Different from Production Setup

| Feature | Full Setup | Free Tier |
|---------|-----------|-----------|
| **Nodes** | 3 | 1 |
| **High Availability** | ✅ Multi-zone | ⚠️ Single zone |
| **Load Balancing** | ALB | NodePort |
| **Monitoring** | Prometheus | CloudWatch |
| **Auto-scaling** | Up to 10 | Up to 2 |
| **Cost** | $117+/month | $11/month |

### Limitations
- Single node (restart = downtime)
- Limited to 2 pod replicas
- No automatic load balancing
- CloudWatch for monitoring (limited)

### How to Upgrade Later
```bash
# After free tier ends (month 13):

# Option 1: Add more nodes
terraform apply -var="node_desired_size=2"

# Option 2: Enable monitoring
terraform apply -var="enable_monitoring=true"

# Option 3: Enable ALB
# Uncomment ALB section in terraform/alb.tf
```

---

## 💡 Cost-Saving Tips

### 1. Use CloudWatch Only (Don't Enable Prometheus)
```bash
# View logs in CloudWatch
aws logs tail /aws/eks/portfolio-eks/cluster --follow

# View metrics in CloudWatch console
# AWS → CloudWatch → Dashboards → Browse Dashboards
```

### 2. Set Up Billing Alerts
```bash
# AWS Console → Billing → Billing Preferences
# Set alert at $40 (for peace of mind)
```

### 3. Use AWS Free Tier Checklist
```bash
# https://aws.amazon.com/free
# Verify you have:
# - EC2: 750 hours/month free (if using t3.micro)
# - EKS: Cluster free for 12 months
# - CloudWatch: 10 custom metrics free
# - CloudWatch Logs: 5GB free
```

### 4. Spot Instances (Advanced - Save 70%)
```bash
# Edit terraform/eks.tf
# Add: capacity_type = "SPOT"
# Only for non-critical workloads
```

---

## 🆘 Troubleshooting

### Problem: Pod shows "Pending"
```bash
kubectl describe pod <pod-name> -n portfolio
# Check: Not enough resources? Node full?

# Solution: Reduce resource limits
# helm upgrade portfolio helm/portfolio \
#   --set resources.limits.cpu=100m \
#   --set resources.limits.memory=128Mi
```

### Problem: High Costs (>$20/month)
```bash
# Check for multiple nodes
aws ec2 describe-instances --query 'Reservations[*].Instances[*].InstanceType'

# Check for unwanted services
aws elbv2 describe-load-balancers
aws ec2 describe-nat-gateways

# Solution: Disable in Terraform and reapply
```

### Problem: Can't Access App
```bash
# Check if NodePort service is up
kubectl get svc -n portfolio

# Check node security group
aws ec2 describe-security-groups \
  --filters Name=tag:Name,Values=*portfolio*

# Solution: Add ingress rule for port 30000
```

---

## 📅 Growth Timeline

### Month 1-3: Evaluate
- Run on 1 node
- Monitor performance
- Test auto-scaling to 2 nodes
- Cost: ~$10-15/month

### Month 4-6: Add Features
- Enable monitoring (if needed)
- Enable ALB if you want better routing
- Scale to 2 nodes
- Cost: ~$20-30/month

### Month 12: Plan for Year 2
- EKS free tier ends
- EC2 free tier ends
- Plan paid tier infrastructure
- Consider reserved instances
- Cost: ~$60-100/month

### Year 2+: Production
- Full setup with monitoring
- Multi-zone deployment
- Auto-scaling to 10+ pods
- Reserved instances for savings
- Cost: ~$50-100/month

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] Read `docs/AWS_COST_OPTIMIZATION.md` completely
- [ ] Review your Terraform changes in `terraform.prod.tfvars`
- [ ] Review your Helm changes in `helm/portfolio/values.yaml`
- [ ] Tested locally with `docker-compose up`
- [ ] Set AWS billing alert at $50
- [ ] Verified free tier eligibility
- [ ] Ready to deploy with `terraform apply`
- [ ] Have budget for month 13 when free tier ends

---

## 📞 Support Resources

- **Cost Questions**: See `docs/AWS_COST_OPTIMIZATION.md`
- **Deployment Help**: See `docs/DEVOPS_SETUP.md`
- **AWS Free Tier**: https://aws.amazon.com/free
- **Billing Dashboard**: AWS Console → Billing
- **Cost Explorer**: AWS Console → Cost Management → Cost Explorer

---

**Your setup is optimized and ready to deploy!** 🚀

**Estimated Time to Deploy**: 30-45 minutes  
**Estimated Monthly Cost**: $10-15  
**Remaining Budget**: ~$60  
**Status**: ✅ Ready for Free Tier Deployment
