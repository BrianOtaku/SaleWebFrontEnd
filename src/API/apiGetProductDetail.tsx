import axios from "axios";

// Định nghĩa kiểu dữ liệu cho sản phẩm


export interface Product {
  productId: number;
  productName: string;
  manufacturer: string;
  productDescription: string;
  cost: number;
  productImage: string;
  productQuantity: number;
   // Bao gồm cả Category trong Product
}

// Hàm lấy tất cả sản phẩm từ API
export const getProductsDetail = async (
  category: string = "LAPTOP",
  limit: number = 1,
  page: number = 2
): Promise<Product[]> => {
  try {
    const response = await axios.get("http://localhost:8080/api/products/pages", {
      params: {
        category:"all", // Truyền tham số category
        limit:10,    // Truyền tham số limit
        page:1,     // Truyền tham số page
      },
    });

    const data = response.data;

    // Kiểm tra nếu content không rỗng
    if (data.content && Array.isArray(data.content)) {
      return data.content.map((item: any) => ({
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
    }

    // Nếu không có sản phẩm, trả về mảng rỗng
    return [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm này
  }
};
