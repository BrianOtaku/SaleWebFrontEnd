import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../API/apiGetInfomations";
import { Link } from "react-router-dom";

const ProductManufacturer = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token not found");
                setLoading(false);
                return;
            }

            try {
                const fetchedProducts = await getAllProducts(token);
                setProducts(fetchedProducts);
            } catch (err) {
                setError("Failed to fetch products");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleManufacturerClick = (manufacturer: string) => {
        // Chuyển sang trang sản phẩm của nhà sản xuất khi người dùng click vào tên nhà sản xuất
        console.log("Chọn nhà sản xuất:", manufacturer);
    };

    // Lấy danh sách các nhà sản xuất từ mảng sản phẩm
    const manufacturers = Array.from(new Set(products.map((product) => product.manufacturer)));

    return (
        <div>
            {loading ? (
                <p>Đang tải...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : manufacturers.length === 0 ? (
                <p>Không có nhà sản xuất nào.</p>
            ) : (
                manufacturers.map((manufacturer) => (
                    <li>
                        <Link
                            to={`/products/manufacturer/${manufacturer}`}
                            onClick={() => handleManufacturerClick(manufacturer)}
                            style={{
                                color: 'black',
                                textDecoration: 'none'
                            }}
                            key={manufacturer}
                        >
                            {manufacturer}
                        </Link>
                    </li>
                ))
            )}
        </div>
    );
};

export default ProductManufacturer;
