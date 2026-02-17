# AWS Cost Optimization - Free Tier Account Analysis

**Your Budget**: $74 USD  
**Max Instance Type**: m7i-flex.large  
**Current Date**: February 2026

---

## 📊 Cost Analysis

### Current Configuration (NOT Optimized for Free Tier)
```
Production Setup:
- EKS Cluster: ~$73/month (free for first 12 months)
- 3x t3.medium instances: ~$22/month each = $66/month
- NAT Gateway: ~$32/month
- ALB: ~$16/month
- Data transfer: ~$5-10/month
- Monitoring: ~$5/month
───────────────────
TOTAL: ~$180-200/month ❌ EXCEEDS BUDGET
```

### ⚠️ ISSUES:
1. ❌ 3 nodes required = TOO EXPENSIVE
2. ❌ NAT Gateway enabled = $32/month cost
3. ❌ ALB enabled = $16/month cost
4. ❌ Instance type t3.medium works but can be smaller
5. ❌ Monitoring stack = unnecessary cost

---

## ✅ OPTIMIZED Configuration for Free Tier

### Recommended Setup ($20-35/month)
```
Optimized Setup:
- EKS Cluster: FREE (first 12 months)
- 1x t3.micro instance: ~$7/month
- NO NAT Gateway: Use public subnet = $0
- NO ALB: Use NodePort/NLB = $0
- NO monitoring stack: Use CloudWatch free tier = $0
- Data transfer: ~$1-2/month (minimal)
───────────────────
TOTAL: ~$7-15/month ✅ WELL WITHIN BUDGET
```

### m7i-flex.large Comparison
```
m7i-flex.large: ~$9.50/month on-demand
- More powerful than needed for portfolio
- Better if you scale to 2+ instances
- Still within budget for 1-2 instances
```

---

## 🎯 Recommended Setup

### 1. Single Node Configuration (CHEAPEST)
```
✅ 1x t3.micro (AWS free tier eligible)
✅ No NAT Gateway (use public subnet)
✅ No ALB (use NodePort service)
✅ No monitoring stack
✅ CloudWatch only (free tier)

Cost: ~$5-10/month
Capacity: 1-2 portfolio pods
Best for: Learning/demo purposes
```

### 2. Two Node Configuration (BALANCED)
```
✅ 1x m7i-flex.large (your allowed max)
✅ 1x t3.micro (free tier eligible)
✅ Optional: Single NAT Gateway if needed = +$32/month
✅ Use Network Load Balancer = ~$16/month
✅ CloudWatch monitoring (free tier)

Cost: ~$20-35/month
Capacity: 3-5 portfolio pods
Best for: Small production with redundancy
```

### 3. Single m7i-flex.large (RECOMMENDED)
```
✅ 1x m7i-flex.large (your max allowed)
✅ Multi-zone setup (use 1 zone to save)
✅ No NAT Gateway needed
✅ No ALB (use NodePort)
✅ CloudWatch monitoring (free tier)

Cost: ~$10-15/month
Capacity: 5-10 portfolio pods
Best for: Within your budget and instance limits
```

---

## 📋 What to Change

### Option A: CHEAPEST Setup (Recommended for Budget)

**Terraform Variables** (`terraform.prod.tfvars`):
```terraform
node_desired_size = 1        # Was: 3
node_min_size     = 1        # Was: 2
node_max_size     = 2        # Was: 10
node_instance_types = ["t3.micro"]  # Use free tier
enable_nat_gateway = false   # DISABLE - Save $32/month
enable_monitoring  = false   # DISABLE - Use CloudWatch free tier
enable_logging     = false   # DISABLE - Use CloudWatch Logs
```

**Helm Values** (`helm/portfolio/values.yaml`):
```yaml
replicaCount: 1              # Was: 3
autoscaling:
  enabled: true
  minReplicas: 1            # Was: 2
  maxReplicas: 2            # Was: 10
resources:
  limits:
    cpu: 250m               # Was: 500m
    memory: 256Mi           # Was: 512Mi
  requests:
    cpu: 50m                # Was: 100m
    memory: 64Mi            # Was: 128Mi
```

