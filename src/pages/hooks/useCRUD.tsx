// useCRUD.tsx
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UserModal from './useModal';
import { createEntity, updateEntity, deleteEntity } from '../../API/apiCRUD';

export interface CRUDProps {
    pageType: string;
    onCreate: (data: any) => void;
    onUpdate: (data: any) => void;
    onDelete: (ids: number[]) => void; // Cập nhật kiểu
}

function CRUD({ pageType, onCreate, onUpdate, onDelete }: CRUDProps) {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleCreate = async (data: any) => {
        try {
            await createEntity(pageType, data);
            onCreate(data);
            handleClose();
        } catch (error) {
            console.error(`Error creating ${pageType}:`, error);
        }
    };

    const handleUpdate = async (id: number, data: any) => {
        try {
            await updateEntity(pageType, id, data);
            onUpdate(data);
        } catch (error) {
            console.error(`Error updating ${pageType}:`, error);
        }
    };

    const handleDelete = async (ids: number[]) => {
        if (ids.length === 0) {
            console.log(ids);
            console.warn('No items selected for deletion.');
            return;
        }

        try {
            for (const id of ids) {
                await deleteEntity(pageType, id);
            }
            onDelete(ids);
        } catch (error) {
            console.error(`Error deleting ${pageType}:`, error);
        }
    };

    return (
        <div className='crud'>
            <Button variant="success" onClick={handleShow}>
                Create
                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
            </Button>
            <UserModal show={showModal} handleClose={handleClose} onCreate={handleCreate} />
            <Button variant="primary" onClick={() => handleUpdate(1, {})}>
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
