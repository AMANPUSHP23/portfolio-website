# Post-Deployment Checklist

Use this checklist after deploying your portfolio infrastructure.

## ✅ Pre-Deployment

- [ ] Read [docs/DEVOPS_SETUP.md](DEVOPS_SETUP.md) completely
- [ ] Installed all prerequisites (Docker, kubectl, Helm, Terraform, AWS CLI)
- [ ] Tested local deployment with docker-compose
- [ ] AWS account created and configured
- [ ] AWS credentials configured with `aws configure`
- [ ] GitHub repository secrets configured (AWS_ROLE_ARN, AWS_REGION, etc.)

## ✅ Infrastructure Deployment

- [ ] Terraform initialized: `terraform init`
- [ ] Terraform plan reviewed: `terraform plan -var-file=terraform.prod.tfvars`
- [ ] Terraform applied: `terraform apply tfplan`
- [ ] EKS cluster created successfully
- [ ] Node groups healthy: `aws eks describe-nodegroup`
- [ ] Terraform outputs captured

## ✅ Kubernetes Configuration

- [ ] kubectl configured: `aws eks update-kubeconfig`
- [ ] Cluster connectivity verified: `kubectl cluster-info`
- [ ] Nodes visible: `kubectl get nodes` (should show 3 nodes)
- [ ] Namespaces created: `kubectl get namespaces`

## ✅ Application Deployment

- [ ] Docker image built: `docker build -t portfolio:latest .`
- [ ] Image pushed to ECR (if using AWS ECR)
- [ ] Helm chart installed: `helm install portfolio helm/portfolio`
- [ ] Pods running: `kubectl get pods -n portfolio` (should show 3 pods)
- [ ] Pods are ready: All pods should have status "Running"
- [ ] Services created: `kubectl get svc -n portfolio`
- [ ] Deployment rollout complete: `kubectl rollout status deployment/portfolio-app -n portfolio`

## ✅ Load Balancer & Network

- [ ] ALB created: `aws elbv2 describe-load-balancers`
- [ ] ALB has healthy targets: Check AWS console
- [ ] Security groups properly configured
- [ ] DNS pointing to ALB (if using custom domain)
- [ ] Health checks passing

## ✅ Monitoring Stack

- [ ] Monitoring namespace created: `kubectl get namespace monitoring`
- [ ] Prometheus running: `kubectl get pods -n monitoring`
- [ ] Grafana running: `kubectl get pods -n monitoring`
- [ ] Prometheus can scrape metrics:
  ```bash
  kubectl port-forward -n monitoring svc/prometheus 9090:9090
  # Visit http://localhost:9090/targets
  ```
- [ ] Grafana accessible:
  ```bash
  kubectl port-forward -n monitoring svc/grafana 3000:3000
  # Visit http://localhost:3000
  ```
- [ ] Prometheus data source configured in Grafana
- [ ] Custom dashboards created

## ✅ Logging Stack

- [ ] Loki running: `kubectl get pods -n monitoring`
- [ ] Promtail running: `kubectl get pods -n monitoring`
- [ ] Logs flowing to Loki
- [ ] Loki data source added to Grafana

## ✅ CI/CD Pipeline

- [ ] GitHub Actions secrets configured:
  - [ ] AWS_ROLE_ARN
  - [ ] AWS_REGION
  - [ ] EKS_CLUSTER_NAME
  - [ ] TF_STATE_BUCKET
  - [ ] SLACK_WEBHOOK (optional)

- [ ] Test workflow: Push a test commit and verify build
- [ ] Docker build workflow runs: Check GitHub Actions
- [ ] Docker image pushed to registry
- [ ] Deployment workflow runs on push to main
- [ ] Slack notifications working (if configured)

## ✅ Security Verification

- [ ] Network policies applied: `kubectl get networkpolicies -n portfolio`
- [ ] RBAC roles created: `kubectl get roles -n portfolio`
- [ ] Pod security context enforced (non-root, read-only filesystem)
- [ ] Resource quotas set: `kubectl get resourcequota -n portfolio`
- [ ] Pod disruption budgets created: `kubectl get pdb -n portfolio`
- [ ] Secrets not exposed in logs or environment
- [ ] IAM roles properly restricted

## ✅ Backup & State Management

- [ ] Terraform state backed up to S3
- [ ] S3 bucket versioning enabled
- [ ] S3 bucket encryption enabled
- [ ] DynamoDB state locking table created
- [ ] Regular backup strategy documented

## ✅ Monitoring & Alerting

