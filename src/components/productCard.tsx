import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../API/apiGetProductDetail";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
            return;
        }

        if (token) {
            console.log("Đã thêm sản phẩm vào giỏ hàng:", product);
        }
    };

    return (
        <div className="product-card">
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
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
