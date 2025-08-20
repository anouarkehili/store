import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  currentUser: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (fullName: string, username: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  users: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin user for initial access
const defaultAdmin: User = {
  id: 'admin-1',
  username: 'admin',
  email: 'admin@gymstore.com',
  fullName: 'Admin User',
  role: 'admin'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    // Load users from localStorage or initialize with default admin
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [defaultAdmin];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate authentication
    
    // Default admin credentials
    if (usernameOrEmail === 'admin' && password === 'admin123') {
      const adminUser = users.find(u => u.username === 'admin');
      if (adminUser) {
        setCurrentUser(adminUser);
        setIsAuthenticated(true);
        setIsAdmin(true);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        return true;
      }
    }
    
    // Find user by username or email
    const user = users.find(u => 
      u.username === usernameOrEmail || u.email === usernameOrEmail
    );
    
    // For demo purposes, we'll accept any password with length >= 4
    if (user && password && password.length >= 4) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
  };

  const signup = async (fullName: string, username: string, email: string, password: string): Promise<boolean> => {
    // Check if username or email already exists
    if (users.some(u => u.username === username || u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      fullName,
      role: 'user' // Default role is regular user
    };
    
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      signup,
      isAuthenticated,
      isAdmin,
      users
    }}>
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