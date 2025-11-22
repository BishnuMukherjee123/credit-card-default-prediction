import joblib, os
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from .utils import get_logger, ensure_dir, set_seed

logger = get_logger(__name__)

def build_pipeline(feature_transformer):
    pipe = Pipeline([
        ('fe', feature_transformer),
        ('scaler', StandardScaler()),
        ('clf', RandomForestClassifier(class_weight='balanced', random_state=42, n_jobs=-1))
    ])
    return pipe

def train_and_tune(pipe, X, y, models_dir='models', cv_folds=4):
    set_seed(42)
    param_grid = {'clf__n_estimators':[100,200], 'clf__max_depth':[8,12]}
    cv = StratifiedKFold(n_splits=cv_folds, shuffle=True, random_state=42)
    gs = GridSearchCV(pipe, param_grid=param_grid, cv=cv, scoring='roc_auc', n_jobs=-1, verbose=1)
    gs.fit(X, y)
    best = gs.best_estimator_
    ensure_dir(models_dir)
    artifact = {'pipeline': best, 'metadata': {'trained_at': str(__import__('datetime').datetime.utcnow()), 'best_params': gs.best_params_}}
    joblib.dump(artifact, os.path.join(models_dir,'model_pipeline.joblib'), compress=3)
    logger.info('Saved pipeline to %s', os.path.join(models_dir,'model_pipeline.joblib'))
    return artifact
