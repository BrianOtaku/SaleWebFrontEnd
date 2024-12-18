import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';
import CRUD from '../hooks/useCRUD';
import { OrderData, updatePaymentStatus, updateDeliveryStatus } from '../../API/apiCRUD';

interface Order {
    orderId: number;
    productName: string;
    userName: string;
    orderQuantity: number;
    deliveryAddress: string;
    totalCost: number;
    orderState: string;
    paymentMethod: string;
    paymentStatus: string;
    deliveryStatus: string;
}

function OrderManagement() {
    const [orders, setOrders] = useState<Order[]>([]);

    const { selectedItems, selectAll, handleSelectItem, handleSelectAll } = useSelect(
        orders.map(order => order.orderId)
    );

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const ordersData = await getAllOrders(token);
                    console.log(ordersData);
                    setOrders(ordersData);
                } catch (error) {
                    console.error('Error fetching order:', error);
                }
            }
        };

        fetchOrders();
    }, []);

    const handleCreate = async (ordersData: OrderData) => {
        try {
            setOrders([...orders, ordersData]);
            window.location.reload();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleUpdate = async (updatedData: OrderData) => {
        window.location.reload();
        setOrders(orders.map(order => order.orderId === updatedData.orderId ? updatedData : order));
    };

    const handleDelete = async () => {
        if (selectedItems.length > 0) {
            try {
                window.location.reload();
                setOrders(orders.filter(order => !selectedItems.includes(order.orderId)));
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        } else {
            console.warn('No users selected for deletion.');
        }
    };

    return (
        <div>
            <div className="header-management">
                <h2>Orders Management</h2>
                <CRUD
                    pageType="orders"
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    selectedItems={selectedItems}
                    selectedOrderData={
                        selectedItems.length === 1
                            ? orders.find(order => order.orderId === selectedItems[0])
                            : undefined
                    }
                    orders={orders}
                />
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Total Cost</th>
                            <th>Order State</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                            <th>Delivery Address</th>
                            <th>Delivery Status</th>
                            <th className='checkBox'>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.userName}</td>
                                <td>{order.productName}</td>
                                <td>{order.orderQuantity}</td>
                                <td>{order.totalCost}</td>
                                <td>{order.orderState}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    <select disabled={order.paymentStatus === 'Đang chờ'}
                                        value={order.paymentStatus}
                                        onChange={async (e) => {
                                            const newStatus = e.target.value;
                                            await updatePaymentStatus(order.orderId, newStatus);
                                            window.location.reload();
                                        }}
                                        style={{ background: 'none', border: 'none' }}
                                    >
                                        <option value="đã trả">Đã Trả</option>
                                        <option value="chưa trả">Chưa Trả</option>
                                        <option value="Đang chờ" disabled>Đang chờ</option>
                                    </select>
                                </td>
                                <td>
                                    {order.deliveryAddress.length > 10
                                        ? order.deliveryAddress.slice(0, 10) + '...'
                                        : order.deliveryAddress}
                                </td>
                                <td>
                                    <select disabled={order.deliveryStatus === 'Đang chờ'}
                                        value={order.deliveryStatus}
                                        onChange={async (e) => {
                                            const newStatus = e.target.value;
                                            await updateDeliveryStatus(order.orderId, newStatus);
                                            window.location.reload();
                                        }}
                                        style={{ background: 'none', border: 'none' }}
                                    >
                                        <option value="chưa giao">Chưa giao</option>
                                        <option value="đang giao">Đang giao</option>
                                        <option value="đã giao">Đã giao</option>
                                        <option value="Đang chờ" disabled>Đang chờ</option>
                                    </select>
                                </td>
                                <td className='checkBox'>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(order.orderId)}
                                        onChange={() => handleSelectItem(order.orderId)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderManagement;
