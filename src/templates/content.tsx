// src/pages/Content.tsx
import React, { useState, useEffect } from "react";
import { getProductsDetail, Product } from "../API/apiGetProductDetail";
import ProductCard from "../components/productCard";
import { useCart } from "../API/apiCartContext";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Content() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("all");

  const productsPerPage = 10;

  const { addToCart, isLoggedIn, login, userAccount } = useCart();

  const fetchProducts = async (categoryId: string, page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { products, totalProducts } = await getProductsDetail(categoryId, productsPerPage, page);
      setProducts(products);
      setTotalProducts(totalProducts);
    } catch (error: any) {
      setError("Đã xảy ra lỗi khi tìm nạp sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentCategory, currentPage);
  }, [currentCategory, currentPage]);

  const handleAddToCart = async (product: Product) => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      await login();
    }

    if (isLoggedIn && userAccount) {
      addToCart({
        productId: product.productId,
        productName: product.productName,
        productImage: product.productImage,
        cost: product.cost,
        quantity: 1,
      });
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const visiblePages = () => {
    const pageLimit = 3;
    let startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
    if (endPage - startPage < pageLimit - 1) {
      startPage = Math.max(endPage - pageLimit + 1, 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="contentContainer">
      <h2>-- OUR FEATURES --</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
      <div className="pagination">
        <button
          className="page-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        {visiblePages().map((page) => (
          <button
            key={page}
            className={`page-button ${currentPage === page ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="page-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
}

export default Content;
