from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve model images
app.mount("/model", StaticFiles(directory="model"), name="model")

# Load model
model = joblib.load("model/promotion_model.pkl")


class Employee(BaseModel):
    satisfaction_level: float
    last_evaluation: float
    number_project: int
    average_montly_hours: int
    time_spend_company: int
    Work_accident: int
    sales: int
    salary: int


@app.post("/predict")
def predict(data: Employee):

    features = np.array([[ 
        data.satisfaction_level,
        data.last_evaluation,
        data.number_project,
        data.average_montly_hours,
        data.time_spend_company,
        data.Work_accident,
        data.sales,
        data.salary
    ]])

    probability = model.predict_proba(features)[0][1]

    threshold = 0.15

    if probability >= threshold:
        result = "Employee Should Be Promoted"
    else:
        result = "Employee Should NOT Be Promoted"

    return {
        "prediction": result,
        "promotion_probability": round(probability * 100, 2),

        # ✅ FIXED (NO localhost)
        "decision_tree_image": "/model/decision_tree.png",
        "feature_importance_image": "/model/feature_importance.png"
    }


# ✅ SERVE FRONTEND (MUST BE LAST)
app.mount("/", StaticFiles(directory="dist", html=True), name="frontend")