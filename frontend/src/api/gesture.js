const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function recognizeGesture(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/gesture/recognize`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Gesture recognition failed: ${response.statusText}`);
    }

    return response.json();
}