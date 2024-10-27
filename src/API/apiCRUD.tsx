import { AxiosInstance } from "./axiosConfig";
import { getAuthHeaders } from "./apiGetInfomations";

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
    productImage: string;
    productQuantity: 0;
}

export interface OrderData {
    orderId: number;
    productName: string;
    userName: string;
    orderQuantity: number;
    deliveryAddress: string;
    totalCost: number;
    orderState: string;
    paymentMethod: string;
    paymentStatus: string;
    deliveryStatus: string;
}

const getApiUrl = (pageType: string) => {
    switch (pageType) {
        case 'users':
            return '/account';
        case 'products':
            return '/api/products';
        case 'categories':
            return '/categories';
        case 'orders':
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

export const updateDeliveryStatus = async (orderId: number, deliveryStatus: string) => {
    try {
        const apiUrl = `/api/delivery/${orderId}`;
        const response = await AxiosInstance.put(apiUrl, { deliveryStatus }, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating delivery status for order ${orderId}:`, error);
        throw error;
    }
};

export const updatePaymentStatus = async (orderId: number, paymentStatus: string) => {
    try {
        const apiUrl = `/update-status/${orderId}`;
        const response = await AxiosInstance.put(apiUrl, { paymentStatus }, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating payment status for order ${orderId}:`, error);
        throw error;
    }
};

