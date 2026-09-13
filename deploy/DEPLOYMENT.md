# ================================================================
# AI Sign Language Learning Platform — Deployment Guide
# ================================================================

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Internet / Users                      │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS (443)
               ┌───────────▼────────────┐
               │   AWS ALB / Nginx      │  (SSL Termination)
               └──────┬──────────┬──────┘
                      │          │
          ┌───────────▼─┐   ┌────▼──────────────┐
          │  Frontend   │   │  Backend API       │
          │ (React/Nginx│   │  (FastAPI/Uvicorn) │
          │ ECS/K8s)    │   │  ECS/K8s)          │
          └─────────────┘   └──────┬─────────────┘
                                   │
                      ┌────────────▼────────────┐
                      │   PostgreSQL (RDS)       │
                      │   + EFS (uploads/certs)  │
                      └─────────────────────────┘
```

---

## 🐳 Local Development

```bash
# Start full stack locally
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
```

---

## 🚀 Production Deployment

### 1. Prerequisites

- Docker & Docker Compose installed
- AWS CLI configured (`aws configure`)
- ECR repositories created:
  ```bash
  aws ecr create-repository --repository-name sign-language-backend --region us-east-1
  aws ecr create-repository --repository-name sign-language-frontend --region us-east-1
  ```

### 2. Configure Environment

```bash
# Copy and fill in production values
cp .env.production.example .env.production
nano .env.production   # Edit with your real values
```

### 3. Build & Push Docker Images

```bash
# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build images
docker build -t sign-language-backend ./backend
docker build -t sign-language-frontend ./frontend

# Tag & push
docker tag sign-language-backend:latest \
  <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/sign-language-backend:latest
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/sign-language-backend:latest

docker tag sign-language-frontend:latest \
  <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/sign-language-frontend:latest
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/sign-language-frontend:latest
```

### 4a. Deploy with Docker Compose (VPS / EC2)

```bash
# On your server
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### 4b. Deploy with AWS ECS (Fargate)

```bash
# Register task definitions
aws ecs register-task-definition \
  --cli-input-json file://deploy/aws/ecs-task-definition.json

aws ecs register-task-definition \
  --cli-input-json file://deploy/aws/ecs-task-definition-frontend.json

# Update services (after initial creation in AWS Console)
aws ecs update-service \
  --cluster sign-language-cluster \
  --service sign-language-backend-service \
  --force-new-deployment

aws ecs update-service \
  --cluster sign-language-cluster \
  --service sign-language-frontend-service \
  --force-new-deployment
```

### 4c. Deploy with Kubernetes (EKS / GKE / AKS)

```bash
# Create namespace and infrastructure
kubectl apply -f deploy/k8s/infrastructure.yml

# Add secrets (replace placeholders)
kubectl create secret generic sign-language-secrets \
  --from-literal=database-url="postgresql+psycopg://user:pass@host:5432/sign_language_db" \
  --from-literal=jwt-secret="$(openssl rand -hex 64)" \
  --from-literal=postgres-user="postgres" \
  --from-literal=postgres-password="$(openssl rand -hex 16)" \
  --namespace sign-language

# Deploy backend & frontend
kubectl apply -f deploy/k8s/backend-deployment.yml
kubectl apply -f deploy/k8s/frontend-deployment.yml

# Check rollout status
kubectl rollout status deployment/sign-language-backend -n sign-language
kubectl rollout status deployment/sign-language-frontend -n sign-language

# Get ingress IP/URL
kubectl get ingress -n sign-language
```

---

## 🔄 CI/CD via GitHub Actions

The pipeline in `.github/workflows/ci-cd.yml` automatically:

1. **On every PR**: Runs backend pytest suite + frontend build check
2. **On push to `main`**: Builds Docker images → pushes to ECR → deploys to ECS

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AWS_ACCOUNT_ID` | Your AWS account ID |
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `VITE_API_BASE_URL` | Production API URL |
| `APP_URL` | Production frontend URL |

Set these at: `GitHub Repo → Settings → Secrets and variables → Actions`

---

## 🔐 SSL Certificate Setup (Let's Encrypt)

```bash
# Install certbot on your server
sudo apt install certbot

# Generate certificates
sudo certbot certonly --standalone \
  -d yourdomain.com \
  -d www.yourdomain.com \
  --email admin@yourdomain.com \
  --agree-tos

# Certificates will be at:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem

# Copy to deploy/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem deploy/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem deploy/ssl/
```

---

## 📊 Health Checks

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Backend health check |
| `GET /` | Root API info & active services |
| `GET /docs` | Interactive API documentation |

---

## 📁 Cloud Config File Structure

```
deploy/
├── aws/
│   ├── ecs-task-definition.json          # Backend ECS task
│   └── ecs-task-definition-frontend.json # Frontend ECS task
├── k8s/
│   ├── infrastructure.yml                # Namespace, secrets, PVCs, Postgres
│   ├── backend-deployment.yml            # Backend Deploy + Service + HPA
│   └── frontend-deployment.yml           # Frontend Deploy + Service + Ingress
└── nginx/
    └── nginx.prod.conf                   # Production Nginx (SSL + proxy)

.github/
└── workflows/
    ├── ci-cd.yml                         # Main CI/CD: test → build → push → deploy
    └── pr-checks.yml                     # PR validation checks

docker-compose.prod.yml                   # Production Docker Compose
.env.production.example                   # Environment variable template
```
