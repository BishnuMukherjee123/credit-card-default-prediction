export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface PredictionInput {
  credit_limit: number;
  age: number;
  sex: number;
  education: number;
  marital_status: number;
  pay_0: number;
  pay_2: number;
  pay_3: number;
  pay_4: number;
  pay_5: number;
  pay_6: number;
  bill_amt1: number;
  bill_amt2: number;
  bill_amt3: number;
  bill_amt4: number;
  bill_amt5: number;
  bill_amt6: number;
  pay_amt1: number;
  pay_amt2: number;
  pay_amt3: number;
  pay_amt4: number;
  pay_amt5: number;
  pay_amt6: number;
}

export interface PredictionResult {
  _id: string;
  id?: string;
  prediction: number; // 0 = No Default, 1 = Default
  probability: number; // 0.0 to 1.0
  riskLevel?: 'low' | 'medium' | 'high'; // Optional, computed on frontend if missing
  timestamp?: string;
  createdAt: string; // Backend field
  inputData?: PredictionInput;
  features?: number[]; // Backend field
}
