import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// import CRUD functions
import { createEntity, updateEntity, deleteEntity } from '../../API/apiCRUD';

// import interfaces
import { UserData, CategoryData, ProductData, OrderData } from '../../API/apiCRUD';

// import Modal
import UserModal from './userModal';
import CategoryModal from './categoryModal';
import ProductModal from './productModal';
import OrderModal from './orderModal';

export interface CRUDProps {
    pageType: string;

    onCreate: (data: any) => void;
    onUpdate: (data: any) => void;
    onDelete: (ids: number[]) => void;

    selectedItems: number[];
    selectedUserData?: UserData;
    selectedCategoryData?: CategoryData;
    selectedProductData?: ProductData;
    selectedOrderData?: OrderData;

    users?: UserData[];
    categories?: CategoryData[];
    products?: ProductData[];
    orders?: OrderData[];
}


function CRUD({ pageType, onCreate, onUpdate, onDelete, selectedItems, users, categories, products, orders }: CRUDProps) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const selectedUser: UserData | undefined = selectedItems.length === 1 && pageType === 'users'
        ? users?.find(user => user.userId === selectedItems[0])
        : undefined;

    const selectedCategory: CategoryData | undefined = selectedItems.length === 1 && pageType === 'categories'
        ? categories?.find(category => category.categoryId === selectedItems[0])
        : undefined;

    const selectedProduct: ProductData | undefined = selectedItems.length === 1 && pageType === 'products'
        ? products?.find(product => product.productId === selectedItems[0])
        : undefined;

    const selectedOrder: OrderData | undefined = selectedItems.length === 1 && pageType === 'orders'
        ? orders?.find(order => order.orderId === selectedItems[0])
        : undefined;

    const handleShowCreate = () => {
        setIsEditMode(false);
        setShowModal(true);
    };

    const handleShowUpdate = () => {
        if (selectedUser || selectedCategory || selectedProduct || selectedOrder) {
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
        const id = selectedUser?.userId || selectedCategory?.categoryId || selectedProduct?.productId || selectedOrder?.orderId;
        if (id !== undefined) {
            try {
                await updateEntity(pageType, id, data);
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
            <Button variant="success" onClick={handleShowCreate} disabled={pageType === 'orders'}>
                Create {
                    pageType === 'users' ? 'User' :
                        pageType === 'categories' ? 'Category' :
                            pageType === 'orders' ? 'Order' :
                                'Product'
                }
                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
            </Button>

            <Button variant="primary" onClick={handleShowUpdate} disabled={selectedItems.length !== 1}>
                Update {
                    pageType === 'users' ? 'User' :
                        pageType === 'categories' ? 'Category' :
                            pageType === 'orders' ? 'Order' :
                                'Product'
                }
                <FontAwesomeIcon icon={faPen} className='iconPen' />
            </Button>

            <Button
                variant="danger"
                onClick={() => handleDelete(selectedItems)}
                disabled={selectedItems.length === 0}
            >
                Delete {
                    pageType === 'users' ? 'User' :
                        pageType === 'categories' ? 'Category' :
                            pageType === 'orders' ? 'Order' :
                                'Product'
                }
                <FontAwesomeIcon icon={faDeleteLeft} className='iconDelete' />
            </Button>

            {pageType === 'users' && (
                <UserModal
                    show={showModal}
                    handleClose={handleClose}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    isEditMode={isEditMode}
                    existingUserData={selectedUser}
                />
            )}

            {pageType === 'categories' && (
                <CategoryModal
                    show={showModal}
                    handleClose={handleClose}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    isEditMode={isEditMode}
                    existingCategoryData={selectedCategory}
                />
            )}

            {pageType === 'products' && (
                <ProductModal
                    show={showModal}
                    handleClose={handleClose}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    isEditMode={isEditMode}
                    existingProductData={selectedProduct}
                />
            )}

            {pageType === 'orders' && (
                <OrderModal
                    show={showModal}
                    handleClose={handleClose}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    isEditMode={isEditMode}
                    existingOrderData={selectedOrder}
                />
            )}

        </div>
    );
}

export default CRUD;

