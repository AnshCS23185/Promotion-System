# 🚀 AI Promotion Prediction System

A Machine Learning web app that predicts whether an employee should be promoted using a **Decision Tree Classifier**.

---

## 📌 Features
- 🤖 Promotion prediction (Yes / No)
- 📊 Probability-based output
- 🌳 Decision Tree visualization
- 📈 Feature importance graph
- ⚡ FastAPI backend + React frontend

---

## 🧠 Tech Stack
- Frontend: React + Tailwind CSS  
- Backend: FastAPI  
- ML Model: Scikit-learn (Decision Tree)

---

## ⚙️ Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python train_model.py
uvicorn main:app --reload
