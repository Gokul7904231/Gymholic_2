import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'customer' | 'trainer' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, phoneNumber: string, role: string) => Promise<boolean>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated login
    if (email && password) {
      setUser({
        id: '1',
        email,
        name: email.split('@')[0],
        role: null,
      });
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string, phoneNumber: string, role: string): Promise<boolean> => {
    if (email && password && name && phoneNumber) {
      setUser({
        id: '1',
        email,
        name,
        phoneNumber,
        role: null,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
