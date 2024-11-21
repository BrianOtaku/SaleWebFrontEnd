import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchProducts } from "../../API/apiGetProductDetail";

interface ProductSearchProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ searchTerm, setSearchTerm }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!searchTerm) return;

            setLoading(true);
            setError(null);
            try {
                const response = await searchProducts(searchTerm, page, 10);
                setProducts(response.products);
                setTotalPages(response.totalPages);
            } catch (err) {
                setError("Failed to search products.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchTerm, page]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Đang tải...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : products.length === 0 ? (
                <p>Không tìm thấy sản phẩm nào.</p>
            ) : (
                <div>
                    <ul>
                        {products.map((product) => (
                            <li key={product.productId}>
                                <Link
                                    to={`/products/${product.productId}`}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    {product.productName} - {product.manufacturer}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                        >
                            Trang trước
                        </button>
                        <span>{`Trang ${page} / ${totalPages}`}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}
                        >
                            Trang sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductSearch;
