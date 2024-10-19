import { Modal, Button, Form } from 'react-bootstrap';
import { UserData } from '../../API/apiCRUD';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

interface UserModalProps {
    show: boolean;
    handleClose: () => void;
    onCreate?: (userData: UserData) => void;
    onUpdate?: (userData: UserData) => void;
    isEditMode: boolean;
    existingUserData?: UserData;
}

const UserModal: React.FC<UserModalProps> = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    isEditMode,
    existingUserData
}) => {
    const [userData, setUserData] = useState<UserData>({
        userId: 0,
        userName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: 0,
        role: '',
    });

    useEffect(() => {
        if (isEditMode && existingUserData) {
            setUserData(existingUserData);
        }
    }, [isEditMode, existingUserData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedValue = name === 'phoneNumber' ? Number(value) : value;
        setUserData({ ...userData, [name]: updatedValue });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditMode && onUpdate) {
                console.log('Updating user with data:', userData);
                onUpdate(userData);
            } else if (onCreate) {
                console.log('Creating user with data:', userData);
                onCreate(userData);
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Update User' : 'Create User'}</Modal.Title>
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
                            required={!isEditMode} // Only required when creating
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
                            value={userData.phoneNumber === 0 ? '' : userData.phoneNumber}
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
                        {isEditMode ? (
                            <>
                                Update User
                                <FontAwesomeIcon icon={faPen} className='iconPen' />
                            </>
                        ) : (
                            <>
                                Create User
                                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
                            </>
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;
