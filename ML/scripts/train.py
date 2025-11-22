#!/usr/bin/env python
"""Train script for credit fraud detection.
Usage: python scripts/train.py
"""
from pathlib import Path
import pandas as pd
from src.data_preprocessing import load_raw, basic_clean, stratified_split
from src.feature_engineering import FinancialFeatureCreator
from src.model import build_pipeline, train_and_tune
from src.utils import ensure_dir
BASE = Path(__file__).resolve().parents[1]
RAW = BASE / 'data' / 'raw' / 'credit_card_data.csv'
PROC = BASE / 'data' / 'processed'
MODELS = BASE / 'models'
ensure_dir(MODELS)
df = load_raw(RAW)
df = basic_clean(df)
train_p, val_p, test_p = stratified_split(df, target='Class', out_dir=str(PROC))
train = pd.read_csv(train_p)
X_train = train.drop(columns=['Class'])
y_train = train['Class'].astype(int)
fe = FinancialFeatureCreator(add_amount_log=True)
pipe = build_pipeline(fe)
artifact = train_and_tune(pipe, X_train, y_train, models_dir=str(MODELS))
print('Training finished. Artifact saved.')