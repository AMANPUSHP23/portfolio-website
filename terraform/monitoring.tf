# CloudWatch Log Group for EKS cluster logs
resource "aws_cloudwatch_log_group" "eks_cluster" {
  count             = var.enable_logging ? 1 : 0
  name              = "/aws/eks/${var.cluster_name}/cluster"
  retention_in_days = 30

  tags = {
    Name = "${var.project_name}-eks-logs"
  }
}

# CloudWatch Alarms
resource "aws_cloudwatch_metric_alarm" "eks_node_cpu" {
  count               = var.enable_monitoring ? 1 : 0
  alarm_name          = "${var.project_name}-eks-node-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "node_cpu_usage_percentage"
  namespace           = "EKS/NodeGroup"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "Alert when EKS node CPU usage is high"
  alarm_actions       = var.slack_webhook_url != "" ? [aws_sns_topic.alerts[0].arn] : []
}

resource "aws_cloudwatch_metric_alarm" "eks_node_memory" {
  count               = var.enable_monitoring ? 1 : 0
  alarm_name          = "${var.project_name}-eks-node-memory-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "node_memory_usage_percentage"
  namespace           = "EKS/NodeGroup"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "Alert when EKS node memory usage is high"
  alarm_actions       = var.slack_webhook_url != "" ? [aws_sns_topic.alerts[0].arn] : []
}

# SNS Topic for alerts
resource "aws_sns_topic" "alerts" {
  count = var.slack_webhook_url != "" ? 1 : 0
  name  = "${var.project_name}-alerts"

  tags = {
    Name = "${var.project_name}-alerts"
  }
}

# CloudWatch Dashboard
resource "aws_cloudwatch_dashboard" "main" {
  count          = var.enable_monitoring ? 1 : 0
  dashboard_name = "${var.project_name}-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type = "metric"
        properties = {
          metrics = [
            ["AWS/EKS", "cluster_node_count", { stat = "Average" }],
            [".", "cluster_cpu_allocation", { stat = "Average" }],
            [".", "cluster_memory_allocation", { stat = "Average" }],
          ]
          period = 300
          stat   = "Average"
          region = var.aws_region
          title  = "EKS Cluster Metrics"
        }
      },
    ]
  })
}

# S3 bucket for logs
resource "aws_s3_bucket" "logs" {
  bucket_prefix = "${var.project_name}-logs-"

  tags = {
    Name = "${var.project_name}-logs"
  }
}

resource "aws_s3_bucket_versioning" "logs" {
  bucket = aws_s3_bucket.logs.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket = aws_s3_bucket.logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ALB logs
resource "aws_s3_bucket_policy" "logs" {
  bucket = aws_s3_bucket.logs.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.logs.arn}/*"
      }
    ]
  })
}

data "aws_caller_identity" "current" {}