- [ ] CloudWatch logs being collected:
  ```bash
  aws logs tail /aws/eks/portfolio-eks/cluster --follow
  ```
- [ ] CloudWatch alarms created for:
  - [ ] High CPU usage
  - [ ] High memory usage
  - [ ] Pod restart failures
  - [ ] Node issues

- [ ] Prometheus alerts configured
- [ ] Alert notifications working

## ✅ Performance & Scaling

- [ ] Horizontal Pod Autoscaler active:
  ```bash
  kubectl get hpa -n portfolio
  ```
- [ ] Test scaling:
  ```bash
  kubectl run -i --tty --rm load --image=busybox -- /bin/sh
  # Inside the pod: while sleep 0.01; do wget -q -O- http://portfolio-service.portfolio.svc.cluster.local; done
  ```
- [ ] Pods scale up when load increases
- [ ] Node autoscaling working
- [ ] Performance metrics acceptable

## ✅ Application Testing

- [ ] Application accessible via ALB DNS: `terraform output alb_dns_name`
- [ ] All pages load correctly
- [ ] No errors in application logs
- [ ] Health checks passing: `curl -I <ALB_DNS>`
- [ ] Performance acceptable
- [ ] No 5xx errors in logs

## ✅ Disaster Recovery

- [ ] Backup and restore procedures documented
- [ ] Terraform state can be restored from backup
- [ ] Tested cluster recreation from scratch
- [ ] Data recovery tested
- [ ] RTO/RPO targets documented

## ✅ Cost Optimization

- [ ] Resource requests and limits are reasonable
- [ ] Autoscaling min/max replicas appropriate
- [ ] Node types are cost-appropriate
- [ ] Unused resources removed
- [ ] Cost monitoring enabled in AWS Billing
- [ ] Reserved instances considered (if applicable)

## ✅ Documentation

- [ ] Deployment steps documented
- [ ] Architecture diagram created
- [ ] Troubleshooting guide completed
- [ ] Runbook for common tasks created
- [ ] Team trained on operations
- [ ] On-call procedures established

## ✅ Post-Deployment Verification

- [ ] Application metrics visible in Grafana
- [ ] Logs visible in Loki/Grafana
- [ ] All deployments healthy
- [ ] All services responding
- [ ] All pods running

### Health Check Commands

```bash
# Comprehensive health check
kubectl cluster-info
kubectl get nodes
kubectl get pods -n portfolio
kubectl get svc -n portfolio
kubectl get ingress -n portfolio
kubectl get hpa -n portfolio

# Application health
curl -I $(aws elbv2 describe-load-balancers --query 'LoadBalancers[0].DNSName' --output text)

# Monitoring health
kubectl get pods -n monitoring
kubectl port-forward -n monitoring svc/prometheus 9090:9090 &
kubectl port-forward -n monitoring svc/grafana 3000:3000 &

# Terraform state
cd terraform && terraform show

# AWS resources
aws eks describe-cluster --name portfolio-eks
aws eks describe-nodegroup --cluster-name portfolio-eks --nodegroup-name portfolio-node-group
aws elbv2 describe-load-balancers
```

## 🚨 Known Issues & Resolutions

### Issue: Pods not starting
```bash
kubectl describe pod <pod-name> -n portfolio
kubectl logs <pod-name> -n portfolio
```

### Issue: Service not accessible
```bash
kubectl get svc -n portfolio
kubectl describe svc portfolio-service -n portfolio
aws elbv2 describe-target-groups
```

### Issue: Monitoring not working
```bash
kubectl get pods -n monitoring
kubectl logs -n monitoring <pod-name>
```

### Issue: High costs
- Review resource allocation
- Check for stuck pods
- Review autoscaling settings
- Check for unused resources

## 📞 After Deployment Support

If issues arise:
1. Check logs: `kubectl logs`
2. Describe resources: `kubectl describe`
3. Review events: `kubectl get events`
4. Check CloudWatch: AWS Console
5. Review Terraform: `terraform show`
6. Contact support with logs

## 🔄 Regular Maintenance Tasks

- [ ] Daily: Check pod health, review error logs
- [ ] Weekly: Review metrics, update documentation
- [ ] Monthly: Review costs, test backups, security audit
- [ ] Quarterly: Major version updates, capacity planning
- [ ] Annually: Disaster recovery drill, security review

---

**Print this checklist** and check off items as you go!

**Estimated Time**: 2-4 hours (depending on experience level)

**Difficulty**: Intermediate (requires AWS and Kubernetes knowledge)

---

For issues, refer to [DEVOPS_SETUP.md](DEVOPS_SETUP.md#troubleshooting)
