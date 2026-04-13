import { api } from "../../../api/httpClient";

export const loginUser = async () => {
    return await api.get("/auth/google");
};

export const logoutUser = async () => {
    return await api.post("/auth/logout");
};

export const getCurrentUser = async () => {
    return await api.get("/auth/me");
};  