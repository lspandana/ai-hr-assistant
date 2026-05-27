import axios from 'axios';
import { ChatResponse, FeedbackRequest } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const sendMessage = async (
  message: string,
  sessionId?: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/chat', {
    message,
    sessionId,
  });
  return response.data;
};

export const sendFeedback = async (
  feedback: FeedbackRequest
): Promise<void> => {
  await api.post('/chat/feedback', feedback);
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch {
    return false;
  }
};

export default api;