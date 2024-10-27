import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUserCircle, faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getUserProfile } from '../API/apiGetInfomations';
import { updateEntity } from "../API/apiCRUD";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, ModalFooter, Form } from 'react-bootstrap';

function UserConfig() {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [userData, setUserData] = useState({
        userId: 0,
        userName: '',
        userEmail: '',
        address: '',
        phoneNumber: 0
    });
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleShowUpdate = () => setShowUpdateModal(true);
    const handleUpdateClose = () => setShowUpdateModal(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const data = await getUserProfile(token);
                    setUserData({
                        userId: data.userId,
                        userName: data.userName || 'No name',
                        userEmail: data.email || 'No email available',
                        address: data.address || 'No address',
                        phoneNumber: data.phoneNumber || 'No phone number',
                    });
                    console.log(data)
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            await updateEntity('users', userData.userId, userData);
            handleUpdateClose();
            const token = localStorage.getItem('token');
            if (token) {
                const updatedData = await getUserProfile(token);
                console.log(updatedData)
                setUserData(updatedData);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <>
            <button className='UserIcon' onClick={handleShow}>
                <FontAwesomeIcon icon={faUserCircle} />
                <span style={{ marginLeft: '7px' }}>{userData.userName}</span>
            </button>

            {/* User Info Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Name:</strong> {userData.userName}</p>
                    <p><strong>Email:</strong> {userData.userEmail}</p>
                    <p><strong>Address:</strong> {userData.address}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="primary" onClick={handleShowUpdate}>
                        Update
                        <FontAwesomeIcon icon={faPen} className="iconPen" />
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Sign Out
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginLeft: '10px' }} />
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Update User Info Modal */}
            <Modal show={showUpdateModal} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={userData.userName}
                                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={userData.userEmail}
                                onChange={(e) => setUserData({ ...userData, userEmail: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={userData.address}
                                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={userData.phoneNumber}
                                onChange={(e) => setUserData({ ...userData, phoneNumber: +e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleUpdateClose}>
                        Cancel
                        <FontAwesomeIcon icon={faXmark} style={{ marginLeft: '10px' }} />
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                        <FontAwesomeIcon icon={faFloppyDisk} style={{ marginLeft: '10px' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserConfig;
