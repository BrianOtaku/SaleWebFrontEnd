import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';

interface Category {
    categoryId: number;
    categoryName: string;
}

function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { selectedItems, selectAll, handleSelectItem, handleSelectAll } = useSelect(
        categories.map(category => category.categoryId)
    );

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryData = await getAllCategories(); // Lấy danh mục từ API
                setCategories(categoryData); // Lưu trữ dữ liệu vào state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Categories Management</h2>
            <table>
                <thead>
                    <tr>
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
                    {categories.map(category => (
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td className='checkBox'>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(category.categoryId)}
                                    onChange={() => handleSelectItem(category.categoryId)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryManagement;
