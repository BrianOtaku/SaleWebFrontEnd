import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useCart } from '../../API/apiCartContext';
import PaymentModal from './paymentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faShoppingCart, faPlus, faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import { Button, ModalFooter } from 'react-bootstrap';
import { OrderContext } from '../../Context/orderContext';

const CartModal = () => {
    const { cartItems, removeFromCart, updateProductQuantity } = useCart();
    const [tempQuantities, setTempQuantities] = useState<{ [productId: number]: number }>({});
    const [show, setShow] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [removeCart, isRemoveCart] = useState(false);
    const orderContext = useContext(OrderContext);
    if (!orderContext) {
        throw new Error('OrderContext must be used within an OrderProvider');
    }
    const { setProductId, setUserId, setOrderQuantity, setTotalCost, setProductName } = orderContext;


    const handleClose = () => {
        setShow(false);
        if (removeCart) {
            window.location.reload();
            isRemoveCart(false)
        }
        else { isRemoveCart(false) }
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
        const localUser = localStorage.getItem('userId');
        removeFromCart(productId, cartId);
        const cartItems = JSON.parse(localStorage.getItem(`cartItems_${localUser}`) || "[]");
        const updatedCartItems = cartItems.filter((id: number) => id !== productId);
        localStorage.setItem(`cartItems_${localUser}`, JSON.stringify(updatedCartItems));
        isRemoveCart(true);
    };
    const localUser = localStorage.getItem('userId') ?? '';
    if (localUser === null) {
        console.log("userId không tồn tại trong localStorage");
    }

    const handleEmptyCart = () => {

        cartItems.forEach((item) => {
            if (item.cartId) {
                removeFromCart(item.productId, item.cartId);
            }
        });
        localStorage.removeItem(`cartItems_${localUser}`);
        setTempQuantities({});
        isRemoveCart(true)
    };


    const handleOrderClick = (name: string, productId: number, orderQuantity: number, totalCost: number) => {
        setProductName(name)
        setProductId(productId);
        setOrderQuantity(orderQuantity);
        setTotalCost(totalCost);
        setShowPaymentModal(true);
        setUserId(parseInt(localUser))
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
                                        <button className="buy-button"
                                            onClick={() => handleOrderClick(
                                                item.productName,
                                                item.productId,
                                                item.quantity,
                                                (item.cost * item.quantity)
                                            )}
                                        >
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
                            Đơn hàng
                            <FontAwesomeIcon icon={faBoxesPacking} />
                        </Button>
                    ) : (
                        <>
                            <Button variant='danger' className='emptyCartButton' onClick={handleEmptyCart}>
                                Xóa hết
                            </Button>
                            <Button variant='success' className='orderButton' onClick={() => { }}>
                                Đặt hàng
                                <FontAwesomeIcon icon={faBoxesPacking} style={{ marginLeft: '7px' }} />
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </Modal>

            <PaymentModal show={showPaymentModal} handleClose={() => setShowPaymentModal(false)} />
        </>
    );
};

export default CartModal;
