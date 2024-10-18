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
                Sign Up
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter user name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" className="mt-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
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
                            Sign Up
                            <FontAwesomeIcon icon={faUserPlus} className='iconfaUserplus' style={{ marginLeft: '10px' }} />
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignUp;
