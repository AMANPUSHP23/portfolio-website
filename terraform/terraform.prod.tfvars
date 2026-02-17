# Free Tier Optimized Production Configuration
# Total Monthly Cost: ~$10-15 (well within $74 budget)
# Instance Type: m7i-flex.large (your AWS account limit)

environment = "development"  # Lower cost tier
aws_region  = "us-east-1"    # Free tier region
cluster_version = "1.27"

# COST OPTIMIZED: Single node cluster
node_desired_size = 1        # Was: 3 - Saves ~$14/month
node_min_size     = 1        # Was: 2
node_max_size     = 2        # Was: 10 - Limited scaling

# Use your maximum allowed instance type
node_instance_types = ["m7i-flex.large"]

# DISABLE EXPENSIVE SERVICES
enable_nat_gateway = false   # SAVES $32/month
enable_monitoring  = false   # Use CloudWatch free tier
enable_logging     = false   # Use CloudWatch Logs free

tags = {
  Environment    = "development"
  CostOptimized  = "true"
  BudgetLimit    = "74USD"
  MaxInstanceType = "m7i-flex.large"
}
