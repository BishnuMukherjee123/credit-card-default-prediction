#!/usr/bin/env python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Load model
BASE = Path(__file__).resolve().parents[1]
artifact = joblib.load(BASE / "models" / "model_pipeline.joblib")
model = artifact["pipeline"]

# Feature names must match training data
FEATURE_COLUMNS = [
    "Time","V1","V2","V3","V4","V5","V6","V7","V8","V9",
    "V10","V11","V12","V13","V14","V15","V16","V17","V18","V19",
    "V20","V21","V22","V23","V24","V25","V26","V27","V28","Amount"
]

# Read allowed origin from .env
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "*")

app = FastAPI(title="Credit Fraud API")

# -------------------------------
# CORS USING ENVIRONMENT VARIABLE
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],  # Read from .env
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class InputModel(BaseModel):
    features: list

@app.post("/predict")
def predict(payload: InputModel):
    if len(payload.features) != len(FEATURE_COLUMNS):
        return {"error": f"Expected {len(FEATURE_COLUMNS)} values, got {len(payload.features)}"}

    df = pd.DataFrame([payload.features], columns=FEATURE_COLUMNS)
    proba = float(model.predict_proba(df)[0, 1])
    pred = int(model.predict(df)[0])

    return {"prediction": pred, "probability": proba}
