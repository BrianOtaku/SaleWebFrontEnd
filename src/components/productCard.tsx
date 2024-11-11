import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../API/apiGetProductDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
    product: Product;
    handleAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleAddToCart }) => {
    return (
        <div className="product-card">

            <div className="cardContent">
                <div className="product-image">
                    <Link to={`/product/${product.productId}`}>
                        <img
                            src={product.productImage}
                            alt={product.productName}
                        />
                    </Link>
                </div>

                <div className="product-info">
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
                </div>
            </div>

            <div className="button">
                <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                >
                    Add to Cart
                    <FontAwesomeIcon icon={faCartArrowDown} style={{ marginLeft: '7px' }} />
                </button>
            </div>

        </div>
    );
};

export default ProductCard;
