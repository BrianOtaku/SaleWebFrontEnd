import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { InventoryData } from '../../API/apiCRUD';

interface InventoryModalProps {
    show: boolean;
    handleClose: () => void;
    onCreate?: (inventoryData: InventoryData) => void;
    onUpdate?: (categoryData: InventoryData) => void;
    isEditMode: boolean;
    existingInventoryData?: InventoryData;
}

const InventoryModal: React.FC<InventoryModalProps> = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    isEditMode,
    existingInventoryData
}) => {
    const [inventoryData, setInventoryData] = useState<InventoryData>({
        inventoryId: 0,
        productId: 0,
        productQuantity: 0,
    });

    useEffect(() => {
        if (isEditMode && existingInventoryData) {
            setInventoryData(existingInventoryData);
        }
    }, [isEditMode, existingInventoryData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditMode && onUpdate) {
                console.log('Updating inventory with data:', inventoryData);
                onUpdate(inventoryData);
            } else if (onCreate) {
                console.log('Creating inventory with data:', inventoryData);
                onCreate(inventoryData);
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Update Inventory' : 'Create Inventory'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formProductQuantity">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={inventoryData.productQuantity}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='CRUDBtn'>
                        {isEditMode ? (
                            <>
                                Update Category
                                <FontAwesomeIcon icon={faPen} className='iconPen' />
                            </>
                        ) : (
                            <>
                                Create Category
                                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
                            </>
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default InventoryModal;
