# ALB (Optional - disabled for free tier to save $16/month)
resource "aws_lb" "main" {
  count = 0  # Set to 1 to enable, 0 to disable (free tier default)
  
  name_prefix        = substr(replace("${var.project_name}-alb", "-", ""), 0, 6)
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = false
  enable_http2               = true
  enable_cross_zone_load_balancing = true

  tags = {
    Name = "${var.project_name}-alb"
  }
}

# ALB Target Group (Optional - disabled for free tier)
resource "aws_lb_target_group" "portfolio" {
  count = 0  # Must match ALB count
  
  name_prefix = substr(replace("${var.project_name}-tg", "-", ""), 0, 6)
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    interval            = 30
    path                = "/"
    matcher             = "200"
  }

  tags = {
    Name = "${var.project_name}-target-group"
  }
}

# ALB Listener (Optional - disabled for free tier)
resource "aws_lb_listener" "http" {
  count = 0  # Must match ALB count
  
  load_balancer_arn = aws_lb.main[0].arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.portfolio[0].arn
  }
}

# (Optional) HTTPS listener - requires ACM certificate
# resource "aws_lb_listener" "https" {
#   load_balancer_arn = aws_lb.main.arn
#   port              = "443"
#   protocol          = "HTTPS"
#   certificate_arn   = aws_acm_certificate.main.arn

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.portfolio.arn
#   }
# }

# (Optional) Redirect HTTP to HTTPS
# resource "aws_lb_listener" "http_redirect" {
#   load_balancer_arn = aws_lb.main.arn
#   port              = "80"
#   protocol          = "HTTP"

#   default_action {
#     type = "redirect"

#     redirect {
#       port        = "443"
#       protocol    = "HTTPS"
#       status_code = "HTTP_301"
#     }
#   }
# }
