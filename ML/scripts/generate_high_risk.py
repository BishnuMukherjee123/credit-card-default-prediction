import pandas as pd
import json
from pathlib import Path

# path to your dataset
BASE = Path(__file__).resolve().parents[1]
df = pd.read_csv(BASE / "data" / "raw" / "credit_card_data.csv")

# Check columns
EXPECTED = ["Time"] + [f"V{i}" for i in range(1, 29)] + ["Amount", "Class"]
if list(df.columns) != EXPECTED:
    print("⚠ Column mismatch! Your data columns are not in the standard order.")
    print("Found:", list(df.columns))
    exit(1)

# Filter fraud rows
frauds = df[df["Class"] == 1]

if frauds.empty:
    print("❌ No fraud rows found in dataset.")
    exit(1)

# Pick one high-risk fraud example
row = frauds.iloc[0]  # first fraud sample
features = row.drop("Class").tolist()

# Convert for curl
features_json = json.dumps({"features": features})

print("\n🔥 HIGH-RISK FRAUD SAMPLE GENERATED\n")
print("Use this curl command:\n")
print(f"""curl -X POST "http://127.0.0.1:8000/predict" \\
  -H "Content-Type: application/json" \\
  -d '{features_json}'""")

print("\nRaw features list:")
print(features)
