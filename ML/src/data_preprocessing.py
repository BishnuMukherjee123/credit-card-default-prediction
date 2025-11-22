import pandas as pd
from sklearn.model_selection import train_test_split
from .utils import ensure_dir
import os

def load_raw(path):
    return pd.read_csv(path)

def basic_clean(df):
    df = df.copy()
    df = df.drop_duplicates()
    # fill numeric NA with 0, categorical NA with mode
    num_cols = df.select_dtypes(include=['number']).columns.tolist()
    df[num_cols] = df[num_cols].fillna(0)
    return df

def stratified_split(df, target='Class', out_dir='data/processed', test_size=0.2, val_size=0.1, seed=42):
    ensure_dir(out_dir)
    X = df.drop(columns=[target])
    y = df[target]
    X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=(test_size+val_size), stratify=y, random_state=seed)
    rel_val = val_size / (test_size+val_size)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=rel_val, stratify=y_temp, random_state=seed)
    train = X_train.copy(); train[target] = y_train
    val = X_val.copy(); val[target] = y_val
    test = X_test.copy(); test[target] = y_test
    train.to_csv(os.path.join(out_dir,'train.csv'), index=False)
    val.to_csv(os.path.join(out_dir,'val.csv'), index=False)
    test.to_csv(os.path.join(out_dir,'test.csv'), index=False)
    return os.path.join(out_dir,'train.csv'), os.path.join(out_dir,'val.csv'), os.path.join(out_dir,'test.csv')
