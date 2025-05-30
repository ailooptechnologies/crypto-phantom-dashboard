import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (username: string, password: string) => 
  api.post('/auth/login', { username, password });

// Wallet APIs
export const getWallets = () => 
  api.get('/wallets');

export const createWallet = (data: { name: string; address: string; network: string; }) => 
  api.post('/wallets', data);

export const deleteWallet = (id: string) => 
  api.delete(`/wallets/${id}`);

// Token APIs
export const generateToken = (data: { 
  symbol: string;
  amount: string;
  network: string;
  walletId: string;
  expiryDays: number;
}) => api.post('/tokens/generate', data);

export const getWalletTokens = (walletId: string) => 
  api.get(`/tokens/wallet/${walletId}`);

export const transferToken = (data: {
  fromWalletId: string;
  toWalletId: string;
  tokenId: string;
  amount: string;
}) => api.post('/tokens/transfer', data);