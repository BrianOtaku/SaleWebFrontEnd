import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { OrderData } from '../../API/apiCRUD';

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
                console.log('Updating category with data:', orderData);
                onUpdate(orderData);
            } else if (onCreate) {
                console.log('Creating category with data:', orderData);
                onCreate(orderData);
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
                    <Form.Group controlId="formDeliveryAddress">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter delivery address"
                            name="deliveryAddress"
                            value={orderData.deliveryAddress}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='CRUDBtn'>
                        {isEditMode ? (
                            <>
                                Update Category
                                <FontAwesomeIcon icon={faPen} className='iconPen' />
                            </>
                        ) : (
                            <>
                                Create Category
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
