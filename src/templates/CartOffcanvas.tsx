import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useCart } from './CartContext';
import '../styles/cartOffcanvas.css';

interface CartOffcanvasProps {
    show: boolean;
    onHide: () => void;
}

const CartOffcanvas: React.FC<CartOffcanvasProps> = ({ show, onHide }) => {
    const { cartItems, updateQuantity, removeFromCart, updateProductQuantityAPI, isLoggedIn } = useCart();
    const [editedItems, setEditedItems] = useState<{ [productId: number]: boolean }>({});

    const handleIncrease = (productId: number) => {
        const item = cartItems.find(item => item.productId === productId);
        if (item) {
            updateQuantity(productId, item.quantity + 1);
            setEditedItems({ ...editedItems, [productId]: true });
        }
    };

    const handleDecrease = (productId: number) => {
        const currentItem = cartItems.find(item => item.productId === productId);
        if (currentItem && currentItem.quantity > 1) {
            updateQuantity(productId, currentItem.quantity - 1);
            setEditedItems({ ...editedItems, [productId]: true });
        } else {
            removeFromCart(productId);
        }
    };

    const handleUpdateQuantity = (cartId: number, quantity: number) => {
        updateProductQuantityAPI(cartId, quantity);
        setEditedItems({ ...editedItems, [cartId]: false });
    };
    

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Giỏ hàng</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length === 0 ? (
                    <p>Giỏ hàng trống.</p>
                ) : (
                    <div className="cart-container">
                        {cartItems.map(item => (
                            <div key={item.productId} className="cart-item">
                                <img src={item.productImage} alt={item.productName} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h5>{item.productName}</h5>
                                    <p className="cart-item-price">{item.cost.toLocaleString()}₫</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleDecrease(item.productId)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.productId)}>+</button>
                                    </div>
                                    {editedItems[item.productId] && (
                                        <button
                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity)}
                                            className="update-quantity-button"
                                        >
                                            Thay đổi số lượng
                                        </button>
                                    )}
                                    <button onClick={() => removeFromCart(item.productId)} className="remove-button">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total">
                            <h5>Tổng tiền: {calculateTotal().toLocaleString()}₫</h5>
                        </div>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartOffcanvas;
