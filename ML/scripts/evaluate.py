#!/usr/bin/env python
from pathlib import Path
import pandas as pd
import joblib
from src.evaluate import evaluate_pipeline
BASE = Path(__file__).resolve().parents[1]
MODEL = BASE / 'models' / 'model_pipeline.joblib'
DATA = BASE / 'data' / 'processed' / 'test.csv'
artifact = joblib.load(MODEL)
pipeline = artifact['pipeline']
test = pd.read_csv(DATA)
X_test = test.drop(columns=['Class'])
y_test = test['Class'].astype(int)
metrics = evaluate_pipeline(pipeline, X_test, y_test, out_dir=str(BASE / 'reports'))
print(metrics)