import React, { createContext, useContext, useState } from 'react';
import type { AuthResponse } from '../types';

type AuthContextValue = {
  token: string | null;
  exp: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [exp, setExp] = useState<string | null>(localStorage.getItem('exp'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));

  const login = ({ token, exp, email }: AuthResponse) => {
    localStorage.setItem('token', token);
    localStorage.setItem('exp', exp);
    localStorage.setItem('email', email);

    setToken(token);
    setExp(exp);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('email');

    setToken(null);
    setExp(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        exp, 
        email, 
        isAuthenticated: !!token, // Derived from the presence of token
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 他のコンポーネントで簡単に呼び出すためのカスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};