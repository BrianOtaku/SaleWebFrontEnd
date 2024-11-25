import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../../API/apiCRUD'; // Đảm bảo đường dẫn đúng
import { OrderData } from '../../API/apiCRUD'; // Import OrderData interface

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number; // Thêm userId để lấy đơn hàng
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, userId }) => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getOrdersByUserId(userId);
                setOrders(fetchedOrders);
            } catch (err) {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchOrders();
        }
    }, [isOpen, userId]);

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Orders for User ID: {userId}</h2>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <h3>Order List:</h3>
                <ul>
                    {orders.map((order) => (
                        <li key={order.orderId}>
                            <strong>Product Name:</strong> {order.productName} <br />
                            <strong>Quantity:</strong> {order.orderQuantity} <br />
                            <strong>Total Cost:</strong> ${order.totalCost.toFixed(2)} <br />
                            <strong>Order State:</strong> {order.orderState} <br />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderModal;
