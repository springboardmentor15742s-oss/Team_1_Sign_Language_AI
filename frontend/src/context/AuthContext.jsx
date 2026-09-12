import { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api/api';

/* ─── Known Accounts & Role Access Configurations ────────────────── */
export const KNOWN_ACCOUNTS = {
  learner: {
    email: 'learner@mira.ai',
    password: 'Password123!',
    name: 'Sarah Miller',
    role: 'Learner',
    allowedRoles: ['Learner'],
    badge: 'Standard Learner',
  },
  instructor: {
    email: 'instructor@mira.ai',
    password: 'Password123!',
    name: 'Prof. David Clark',
    role: 'Instructor',
    allowedRoles: ['Instructor'],
    badge: 'Certified Instructor',
  },
  trainer: {
    email: 'trainer@mira.ai',
    password: 'Password123!',
    name: 'Elena Rostova',
    role: 'Accessibility Trainer',
    allowedRoles: ['Accessibility Trainer'],
    badge: 'Accessibility Specialist',
  },
  admin: {
    email: 'admin@mira.ai',
    password: 'Password123!',
    name: 'System Admin',
    role: 'Administrator',
    allowedRoles: ['Administrator', 'Instructor', 'Accessibility Trainer', 'Learner'],
    badge: 'Platform Administrator',
  },
  legacyLearner: {
    email: 'learner@signai.com',
    password: 'learner123',
    name: 'Alex Morgan',
    role: 'Learner',
    allowedRoles: ['Learner'],
    badge: 'Standard Learner',
  },
};

/* ─── Default User State Fallback ────────────────────────────────── */
const DEFAULT_USER = {
  name: 'Sarah Miller',
  email: 'learner@mira.ai',
  role: 'Learner',
  accountType: 'learner',
  allowedRoles: ['Learner'],
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
  // Initialize authentication state from localStorage (only valid tokens)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authFlag = localStorage.getItem('mira_authenticated');
    const token = localStorage.getItem('token');
    return authFlag === 'true' && Boolean(token && !token.startsWith('jwt_session_'));
  });

  const [role, setRole] = useState(() => {
    return (
      localStorage.getItem('role') ||
      localStorage.getItem('mira_user_role') ||
      localStorage.getItem('user_role') ||
      'Learner'
    );
  });

  // Single Free Trial tracking
  const [trialCompleted, setTrialCompleted] = useState(() => {
    return localStorage.getItem('mira_free_trial_completed') === 'true';
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

  // Sync role & token across localStorage whenever role changes
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
      localStorage.setItem('mira_user_role', role);
    }
  }, [role]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mira_user', JSON.stringify(user));
      if (user.name) {
        localStorage.setItem('mira_user_name', user.name);
      }
      if (user.role) {
        localStorage.setItem('role', user.role);
        localStorage.setItem('mira_user_role', user.role);
      }
    }
  }, [user]);

  // Check if target role is allowed for current user
  const canAccessRole = (targetRoleTitle) => {
    if (!user) return false;
    const allowed = user.allowedRoles || (user.role ? [user.role] : ['Learner']);
    // Administrator can access everything
    if (allowed.includes('Administrator') || user.role === 'Administrator') return true;
    return allowed.includes(targetRoleTitle);
  };

  // Real backend login handler
  const login = async (credentials = {}) => {
    const emailLower = (credentials.email || '').toLowerCase().trim();
    const password = credentials.password;

    if (!emailLower || !password) {
      throw new Error('Email and password are required.');
    }

    // Call real FastAPI backend: POST /auth/login
    const result = await apiRequest('/auth/login', 'POST', {
      email: emailLower,
      password: password,
    });

    const token = result.access_token;
    const backendRole = result.role || 'learner';

    // Normalize role for UI
    let normalizedRole = 'Learner';
    const roleLower = backendRole.toLowerCase();
    if (roleLower === 'instructor') normalizedRole = 'Instructor';
    else if (roleLower === 'accessibility trainer' || roleLower === 'trainer') normalizedRole = 'Accessibility Trainer';
    else if (roleLower === 'administrator' || roleLower === 'admin') normalizedRole = 'Administrator';
    else normalizedRole = 'Learner';

    // Match known accounts metadata if available
    let matchedAccount = Object.values(KNOWN_ACCOUNTS).find(
      acc => acc.email.toLowerCase() === emailLower
    );

    let assignedName = credentials.name || (matchedAccount ? matchedAccount.name : (emailLower.split('@')[0] || 'User'));
    let allowedRoles = matchedAccount ? matchedAccount.allowedRoles : [normalizedRole];
    if (normalizedRole === 'Administrator' && !allowedRoles.includes('Administrator')) {
      allowedRoles = ['Administrator', 'Instructor', 'Accessibility Trainer', 'Learner'];
    }

    const updatedUser = {
      ...DEFAULT_USER,
      ...user,
      email: emailLower,
      name: assignedName,
      role: normalizedRole,
      allowedRoles: allowedRoles,
      accountType: normalizedRole.toLowerCase(),
    };

    setUser(updatedUser);
    setRole(normalizedRole);
    setIsAuthenticated(true);

    // Synchronize to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', normalizedRole);
    localStorage.setItem('mira_user_role', normalizedRole);
    localStorage.setItem('mira_authenticated', 'true');
    localStorage.setItem('mira_user', JSON.stringify(updatedUser));
    localStorage.setItem('mira_user_name', assignedName);

    return { user: updatedUser, token, role: normalizedRole };
  };

  // Real backend register handler
  const register = async (userData = {}) => {
    const emailLower = (userData.email || '').toLowerCase().trim();
    const fullName = userData.full_name || userData.name || emailLower.split('@')[0];
    const password = userData.password;
    const role = (userData.role || 'learner').toLowerCase();

    if (!emailLower || !password || !fullName) {
      throw new Error('Full name, email, and password are required.');
    }

    // Call real FastAPI backend: POST /auth/register
    const result = await apiRequest('/auth/register', 'POST', {
      full_name: fullName,
      email: emailLower,
      password: password,
      role: role,
    });

    return result;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('mira_authenticated');
    localStorage.removeItem('mira_user_role');
    localStorage.removeItem('user_role');
    localStorage.removeItem('mira_user');
    localStorage.removeItem('mira_user_name');
  };

  // Profile update handler
  const updateProfile = (updates = {}) => {
    if (updates.role) {
      setRole(updates.role);
      localStorage.setItem('role', updates.role);
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
    const token = localStorage.getItem('token');
    
    // Update local state
    setRole(newRole);
    setIsAuthenticated(Boolean(token));

    // Update user object with selected role
    setUser(prev => {
      const updated = prev ? { ...prev, role: newRole } : { ...DEFAULT_USER, role: newRole };
      localStorage.setItem('mira_user', JSON.stringify(updated));
      return updated;
    });

    // Synchronize to localStorage
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('role', newRole);
    localStorage.setItem('mira_user_role', newRole);
    if (token) localStorage.setItem('mira_authenticated', 'true');
  };

  // Single Free Trial controls
  const completeFreeTrial = () => {
    setTrialCompleted(true);
    localStorage.setItem('mira_free_trial_completed', 'true');
  };

  const resetFreeTrial = () => {
    setTrialCompleted(false);
    localStorage.removeItem('mira_free_trial_completed');
  };

  const value = {
    user,
    role,
    isAuthenticated,
    trialCompleted,
    completeFreeTrial,
    resetFreeTrial,
    canAccessRole,
    login,
    logout,
    register,
    updateProfile,
    selectRole,
    knownAccounts: KNOWN_ACCOUNTS,
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
