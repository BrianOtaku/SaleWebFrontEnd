import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';
import CRUD from '../hooks/useCRUD';
import { CategoryData } from '../../API/apiCRUD';

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
                const categoriesData = await getAllCategories();
                console.log(categoriesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching category:', error);
            }

        };

        fetchCategories();
    }, []);

    const handleCreate = async (categoryData: CategoryData) => {
        try {
            setCategories([...categories, categoryData]);
            window.location.reload();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleUpdate = async (updatedData: CategoryData) => {
        window.location.reload();
        setCategories(categories.map(category => category.categoryId === updatedData.categoryId ? updatedData : category));
    };

    const handleDelete = async () => {
        if (selectedItems.length > 0) {
            try {
                window.location.reload();
                setCategories(categories.filter(category => !selectedItems.includes(category.categoryId)));
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        } else {
            console.warn('No users selected for deletion.');
        }
    };

    return (
        <div>
            <div className="header-management">
                <h2>Categories Management</h2>
                <CRUD
                    pageType="categories"
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    selectedItems={selectedItems}
                    selectedCategoryData={
                        selectedItems.length === 1
                            ? categories.find(category => category.categoryId === selectedItems[0])
                            : undefined
                    }
                    categories={categories}
                />
            </div>
            <div className="table-container">
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
        </div>
    );
}

export default CategoryManagement;
