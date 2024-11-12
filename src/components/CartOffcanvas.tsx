import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useCart } from '../API/apiCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faShoppingCart, faPlus, faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import '../styles/cartOffcanvas.css';
import { Button, ModalFooter } from 'react-bootstrap';

const CartModal = () => {
    const { cartItems, removeFromCart, updateProductQuantity } = useCart();
    const [tempQuantities, setTempQuantities] = useState<{ [productId: number]: number }>({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleIncrease = (productId: number) => {
        setTempQuantities((prev) => {
            const newQuantity = (prev[productId] || 1) + 1;
            updateProductQuantity(productId, newQuantity);  // Cập nhật ngay lập tức khi nhấn "+"
            return { ...prev, [productId]: newQuantity };
        });
    };

    const handleDecrease = (productId: number) => {
        setTempQuantities((prev) => {
            const newQuantity = Math.max(1, (prev[productId] || 1) - 1);
            updateProductQuantity(productId, newQuantity);  // Cập nhật ngay lập tức khi nhấn "-"
            return { ...prev, [productId]: newQuantity };
        });
    };

    return (
        <>
            <button className="cartButton" title="Giỏ hàng" onClick={handleShow}>
                <FontAwesomeIcon icon={faShoppingCart} className="iconCart" />
                {cartItems.length > 0 && (
                    <span style={{ marginLeft: '7px' }} className="cart-count">{cartItems.length}</span>
                )}
            </button>

            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Giỏ Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.length === 0 ? (
                        <h5 style={{ textAlign: 'center' }}>Giỏ hàng của bạn trống!</h5>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item.productId} className="cart-item">
                                    <img src={item.productImage} alt={item.productName} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h5>{item.productName}</h5>
                                        <p>Giá: {item.cost} VND</p>
                                    </div>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleDecrease(item.productId)}
                                            disabled={tempQuantities[item.productId] === 1}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span>{tempQuantities[item.productId] || item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.productId)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className='cartItemButton'>
                                        <button onClick={() => removeFromCart(item.productId)} className="remove-button">
                                            Xóa
                                        </button>
                                        <button className="buy-button">
                                            Mua
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <ModalFooter>
                    {cartItems.length === 0 ? (
                        <Button variant='success' className='orderButton' style={{ opacity: '0' }} disabled>
                            Order
                            <FontAwesomeIcon icon={faBoxesPacking} />
                        </Button>
                    ) : (
                        <Button variant='success' className='orderButton'>
                            Order
                            <FontAwesomeIcon icon={faBoxesPacking} style={{ marginLeft: '7px' }} />
                        </Button>
                    )}
                </ModalFooter>
            </Modal>
        </>
    );
};

export default CartModal;
