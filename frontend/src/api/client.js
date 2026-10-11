/**
 * Axios client for communicating with the FastAPI backend.
 */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Response interceptor — unwrap data or extract error message
client.interceptors.response.use(
    (response) => response,
    (error) => {
        // Build a friendly error message from FastAPI's response
        let message = 'Something went wrong';

        if (error.response) {
            const data = error.response.data;

            if (data?.errors && Array.isArray(data.errors)) {
                // Validation errors from our custom handler
                message = data.errors.map((e) => `${e.field}: ${e.message}`).join(', ');
            } else if (data?.message) {
                message = data.message;
            } else if (data?.detail) {
                // FastAPI's default shape
                if (typeof data.detail === 'string') {
                    message = data.detail;
                } else if (Array.isArray(data.detail)) {
                    message = data.detail.map((d) => d.msg || String(d)).join(', ');
                }
            }
        } else if (error.request) {
            message = 'Cannot reach server. Is the backend running?';
        }

        return Promise.reject(new Error(message));
    }
);

export default client;