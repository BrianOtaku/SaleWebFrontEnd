import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../API/apiGetProductDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { getUserProfile } from "../../API/apiGetInfomations";
import PaymentModal from "./paymentModal";
import { OrderContext } from '../../Context/orderContext';

interface ProductCardProps {
    product: Product;
    handleAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleAddToCart }) => {
    const [isAdded, setIsAdded] = useState(false);
    const token = localStorage.getItem("token");
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const localUser = localStorage.getItem("userId");
    if (localUser === null) {
        console.log("userId không tồn tại trong localStorage");
    }
    useEffect(() => {
        if (localUser) {
            const cartItems = JSON.parse(localStorage.getItem(`cartItems_${localUser}`) || "[]");
            setIsAdded(cartItems.includes(product.productId));
        } else {
            setIsAdded(false);
        }
    }, [product.productId, localUser]);

    const handleOrderClick = (name: string, productId: number, orderQuantity: number, totalCost: number) => {
        setProductName(name)
        setProductId(productId);
        setOrderQuantity(orderQuantity);
        setTotalCost(totalCost);
        setShowPaymentModal(true);
        console.log(totalCost)
        if (localUser) {
            setUserId(parseInt(localUser));
            console.log(totalCost)
        } else {
            console.error("localUser is null");
        }
    };

    const handleBuyNowClick = () => {
        handleOrderClick(product.productName, product.productId, product.productQuantity, product.cost);
    };

    const orderContext = useContext(OrderContext);
    if (!orderContext) {
        throw new Error('OrderContext must be used within an OrderProvider');
    }
    const { setProductId, setUserId, setOrderQuantity, setTotalCost, setProductName } = orderContext;

    const handleButtonClick = async () => {
        if (!token || !localUser) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
            return;
        }

        try {
            const userProfile = await getUserProfile(token);
            const userId = String(userProfile.userId);

            if (!isAdded && userId === localUser) {
                handleAddToCart(product);
                setIsAdded(true);

                const cartItems = JSON.parse(localStorage.getItem(`cartItems_${localUser}`) || "[]");
                cartItems.push(product.productId);
                localStorage.setItem(`cartItems_${localUser}`, JSON.stringify(cartItems));
            } else {
                alert("Sản phẩm đã có trong giỏ hàng!");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            alert("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
        }
    };

    return (
        <div className="product-card">
            <div className="cardContent">
                <div className="product-image">
                    <Link to={`/product/${product.productId}`}>
                        <img src={product.productImage} alt={product.productName} />
                    </Link>
                </div>

                <div className="product-info">
                    <div className="product-name">
                        {product.productName.length > 20
                            ? `${product.productName.slice(0, 20)}...`
                            : product.productName}
                    </div>
                    <div className="specs-box">
                        <ul>
                            <div>
                                {product.productDescription.split(",").slice(0, 3).map((desc, index) => (
                                    <li key={index} className="product-description">
                                        <strong>{desc.trim()}</strong>
                                    </li>
                                ))}
                                <div className="additional-description">
                                    {product.productDescription.split(",").slice(3, 5).map((desc, index) => (
                                        <li key={index} className="product-description">
                                            <strong>{desc.trim()}</strong>
                                        </li>
                                    ))}
                                </div>
                            </div>
                            <li>
                                Hãng: {product.manufacturer}
                            </li>
                            <li>
                                Số lượng: {product.productQuantity}
                            </li>
                        </ul>
                    </div>
                    <div className="product-price">Giá: {product.cost.toLocaleString()} VND</div>
                </div>
            </div>

            <div className="CardButtons">
                {localUser ? <button className="buyNowCardBtn" onClick={handleBuyNowClick}>
                    Buy Now!
                    <FontAwesomeIcon icon={faDollarSign} style={{ marginLeft: "7px" }} />
                </button> : ""}
                <button
                    className={`add-to-cart-button ${isAdded ? "added" : ""}`}
                    onClick={handleButtonClick}
                >
                    {isAdded ? "Đã thêm" : "Thêm vào giỏ hàng"}
                    <FontAwesomeIcon icon={faCartArrowDown} style={{ marginLeft: "7px" }} />
                </button>
            </div>
            <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} />
        </div>
    );
};

export default ProductCard;
