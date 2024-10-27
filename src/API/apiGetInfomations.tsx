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

        // Chắc chắn rằng dữ liệu được trả về là một mảng sản phẩm
        return response.data.map((product: any) => ({
            id: product.product_id,
            name: product.product_name,
            price: product.cost,
            image: product.product_image || process.env.PUBLIC_URL + '/image/sp2.png', // Giữ lại hình ảnh mẫu nếu không có hình từ DB
            specs: [product.product_description], // Bạn có thể chỉnh sửa lại để lấy thêm thông tin nếu cần
        }));
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export const getProductDetail = async (productId: string) => {
    try {
      const response = await AxiosInstance.get(`/api/products/${productId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching product detail:', error);
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

export const getAllPayments = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/update-status/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all payments:', error);
        throw error;
    }
};

export const getAllDeliveries = async (token: string) => {
    try {
        const response = await AxiosInstance.get('/api/delivery', {
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

