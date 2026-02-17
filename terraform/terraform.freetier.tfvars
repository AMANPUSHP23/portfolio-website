# Free Tier Optimized Production configuration
# Budget: $74 USD
# Instance Type: m7i-flex.large (your maximum)
# This configuration fits within free tier and budget constraints

environment = "development"  # Lower cost than production
aws_region  = "us-east-1"   # Free tier region
cluster_version = "1.27"

# ========================================
# COST OPTIMIZED SETTINGS
# ========================================

# Use SINGLE node for minimum cost
node_desired_size = 1        # Was: 3 - SAVES ~$14/month
node_min_size     = 1        # Was: 2
node_max_size     = 2        # Was: 10 - Limited scaling

# Your maximum allowed instance type (m7i-flex.large)
node_instance_types = ["m7i-flex.large"]

# ========================================
# DISABLE EXPENSIVE SERVICES
# ========================================

# NAT Gateway costs $32/month - DISABLE
# Using public subnets instead
enable_nat_gateway = false

# Prometheus + Grafana stack not needed - DISABLE
# Use CloudWatch free tier instead (included in AWS free tier)
enable_monitoring = false

# CloudWatch logs free tier included - DISABLE Loki
enable_logging = false

# ========================================
# TAGS FOR COST TRACKING
# ========================================

tags = {
  Environment    = "development"
  CostOptimized  = "true"
  FreeTeir       = "eligible"
  BudgetLimit    = "74USD"
  MaxInstanceType = "m7i-flex.large"
}
