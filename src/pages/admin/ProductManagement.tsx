import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';
import CRUD from '../hooks/useCRUD';
import { ProductData } from '../../API/apiCRUD';

interface Product {
    productId: number;
    productName: string;
    manufacturer: string;
    productDescription: string;
    cost: number;
    categoryId: number;
    categoryName: string;
    productImage: string;
    productQuantity: 0;
}

function ProductManagement() {
    const [products, setProducts] = useState<Product[]>([]);

    const { selectedItems, selectAll, handleSelectItem, handleSelectAll } = useSelect(
        products.map(product => product.productId)
    );

    useEffect(() => {
        const fetchProducts = async () => {

            try {
                const productsData = await getAllProducts();
                console.log(productsData);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }

        };

        fetchProducts();
    }, []);

    const handleCreate = async (productData: ProductData) => {
        try {
            window.location.reload();
            setProducts([...products, productData]);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleUpdate = async (updatedData: ProductData) => {
        window.location.reload();
        setProducts(products.map(product => product.productId === updatedData.productId ? updatedData : product));
    };

    const handleDelete = async () => {
        if (selectedItems.length > 0) {
            try {
                window.location.reload();
                setProducts(products.filter(product => !selectedItems.includes(product.productId)));
            } catch (error) {
                console.error('Error deleting prodcut:', error);
            }
        } else {
            console.warn('No product selected for deletion.');
        }
    };

    return (
        <div>
            <div className="header-management">
                <h2>Products Management</h2>
                <CRUD
                    pageType="products"
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    selectedItems={selectedItems}
                    selectedProductData={
                        selectedItems.length === 1
                            ? products.find(products => products.productId === selectedItems[0])
                            : undefined
                    }
                    products={products}
                />
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Manufacturer</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Image URL</th>
                            <th>Quantity</th>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th className='checkBox'>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.manufacturer}</td>
                                <td>
                                    {product.productDescription.length > 20 ?
                                        product.productDescription.slice(0, 20) + '...' :
                                        product.productDescription}
                                </td>
                                <td>{product.cost}</td>
                                <td>
                                    {product.productImage.length > 15 ?
                                        product.productImage.slice(0, 15) + '...' :
                                        product.productImage}
                                </td>
                                <td>{product.productQuantity}</td>
                                <td>{product.categoryId}</td>
                                <td>{product.categoryName}</td>
                                <td className='checkBox'>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(product.productId)}
                                        onChange={() => handleSelectItem(product.productId)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductManagement;
