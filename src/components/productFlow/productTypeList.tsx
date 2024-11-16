import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../API/apiGetInfomations";
import { Link } from "react-router-dom";

const ProductTypeList = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {

            try {
                const fetchedCategories = await getAllCategories();
                setCategories(fetchedCategories);
            } catch (err) {
                setError("Failed to fetch categories");
                console.error(err);
            } finally {
                setLoading(false);
            }

        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        console.log("Chọn danh mục:", categoryName);
    };

    const categoryName = Array.from(new Set(categories.map((category) => category.categoryName)));

    return (
        <div>
            {loading ? (
                <p>Đang tải...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : categoryName.length === 0 ? (
                <p>Không có danh mục nào.</p>
            ) : (
                categoryName.map((categoryName) => (
                    <li key={categoryName}>
                        <Link
                            to={`/products/category/${categoryName}`}
                            onClick={() => handleCategoryClick(categoryName)}
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            {categoryName}
                        </Link>
                    </li>
                ))
            )}
        </div>
    );
};

export default ProductTypeList;
