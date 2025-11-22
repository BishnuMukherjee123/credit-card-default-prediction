import os, json, logging, random, numpy as np
from datetime import datetime
def ensure_dir(p): os.makedirs(p, exist_ok=True)
def save_json(obj, path):
    ensure_dir(os.path.dirname(path))
    with open(path,'w') as f:
        json.dump(obj, f, indent=2)
def set_seed(seed=42):
    random.seed(seed); np.random.seed(seed)
def get_logger(name=__name__):
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
    return logging.getLogger(name)
