# 🩺 PCOS Detection System

A production-ready Machine Learning application for predicting **Polycystic Ovary Syndrome (PCOS)** using clinical and lifestyle features. The project follows a modular MLOps architecture with FastAPI backend, JWT authentication, MongoDB, and an end-to-end ML pipeline.

---

## 🚀 Features

- End-to-End ML Pipeline
- Data Validation
- Feature Engineering
- Data Transformation
- Model Training
- Model Evaluation
- Prediction Pipeline
- FastAPI REST API
- JWT Authentication
- MongoDB Atlas Integration
- Modular Project Structure
- Logging & Exception Handling
- YAML-based Configuration

---

## 🛠️ Tech Stack

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- XGBoost

### Backend
- FastAPI
- Pydantic
- Uvicorn

### Authentication
- JWT (python-jose)
- Passlib (bcrypt)

### Database
- MongoDB Atlas
- PyMongo

### MLOps
- DVC
- DVCLive
- YAML Configuration

---

## 📂 Project Structure

```text
PCOS_Detection/
│
├── app/
├── src/
├── config/
├── artifacts/
├── notebook/
├── logs/
├── train.py
├── predict.py
├── requirements.txt
└── README.md
```

---

## 📊 Selected Features

- Follicle No. (R)
- Follicle No. (L)
- Skin Darkening
- Hair Growth
- Weight Gain
- Cycle(R/I)
- Fast Food
- Pimples
- BMI
- Weight

Target Variable:

- PCOS (Y/N)

---

## ⚙️ Machine Learning Pipeline

```
Data Ingestion
      │
      ▼
Data Validation
      │
      ▼
Feature Engineering
      │
      ▼
Data Transformation
      │
      ▼
Model Training
      │
      ▼
Model Evaluation
      │
      ▼
Prediction Pipeline
```

---

## 🔐 Authentication Flow

```
Register
     │
     ▼
Password Hashing
     │
     ▼
MongoDB Atlas
     │
     ▼
Login
     │
     ▼
JWT Access Token
     │
     ▼
Protected Prediction API
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Home |
| POST | /auth/register | Register User |
| POST | /auth/login | User Login |
| POST | /predict | Predict PCOS (Protected) |

---

## 📈 Model

Current Best Model:

- XGBoost Classifier

---

## 📌 Future Improvements

- React Frontend
- Prediction History
- Docker
- Docker Compose
- GitHub Actions CI/CD
- Model Monitoring
- SHAP Explainability
- AWS Deployment

---

## 👩‍💻 Author

**Anushka Singh**

AI Engineer (Student)