### Option B: Using m7i-flex.large (Your Max)

**Terraform Variables**:
```terraform
node_desired_size = 1
node_min_size     = 1
node_max_size     = 2
node_instance_types = ["m7i-flex.large"]  # Your max allowed
enable_nat_gateway = false   # Still disable
enable_monitoring  = false   # CloudWatch free tier
enable_logging     = false   # CloudWatch Logs free
```

**Helm Values** (same as Option A but can handle more):
```yaml
replicaCount: 1
autoscaling:
  minReplicas: 1
  maxReplicas: 3
resources:  # Can be larger
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi
```

---

## 💰 Cost Breakdown (Optimized)

### Monthly Costs with Optimizations

| Component | Free Tier | Optimized | m7i-flex.large |
|-----------|-----------|-----------|----------------|
| **EKS Cluster** | FREE (12m) | FREE | FREE |
| **1x t3.micro** | $0 (free tier) | $7 | - |
| **1x m7i-flex.large** | - | - | $9.50 |
| **NAT Gateway** | $0 (disabled) | $0 | $0 |
| **ALB** | $0 (disabled) | $0 | $0 |
| **Data Transfer** | $0 (mostly) | $1-2 | $1-2 |
| **Monitoring** | $0 (CloudWatch) | $0 | $0 |
| **Logging** | $0 (CloudWatch) | $0 | $0 |
| **────────** | ────── | ────── | ────── |
| **TOTAL/month** | ~$0 | ~$8 | ~$11 |
| **Remaining Budget** | $74 | $66 | $63 |

---

## 🚀 Implementation Steps

### Step 1: Choose Your Configuration
- **Option A** (CHEAPEST): t3.micro, single node
- **Option B** (RECOMMENDED): m7i-flex.large, single node

### Step 2: Update Terraform
```bash
cd terraform

# Edit terraform.prod.tfvars
# Change node counts and disable NAT/monitoring
nano terraform.prod.tfvars

# Validate changes
terraform plan -var-file=terraform.prod.tfvars
```

### Step 3: Update Helm
```bash
# Edit helm/portfolio/values.yaml
# Reduce replicas and resource requests
nano helm/portfolio/values.yaml
```

### Step 4: Deploy with Cost Controls
```bash
# Deploy single node cluster
terraform apply -var-file=terraform.prod.tfvars

# Deploy single pod application
helm install portfolio helm/portfolio -n portfolio \
  --set replicaCount=1 \
  --set autoscaling.minReplicas=1 \
  --set autoscaling.maxReplicas=2
```

---

## 🔍 Monitoring Costs

### Free Tier CloudWatch Includes:
- ✅ 10 custom metrics
- ✅ 10 alarms
- ✅ 1000 API requests
- ✅ 5GB logs ingestion
- ✅ 5GB logs storage

**No need for Prometheus + Grafana!** Use CloudWatch instead.

---

## ⚠️ What to DISABLE to Save Money

1. **NAT Gateway** → SAVE $32/month
   ```bash
   enable_nat_gateway = false
   ```

2. **Monitoring Stack** → SAVE $5-10/month
   ```bash
   enable_monitoring = false
   # Use CloudWatch instead (free tier)
   ```

3. **ALB (Load Balancer)** → SAVE $16/month
   ```bash
   # Use NodePort or NLB instead
   # Remove ALB from Terraform
   ```

4. **Multi-zone deployment** → SAVE cost
   ```bash
   # Use single availability zone
   ```

5. **Auto-scaling** → Reduce max replicas
   ```bash
   maxReplicas: 2  # Don't exceed available memory
   ```

---

## 📈 Scaling Path Within Budget

