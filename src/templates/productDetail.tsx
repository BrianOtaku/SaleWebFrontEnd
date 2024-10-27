import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, getProductById } from "../API/apiGetProductDetail";
import "../styles/productDetail.css";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const productData = await getProductById(parseInt(productId, 10));
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product data found.</div>;

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <img src={product.productImage} alt={product.productName} className="product-image" />
      </div>
      <div className="product-info-section">
        <h2 className="product-title">{product.productName}</h2>
        <p className="product-manufacturer">Manufacturer: {product.manufacturer}</p>
        <p className="product-price">Price: {product.cost} VND</p>
        <p className="product-quantity">Quantity: {product.productQuantity}</p>
        <p className="product-description">{product.productDescription}</p>
        <button className="buy-now-button">Buy Now</button>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
