import React, { useEffect, useState } from 'react';
import { getAllInventories } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';
import CRUD from '../hooks/useCRUD';
import { InventoryData } from '../../API/apiCRUD';

interface Inventory {
    inventoryId: number;
    productId: number;
    productQuantity: number;
}

function InventoryManagement() {
    const [inventories, setInventories] = useState<Inventory[]>([]);

    const { selectedItems, selectAll, handleSelectItem, handleSelectAll } = useSelect(
        inventories.map(inventory => inventory.inventoryId)
    );

    useEffect(() => {
        const fetchInventories = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                try {
                    const inventoryData = await getAllInventories(token);
                    console.log(inventoryData);
                    setInventories(inventoryData);
                } catch (error) {
                    console.error('Error fetching inventory:', error);
                }
            }
        };

        fetchInventories();
    }, []);

    const handleCreate = async (inventoryData: InventoryData) => {
        try {
            setInventories([...inventories, inventoryData]);
        } catch (error) {
            console.error('Error creating inventory:', error);
        }
    };

    const handleUpdate = async (updatedData: InventoryData) => {
        setInventories(inventories.map(inventory => inventory.inventoryId === updatedData.inventoryId ? updatedData : inventory));
    };

    const handleDelete = async () => {
        if (selectedItems.length > 0) {
            try {
                window.location.reload();
                setInventories(inventories.filter(inventory => !selectedItems.includes(inventory.inventoryId)));
            } catch (error) {
                console.error('Error deleting inventory:', error);
            }
        } else {
            console.warn('No inventory selected for deletion.');
        }
    };

    return (
        <div>
            <h2>Inventories Management</h2>
            <CRUD
                pageType="inventories"
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                selectedItems={selectedItems}
                selectedInventoryData={
                    selectedItems.length === 1
                        ? inventories.find(inventory => inventory.inventoryId === selectedItems[0])
                        : undefined
                }
                inventories={inventories}
            />
            <table>
                <thead>
                    <tr>
                        <th>Inventory ID</th>
                        <th>Product ID</th>
                        <th>Product Quantity</th>
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
                    {inventories.map(inventory => (
                        <tr key={inventory.inventoryId}>
                            <td>{inventory.inventoryId}</td>
                            <td>{inventory.productId}</td>
                            <td>{inventory.productQuantity}</td>
                            <td className='checkBox'>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(inventory.inventoryId)}
                                    onChange={() => handleSelectItem(inventory.inventoryId)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryManagement;
