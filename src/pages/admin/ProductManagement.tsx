import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';

interface Category {
    categoryId: number;
    categoryName: string;
}

interface Product {
    productId: number;
    productName: string;
    manufacturer: string;
    cost: number;
    category: Category;
}

function ProductManagement() {
    const [products, setProducts] = useState<Product[]>([]);
    const { selectedItems, selectAll, handleSelectItem, handleSelectAll } = useSelect(
        products.map(product => product.productId)
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getAllProducts();
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Manufacturer</th>
                        <th>Cost</th>
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
                            <td>{product.cost}</td>
                            <td>{product.category.categoryId}</td>
                            <td>{product.category.categoryName}</td>
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
    );
}

export default ProductManagement;
