import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import Cookies from 'js-cookie';

const NotificationModal = () => {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(''); // Lưu thông báo mới nhất
    const [loading, setLoading] = useState(false); // Trạng thái khi đang tải thông báo
    const [notifications, setNotifications] = useState<string[]>([]); // Lưu danh sách thông báo

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        // Thiết lập kết nối WebSocket
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000, // Tự động kết nối lại
        });

        stompClient.onConnect = () => {
            console.log("Connected to WebSocket");
            stompClient.subscribe('/topic/notifications', (message) => {
                const newNotification = message.body;
                setNotifications((prev) => {
                    const updatedNotifications = [...prev, newNotification];

                    Cookies.set(`user_notifications_${userId}`, JSON.stringify(updatedNotifications), { expires: 7 }); // Lưu thông báo vào cookie theo ID người dùng
                    return updatedNotifications;
                });
                setNotification(newNotification); // Cập nhật thông báo mới nhất
            });
        };

        // Khi component được render, lấy thông báo từ cookie nếu có
        // Thay thế bằng ID người dùng thực tế
        const savedNotifications = Cookies.get(`user_notifications_${userId}`); // Lấy thông báo từ cookie theo ID người dùng
        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications)); // Khôi phục thông báo từ cookie
        }

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []); // Chạy một lần khi component được render

    useEffect(() => {
        // Khi modal mở, có thể thực hiện thêm thao tác (nếu cần)
        if (show) {
            setLoading(false); // Reset trạng thái tải
        }
    }, [show]);

    return (
        <>
            <button onClick={handleShow} className="notificationButton">
                <FontAwesomeIcon icon={faBell} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                centered size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Đang tải thông báo...</p>
                    ) : notifications.length > 0 ? (
                        <ul>
                            {notifications.map((note, index) => (
                                <li key={index}>{note}</li> // Hiển thị danh sách thông báo
                            ))}
                        </ul>
                    ) : (
                        <p>Không có thông báo nào.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NotificationModal;