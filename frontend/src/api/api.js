const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function apiRequest(
    endpoint,
    method = "GET",
    data = null,
    token = null
) {
    const headers = {};

    // Don't set Content-Type for FormData — the browser sets it with the boundary
    if (data && !(data instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (data) {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error ${response.status}: ${errText}`);
        }
        return await response.json();
    } catch (error) {
        console.warn(`[API] Request to ${endpoint} failed:`, error.message);
        throw error;
    }
}

// ─── Gesture Recognition Engine APIs ─────────────────────────────────────────
/**
 * Predict a gesture from hand landmarks using the specified AI model.
 * @param {Array}  landmarks      - Array of 21 landmark objects or flat 63-dim array
 * @param {string} gestureContext - Optional gesture context hint
 * @param {string} modelType      - 'cnn' | 'lstm' | 'transformer' | 'sklearn' | 'ensemble'
 */
export async function predictGestureLandmarks(landmarks, gestureContext = null, modelType = 'ensemble') {
    return apiRequest("/gesture/predict-landmarks", "POST", {
        landmarks,
        gesture_context: gestureContext,
        model_type: modelType
    });
}

export async function recognizeGestureFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    return apiRequest("/gesture/recognize", "POST", formData);
}

// ─── Sign Assessment Workflow APIs ───────────────────────────────────────────
export async function evaluateAssessment(payload) {
    return apiRequest("/assessment/evaluate", "POST", payload);
}

export async function getAssessmentHistory(userId = 1) {
    return apiRequest(`/assessment/history/${userId}`, "GET");
}

export async function getAssessmentSummary(userId = 1) {
    return apiRequest(`/assessment/summary/${userId}`, "GET");
}

// ─── Accuracy Evaluation & Scoring APIs ──────────────────────────────────────
export async function getAccuracyEvaluation(userId = 1) {
    return apiRequest(`/scoring/evaluation/${userId}`, "GET");
}

export async function calculatePerformanceScore(scoreData) {
    return apiRequest("/scoring/calculate", "POST", scoreData);
}

// ─── AI Model Status APIs ──────────────────────────────────────────────────────
/**
 * Returns status descriptor for all four active gesture AI model engines.
 * Response: { cnn: {...}, lstm: {...}, transformer: {...}, sklearn: {...} }
 */
export async function getModelsStatus() {
    return apiRequest("/prediction/models", "GET");
}