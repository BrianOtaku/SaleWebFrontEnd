import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../API/apiGetProductDetail";
import '../../styles/productRelated.css'

interface ProductCardProps {
    product: Product;
    categoryId: number;
}

const formatPrice = (price: number): string => {
    if (price >= 1000000) {
        return (price / 1000000) + "tr VND";
    }
    return price.toLocaleString() + " VND";
};

const ProductRelated: React.FC<ProductCardProps> = React.memo(({ product, categoryId }) => {
    return (
        <div className="product-related-card">
            <div className="cardContent">
                <div className="product-image">
                    <Link to={`/product/${product.productId}`}>
                        <img src={product.productImage} alt={product.productName} />
                    </Link>
                </div>

                <div className="product-info">
                    <h2 className="product-name">{
                        product.productName.length > 15 ?
                            product.productName.slice(0, 15) + '...' :
                            product.productName
                    }</h2>
                    <div className="specs-box">
                        <ul>
                            <li className="product-description">
                                {product.productDescription.split(",").slice(0, 3).join(", ")}
                            </li>
                            <li className="product-description">Manufacturer: {product.manufacturer}</li>
                            <li className="product-description">Quantity: {product.productQuantity}</li>
                        </ul>
                    </div>
                    <p className="product-price">Giá: {formatPrice(product.cost)}</p>
                </div>
            </div>
        </div>
    );
});

export default ProductRelated;