const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function apiCall(
    endpoint,
    method = "GET",
    body = null
) {
    const token = localStorage.getItem("token");
    const headers = {};

    // Don't set Content-Type for FormData — the browser sets it with the boundary
    if (body && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`API Error ${response.status}`);
    }
    return response.json();
}

// Re-export all backend API functions from the central api module
export * from "../api/api";