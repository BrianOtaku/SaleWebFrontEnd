import { AxiosInstance } from "./axiosConfig";

export interface UserData {
    userName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    role: string;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const createUser = async (userData: UserData) => {
    try {
        const response = await AxiosInstance.post('/account', userData, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (userId: number, updatedData: { userName?: string; email?: string; address?: string; phoneNumber?: string; role?: string }) => {
    try {
        const response = await AxiosInstance.put(`/account/${userId}`, updatedData, {
            headers: getAuthHeaders() // Thêm headers vào yêu cầu
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const response = await AxiosInstance.delete(`/account/${userId}`, {
            headers: getAuthHeaders() // Thêm headers vào yêu cầu
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
