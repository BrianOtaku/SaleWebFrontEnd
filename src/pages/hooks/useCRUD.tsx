import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UserModal from './userModal';
import { createEntity, updateEntity, deleteEntity } from '../../API/apiCRUD';
import { UserData } from '../../API/apiCRUD';

export interface CRUDProps {
    pageType: string;
    onCreate: (data: any) => void;
    onUpdate: (data: any) => void;
    onDelete: (ids: number[]) => void;
    selectedItems: number[];
    selectedUserData?: UserData;
    users: UserData[];
}

function CRUD({ pageType, onCreate, onUpdate, onDelete, selectedItems, users }: CRUDProps) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const selectedUserData: UserData | undefined = selectedItems.length === 1
        ? users.find(user => user.userId === selectedItems[0])
        : undefined;

    const handleShowCreate = () => {
        setIsEditMode(false);
        setShowModal(true);
    };

    const handleShowUpdate = () => {
        if (selectedUserData) {
            setIsEditMode(true);
            setShowModal(true);
        }
    };

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

    const handleUpdate = async (data: any) => {
        if (selectedUserData) {
            try {
                await updateEntity(pageType, selectedUserData.userId, data);
                onUpdate(data);
            } catch (error) {
                console.error(`Error updating ${pageType}:`, error);
            }
        }
    };

    const handleDelete = async (ids: number[]) => {
        if (ids.length === 0) {
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
            <Button variant="success" onClick={handleShowCreate}>
                Create
                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
            </Button>
            <UserModal
                show={showModal}
                handleClose={handleClose}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                isEditMode={isEditMode}
                existingUserData={selectedUserData} // Truyền dữ liệu người dùng đã chọn
            />
            <Button variant="primary" onClick={handleShowUpdate} disabled={!selectedUserData}>
                Update
                <FontAwesomeIcon icon={faPen} className='iconPen' />
            </Button>
            <Button
                variant="danger"
                onClick={() => handleDelete(selectedItems)}
                disabled={selectedItems.length === 0}
                style={{ opacity: selectedItems.length === 0 ? 0.8 : 1 }}
            >
                Delete
                <FontAwesomeIcon icon={faDeleteLeft} className='iconDelete' />
            </Button>
        </div>
    );
}

export default CRUD;
