import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getUserProfile } from '../API/apiGetInfomations';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, ModalFooter } from 'react-bootstrap';

function UserConfig() {
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState<{ userName: string; userEmail: string; address: string; phoneNumber: number }>({
        userName: 'Error',
        userEmail: 'No email available',
        address: 'No address',
        phoneNumber: 0,
    });

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // localStorage.removeItem('userProfile')
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
                        userName: data.userName || 'No name',
                        userEmail: data.email || 'No email available',
                        address: data.address || 'No address',
                        phoneNumber: data.phoneNumber || 'No phone number',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <>
            <button className='UserIcon' onClick={handleShow}>
                <FontAwesomeIcon icon={faUserCircle} />
                <span style={{ marginLeft: '7px' }}>{userData.userName}</span>
            </button>

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
                    <Button variant="danger" onClick={handleLogout}>
                        Sign Out
                        <FontAwesomeIcon icon={faArrowRightFromBracket}
                            style={{
                                marginLeft: '10px'
                            }} />
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UserConfig;
