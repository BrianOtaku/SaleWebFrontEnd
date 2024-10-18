import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UserModal from './useModal';

interface CRUDProps {
    onCreate: (userData: any) => void; // Thay đổi kiểu dữ liệu để có thể truyền vào
}

function CRUD({ onCreate }: CRUDProps) {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className='crud'>
            <Button variant="success" onClick={handleShow}>
                Create
                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
            </Button>
            <UserModal show={showModal} handleClose={handleClose} onCreate={onCreate} />
            <Button variant="primary">
                Update
                <FontAwesomeIcon icon={faPen} className='iconPen' />
            </Button>
            <Button variant="danger">
                Delete
                <FontAwesomeIcon icon={faDeleteLeft} className='iconDelete' />
            </Button>
        </div>
    );
}

export default CRUD;
