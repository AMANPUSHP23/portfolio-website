# Development environment configuration
environment = "development"
aws_region  = "us-east-1"
cluster_version = "1.27"

node_desired_size = 2
node_min_size     = 2
node_max_size     = 5

enable_nat_gateway = true
enable_monitoring  = true
enable_logging     = true

tags = {
  Environment = "development"
  Team        = "DevOps"
}
