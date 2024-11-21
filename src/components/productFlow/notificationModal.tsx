import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { getAllOrders } from '../../API/apiGetInfomations';
import '../../styles/notification.css';

const NotificationModal = () => {
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem('token');

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (show && token) {
            const fetchOrders = async () => {
                setLoading(true);
                setError(null);
                try {
                    const fetchedOrders = await getAllOrders(token);
                    setOrders(fetchedOrders);
                } catch (err) {
                    setError('Có lỗi khi tải đơn hàng');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrders();
        }
    }, [show, token]);

    return (
        <>
            <button onClick={handleShow} className="notificationButton">
                <FontAwesomeIcon icon={faBell} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                centered size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Đang tải đơn hàng...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : orders.length > 0 ? (
                        <div className="noti-items">
                            <ul>
                                {orders.map((order, index) => (
                                    <li key={index}>
                                        <h5><strong>Đơn hàng #{order.orderId}</strong><br /></h5>
                                        <span><strong>Tên sản phẩm:</strong> {order.productName}</span><br />
                                        <span><strong>Số lượng:</strong> {order.orderQuantity}</span><br />
                                        <span><strong>Địa chỉ giao hàng:</strong> {order.deliveryAddress}</span><br />
                                        <span><strong>Tổng chi phí:</strong> {order.totalCost} VND</span><br />
                                        <span><strong>Trạng thái đơn hàng:</strong> {order.orderState}</span><br />
                                        <span><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</span><br />
                                        <span><strong>Trạng thái thanh toán:</strong> {order.paymentStatus}</span><br />
                                        <span><strong>Trạng thái giao hàng:</strong> {order.deliveryStatus}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Không có đơn hàng nào.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NotificationModal;
