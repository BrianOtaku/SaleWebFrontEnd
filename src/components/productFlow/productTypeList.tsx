import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../API/apiGetInfomations';
import { useNavigate } from 'react-router-dom';

interface Category {
    categoryId: number;
    categoryName: string;
}

const ProductTypeList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {

            try {
                const fetchedCategories = await getAllCategories();
                setCategories(fetchedCategories);
            } catch (err) {
                setError('Failed to fetch categories');
                console.error(err);
            } finally {
                setLoading(false);
            }

        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId: number) => {
        navigate(`/category/${categoryId}`);
    };

    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="product-type-list">
            {categories.length === 0 ? (
                <p>No categories available.</p>
            ) : (
                categories.map((category) => (
                    <li key={category.categoryId} onClick={() => handleCategoryClick(category.categoryId)}>
                        {category.categoryName}
                    </li>
                ))
            )}
        </div>
    );
};

export default ProductTypeList;
