import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd

class IdentityTransformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None): return self
    def transform(self, X): return X

# For this dataset (V1..V28 + Amount + Time) simple standardization is fine.
# If you want to add engineered features, implement here.
class FinancialFeatureCreator(BaseEstimator, TransformerMixin):
    def __init__(self, add_amount_log=True):
        self.add_amount_log = add_amount_log
    def fit(self, X, y=None):
        return self
    def transform(self, X):
        X = X.copy()
        if self.add_amount_log and 'Amount' in X.columns:
            X['Amount_log'] = np.log1p(X['Amount'])
        return X
    def get_feature_names_out(self, input_features=None):
        return list(input_features) if input_features is not None else None
