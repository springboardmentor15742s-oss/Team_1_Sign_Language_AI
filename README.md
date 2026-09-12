# 🤟 AI Sign Language Learning and Assessment Platform

A modern AI-powered Sign Language Learning and Assessment Platform designed to provide learners with an interactive environment for learning, practicing, assessing, and tracking sign language skills.

The frontend is built using **React and Vite** and is integrated with a **FastAPI backend** and **PostgreSQL database** for core application workflows such as authentication, courses, lessons, assessments, gesture prediction, dashboards, performance tracking, and certification.

---

## 📌 Project Overview

The **AI Sign Language Learning and Assessment Platform** aims to make sign language learning more interactive and accessible by combining structured learning content with AI-assisted gesture recognition and assessment.

The platform provides different role-based interfaces for learners, instructors, accessibility trainers, and administrators.

Learners can:

- Create and access their accounts
- Explore sign language courses
- View structured lessons
- Watch educational sign language videos
- Practice sign language gestures
- Perform AI-assisted gesture recognition
- Take assessments
- View assessment scores
- Track learning performance
- View reports and learning information
- Access certificates

The frontend communicates with the FastAPI backend through REST APIs. PostgreSQL is used by the backend for persistent application data.

Some presentation-oriented features continue to use local/static frontend data where corresponding backend services are not currently available.

---

# ✨ Key Features

## 🔐 Authentication

The platform provides authentication functionality integrated with the backend.

Features include:

- User Login
- User Registration
- JWT-based authentication
- Authenticated API requests
- Forgot Password interface
- OTP Verification interface
- Password Reset interface

The frontend stores and uses the authentication token when communicating with protected backend APIs.

---

## 👥 Role-Based Access

The platform supports different user roles and dashboards.

### 👨‍🎓 Learner

Learners can:

- Access their dashboard
- Browse courses
- View lessons
- Watch learning videos
- Practice gestures
- Take assessments
- View performance
- Access certificates

### 👨‍🏫 Instructor

Instructors have access to an instructor-oriented dashboard for monitoring learning-related information.

### ♿ Accessibility Trainer

Trainers have a dedicated dashboard for accessibility and learner-support workflows.

### 👨‍💼 Administrator

Administrators have access to an administration dashboard for platform-level information.

---

# 📚 Learning Modules

The learning section provides structured sign language learning content.

Features include:

- Course Catalog
- Course Details
- Structured Lessons
- Lesson Navigation
- Interactive Course Sidebar
- Educational Video Lessons
- Previous/Next Lesson Navigation
- Learning Progress Interface
- Practice Sessions
- Gesture Recognition

Course and lesson information is retrieved from the backend database where supported.

---

# 🎥 Educational Video Lessons

Lessons include educational sign language videos embedded from YouTube.

The Lesson Player:

- Loads lesson information dynamically
- Displays the corresponding lesson video
- Supports previous/next lesson navigation
- Synchronizes the selected lesson with the course sidebar
- Uses backend lesson data for video URLs

The application uses verified educational sign language video resources rather than placeholder videos.

---

# 🤖 AI Gesture Recognition

The platform integrates the frontend with backend AI gesture prediction services.

Supported model pipelines include:

- CNN
- LSTM / BiLSTM
- Transformer
- Scikit-Learn

The frontend communicates with the backend for landmark-based gesture prediction and model status information.

### Gesture Processing

The gesture workflow can include:

```text
Camera / Gesture Input
        │
        ▼
Hand / Pose Landmark Processing
        │
        ▼
Landmark Data
        │
        ▼
Backend Prediction API
        │
        ▼
AI Model
        │
        ▼
Prediction Result
        │
        ▼
Frontend Result Display