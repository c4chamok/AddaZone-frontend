import axios, { AxiosError } from 'axios'

export const axiosSecure = axios.create({ baseURL: import.meta.env.VITE_BASE_UPL, withCredentials: true })
export const axiosPublic = axios.create({ baseURL: import.meta.env.VITE_BASE_UPL })

axiosSecure.interceptors.response.use(
    response => response, // Return successful response
    error => {
        // Only handle AxiosError
        if (error instanceof AxiosError) {
            const customMessage = error.response?.data?.error?.message;

            if (customMessage) {
                // Override the original message with the backend error message
                error.message = customMessage;
            }
        } else {
            console.error("Unexpected error:", error);
            error.message = "Unexpected error occurred";
        }

        // Forward the error with the updated message
        return Promise.reject(error);
    }
);
axiosPublic.interceptors.response.use(
    response => response, // Return successful response
    error => {
        // Only handle AxiosError
        if (error instanceof AxiosError) {
            const customMessage = error.response?.data?.error?.message;

            if (customMessage) {
                // Override the original message with the backend error message
                error.message = customMessage;
            }
        } else {
            console.error("Unexpected error:", error);
            error.message = "Unexpected error occurred";
        }

        // Forward the error with the updated message
        return Promise.reject(error);
    }
);