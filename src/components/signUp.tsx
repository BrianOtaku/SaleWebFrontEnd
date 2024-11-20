import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { signUp } from '../API/apiAccount';

function SignUp() {
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
            try {
                const userData = { userName, email, password };
                const response = await signUp(userData);
                console.log('Registration successful:', response);
                handleClose();
                alert('Registration successful!');
            } catch (err) {
                console.error('Error registering account:', err);
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <>
            <button className='signUpButton' onClick={handleShow}>
                Đăng ký
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên người dùng"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Địa chỉ Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" className="mt-3">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        {passwordError && (
                            <p style={{ color: 'red', marginTop: '10px' }}>{passwordError}</p>
                        )}

                        {error && (
                            <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
                        )}

                        <button type="submit" className="MsignUpButton">
                            Đăng ký
                            <FontAwesomeIcon icon={faUserPlus} className='iconfaUserplus' style={{ marginLeft: '10px' }} />
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignUp;
