import { createContext, useContext, useState, useEffect } from 'react';

/* ─── Default User State Fallback ────────────────────────────────── */
const DEFAULT_USER = {
  name: 'Alex Morgan',
  email: 'alex.morgan@email.com',
  role: 'Learner',
  joinDate: 'January 2026',
  avatar: null,
  avatarColor: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
  phone: '+91 98765 43210',
  country: 'India',
  language: 'English (ASL)',
  level: 'Intermediate (Level 2)',
  goals: 'Master conversational ASL for daily use and pass Level 3 certification by September.',
};


/* ─── Create Auth Context ────────────────────────────────────────── */
const AuthContext = createContext(null);

/* ─── AuthProvider Component ─────────────────────────────────────── */
export function AuthProvider({ children }) {
  // Initialize state directly from localStorage so state persists across page refreshes
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      localStorage.getItem('mira_authenticated') === 'true' ||
      Boolean(localStorage.getItem('mira_user_role'))
    );
  });

  const [role, setRole] = useState(() => {
    return (
      localStorage.getItem('mira_user_role') ||
      localStorage.getItem('user_role') ||
      localStorage.getItem('role') ||
      null
    );
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mira_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Failed to parse mira_user from localStorage', e);
      }
    }
    const savedName = localStorage.getItem('mira_user_name');
    if (savedName) {
      return { ...DEFAULT_USER, name: savedName };
    }
    return DEFAULT_USER;
  });

  // Sync role & user to localStorage whenever they change
  useEffect(() => {
    if (role) {
      localStorage.setItem('mira_user_role', role);
    }
  }, [role]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mira_user', JSON.stringify(user));
      if (user.name) {
        localStorage.setItem('mira_user_name', user.name);
      }
    }
  }, [user]);

  // Login handler
  const login = (userData = {}) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    setIsAuthenticated(true);
    localStorage.setItem('mira_authenticated', 'true');
    localStorage.setItem('mira_user', JSON.stringify(updatedUser));

    if (userData.role) {
      setRole(userData.role);
      localStorage.setItem('mira_user_role', userData.role);
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mira_authenticated');
    localStorage.removeItem('mira_user_role');
    localStorage.removeItem('user_role');
    localStorage.removeItem('role');
    localStorage.removeItem('mira_user');
    localStorage.removeItem('mira_user_name');
  };

  // Register handler
  const register = (userData = {}) => {
    const newUser = { ...DEFAULT_USER, ...userData };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('mira_authenticated', 'true');
    localStorage.setItem('mira_user', JSON.stringify(newUser));
    if (userData.name) {
      localStorage.setItem('mira_user_name', userData.name);
    }
  };

  // Profile update handler
  const updateProfile = (updates = {}) => {
    if (updates.role) {
      setRole(updates.role);
      localStorage.setItem('mira_user_role', updates.role);
    }
    setUser(prevUser => {
      const updated = { ...(prevUser || DEFAULT_USER), ...updates };
      localStorage.setItem('mira_user', JSON.stringify(updated));
      if (updated.name) {
        localStorage.setItem('mira_user_name', updated.name);
      }
      return updated;
    });
  };

  // Select Role handler
  const selectRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('mira_user_role', newRole);
    localStorage.setItem('mira_authenticated', 'true');
    setIsAuthenticated(true);
    setUser(prev => {
      const updated = prev ? { ...prev, role: newRole } : { ...DEFAULT_USER, role: newRole };
      localStorage.setItem('mira_user', JSON.stringify(updated));
      return updated;
    });
  };


  const value = {
    user,
    role,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfile,
    selectRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ─── Custom Hook to consume AuthContext ─────────────────────────── */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
