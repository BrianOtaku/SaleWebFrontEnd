import { AxiosInstance } from "./axiosConfig";

export interface UserData {
    userId: number;
    userName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: number;
    role: string;
}

export interface CategoryData {
    categoryId: number;
    categoryName: string;
}

export interface ProductData {
    productId: number;
    productName: string;
    manufacturer: string;
    productDescription: string;
    cost: number;
    categoryId: number;
    categoryName: string;
}

export interface InventoryData {
    inventoryId: number;
    productId: number;
    productQuantity: number;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

const getApiUrl = (pageType: string) => {
    switch (pageType) {
        case 'users':
            return '/account';
        case 'products':
            return '/api/products';
        case 'categories':
            return '/categories';
        case 'order':
            return '/api/orders';
        default:
            throw new Error('Unknown page type');
    }
};

export const createEntity = async (pageType: string, data: any) => {
    try {
        const apiUrl = getApiUrl(pageType);
        const response = await AxiosInstance.post(apiUrl, data, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Error creating entity for ${pageType}:`, error);
        throw error;
    }
};

export const updateEntity = async (pageType: string, entityId: number, updatedData: any) => {
    try {
        const apiUrl = getApiUrl(pageType);
        const response = await AxiosInstance.put(`${apiUrl}/${entityId}`, updatedData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating entity for ${pageType}:`, error);
        throw error;
    }
};

export const deleteEntity = async (pageType: string, entityId: number) => {
    try {
        const apiUrl = getApiUrl(pageType);
        const response = await AxiosInstance.delete(`${apiUrl}/${entityId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting entity for ${pageType}:`, error);
        throw error;
    }
};
