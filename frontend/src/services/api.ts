import axios from 'axios';
import { 
  StockData, 
  MLFeature, 
  TimeSeriesPrediction, 
  LLMInsight 
} from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Type for ticker parameter
type Ticker = string;

// Input data for predictions
interface PredictionInputData {
  timeframe?: string;
  model_type?: string;
  [key: string]: any;
}

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get stock data for a specific ticker
export const getStockData = async (ticker: Ticker): Promise<StockData[]> => {
  const response = await apiClient.get(`/api/stocks/${ticker}`);
  return response.data;
};

// Get LLM analysis for a ticker
export const getAnalysis = async (ticker: Ticker): Promise<LLMInsight> => {
  const response = await apiClient.get(`/api/analysis/${ticker}`);
  return response.data;
};

// Get predictions for a ticker
export const getPrediction = async (ticker: Ticker, data: PredictionInputData = {}): Promise<TimeSeriesPrediction> => {
  const response = await apiClient.post(`/api/predict/${ticker}`, data);
  return response.data;
};

// Get feature importance for ML model
export const getFeatures = async (ticker: Ticker): Promise<MLFeature[]> => {
  const response = await apiClient.get(`/api/features/${ticker}`);
  return response.data;
};

// Get trend data for a keyword
export const getTrends = async (keyword: string): Promise<{keyword: string, data: any[]}> => {
  const response = await apiClient.get(`/api/trends/${keyword}`);
  return response.data;
};