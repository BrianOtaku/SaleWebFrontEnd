import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../API/apiGetProductDetail";
import { getProductsByManufacturer } from "../../API/apiGetProductDetail";
import ProductCard from "../../components/productFlow/productCard";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductManufacturerResult: React.FC<any> = ({ handleAddToCart }) => {
    const { manufacturer } = useParams<{ manufacturer: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const page = 1;
    const limit = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await getProductsByManufacturer(
                    String(manufacturer),
                    page,
                    limit
                );
                console.log(fetchedProducts);
                if (fetchedProducts && Array.isArray(fetchedProducts.products)) {
                    setProducts(fetchedProducts.products);
                    setTotalProducts(fetchedProducts.totalProducts);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [manufacturer, page, limit]);

    const totalPages = Math.ceil(totalProducts / limit);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const visiblePages = () => {
        const pageLimit = 3;
        let startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
        const endPage = Math.min(startPage + pageLimit - 1, totalPages);
        if (endPage - startPage < pageLimit - 1) {
            startPage = Math.max(endPage - pageLimit + 1, 1);
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div className="contentContainer">
            <h2>-- SẢN PHẨM CỦA {manufacturer?.toUpperCase()} --</h2>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.productId}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            />
                        ))
                    ) : (
                        <p><strong>Không có sản phẩm nào từ nhà sản xuất này.</strong></p>
                    )}
                </div>
            )}
            <div className="pagination">
                <button
                    className="page-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </button>
                {visiblePages().map((page) => (
                    <button
                        key={page}
                        className={`page-button ${currentPage === page ? "active" : ""}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="page-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faAnglesRight} />
                </button>
            </div>
        </div>
    );
};

export default ProductManufacturerResult;
