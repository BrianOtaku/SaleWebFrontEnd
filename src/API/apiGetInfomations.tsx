import { AxiosInstance } from "./axiosConfig";

export const getAllUsers = async () => {
    try {
        const response = await AxiosInstance.get('/account');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await AxiosInstance.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await AxiosInstance.get('/api/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export const getAllInventories = async () => {
    try {
        const response = await AxiosInstance.get('/api/inventories');
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

