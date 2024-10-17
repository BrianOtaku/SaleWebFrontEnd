import { AxiosInstance, decodeToken } from "./axiosConfig";

// Hàm đăng ký tài khoản
export const signUp = async (userData: { userName: string; email: string; password: string }) => {
    try {
        const response = await AxiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};

// Hàm đăng nhập
export const signIn = async (credentials: { email: string; password: string }) => {
    try {
        const response = await AxiosInstance.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error during sign in:', error);
        throw error;
    }
};

// Hàm lấy thông tin người dùng
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

// Hàm lấy tên người dùng từ token
export const getUserNameFromToken = (token: string): string | null => {
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken.sub : null; // Lấy tên người dùng từ sub
};
