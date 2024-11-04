import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, getProductById } from "../API/apiGetProductDetail";
import "../styles/productDetail.css";
import Taskbar from "./taskbar";
import Footer from "./footer";
import { useCart } from "./CartContext";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const productData = await getProductById(parseInt(productId, 10));
          if (productData) {
            setProduct(productData);
          } else {
            setError("Product not found.");
          }
        }
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.productId,
        productName: product.productName,
        productImage: product.productImage,
        cost: product.cost,
        quantity: 1,
      });
      alert("Product added to cart!");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        productId: product.productId,
        productName: product.productName,
        productImage: product.productImage,
        cost: product.cost,
        quantity: 1,
      });
      navigate("/cart"); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product data found.</div>;

  return (
    <div className="product-detail-page">
      <Taskbar />
      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.productImage} alt={product.productName} className="product-image" />
        </div>

        <div className="product-info-section">
          <h2 className="product-title">{product.productName}</h2>
          <div className="product-information">
            <p><strong>Product Description</strong></p>
            <p>{product.productDescription}</p>
          </div>
          <p className="product-price">
            Giá: <span className="price-value">{product.cost.toLocaleString()} VND</span>
          </p>
          <div className="button-group">
            <button className="buy-now-button" onClick={handleBuyNow}>Mua ngay</button>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
