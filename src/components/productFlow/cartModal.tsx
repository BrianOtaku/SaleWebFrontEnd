import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useCart } from '../../API/apiCartContext';
import PaymentModal from './paymentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faShoppingCart, faPlus, faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import { Button, ModalFooter } from 'react-bootstrap';

const CartModal = () => {
    const { cartItems, removeFromCart, updateProductQuantity } = useCart();
    const [tempQuantities, setTempQuantities] = useState<{ [productId: number]: number }>({});
    const [show, setShow] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleClose = () => {
        setShow(false);
        window.location.reload();
    };
    const handleShow = () => setShow(true);

    const handleIncrease = (productId: number) => {
        setTempQuantities((prev) => {
            const newQuantity = (prev[productId] || 1) + 1;
            updateProductQuantity(productId, newQuantity);
            return { ...prev, [productId]: newQuantity };
        });
    };

    const handleDecrease = (productId: number) => {
        setTempQuantities((prev) => {
            const newQuantity = Math.max(1, (prev[productId] || 1) - 1);
            updateProductQuantity(productId, newQuantity);
            return { ...prev, [productId]: newQuantity };
        });
    };

    const handleRemoveFromCart = (productId: number, cartId: number) => {
        removeFromCart(productId, cartId);
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const updatedCartItems = cartItems.filter((id: number) => id !== productId);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };

    const handleEmptyCart = () => {
        cartItems.forEach((item) => {
            if (item.cartId) {
                removeFromCart(item.productId, item.cartId);
            }
        });
        localStorage.removeItem("cartItems");
        setTempQuantities({});
    };

    const handleOrderClick = () => {
        setShowPaymentModal(true);
    };

    return (
        <>
            <button className="cartButton" title="Giỏ hàng" onClick={handleShow}>
                <FontAwesomeIcon icon={faShoppingCart} className="iconCart" />
                {cartItems.length > 0 && (
                    <span style={{ marginLeft: '7px' }} className="cart-count">{cartItems.length}</span>
                )}
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                centered size='lg'
            >
                <Modal.Header closeButton >
                    <Modal.Title className={showPaymentModal ? 'blurred' : ''}>
                        Giỏ Hàng
                    </Modal.Title>
                </Modal.Header >
                <Modal.Body className={showPaymentModal ? 'blurred' : ''}>
                    {cartItems.length === 0 ? (
                        <h5 style={{ textAlign: 'center' }}>Giỏ hàng của bạn trống!</h5>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item.productId} className="cart-item">
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className="cart-item-image"
                                    />
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
                                        <button
                                            onClick={() => handleRemoveFromCart(item.productId, Number(item.cartId))}
                                            className="remove-button"
                                        >
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
                <ModalFooter className={showPaymentModal ? 'blurred' : ''}>
                    {cartItems.length === 0 ? (
                        <Button variant='success' className='orderButton' style={{ display: 'none' }} >
                            Order
                            <FontAwesomeIcon icon={faBoxesPacking} />
                        </Button>
                    ) : (
                        <>
                            <Button variant='danger' className='emptyCartButton' onClick={handleEmptyCart}>
                                Empty Cart
                            </Button>
                            <Button variant='success' className='orderButton' onClick={handleOrderClick}>
                                Order
                                <FontAwesomeIcon icon={faBoxesPacking} style={{ marginLeft: '7px' }} />
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </Modal>

            {/* PaymentModal */}
            <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} />
        </>
    );
};

export default CartModal;
