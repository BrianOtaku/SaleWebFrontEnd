import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

interface PaymentModalProps {
    show: boolean;
    handleClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, handleClose }) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');
    const [paymentDetails, setPaymentDetails] = useState<string>('');

    const handlePayment = () => {
        // Xử lý thanh toán tại đây
        alert(`Thanh toán thành công bằng ${paymentMethod}`);
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className='customModal'
        >
            <Modal.Header closeButton>
                <Modal.Title>Thanh Toán</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="paymentMethod">
                        <Form.Label>Phương thức thanh toán</Form.Label>
                        <Form.Control
                            as="select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="creditCard">Thẻ tín dụng</option>
                            <option value="bankTransfer">Chuyển khoản ngân hàng</option>
                            <option value="cashOnDelivery">Thanh toán khi nhận hàng</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="paymentDetails" className="mt-3">
                        <Form.Label>Chi tiết thanh toán</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập thông tin thanh toán..."
                            value={paymentDetails}
                            onChange={(e) => setPaymentDetails(e.target.value)}
                        />
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