### Month 1-3: Start Small ($10-15/month)
- 1 node cluster
- 1-2 pods
- CloudWatch monitoring
- **Remaining budget**: ~$60

### Month 4-6: Add Redundancy ($20-30/month)
- 2 small nodes OR 1 large node
- 3-5 pods with auto-scaling
- CloudWatch alarms
- **Remaining budget**: ~$45-55

### After 12 Months: Scale Up
- EKS no longer free (~$73/month)
- Can afford 2-3 larger instances
- Full monitoring stack
- **Plan for paid tier**

---

## ✅ Quick Checklist

### Before Deploying:

- [ ] **Edit terraform.prod.tfvars**
  - [ ] node_desired_size = 1
  - [ ] node_min_size = 1
  - [ ] node_max_size = 2
  - [ ] enable_nat_gateway = false
  - [ ] enable_monitoring = false
  - [ ] enable_logging = false

- [ ] **Edit helm/portfolio/values.yaml**
  - [ ] replicaCount = 1
  - [ ] minReplicas = 1
  - [ ] maxReplicas = 2
  - [ ] cpu limits = 250m
  - [ ] memory limits = 256Mi

- [ ] **Disable ALB in terraform/alb.tf** (optional)
  - [ ] Use NodePort service instead

- [ ] **Verify AWS Free Tier eligibility**
  - [ ] t3.micro for EC2 (1 year free)
  - [ ] EKS free (1 year free)
  - [ ] Data transfer free (up to limits)

---

## 🎯 Recommended Configuration

**For your $74 budget and m7i-flex.large limit:**

```terraform
# terraform.prod.tfvars
environment = "development"  # Or staging
aws_region  = "us-east-1"
cluster_version = "1.27"

# COST SAVING SETTINGS
node_desired_size = 1
node_min_size     = 1
node_max_size     = 2
node_instance_types = ["m7i-flex.large"]

# DISABLE EXPENSIVE SERVICES
enable_nat_gateway = false
enable_monitoring  = false
enable_logging     = false

tags = {
  Environment = "development"
  CostOptimized = "true"
}
```

```yaml
# helm/portfolio/values.yaml
replicaCount: 1

resources:
  limits:
    cpu: 250m
    memory: 256Mi
  requests:
    cpu: 50m
    memory: 64Mi

autoscaling:
  enabled: true
  minReplicas: 1
  maxReplicas: 2
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 85
```

---

## 📞 Cost Management Tips

1. **Monitor Costs Weekly**
   ```bash
   aws ce get-cost-and-usage \
     --time-period Start=2026-02-01,End=2026-02-28 \
     --granularity MONTHLY \
     --metrics "UnblendedCost"
   ```

2. **Set Billing Alerts**
   - Go to AWS Billing Console
   - Set alert at $40, $60, $70

3. **Use AWS Cost Calculator**
   - https://calculator.aws/

4. **Check Free Tier Status**
   - AWS Console → Billing → Free Tier

5. **Consider Reserved Instances** (after 12 months)
   - Reduce costs by 40-70%

---

## 🚨 Critical Warnings

⚠️ **Don't use:**
- Multiple NAT Gateways ($32 each)
- ALB + NLB together
- Large instance types for single pod
- 3+ zones for single-node cluster

✅ **Do use:**
- Single free tier instance
- Free tier CloudWatch
- Reserved capacity
- Single availability zone

---

## 📚 Next Steps

1. **Update your Terraform files** with recommended settings
2. **Review costs** before deploying
3. **Monitor monthly expenses** via AWS Billing
4. **Plan for year 2** after free tier expires

---

**Estimated Total Cost for First Year**: ~$100-150 (with free tier benefits)
**Estimated Monthly After Year 1**: ~$50-100/month

Your $74 budget is manageable if you:
- Use free tier instances (t3.micro, t3.small)
- Disable unnecessary services (NAT Gateway, ALB, Monitoring)
- Start with single node cluster
- Scale gradually

Good luck! 🚀
