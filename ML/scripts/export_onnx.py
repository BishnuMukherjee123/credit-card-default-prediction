#!/usr/bin/env python
# Optional: Export classifier to ONNX (classifier only)
import joblib, pandas as pd
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
from pathlib import Path
BASE = Path(__file__).resolve().parents[1]
artifact = joblib.load(BASE / 'models' / 'model_pipeline.joblib')
pipeline = artifact['pipeline']
sample = pd.read_csv(BASE / 'data' / 'processed' / 'train.csv').drop(columns=['Class']).iloc[:1]
X_tr = pipeline[:-1].transform(sample)
n_features = X_tr.shape[1]
initial_type = [('float_input', FloatTensorType([None, n_features]))]
onnx_model = convert_sklearn(pipeline.named_steps['clf'], initial_types=initial_type)
with open(BASE / 'models' / 'model_pipeline.onnx','wb') as f:
    f.write(onnx_model.SerializeToString())
print('ONNX exported.')