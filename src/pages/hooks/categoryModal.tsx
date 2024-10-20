import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { CategoryData } from '../../API/apiCRUD';

interface CategoryModalProps {
    show: boolean;
    handleClose: () => void;
    onCreate?: (categoryData: CategoryData) => void;
    onUpdate?: (categoryData: CategoryData) => void;
    isEditMode: boolean;
    existingCategoryData?: CategoryData;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    isEditMode,
    existingCategoryData
}) => {
    const [categoryData, setCategoryData] = useState<CategoryData>({
        categoryId: 0,
        categoryName: '',
    });

    useEffect(() => {
        if (isEditMode && existingCategoryData) {
            setCategoryData(existingCategoryData);
        }
    }, [isEditMode, existingCategoryData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditMode && onUpdate) {
                console.log('Updating category with data:', categoryData);
                onUpdate(categoryData);
            } else if (onCreate) {
                console.log('Creating category with data:', categoryData);
                onCreate(categoryData);
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Update Category' : 'Create Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCategoryName">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
                            name="categoryName"
                            value={categoryData.categoryName}
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

export default CategoryModal;
