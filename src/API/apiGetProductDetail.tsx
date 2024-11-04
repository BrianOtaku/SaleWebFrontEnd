import axios from "axios";

// Product Interface
export interface Product {
  productId: number;
  productName: string;
  manufacturer: string;
  productDescription: string;
  cost: number;
  productImage: string;
  productQuantity: number;
  category: {
    categoryId: number;
    categoryName: string;
  };
}

// Response Interface
interface ProductDataResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
}

// Function to fetch paginated products
export const getProductsDetail = async (
  category: string = "all",
  limit: number = 10,
  page: number = 1
): Promise<ProductDataResponse> => {
  try {
    const response = await axios.get("http://localhost:8080/api/products/pages", {
      params: { category, limit, page },
    });
    const data = response.data;

    const products = data.content.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      manufacturer: item.manufacturer,
      productDescription: item.productDescription,
      cost: item.cost,
      productImage: item.productImage,
      productQuantity: item.productQuantity,
      category: {
        categoryId: item.category.categoryId,
        categoryName: item.category.categoryName,
      },
    }));

    return { products, totalProducts: data.totalElements, totalPages: data.totalPages };
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

// Function to fetch product by ID
export const getProductById = async (productId: number): Promise<Product | null> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details for ID", productId, ":", error);
    return null;
  }
};

// Function to fetch products by name
export const getProductsByName = async (name: string): Promise<Product[]> => {
  try {
    const response = await axios.get("http://localhost:8080/api/products/searchByName", {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by name:", error);
    throw error;
  }
};
