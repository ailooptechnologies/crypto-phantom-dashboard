
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/Auth/LoginForm';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-tether/10 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full max-w-lg z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">CryptoDummy</h1>
          <p className="text-muted-foreground">Secure dashboard for managing dummy cryptocurrencies</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Auth;
