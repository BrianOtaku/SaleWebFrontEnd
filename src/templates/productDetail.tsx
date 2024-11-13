import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product, getProductById, getAllProduct } from "../API/apiGetProductDetail";
import "../styles/productDetail.css";
import Taskbar from "./taskbar";
import Footer from "./footer";
import Slider from "react-slick";
import { useCart } from "../API/apiCartContext";

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, isLoggedIn, login, userAccount } = useCart();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
    const pagesToShow = 5;
    const sliderRef = useRef<Slider>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (productId) {
                    const productData = await getProductById(parseInt(productId, 10));
                    const allProducts = await getAllProduct();
                    if (productData) {
                        setProduct(productData);
                        setRelatedProducts(
                            allProducts.filter(
                                (p) =>
                                    p.categoryId === productData.categoryId &&
                                    p.productId !== productData.productId
                            )
                        );
                    } else {
                        setError("Không tìm thấy sản phẩm.");
                    }
                }
            } catch (error) {
                setError("Không thể lấy thông tin chi tiết sản phẩm.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const totalPages = Math.ceil(relatedProducts.length / productsPerPage);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
            login(); // Ensure that login() is called without parameters like in content.tsx
            return;
        }

        if (userAccount && product) {
            addToCart({
                productId: product.productId,
                productName: product.productName,
                productImage: product.productImage,
                cost: product.cost,
                quantity: 1,
            });
        }
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để mua sản phẩm.");
            login(); // Use the login function without parameters, similar to `handleAddToCart`
            return;
        }

        if (userAccount && product) {
            addToCart({
                productId: product.productId,
                productName: product.productName,
                productImage: product.productImage,
                cost: product.cost,
                quantity: 1,
            });
            navigate("/cart"); // Redirect to the cart page after adding the product
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo((pageNumber - 1) * productsPerPage);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageClick(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const start = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const end = Math.min(totalPages, start + pagesToShow - 1);
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: productsPerPage,
        slidesToScroll: productsPerPage,
        autoplay: false,
        afterChange: (currentSlide: number) => {
            setCurrentPage(Math.floor(currentSlide / productsPerPage) + 1);
        },
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Không tìm thấy dữ liệu sản phẩm.</div>;

    return (
        <div className="detail-page">
            <Taskbar />
            <div className="detail-container">
                <div className="detail-image-section">
                    <img src={product.productImage} alt={product.productName} className="detail-image" />
                </div>

                <div className="detail-info-section">
                    <h2 className="detail-title">{product.productName}</h2>
                    <div className="detail-information">
                        <p><strong>Product Description</strong></p>
                        <p>{product.productDescription}</p>
                    </div>
                    <p className="detail-price">
                        Giá: <span className="detail-price-value">{product.cost.toLocaleString()} VND</span>
                    </p>
                    <div className="detail-button-group">
                        <button className="detail-buy-now-button" onClick={handleBuyNow}>Mua ngay</button>
                        <button className="detail-add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>

            <div className="related-products">
                <h3>Sản phẩm tương tự</h3>
                <Slider ref={sliderRef} {...sliderSettings}>
                    {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.productId} className="related-product-item">
                            <img src={relatedProduct.productImage} alt={relatedProduct.productName} />
                            <h4>{relatedProduct.productName}</h4>
                            <p>{relatedProduct.cost.toLocaleString()} VND</p>
                            <button
                                onClick={() => {
                                    navigate(`/product/${relatedProduct.productId}`);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </Slider>

                <div className="pagination">
                    <button
                        className="previous"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {getPageNumbers().map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={currentPage === pageNumber ? "active" : ""}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        className="next"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
