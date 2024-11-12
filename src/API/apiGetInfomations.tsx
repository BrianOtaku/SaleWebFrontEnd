import { AxiosInstance } from "./axiosConfig";

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };
};

export const getUserProfile = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/account/myInfo', {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const getUserProfileById = async (id: number, token: string) => {
    try {
        const apiUrl = `/account/${id}`;
        const response = await AxiosInstance.get(apiUrl, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const getAllUsers = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/account', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const getAllCategories = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};

export const getAllProducts = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/api/products', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export const getAllOrders = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

export const getAllCarts = async (id: number, token: string) => {
    try {
        const response = await AxiosInstance.get(`/api/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

