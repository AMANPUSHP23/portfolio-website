#!/bin/bash
# Infrastructure deployment helper script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
CLUSTER_NAME=${CLUSTER_NAME:-portfolio-eks}
NAMESPACE=${NAMESPACE:-portfolio}

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local missing_tools=0
    
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI not found. Please install it."
        missing_tools=$((missing_tools + 1))
    fi
    
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl not found. Please install it."
        missing_tools=$((missing_tools + 1))
    fi
    
    if ! command -v helm &> /dev/null; then
        log_error "Helm not found. Please install it."
        missing_tools=$((missing_tools + 1))
    fi
    
    if ! command -v terraform &> /dev/null; then
        log_error "Terraform not found. Please install it."
        missing_tools=$((missing_tools + 1))
    fi
    
    if [ $missing_tools -gt 0 ]; then
        log_error "$missing_tools tools are missing."
        return 1
    fi
    
    log_info "All prerequisites are met."
    return 0
}

# Verify AWS credentials
verify_aws_credentials() {
    log_info "Verifying AWS credentials..."
    
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured properly."
        return 1
    fi
    
    local account_id=$(aws sts get-caller-identity --query Account --output text)
    log_info "AWS Account ID: $account_id"
    return 0
}

# Deploy infrastructure
deploy_infrastructure() {
    log_info "Deploying infrastructure with Terraform..."
    
    cd terraform
    
    terraform init
    terraform plan -var-file=terraform.prod.tfvars -out=tfplan
    
    read -p "Do you want to apply? (yes/no): " -n 3 -r
    echo
    if [[ $REPLY =~ ^yes$ ]]; then
        terraform apply tfplan
        log_info "Infrastructure deployment complete!"
    else
        log_warn "Infrastructure deployment cancelled."
    fi
    
    cd ..
}

# Configure kubectl
configure_kubectl() {
    log_info "Configuring kubectl..."
    
    aws eks update-kubeconfig \
        --region $AWS_REGION \
        --name $CLUSTER_NAME
    
    log_info "kubectl configured successfully."
}

# Deploy application
deploy_application() {
    log_info "Deploying application..."
    
    kubectl apply -f k8s/namespace.yaml
    kubectl apply -f k8s/
    
    log_info "Application deployment complete!"
    log_info "Waiting for pods to be ready..."
    
    kubectl rollout status deployment/portfolio-app -n $NAMESPACE --timeout=5m
}

# Deploy monitoring
deploy_monitoring() {
    log_info "Deploying monitoring stack..."
    
    kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
    kubectl apply -f k8s/monitoring/
    
    log_info "Monitoring stack deployed!"
    
    log_info "Access dashboards:"
    log_info "  Prometheus: kubectl port-forward -n monitoring svc/prometheus 9090:9090"
    log_info "  Grafana: kubectl port-forward -n monitoring svc/grafana 3000:3000"
}

# Check deployment status
check_status() {
    log_info "Checking deployment status..."
    
    echo ""
    echo "=== Cluster Info ==="
    kubectl cluster-info
    
    echo ""
    echo "=== Nodes ==="
    kubectl get nodes
    
    echo ""
    echo "=== Portfolio Deployment ==="
    kubectl get pods -n $NAMESPACE
    
    echo ""
    echo "=== Services ==="
    kubectl get svc -n $NAMESPACE
    
    echo ""
    echo "=== Load Balancer ==="
    kubectl get ingress -n $NAMESPACE
}

# Main menu
show_menu() {
    echo ""
    echo "======================================"
    echo "  Portfolio DevOps Infrastructure"
    echo "======================================"
    echo "1. Check Prerequisites"
    echo "2. Verify AWS Credentials"
    echo "3. Deploy Infrastructure"
    echo "4. Configure kubectl"
    echo "5. Deploy Application"
    echo "6. Deploy Monitoring"
    echo "7. Check Status"
    echo "8. Exit"
    echo "======================================"
}

# Main function
main() {
    while true; do
        show_menu
        read -p "Select option (1-8): " choice
        
        case $choice in
            1) check_prerequisites ;;
            2) verify_aws_credentials ;;
            3) deploy_infrastructure ;;
            4) configure_kubectl ;;
            5) deploy_application ;;
            6) deploy_monitoring ;;
            7) check_status ;;
            8) log_info "Exiting..."; exit 0 ;;
            *) log_error "Invalid option" ;;
        esac
    done
}

# Run main function
main
