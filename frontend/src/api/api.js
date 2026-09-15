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

    const activeToken = token || localStorage.getItem("token");
    if (activeToken) {
        headers["Authorization"] = `Bearer ${activeToken}`;
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
            let errorDetail = `API Error ${response.status}`;
            try {
                const errJson = await response.json();
                if (errJson && errJson.detail) {
                    errorDetail = typeof errJson.detail === "string"
                        ? errJson.detail
                        : JSON.stringify(errJson.detail);
                } else if (errJson && errJson.message) {
                    errorDetail = errJson.message;
                }
            } catch {
                const errText = await response.text();
                if (errText) errorDetail = errText;
            }
            throw new Error(errorDetail);
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

// ─── Video Management Service APIs ───────────────────────────────────────────
export async function getVideoCatalog(category = null) {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return apiRequest(`/video/catalog${query}`, "GET");
}

export async function getVideoStreamInfo(videoId) {
    return apiRequest(`/video/stream/${videoId}`, "GET");
}

// ─── Dataset Catalog APIs ────────────────────────────────────────────────────
export async function getDatasetsList() {
    return apiRequest("/datasets/", "GET");
}

export async function getDatasetDetails(datasetId) {
    return apiRequest(`/datasets/${datasetId}`, "GET");
}

export async function getDatasetSamples(datasetId) {
    return apiRequest(`/datasets/${datasetId}/samples`, "GET");
}

// ─── Course & Lesson Management APIs ─────────────────────────────────────────
export async function getCourses(skip = 0, limit = 50) {
    return apiRequest(`/courses/?skip=${skip}&limit=${limit}`, "GET");
}

export async function getCourseLessons(courseId) {
    return apiRequest(`/lessons/${courseId}`, "GET");
}

// ─── Role Dashboard APIs ──────────────────────────────────────────────────────
export async function getLearnerDashboard(userId = 1) {
    return apiRequest(`/dashboard/learner/${userId}`, "GET");
}

export async function getInstructorDashboard() {
    return apiRequest("/dashboard/instructor", "GET");
}

export async function getTrainerDashboard() {
    return apiRequest("/dashboard/trainer", "GET");
}

export async function getAdminDashboard() {
    return apiRequest("/dashboard/admin", "GET");
}
