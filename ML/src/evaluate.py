import json, os
import matplotlib.pyplot as plt
from sklearn.metrics import roc_auc_score, roc_curve, precision_recall_curve, classification_report, confusion_matrix
from .utils import get_logger, ensure_dir
logger = get_logger(__name__)

def evaluate_pipeline(pipeline, X_test, y_test, out_dir='reports'):
    ensure_dir(out_dir)
    proba = pipeline.predict_proba(X_test)[:,1]
    preds = pipeline.predict(X_test)
    auc = roc_auc_score(y_test, proba)
    report = classification_report(y_test, preds, output_dict=True)
    metrics = {'roc_auc': float(auc), 'classification_report': report, 'confusion_matrix': confusion_matrix(y_test, preds).tolist()}
    with open(os.path.join(out_dir,'metrics.json'),'w') as f:
        json.dump(metrics, f, indent=2)
    fpr, tpr, _ = roc_curve(y_test, proba)
    plt.figure(); plt.plot(fpr, tpr); plt.title('ROC'); plt.xlabel('FPR'); plt.ylabel('TPR'); plt.savefig(os.path.join(out_dir,'roc_curve.png')); plt.close()
    precision, recall, _ = precision_recall_curve(y_test, proba)
    plt.figure(); plt.plot(recall, precision); plt.title('PR'); plt.xlabel('Recall'); plt.ylabel('Precision'); plt.savefig(os.path.join(out_dir,'pr_curve.png')); plt.close()
    logger.info('Saved evaluation reports to %s', out_dir)
    return metrics
