import { apiRequest } from "../api/api";

export async function login(email, password) {
  const result = await apiRequest("/auth/login", "POST", {
    email,
    password,
  });

  if (result?.access_token) {
    localStorage.setItem("token", result.access_token);
  }
  if (result?.role) {
    localStorage.setItem("role", result.role);
  }

  return result;
}

export async function register(fullName, email, password, role = "learner") {
  const result = await apiRequest("/auth/register", "POST", {
    full_name: fullName,
    email,
    password,
    role,
  });

  return result;
}