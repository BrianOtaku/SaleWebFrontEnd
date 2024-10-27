import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useCart } from './CartContext';
import '../styles/cartOffcanvas.css'; // Make sure to add custom CSS here

function CartOffcanvas({ show, onHide }: any) {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    const handleIncrease = (productId: number) => {
        updateQuantity(productId, cartItems.find(item => item.productId === productId)!.quantity + 1);
    };

    const handleDecrease = (productId: number) => {
        const currentItem = cartItems.find(item => item.productId === productId);
        if (currentItem && currentItem.quantity > 1) {
            updateQuantity(productId, currentItem.quantity - 1);
        } else {
            removeFromCart(productId);
        }
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
                                    <button onClick={() => removeFromCart(item.productId)} className="remove-button">Xóa</button>
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
}

export default CartOffcanvas;
