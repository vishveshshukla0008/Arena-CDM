import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { getCurrentUser, loginUser, logoutUser } from '../services/auth.api';


const useAuth = () => {
    const { setLoading, setUser } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await loginUser();
            setUser(response.user);
            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await logoutUser();
            setUser(null);
            return response;
        } catch (error) {
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleGetUser = async () => {
        try {
            setLoading(true);
            const response = await getCurrentUser();
            setUser(response.user);
            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }


    return { handleGetUser, handleLogin, handleLogout }

}
export default useAuth