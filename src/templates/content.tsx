import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/content.css";
import { getProductsDetail, Product } from "../API/apiGetProductDetail";
import { useCart } from "./CartContext";

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
  const { addToCart } = useCart();

  // Danh sách các danh mục
  const categories: Category[] = [
    { id: "all", name: "All" },
    { id: "laptop", name: "Laptop" },
    { id: "pc", name: "PC" },
    { id: "ram", name: "Ram" },
  ];

  const fetchProducts = async (categoryId: string, page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { products, totalProducts } = await getProductsDetail(categoryId, productsPerPage, page);
      setProducts(products);
      setTotalProducts(totalProducts);
    } catch (error: any) {
      setError("An error occurred while fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentCategory, currentPage);
  }, [currentCategory, currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.productId,
      productName: product.productName,
      productImage: product.productImage,
      cost: product.cost,
      quantity: 1,
    });
  };

  return (
    <div className="contentContainer">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-content">
          <h3>PC MÁY BỘ GVN</h3>
          <h1>I5 / R5</h1>
          <p>Học tập, giải trí, làm việc mượt mà</p>
          <p className="banner-price">Giá chỉ từ <strong>10.000.000đ</strong></p>
          <button className="installment-button">Trả góp 0%</button>
        </div>
      </div>

      {/* Category Header Section */}
      <div className="category-header">
        <h2 className="category-title">Danh mục sản phẩm</h2>
        <nav className="product-categories">
          <ul className="category-list">
            {categories.map((category) => (
              <li
                key={category.id}
                className={currentCategory === category.id ? "active" : ""}
                onClick={() => {
                  setCurrentCategory(category.id);
                  setCurrentPage(1); // Reset lại trang khi đổi danh mục
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
                  <img src={product.productImage} alt={product.productName} className="product-image" />
                </Link>
                <h2 className="product-name">{product.productName}</h2>
                <div className="specs-box">
                  <ul>
                    <li className="product-description">
                      {product.productDescription.split(",").slice(0, 3).join(", ")}
                    </li>
                    <li className="product-description">Manufacturer: {product.manufacturer}</li>
                    <li className="product-description">Quantity: {product.productQuantity}</li>
                  </ul>
                </div>
                <p className="product-price">{product.cost} VND</p>
                <div className="button">
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                    Buy
                  </button>
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
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

      {/* Pagination Section */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Content;
