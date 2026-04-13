import axios from "axios";

export const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const apiError = {
            status: error.response?.status || 500,
            message:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong",
            errors: error.response?.data?.errors || null
        };

        return Promise.reject(apiError);
    }
);