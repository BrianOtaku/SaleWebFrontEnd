import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../API/apiGetInfomations'; // Đảm bảo bạn có hàm này trong apiAccount để lấy danh mục

interface Category {
    categoryId: number;
    categoryName: string;
}

function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);

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
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryManagement;
