import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useCart } from '../API/apiCartContext';
import '../styles/cartOffcanvas.css';

interface CartOffcanvasProps {
    show: boolean;
    onHide: () => void;
}

const CartOffcanvas: React.FC<CartOffcanvasProps> = ({ show, onHide }) => {
    const { cartItems, removeFromCart, updateProductQuantity } = useCart();
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [tempQuantities, setTempQuantities] = useState<{ [productId: number]: number }>({});

    // Xử lý tăng số lượng sản phẩm
    const handleIncrease = (productId: number) => {
        setTempQuantities((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 1) + 1,
        }));
    };

    // Xử lý giảm số lượng sản phẩm
    const handleDecrease = (productId: number) => {
        setTempQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) - 1),
        }));
    };

    // Bắt đầu chỉnh sửa số lượng
    const startEditing = (productId: number, currentQuantity: number) => {
        setEditingItemId(productId);
        setTempQuantities((prev) => ({
            ...prev,
            [productId]: currentQuantity,
        }));
    };

    // Lưu số lượng đã thay đổi
    const saveQuantity = (productId: number) => {
        const newQuantity = tempQuantities[productId];
        if (newQuantity !== undefined) {
            updateProductQuantity(productId, newQuantity);
        }
        setEditingItemId(null);
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" className="cart-offcanvas">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Giỏ hàng</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length === 0 ? (
                    <p>Giỏ hàng của bạn trống</p>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.productId} className="cart-item">
                                <img src={item.productImage} alt={item.productName} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h5>{item.productName}</h5>
                                    <p>Giá: {item.cost} VND</p>
                                    {editingItemId === item.productId ? (
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => handleDecrease(item.productId)}
                                                disabled={tempQuantities[item.productId] <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{tempQuantities[item.productId]}</span>
                                            <button onClick={() => handleIncrease(item.productId)}>+</button>
                                            <button onClick={() => saveQuantity(item.productId)} className="save-button">
                                                Lưu
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <span>Số lượng: {item.quantity}</span>
                                            <button
                                                onClick={() => startEditing(item.productId, item.quantity)}
                                                className="edit-button"
                                            >
                                                Thay đổi số lượng
                                            </button>
                                        </div>
                                    )}
                                    <button onClick={() => removeFromCart(item.productId)} className="remove-button">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartOffcanvas;
