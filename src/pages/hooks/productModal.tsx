import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { ProductData } from '../../API/apiCRUD';

interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
    onCreate?: (productData: ProductData) => void;
    onUpdate?: (productData: ProductData) => void;
    isEditMode: boolean;
    existingProductData?: ProductData;
}

const ProductModal: React.FC<ProductModalProps> = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    isEditMode,
    existingProductData
}) => {
    const [productData, setProductData] = useState<ProductData>({
        productId: 0,
        productName: '',
        manufacturer: '',
        productDescription: '',
        cost: 0,
        categoryId: 0,
        categoryName: '',
    });

    useEffect(() => {
        if (isEditMode && existingProductData) {
            setProductData(existingProductData);
        }
    }, [isEditMode, existingProductData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditMode && onUpdate) {
                console.log('Updating category with data:', productData);
                onUpdate(productData);
            } else if (onCreate) {
                console.log('Creating category with data:', productData);
                onCreate(productData);
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Update Product' : 'Create Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            name="productName"
                            value={productData.productName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='CRUDBtn'>
                        {isEditMode ? (
                            <>
                                Update Product
                                <FontAwesomeIcon icon={faPen} className='iconPen' />
                            </>
                        ) : (
                            <>
                                Create Product
                                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
                            </>
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
