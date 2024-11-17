import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { OrderContext } from '../../Context/orderContext';
import { postOrder, Order } from '../../API/apiPayment';

interface PaymentModalProps {
    show: boolean;
    handleClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, handleClose }) => {
    const { productName, productId, userId, orderQuantity, setOrderQuantity, totalCost } = useContext(OrderContext)!;
    const [calculatedTotalCost, setCalculatedTotalCost] = useState<number>(totalCost);
    const [voucherId, setVoucherId] = useState<null>(null);
    const [deliveryAddress, setDeliveryAddress] = useState<string>('');
    const [orderState, setOrderState] = useState<string>('đã đặt hàng');
    const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');
    const [paymentDetails, setPaymentDetails] = useState<string>('');

    useEffect(() => {
        setCalculatedTotalCost(orderQuantity * totalCost);
    }, [orderQuantity]);

    const handlePayment = async () => {
        const order: Order = {
            productId,
            userId,
            voucherId,
            orderQuantity,
            deliveryAddress,
            totalCost: calculatedTotalCost,
            orderState: 'đã đặt hàng',
            paymentMethod,
        };

        try {
            const response = await postOrder(order);
            console.log(response)
            if (response.status === 200) {
                if (paymentMethod === "chuyển khoản") {
                    console.log('Redirecting to:', response.data.redirectUrl);
                    window.open(response.data.redirectUrl);
                } else {
                    alert("Đặt hàng thành công, vui lòng kiểm tra danh sách đơn hàng")
                }
            }

        } catch (error: any) {
            console.log(error.response)
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered className='customModal'>
            <Modal.Header closeButton>
                <Modal.Title>Thanh Toán</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="productId" className="mt-3">
                        <Form.Label>Tên Sản Phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            value={productName}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId="orderQuantity" className="mt-3">
                        <Form.Label>Số Lượng Đặt</Form.Label>
                        <Form.Control
                            type="number"
                            value={orderQuantity}
                            onChange={(e) => setOrderQuantity(Math.max(1, Number(e.target.value)))}
                        />
                    </Form.Group>

                    <Form.Group controlId="totalCost" className="mt-3">
                        <Form.Label>Tổng Chi Phí</Form.Label>
                        <Form.Control
                            type="text"
                            value={calculatedTotalCost}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId="deliveryAddress" className="mt-3">
                        <Form.Label>Địa Chỉ Giao Hàng</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa chỉ giao hàng..."
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="paymentMethod" className="mt-3">
                        <Form.Label>Phương Thức Thanh Toán</Form.Label>
                        <Form.Control
                            as="select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="chuyển khoản">Chuyển khoản ngân hàng</option>
                            <option value="tiền mặt">Thanh toán khi nhận hàng</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="success" onClick={handlePayment}>
                    Thanh Toán
                    <FontAwesomeIcon icon={faCreditCard} style={{ marginLeft: '7px' }} />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
