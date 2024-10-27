import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/content.css";
import { getProductsDetail, Product } from "../API/apiGetProductDetail";

function Content() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Placeholder khi sản phẩm đang tải
  const placeholderProducts: Product[] = Array.from(
    { length: productsPerPage },
    (_, index) => ({
      productId: index + 1,
      productName: "Sản Phẩm Mẫu",
      cost: 0,
      productImage: process.env.PUBLIC_URL + "/image/sp2.png",
      productDescription: "Đang tải...",
      manufacturer: "Nhà sản xuất",
      productQuantity: 0,
      category: { categoryId: 0, categoryName: "" },
    })
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProductsDetail();
        if (!Array.isArray(productData) || productData.length === 0) {
          throw new Error("Dữ liệu sản phẩm không hợp lệ hoặc trống.");
        }
        setProducts(productData);
      } catch (error: any) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setError(error.message || "Đã xảy ra lỗi không xác định.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (isLoading ? placeholderProducts : products).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Hàm để lấy 3 thông tin đầu tiên từ mô tả
  const getShortDescription = (description: string) => {
    const parts = description.split(",").slice(0, 3); // Lấy 3 thông tin đầu tiên
    return parts.join(", ");
  };

  return (
    <div className="contentContainer">
      <div className="category-header">
        <h2 className="category-title">Danh mục sản phẩm của cửa hàng</h2>
        <div className="product-categories">
          <ul className="category-list">
            <li>All</li>
            <li>Laptop</li>
            <li>PC</li>
            <li>Ram</li>
          </ul>
        </div>
      </div>
  
      {isLoading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {currentProducts.map((product) => (
            <div key={product.productId} className="product-card">
              <Link to={`/product/${product.productId}`}>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="product-image"
                />
                <h2 className="product-name">{product.productName}</h2>
                <div className="specs-box">
                  <ul>
                    <li className="product-description">
                      {getShortDescription(product.productDescription)}
                    </li>
                    <li className="product-description">
                      Nhà sản xuất: {product.manufacturer}
                    </li>
                    <li className="product-description">
                      Số lượng: {product.productQuantity}
                    </li>
                  </ul>
                </div>
                <p className="product-price">
                  {product.cost} VND
                </p>
                <div className="button">
                  <button className="add-to-cart-button">Mua</button>
                  <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="placeholder-container">
          <img
            src={process.env.PUBLIC_URL + "/image/sp2.png"}
            alt="Hình ảnh tạm thời"
            className="placeholder-image"
          />
          <p>Không có sản phẩm nào.</p>
        </div>
      )}
  
      {/* Hiển thị phân trang */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Content;
