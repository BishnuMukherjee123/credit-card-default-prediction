# Credit Fraud — Industry-ready ML project (Rebuild)

This repository is an industry-style ML-only project for Credit Card Fraud detection.
It includes:
- data/raw/credit_card_data.csv (uploaded dataset)
- scripts/train.py to train and save the model artifact
- scripts/evaluate.py to generate evaluation plots and metrics
- scripts/serve.py FastAPI server for inference
- src/ contains preprocessing, feature engineering, model & evaluation helpers
- models/ will contain model_pipeline.joblib after training
- reports/ will contain metrics.json, roc_curve.png, pr_curve.png

Usage (local):
1. python -m venv venv
2. source venv/Scripts/activate   # Git Bash or WSL: source venv/Scripts/activate
3. pip install -r requirements.txt
4. python scripts/train.py
5. python scripts/evaluate.py
6. uvicorn scripts.serve:app --reload

Notes:
- This scaffold avoids committing large model binaries. After training, model file will be in models/.
