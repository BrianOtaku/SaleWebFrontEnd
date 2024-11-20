import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { signIn, getUserRoleFromToken } from '../API/apiAccount';
import { getUserProfile } from '../API/apiGetInfomations';

interface SignInProps {
    onLogin: () => void;
}

function SignIn({ onLogin }: SignInProps) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const loginData = { email, password };
            const response = await signIn(loginData);
            const token = response.result.token;

            if (token) {
                localStorage.setItem('token', token);
                const userProfile = await getUserProfile(token);
                const userId = userProfile.userId;
                const userName = userProfile.userName;
                localStorage.setItem("userId", userId);
                localStorage.setItem('userName', userName);
            }

            const role = getUserRoleFromToken(token);
            console.log('User role:', role);

            if (role === 'Admin') {
                window.location.reload();
            } else {
                onLogin();
                handleClose();
                alert('Sign in successful!');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <button className='signInButton' onClick={handleShow}>
                Đăng nhập
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Địa chỉ Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Mặt khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {error && (
                            <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
                        )}

                        <button type="submit" className="MsignInButton">
                            Đăng nhập
                            <FontAwesomeIcon icon={faSignIn} className='iconfaSignIn' style={{ marginLeft: '10px' }} />
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignIn;
