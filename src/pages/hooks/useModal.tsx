import { Modal, Button, Form } from 'react-bootstrap';
import { createUser } from '../../API/apiCRUD';
import { UserData } from '../../API/apiCRUD';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface UserModalProps {
    show: boolean;
    handleClose: () => void;
    onCreate: (userData: UserData) => void;
}

const UserModal: React.FC<UserModalProps> = ({ show, handleClose, onCreate }) => {
    const [userData, setUserData] = useState<UserData>({
        userName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        role: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('Creating user with data:', userData);
            await createUser(userData); // Chỉ gọi tạo tài khoản một lần
            onCreate(userData); // Gọi onCreate chỉ sau khi tạo thành công
            handleClose(); // Đóng modal sau khi tạo thành công
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter user name"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            name="address"
                            value={userData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter role"
                            name="role"
                            value={userData.role}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='CreateUser'>
                        Create User
                        <FontAwesomeIcon icon={faPlus} className='iconPlus' />
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;
