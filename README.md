# OvaSense 🩺

> **AI-Powered PCOS Screening & Prediction Platform**

OvaSense is an end-to-end Machine Learning application that provides AI-based PCOS screening predictions from selected clinical and lifestyle features. It combines an ML prediction pipeline with a secure FastAPI backend, JWT authentication, MongoDB Atlas, MLflow, and a React-based frontend.

> ⚠️ **Disclaimer:** OvaSense is an educational screening project. Its predictions are not a medical diagnosis and should not replace professional medical advice or clinical evaluation.

## ✨ Features

- 🤖 ML-based PCOS screening prediction
- 🔐 JWT authentication & secure password hashing
- 👤 User registration, login & profile
- 🔮 Real-time prediction API
- 📊 User-specific prediction history
- 📄 Pagination & prediction deletion
- 🗄️ MongoDB Atlas integration
- 📈 MLflow experiment tracking
- 📝 Logging & custom exception handling
- ⚡ FastAPI + Swagger/OpenAPI
- 🎨 React frontend with modern responsive UI

## 🏗️ Architecture

```text
React + Vite
     │
   Axios
     │
     ▼
  FastAPI
     │
 ┌───┼──────────────┐
 │   │              │
Auth Prediction   Users
 │   │              │
 │   ▼              │
 │ ML Pipeline      │
 │   │              │
 └───┼──────────────┘
     ▼
 MongoDB Atlas
 ├── users_db
 └── predict
📁 Project Structure
OvaSense/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # JWT & password security
│   ├── core/         # Configuration
│   ├── database/     # MongoDB connection
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # Business logic
│   └── main.py       # FastAPI entry point
├── src/
│   ├── pipeline/     # ML prediction pipeline
│   └── utils/        # Logging & exceptions
├── models/           # Trained model artifacts
├── frontend/         # React + Vite application
├── requirements.txt
├── .env
├── .gitignore
└── README.md
🛠️ Tech Stack
ML: Python, NumPy, pandas, scikit-learn, MLflow
Backend: FastAPI, Pydantic, Uvicorn, JWT, PyMongo
Database: MongoDB Atlas
Frontend: React, Vite, Axios, Tailwind CSS
Tools: Git, GitHub, Docker (planned)
🔄 Workflow
Register → Login → JWT
                  │
                  ▼
             Dashboard
             ┌────┼────┐
             ▼    ▼    ▼
         Predict History Profile
             │
             ▼
        ML Prediction
             │
             ▼
       Save to MongoDB
📡 API
Method
Endpoint
Purpose
POST
/auth/register
Register user
POST
/auth/login
Authenticate user
POST
/predict/
Generate prediction
GET
/predictions/
Get prediction history
DELETE
/predictions/{id}
Delete prediction
GET
/users/me
Get user profile
⚙️ Local Setup
git clone https://github.com/<your-username>/OvaSense.git
cd OvaSense

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
Create .env:
MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=PCOS_db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
API documentation:
http://127.0.0.1:8000/docs
📌 Roadmap
[x] ML prediction pipeline
[x] MLflow integration
[x] FastAPI backend
[x] JWT authentication
[x] MongoDB Atlas
[x] Prediction history & pagination
[x] Prediction deletion
[x] User profile
[ ] React frontend
[ ] Responsive dashboard
[ ] Automated testing
[ ] Dockerization
[ ] CI/CD
[ ] Production deployment
👩‍💻 Author
Anushka Singh
B.Tech — Artificial Intelligence & Data Science
Focused on Machine Learning, AI, Generative AI, RAG, FastAPI and MLOps.
