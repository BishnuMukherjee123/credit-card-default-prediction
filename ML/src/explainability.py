import matplotlib.pyplot as plt
import shap
import numpy as np
def shap_summary(pipeline, X_sample, out_path='reports/shap_summary.png', nsample=1000):
    # Extract model (assuming pipeline last step is clf)
    transformer = pipeline[:-1]
    clf = pipeline.named_steps['clf']
    X_trans = transformer.transform(X_sample)
    explainer = shap.TreeExplainer(clf)
    shap_vals = explainer.shap_values(X_trans[:nsample])
    shap.summary_plot(shap_vals, X_trans[:nsample], show=False)
    plt.savefig(out_path)
    plt.close()
