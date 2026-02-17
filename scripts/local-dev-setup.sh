#!/bin/bash
# Local development setup script

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Setting up local development environment...${NC}"

# Build Docker image
echo -e "${GREEN}Building Docker image...${NC}"
docker build -t portfolio:latest .

# Create docker-compose environment
echo -e "${GREEN}Starting Docker Compose services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo -e "${GREEN}Waiting for services to be ready...${NC}"
sleep 10

# Display service information
echo ""
echo -e "${GREEN}Services are ready!${NC}"
echo ""
echo "Access the following services:"
echo "  Application:  http://localhost:3000"
echo "  Prometheus:   http://localhost:9090"
echo "  Grafana:      http://localhost:3001 (admin/admin)"
echo "  Loki:         http://localhost:3100"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f app"
echo ""
echo "To stop services:"
echo "  docker-compose down"
echo ""
