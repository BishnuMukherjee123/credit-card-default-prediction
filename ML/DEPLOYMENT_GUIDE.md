# Deploy ML Service to Render - Quick Guide

## Prerequisites ✓
- [x] Model file exists: `models/model_pipeline.joblib`
- [x] Git repository initialized
- [x] Deployment files created

## Files Created/Modified

### 1. **render.yaml** (NEW)
Render Blueprint configuration that defines:
- Service type, name, and runtime
- Build and start commands
- Environment variables

### 2. **scripts/serve.py** (MODIFIED)
Added:
- `/health` endpoint for Render health checks
- `/` root endpoint with API documentation
- Updated CORS to allow Render backend and frontend

### 3. **requirements.txt** (MODIFIED)
Added:
- `python-multipart` for FastAPI form handling
- `pydantic` version pinning for compatibility

## Deployment Steps

### Step 1: Commit Changes
```bash
cd "c:\Users\jerry\OneDrive\Desktop\New folder\ML"
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub/GitLab repository
4. Select the ML repository

### Step 3: Configure Service
Render will auto-detect the `render.yaml` file, but verify:
- **Name**: `credit-fraud-ml-api` (or your preferred name)
- **Branch**: `main`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn scripts.serve:app --host 0.0.0.0 --port $PORT`
- **Plan**: Free (or your preferred plan)

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for build (5-10 minutes for first deployment)
3. Monitor logs for any errors

### Step 5: Test Deployment
Once deployed, you'll get a URL like: `https://credit-fraud-ml-api.onrender.com`

Test the endpoints:
```bash
# Health check
curl https://your-service.onrender.com/health

# Root endpoint
curl https://your-service.onrender.com/

# Prediction (example)
curl -X POST https://your-service.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]}'
```

### Step 6: Update Backend
Update your backend's `.env` file with the deployed ML service URL:
```env
ML_API_URL=https://credit-fraud-ml-api.onrender.com
```

Then redeploy your backend.

## Important Notes

> [!WARNING]
> **Free Tier Limitation**: Render's free tier spins down after 15 minutes of inactivity. First request after inactivity will take 30-60 seconds to wake up.

> [!NOTE]
> **CORS Wildcard**: The current CORS config uses `https://*.onrender.com` which is a wildcard. After deployment, you may want to replace this with your specific backend URL for better security.

## Troubleshooting

### Build Fails
- Check that all dependencies in `requirements.txt` are compatible
- Verify Python version is 3.11.0
- Check Render build logs for specific errors

### Model Not Found Error
- Ensure `models/model_pipeline.joblib` is committed to git (check `.gitignore`)
- Verify the file is in the repository

### CORS Errors
- Update the `ALLOWED_ORIGINS` in `serve.py` with your actual backend URL
- Redeploy after changes

### Port Binding Errors
- Ensure the start command uses `--port $PORT` (Render provides this env var)
