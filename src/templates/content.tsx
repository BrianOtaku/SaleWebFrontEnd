import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/content.css";
import { getProductsDetail, Product } from "../API/apiGetProductDetail";
import { useCart } from "../API/apiCartContext";

interface Category {
  id: string;
  name: string;
}

function Content() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("all");

  const productsPerPage = 10;
  
  const { addToCart, isLoggedIn, login, userAccount } = useCart();

  const categories: Category[] = [
    { id: "all", name: "All" },
    { id: "laptops", name: "Laptops" },
    { id: "pc", name: "PC" },
    { id: "ram", name: "RAM" },
  ];

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

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Đăng nhập thành công");
    }
  }, [isLoggedIn]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleAddToCart = async (product: Product) => {
    if (await checkLoginBeforeAdd()) {
      if (userAccount) {
        addToCart({
          productId: product.productId,
          productName: product.productName,
          productImage: product.productImage,
          cost: product.cost,
          quantity: 1,
        });
      }
    }
  };

  const checkLoginBeforeAdd = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      await login();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    return isLoggedIn;
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const visiblePages = () => {
    const pageLimit = 5;
    let startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
    if (endPage - startPage < pageLimit - 1) {
      startPage = Math.max(endPage - pageLimit + 1, 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="contentContainer">
      <div className="category-header">
        <h2 className="category-title">Product Categories</h2>
        <nav className="product-categories">
          <ul className="category-list">
            {categories.map((category) => (
              <li
                key={category.id}
                className={currentCategory === category.id ? "active" : ""}
                onClick={() => {
                  setCurrentCategory(category.id);
                  setCurrentPage(1);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.productId} className="product-card">
                <Link to={`/product/${product.productId}`}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="product-image"
                  />
                </Link>
                <h2 className="product-name">{product.productName}</h2>
                <div className="specs-box">
                  <ul>
                    <li className="product-description">
                      {product.productDescription.split(",").slice(0, 3).join(", ")}
                    </li>
                    <li className="product-description">
                      Manufacturer: {product.manufacturer}
                    </li>
                    <li className="product-description">
                      Quantity: {product.productQuantity}
                    </li>
                  </ul>
                </div>
                <p className="product-price">{product.cost} VND</p>
                <div className="button">
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
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
          Previous
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
          Next
        </button>
      </div>
    </div>
  );
}

export default Content;
