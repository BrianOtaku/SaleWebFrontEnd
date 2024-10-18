import { AxiosInstance, decodeToken } from "./axiosConfig";

export const signUp = async (userData: { userName: string; email: string; password: string }) => {
    try {
        const response = await AxiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};

export const signIn = async (credentials: { email: string; password: string }) => {
    try {
        const response = await AxiosInstance.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error during sign in:', error);
        throw error;
    }
};

export const getUserProfile = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/account/myInfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const getUserNameFromToken = (token: string): string | null => {
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken.sub : null;
};

export const getUserRoleFromToken = (token: string): string | null => {
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken.scope : null;
};

