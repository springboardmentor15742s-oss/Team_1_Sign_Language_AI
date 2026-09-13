Chaganti Sai Sasank -> Backend & integration work contributor

A real-time Sign Language Recognition and Learning platform. This application combines a React frontend with a FastAPI backend, utilizing WebSockets for real-time gesture streaming and a suite of AI models for prediction.

## Architecture Overview

- **Frontend:** React (Vite), running on port `5173`. Uses `MediaPipe` for hand/pose landmark detection, `AuthContext` for state management, and WebSockets for real-time streaming.
- **Backend:** FastAPI (Uvicorn), running on port `8000`. Features 21 API routers, PostgreSQL (ORM) for data persistence, a WebSocket handler (`/gesture/ws`), and integrated AI models (CNN, LSTM, Transformer, Scikit-Learn, Geometric Rule-Based).
- **Communication:** HTTP Requests (JSON responses) for standard CRUD operations, and bidirectional WebSockets for real-time gesture prediction.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Python** (3.13.2)
- **Node.js** & npm
- **PostgreSQL** (running locally or a remote instance)
- **VS Code** (Recommended IDE)

## Setup Instructions (Windows)

```powershell
### 1. Virtual Environment Setup
Open a terminal in VS Code and run the following commands to set up the Python virtual environment:

python -m venv venv
venv\Scripts\activate

### 2. Backend Setup

Install the required Python dependencies:
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

### 3.Frontend Setup

Install the required Node.js dependencies:
cd frontend
npm install

### 4.Running the Application
You will need two separate terminal tabs in VS Code to run both servers simultaneously.

Terminal 1: Start Backend FastAPI Server
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload 
(or) 
uvicorn app.main:app --host 0.0.0.0 --port 8000

Terminal 2: Start Frontend React Server
cd frontend
npm run dev

### 5.Important URLs
Once both servers are running, you can access the following:

Backend Webpage: http://127.0.0.1:8000/

Swagger UI (Interactive API Testing): http://localhost:8000/docs

ReDoc (API Documentation View): http://127.0.0.1:8000/redoc

Frontend Webpage: http://localhost:5173/

### 6.Running Tests:
To run the backend test suite (using pytest), ensure you are in the backend directory and the virtual environment is activated:
cd backend
pytest tests/ -v

### 7.Additional Resources
Remaining folders on Backend work (Google Drive): https://drive.google.com/drive/folders/1jXmBxikND3kcILxsBUQfHzF9a4-GM-d_?usp=sharing

