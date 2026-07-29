# SignFlow AI - Technical Architecture & Deployment Specs

## 1. System Architecture
- **API Engine**: FastAPI (Asynchronous)
- **Real-time Protocol**: WebSockets for landmark streaming
- **AI Core**: MediaPipe for Hand/Pose estimation + Custom TensorFlow models (trained on WLASL)
- **Primary DB**: PostgreSQL (User State, Course Metadata)
- **Telemetry DB**: MongoDB (Inference logging, session tracking)

## 2. API Schema Highlights
### Authentication (JWT)
- `POST /api/v1/auth/login`: Authenticate and receive Bearer Token.
- `POST /api/v1/auth/register`: Create user with Role (Learner, Instructor, etc.).

### Practice & Feedback
- `WS /api/v1/studio/stream`: WebSocket for real-time hand landmark data.
- `POST /api/v1/studio/evaluate`: Send frame for full gesture inference.

### Analytics
- `GET /api/v1/progress/summary`: Weighted score calculation.
- `GET /api/v1/reports/export`: Trigger PDF generation.

## 3. Docker Orchestration (v3.8)
```yaml
version: '3.8'
services:
  api:
    build: ./backend
    ports: ["8000:8000"]
    env_file: .env
    depends_on: [db, redis]
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: signflow_db
  redis:
    image: redis:6-alpine
```

## 4. Dataset Integration
- **ASL Alphabet**: Base classification (26 classes).
- **WLASL**: Word-level sign language for advanced learners.
- **RWTH-PHOENIX**: Continuous sign language recognition.
