import { AxiosInstance } from "./axiosConfig";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const getUserProfile = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/account/myInfo', {
            headers: getAuthHeaders()
        });
        // localStorage.setItem("userProfile", JSON.stringify(response.data));
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

export const getAllInventories = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/api/inventories', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all inventories:', error);
        throw error;
    }
};

// export const getAllOrders = async () => {
//     try {
//         const response = await AxiosInstance.get('/account');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching all users:', error);
//         throw error;
//     }
// };

