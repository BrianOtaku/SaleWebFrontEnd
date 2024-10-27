import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { OrderData } from '../../API/apiCRUD';
import { updateEntity } from '../../API/apiCRUD';

interface OrderModalProps {
    show: boolean;
    handleClose: () => void;
    onCreate?: (orderData: OrderData) => void;
    onUpdate?: (orderData: OrderData) => void;
    isEditMode: boolean;
    existingOrderData?: OrderData;
    onUpdateDeliveryStatus?: (orderId: number, status: string) => void;
    onUpdatePaymentStatus?: (orderId: number, status: string) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    isEditMode,
    existingOrderData,
    onUpdateDeliveryStatus,
    onUpdatePaymentStatus
}) => {
    const [orderData, setOrderData] = useState<OrderData>({
        orderId: 0,
        productName: '',
        userName: '',
        orderQuantity: 0,
        deliveryAddress: '',
        totalCost: 0,
        orderState: '',
        paymentMethod: '',
        paymentStatus: '',
        deliveryStatus: '',
    });

    const paymentOptions = ['chưa trả', 'đã trả'];
    const deliveryOptions = ['chưa giao', 'đang giao', 'đã giao'];

    useEffect(() => {
        if (isEditMode && existingOrderData) {
            setOrderData(existingOrderData);
        }
    }, [isEditMode, existingOrderData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditMode && onUpdate) {
                console.log("Updating order data:", orderData);
                onUpdate(orderData);

                // Cập nhật trạng thái giao hàng
                if (onUpdateDeliveryStatus) {
                    console.log("Updating Delivery Status", orderData.deliveryStatus);
                    await updateEntity('delivery', orderData.orderId, { deliveryStatus: orderData.deliveryStatus });
                    onUpdateDeliveryStatus(orderData.orderId, orderData.deliveryStatus);
                }

                // Cập nhật trạng thái thanh toán
                if (onUpdatePaymentStatus) {
                    console.log("Updating Payment Status", orderData.paymentStatus);
                    await updateEntity('payment', orderData.orderId, { paymentStatus: orderData.paymentStatus });
                    onUpdatePaymentStatus(orderData.orderId, orderData.paymentStatus);
                }
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Update Order' : 'Create Order'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPaymentStatus">
                        <Form.Label>Payment Status</Form.Label>
                        <Form.Select
                            name="paymentStatus"
                            value={orderData.paymentStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Payment Status:</option>
                            {paymentOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formDeliveryStatus">
                        <Form.Label>Delivery Status</Form.Label>
                        <Form.Select
                            name="deliveryStatus"
                            value={orderData.deliveryStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Delivery Status:</option>
                            {deliveryOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='CRUDBtn'>
                        {isEditMode ? (
                            <>
                                Update Order
                                <FontAwesomeIcon icon={faPen} className='iconPen' />
                            </>
                        ) : (
                            <>
                                Create Order
                                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
                            </>
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default OrderModal;
