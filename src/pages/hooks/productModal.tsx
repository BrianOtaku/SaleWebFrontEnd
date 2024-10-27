import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { ProductData, CategoryData } from '../../API/apiCRUD';
import { getAllCategories } from '../../API/apiGetInfomations';

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
        productImage: '',
        productQuantity: 0,
    });

    const [categories, setCategories] = useState<CategoryData[]>([]);

    useEffect(() => {
        if (isEditMode && existingProductData) {
            setProductData(existingProductData);
        }
    }, [isEditMode, existingProductData]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const categoriesData = await getAllCategories(token || '');
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditMode && onUpdate) {
                onUpdate(productData);
            } else if (onCreate) {
                onCreate(productData);
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Update Product' : 'Create Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
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
                            <Form.Group controlId="formManufacturer">
                                <Form.Label>Manufacturer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter manufacturer"
                                    name="manufacturer"
                                    value={productData.manufacturer}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCost">
                                <Form.Label>Cost</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter cost"
                                    name="cost"
                                    value={productData.cost}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter quantity"
                                    name="productQuantity"
                                    value={productData.productQuantity}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategoryId">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Select
                                    name="categoryId"
                                    value={productData.categoryId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category:</option>
                                    {categories.map(category => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formProductImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image URL"
                                    name="productImage"
                                    value={productData.productImage}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductDescription">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter product description"
                                    name="productDescription"
                                    value={productData.productDescription}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        minHeight: '245.5px',
                                        resize: 'none',
                                        overflowY: 'auto',
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
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
