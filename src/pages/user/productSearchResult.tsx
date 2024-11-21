import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../../API/apiGetProductDetail";
import { searchProducts } from "../../API/apiGetProductDetail";
import ProductCard from "../../components/productFlow/productCard";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../API/apiCartContext";

const SearchResult: React.FC<any> = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const searchTerm = params.get('query');

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const page = 1;
    const limit = 10;

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!searchTerm) return;
            setLoading(true);
            try {
                const fetchedProducts = await searchProducts(searchTerm, page, limit);
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
    }, [searchTerm, page, limit]);

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

    const handleAddToCart = (product: Product) => {
        const item = {
            productId: product.productId,
            productName: product.productName,
            productImage: product.productImage,
            cost: product.cost,
            quantity: 1,
        };
        addToCart(item);
    };

    return (
        <div className="contentContainer">
            <h2>-- KẾT QUẢ TÌM KIẾM: {searchTerm?.toUpperCase()} --</h2>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.productId}
                                product={product}
                                handleAddToCart={() => handleAddToCart(product)}
                            />
                        ))
                    ) : (
                        <p><strong>Không có sản phẩm nào phù hợp với từ khóa này.</strong></p>
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

export default SearchResult;
