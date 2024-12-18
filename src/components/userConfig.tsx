import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUserCircle, faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getUserProfile, getUserProfileById } from '../API/apiGetInfomations';
import { updateEntity } from "../API/apiCRUD";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, ModalFooter, Form } from 'react-bootstrap';

function UserConfig() {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [userId, setUserId] = useState({
        userId: 0,
    });
    const [userData, setUserData] = useState({
        userId: 0,
        userName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: 0,
        role: 'User'
    })
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleShowUpdate = () => setShowUpdateModal(true);
    const handleUpdateClose = () => setShowUpdateModal(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const data = await getUserProfile(token);
                    setUserId({
                        userId: data.userId,
                    });
                    if (userId.userId) {
                        const userProfile = await getUserProfileById(userId.userId, token)
                        setUserData({
                            userId: userProfile.userId,
                            userName: userProfile.userName,
                            email: userProfile.email,
                            password: userProfile.password,
                            address: userProfile.address,
                            phoneNumber: userProfile.phoneNumber,
                            role: 'User'
                        })
                    }
                    console.log(data)
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };
        fetchUserProfile();
    }, [userId.userId]);

    const handleUpdate = async () => {
        try {
            await updateEntity('users', userId.userId, userData);
            localStorage.setItem('address', userData.address)
            handleUpdateClose();
            const token = localStorage.getItem('token');
            if (token) {
                const updatedData = await getUserProfileById(userId.userId, token);
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
                <span
                    style={{ marginLeft: '7px' }}
                >
                    {userData.userName.length > 5 ? userData.userName.slice(0, 5) + '...' : userData.userName}
                </span>
            </button>

            <Modal show={showModal} onHide={handleClose} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Trung tâm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Tên:</strong> {userData.userName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p>
                        <strong>Mật khẩu:</strong> {userData.password ? userData.password.slice(0, 10).replace(/./g, '*') : 'No password available'}
                    </p>
                    <p><strong>Địa chỉ:</strong> {userData.address}</p>
                    <p><strong>Số điện thoại:</strong> {userData.phoneNumber}</p>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="primary" onClick={handleShowUpdate}>
                        Chỉnh sửa
                        <FontAwesomeIcon icon={faPen} className="iconPen" />
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Đăng xuất
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginLeft: '10px' }} />
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal show={showUpdateModal} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                value={userData.userName || ''}
                                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={userData.email || ''}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                value={userData.password || ''}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                value={userData.address || ''}
                                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Só điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                value={userData.phoneNumber || ''}
                                onChange={(e) => setUserData({ ...userData, phoneNumber: +e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleUpdateClose}>
                        Hủy
                        <FontAwesomeIcon icon={faXmark} style={{ marginLeft: '10px' }} />
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Lưu thay đổi
                        <FontAwesomeIcon icon={faFloppyDisk} style={{ marginLeft: '10px' }} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserConfig;
