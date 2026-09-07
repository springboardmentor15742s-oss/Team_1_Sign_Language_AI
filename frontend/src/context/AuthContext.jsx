import { createContext, useContext, useState, useEffect } from 'react';

/* ─── Known Accounts & Role Access Configurations ────────────────── */
export const KNOWN_ACCOUNTS = {
  learner: {
    email: 'learner@signai.com',
    password: 'learner123',
    name: 'Alex Morgan',
    role: 'Learner',
    allowedRoles: ['Learner'],
    badge: 'Standard Learner',
  },
  instructor: {
    email: 'instructor@signai.com',
    password: 'instructor123',
    name: 'Prof. Sarah Jenkins',
    role: 'Instructor',
    allowedRoles: ['Instructor'],
    badge: 'Certified Instructor',
  },
  trainer: {
    email: 'trainer@signai.com',
    password: 'trainer123',
    name: 'Marcus Vance',
    role: 'Accessibility Trainer',
    allowedRoles: ['Accessibility Trainer'],
    badge: 'Accessibility Specialist',
  },
  admin: {
    email: 'admin@signai.com',
    password: 'admin123',
    name: 'Elena Rostova',
    role: 'Administrator',
    allowedRoles: ['Administrator', 'Instructor', 'Accessibility Trainer', 'Learner'],
    badge: 'Platform Administrator',
  },
};

/* ─── Default User State Fallback ────────────────────────────────── */
const DEFAULT_USER = {
  name: 'Alex Morgan',
  email: 'learner@signai.com',
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
  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authFlag = localStorage.getItem('mira_authenticated');
    const token = localStorage.getItem('token');
    return authFlag === 'true' || Boolean(token);
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

  // Login handler
  const login = (userData = {}) => {
    const emailLower = (userData.email || '').toLowerCase().trim();
    
    // Check known accounts
    let matchedAccount = Object.values(KNOWN_ACCOUNTS).find(
      acc => acc.email.toLowerCase() === emailLower
    );

    let assignedRole = userData.role || (matchedAccount ? matchedAccount.role : 'Learner');
    let allowedRoles = matchedAccount ? matchedAccount.allowedRoles : ['Learner'];
    let assignedName = userData.name || (matchedAccount ? matchedAccount.name : (emailLower.split('@')[0] || 'User'));

    const token = userData.token || localStorage.getItem('token') || `jwt_session_${Date.now()}`;

    const updatedUser = {
      ...DEFAULT_USER,
      ...user,
      ...userData,
      email: emailLower || 'learner@signai.com',
      name: assignedName,
      role: assignedRole,
      allowedRoles: allowedRoles,
      accountType: matchedAccount ? matchedAccount.role.toLowerCase() : 'learner'
    };

    setUser(updatedUser);
    setRole(assignedRole);
    setIsAuthenticated(true);

    // Synchronize to localStorage immediately
    localStorage.setItem('token', token);
    localStorage.setItem('role', assignedRole);
    localStorage.setItem('mira_user_role', assignedRole);
    localStorage.setItem('mira_authenticated', 'true');
    localStorage.setItem('mira_user', JSON.stringify(updatedUser));
    localStorage.setItem('mira_user_name', assignedName);

    return updatedUser;
  };

  // Register handler - new registered users default to Learner role
  const register = (userData = {}) => {
    const emailLower = (userData.email || '').toLowerCase().trim();
    const token = `jwt_session_${Date.now()}`;
    const assignedName = userData.name || emailLower.split('@')[0] || 'New Learner';

    const newUser = {
      ...DEFAULT_USER,
      ...userData,
      email: emailLower,
      name: assignedName,
      role: 'Learner',
      allowedRoles: ['Learner'],
      accountType: 'learner',
    };

    setUser(newUser);
    setRole('Learner');
    setIsAuthenticated(true);

    localStorage.setItem('token', token);
    localStorage.setItem('role', 'Learner');
    localStorage.setItem('mira_user_role', 'Learner');
    localStorage.setItem('mira_authenticated', 'true');
    localStorage.setItem('mira_user', JSON.stringify(newUser));
    localStorage.setItem('mira_user_name', assignedName);

    return newUser;
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
    const token = localStorage.getItem('token') || `jwt_session_${Date.now()}`;
    
    // Update local state
    setRole(newRole);
    setIsAuthenticated(true);

    // Update user object with selected role
    setUser(prev => {
      const updated = prev ? { ...prev, role: newRole } : { ...DEFAULT_USER, role: newRole };
      localStorage.setItem('mira_user', JSON.stringify(updated));
      return updated;
    });

    // Synchronize to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', newRole);
    localStorage.setItem('mira_user_role', newRole);
    localStorage.setItem('mira_authenticated', 'true');
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
