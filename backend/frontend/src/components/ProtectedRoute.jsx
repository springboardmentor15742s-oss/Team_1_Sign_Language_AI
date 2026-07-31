import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route Protection Component for Sign Language AI Platform.
 *
 * Three-level guard:
 *   1. Not authenticated              → /login
 *   2. Authenticated but no role set  → /select-role
 *   3. Wrong role for this route      → /unauthorized
 *   4. All checks pass                → render page
 *
 * Props:
 *   allowedRoles  – string | string[]  (optional; omit to allow any authenticated+role user)
 *   children      – JSX to render when authorized
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated: contextAuth, role: contextRole } = useAuth();

  /* ── 1. Authentication check ──────────────────────────────── */
  const isAuthenticated =
    contextAuth ||
    localStorage.getItem('mira_authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ── 2. Role-presence check ───────────────────────────────── */
  const rawRole =
    contextRole ||
    localStorage.getItem('mira_user_role') ||
    localStorage.getItem('user_role') ||
    localStorage.getItem('role');

  if (!rawRole) {
    // User is logged in but hasn't selected a role yet
    return <Navigate to="/select-role" replace />;
  }

  /* ── 3. Role-match check (only when allowedRoles provided) ── */
  if (allowedRoles) {
    const normalizeRole = (r) => {
      if (!r) return '';
      const lower = String(r).trim().toLowerCase();
      if (lower === 'learner') return 'Learner';
      if (lower === 'instructor') return 'Instructor';
      if (lower === 'trainer' || lower === 'accessibility trainer' || lower === 'accessibilitytrainer')
        return 'Accessibility Trainer';
      if (lower === 'admin' || lower === 'administrator') return 'Administrator';
      return String(r).trim();
    };

    const userRole = normalizeRole(rawRole);
    const allowedList = (Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]).map(normalizeRole);

    if (!allowedList.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  /* ── 4. Authorized ────────────────────────────────────────── */
  return children ? children : <Outlet />;
}

