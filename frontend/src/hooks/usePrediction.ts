import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://127.0.0.1:8000';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

interface MLPredictionResult {
  prediction: 0 | 1; // 0 = Not Fraud, 1 = Fraud
  probability: number;
}

export const usePrediction = () => {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (features: number[]): Promise<MLPredictionResult> => {
    setIsLoading(true);
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        await new Promise(r => setTimeout(r, 1500));
        const amount = features[29] || 0;
        const isFraud = amount > 500;
        const probability = isFraud ? 0.85 + Math.random() * 0.1 : 0.1 + Math.random() * 0.2;

        return {
          prediction: isFraud ? 1 : 0,
          probability: parseFloat(probability.toFixed(4)),
        };
      }

      const response = await fetch(`${ML_API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();

      if (typeof data.prediction !== 'number' || typeof data.probability !== 'number') {
        throw new Error('Invalid API response format');
      }

      return {
        prediction: data.prediction,
        probability: data.probability,
      };
    } catch (err: any) {
      const message = err.message || 'Prediction failed';
      setError(message);
      console.error('Prediction error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePrediction = useCallback(async (record: {
    features: number[];
    prediction: number;
    probability: number;
    timestamp: string;
  }) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(record),
      });

      if (!res.ok) throw new Error('Failed to save prediction');

      return await res.json();
    } catch (err) {
      console.error('Save prediction error:', err);
      throw err;
    }
  }, [getToken]);

  const getHistory = useCallback(async (): Promise<any[]> => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/predictions/history`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to fetch history');

      const data = await res.json();

      return data;
    } catch (err) {
      console.error('Fetch history error:', err);
      return [];
    }
  }, [getToken]);

  const getDashboardStats = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/predictions/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch dashboard stats');
      
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error('Dashboard stats error:', err);
      throw err;
    }
  };

  const getAnalytics = async (year?: number) => {
    try {
      const token = await getToken();
      const query = year ? `?year=${year}` : '';
      const res = await fetch(`${API_URL}/api/predictions/analytics${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch analytics');
      
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error('Analytics fetch error:', err);
      throw err;
    }
  };

  return { predict, savePrediction, getHistory, getDashboardStats, getAnalytics, isLoading, error };
};
