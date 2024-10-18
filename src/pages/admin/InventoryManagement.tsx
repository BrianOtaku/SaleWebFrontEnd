import React, { useEffect, useState } from 'react';
import { getAllInventories } from '../../API/apiGetInfomations'; // Đảm bảo bạn có hàm này trong apiAccount để lấy thông tin tồn kho

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

interface Inventory {
    inventoryId: number;
    product: Product;
    productQuantity: number;
}

function InventoryManagement() {
    const [inventories, setInventories] = useState<Inventory[]>([]);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const inventoryData = await getAllInventories();
                setInventories(inventoryData)
            } catch (error) {
                console.error('Error fetching inventories:', error);
            }
        };

        fetchInventories();
    }, []);

    return (
        <div>
            <h2>Inventories Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Inventory ID</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Manufacturer</th>
                        <th>Cost</th>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Product Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.map(inventory => (
                        <tr key={inventory.inventoryId}>
                            <td>{inventory.inventoryId}</td>
                            <td>{inventory.product.productId}</td>
                            <td>{inventory.product.productName}</td>
                            <td>{inventory.product.manufacturer}</td>
                            <td>{inventory.product.cost}</td>
                            <td>{inventory.product.category.categoryId}</td>
                            <td>{inventory.product.category.categoryName}</td>
                            <td>{inventory.productQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryManagement;
