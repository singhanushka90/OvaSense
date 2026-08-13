# OvaSense 🩺

### AI-Powered PCOS Screening & Prediction Platform

OvaSense is an end-to-end machine learning application designed to provide
AI-based PCOS screening predictions from selected clinical and lifestyle
features.

The project combines a trained Machine Learning model with a secure
FastAPI backend, JWT authentication, MongoDB-based prediction history,
and a modern web interface.

> ⚠️ **Medical Disclaimer**
>
> OvaSense is an educational and machine-learning screening project.
> Its predictions are not a medical diagnosis and should not replace
> professional medical advice, clinical examination, or laboratory testing.

---

## ✨ Key Features

### 🤖 Machine Learning

- End-to-end ML prediction pipeline
- Data preprocessing and feature engineering
- Trained classification model
- Prediction pipeline for inference
- Model and preprocessing artifacts management
- MLflow experiment/model tracking

### 🔐 Authentication & Security

- User registration
- Secure password hashing
- JWT-based authentication
- Protected API endpoints
- User-specific prediction history
- Passwords are never returned through API responses

### 🔮 PCOS Prediction

Users can submit relevant features such as:

- Follicle count (Right)
- Follicle count (Left)
- Skin darkening
- Hair growth
- Weight gain
- Menstrual cycle information
- Fast food consumption
- Pimples
- Weight
- BMI

The backend processes these features through the trained ML pipeline and
returns a prediction result.

### 📊 Prediction History

- Store prediction results in MongoDB
- User-specific history
- Latest predictions shown first
- Pagination support
- Delete individual prediction records

### 👤 User Profile

- View authenticated user's profile
- Username and email information
- Protected using JWT authentication

### 🚀 Production-Oriented Backend

- Modular FastAPI architecture
- Service-layer design
- Pydantic request/response schemas
- Centralized configuration
- Logging
- Custom exception handling
- MongoDB Atlas integration
- Swagger/OpenAPI documentation

---

# 🏗️ Architecture

```text
                        ┌─────────────────────┐
                        │     React Frontend  │
                        │       (Vite)        │
                        └──────────┬──────────┘
                                   │
                                Axios
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │      FastAPI        │
                        │       Backend       │
                        └──────────┬──────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                ▼                  ▼                  ▼
           JWT Auth          Prediction API      User APIs
                │                  │                  │
                │                  ▼                  │
                │        ML Prediction Pipeline      │
                │                  │                  │
                │                  ▼                  │
                │            ML Model                │
                │                                     │
                └──────────────┬──────────────────────┘
                               │
                               ▼
                         MongoDB Atlas
                       ┌────────────────┐
                       │   users_db     │
                       │   predict      │
                       └────────────────┘
