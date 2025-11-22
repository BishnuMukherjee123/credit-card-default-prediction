# 🛡️ Credit Card Fraud Detection System

A comprehensive full-stack application for detecting credit card fraud using Machine Learning. This system consists of a React frontend, a Node.js/Express backend, and a Python/FastAPI ML service.

## 🏗️ Architecture

The project is organized into three main components:

1.  **`frontend`**: A modern React application (Vite) for the user interface, featuring real-time predictions, analytics dashboards, and history tracking.
2.  **`backend`**: A Node.js/Express server that handles user authentication, data persistence (MongoDB), and communication between the frontend and the ML service.
3.  **`ML`**: A Python FastAPI service that hosts the trained machine learning model (Random Forest/XGBoost) to serve fraud predictions.

## 🚀 Prerequisites

*   **Node.js** (v16 or higher)
*   **Python** (v3.8 or higher)
*   **MongoDB** (Local or Atlas connection string)

---

## 🛠️ Installation & Setup

### 1. Machine Learning Service (`ML`)

The ML service powers the fraud detection logic.

```bash
cd ML

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment
# Create a .env file in the ML directory with:
# ALLOWED_ORIGIN=http://localhost:5173
# PORT=8000
# HOST=127.0.0.1
```

**Run the ML Service:**
```bash
uvicorn scripts.serve:app --reload --host 127.0.0.1 --port 8000
```

### 2. Backend API (`backend`)

The backend manages data and API requests.

```bash
cd backend

# Install dependencies
npm install

# Configure Environment
# Create a .env file in the backend directory with:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/credit-fraud-db
# JWT_SECRET=your_super_secret_key
# ML_SERVICE_URL=http://127.0.0.1:8000
```

**Run the Backend:**
```bash
npm run dev
```

### 3. Frontend Client (`frontend`)

The user interface for interacting with the system.

```bash
cd frontend

# Install dependencies
npm install

# Configure Environment
# Create a .env file in the frontend directory with:
# VITE_API_URL=http://localhost:5000
```

**Run the Frontend:**
```bash
npm run dev
```

---

## 🖥️ Usage

1.  Ensure all three services (ML, Backend, Frontend) are running.
2.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your frontend terminal).
3.  **Dashboard**: View system status and recent activity.
4.  **Prediction**: Enter transaction details manually or load sample data to check for fraud.
5.  **Analytics**: Visualize transaction trends, fraud distribution, and historical data.
6.  **History**: Review past predictions and their outcomes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
