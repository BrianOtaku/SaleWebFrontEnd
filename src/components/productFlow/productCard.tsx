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
    const [show, setShow] = useState(false);
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

 

    const handleOrderClick = (name:string, productId: number, orderQuantity: number, totalCost: number) => {
        setProductName(name)
        setProductId(productId); 
        setOrderQuantity(orderQuantity); 
        setTotalCost(totalCost); 
        setShowPaymentModal(true);
        if (localUser) {
            setUserId(parseInt(localUser));
        } else {
            console.error("localUser is null");
        }
      };

    const handleBuyNowClick = () => {
        handleOrderClick(product.productName, product.productId, 1, product.cost);
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
                    <p className="product-price">Giá: {product.cost.toLocaleString()} VND</p>
                </div>
            </div>

            <div className="CardButtons">
                <button className="buyNowCardBtn" onClick={handleBuyNowClick}>
                    Buy Now!
                    <FontAwesomeIcon icon={faDollarSign} style={{ marginLeft: "7px" }} />
                </button>
                <button
                    className={`add-to-cart-button ${isAdded ? "added" : ""}`}
                    onClick={handleButtonClick}
                >
                    {isAdded ? "Đã thêm" : "Add to Cart"}
                    <FontAwesomeIcon icon={faCartArrowDown} style={{ marginLeft: "7px" }} />
                </button>
            </div>
            <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} />
        </div>
    );
};

export default ProductCard;
