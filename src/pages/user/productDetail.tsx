import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, getProductById, getAllProduct } from "../../API/apiGetProductDetail";
import { useCart } from "../../API/apiCartContext";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import ProductRelated from "../../components/productFlow/productRelated";
import ProductDescription from "./productDescription";
import ProductReview from "../../components/productFlow/productReview";
import { OrderContext } from '../../Context/orderContext';
import PaymentModal from "../../components/productFlow/paymentModal";

const ProductDetail: React.FC = () => {
    const orderContext = useContext(OrderContext);
    if (!orderContext) {
        throw new Error('OrderContext must be used within an OrderProvider');
    }
    const { setProductId, setUserId, setOrderQuantity, setTotalCost, setProductName } = orderContext;
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart, isLoggedIn, login, userAccount } = useCart();
    const localUser = localStorage.getItem("userId");
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (productId) {
                    const productData = await getProductById(parseInt(productId, 10));
                    if (productData) {
                        setProduct(productData);

                        const allProducts = await getAllProduct();

                        const filteredProducts = allProducts.filter(
                            (p) => p.productId !== parseInt(productId, 10) && p.categoryId === productData.categoryId
                        );

                        const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());

                        setRelatedProducts(shuffledProducts.slice(0, 4));

                        window.scrollTo(0, 0);

                        if (localUser) {
                            const cartItems = JSON.parse(localStorage.getItem(`cartItems_${localUser}`) || "[]");
                            setIsAdded(cartItems.includes(productData.productId));
                        }
                    } else {
                        setError("Không thể lấy thông tin sản phẩm.");
                    }
                }
            } catch (error) {
                setError("Không thể lấy thông tin chi tiết sản phẩm.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, localUser]);

    const handleOrderClick = (name: string, productId: number, orderQuantity: number, totalCost: number) => {
        setProductName(name)
        setProductId(productId);
        setOrderQuantity(orderQuantity);
        setTotalCost(totalCost);
        setShowPaymentModal(true);
        if (localUser) {
            setUserId(parseInt(localUser));
        } else {
            console.error("localUser is null");
        }
    };

    const handleAddToCart = (product: Product) => {
        if (isAdded) {
            alert("Sản phẩm này đã có trong giỏ hàng!");
            return;
        }

        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
            login();
            return;
        }

        if (userAccount) {
            addToCart({
                productId: product.productId,
                productName: product.productName,
                productImage: product.productImage,
                cost: product.cost,
                quantity: 1,
            });

            if (localUser) {
                const cartItems = JSON.parse(localStorage.getItem(`cartItems_${localUser}`) || "[]");
                if (!cartItems.includes(product.productId)) {
                    cartItems.push(product.productId);
                    localStorage.setItem(`cartItems_${localUser}`, JSON.stringify(cartItems));
                }
            }
            setIsAdded(true);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Không tìm thấy dữ liệu sản phẩm.</div>;

    return (
        <div className="detail-page">
            <div className="detail-container">
                <div className="detail-image-section">
                    <img src={product.productImage} alt={product.productImage} className="detail-image" />
                </div>

                <div className="detail-info-section">
                    <h2 className="detail-title">{product.productName}</h2>
                    <div className="detail-information">
                        <ul>
                            <div>
                                {product.productDescription.split(",").slice(0, 3).map((desc, index) => (
                                    <li key={index} className="detail-description">
                                        <strong>{desc.trim()}</strong>
                                    </li>
                                ))}
                                <div className="additional-description">
                                    {product.productDescription.split(",").slice(3, 5).map((desc, index) => (
                                        <li key={index} className="detail-description">
                                            <strong>{desc.trim()}</strong>
                                        </li>
                                    ))}
                                </div>
                            </div>
                            <li>
                                Manufacturer: {product.manufacturer}
                            </li>
                            <li>
                                Quantity: {product.productQuantity}
                            </li>
                        </ul>
                    </div>
                    <div className="detail-footer">
                        <div className="detail-price">
                            Giá: <span className="detail-price-value">{product.cost.toLocaleString()} VND</span>
                        </div>
                        <div className="detail-button-group">
                           {localUser ? 
                            <Button
                            variant="danger"
                            className="detail-buy-now-button"
                            onClick={() => handleOrderClick(product.productName, product.productId, 1, product.cost)}
                        >
                            Mua Ngay
                            <FontAwesomeIcon icon={faDollarSign} style={{ marginLeft: "7px" }} />
                        </Button>
                        : ""}
                            <Button
                                variant="success"
                                className={`detail-add-to-cart-button ${isAdded ? "added" : ""}`}
                                onClick={() => handleAddToCart(product)}
                            >
                                {isAdded ? "Đã thêm" : "Thêm vào giỏ hàng"}
                                <FontAwesomeIcon icon={faCartArrowDown} style={{ marginLeft: "7px" }} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-below">
                <div className="below-left">
                    <h3
                        style={{
                            marginBottom: '20px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        THÔNG TIN CHI TIẾT
                    </h3>
                    <ProductDescription description={product.productDescription} />
                </div>
                <div className="below-right">
                    <h3
                        style={{
                            marginBottom: '20px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        SẢN PHẨM LIÊN QUAN
                    </h3>
                    <div className="related-products">
                        {relatedProducts.map((relatedProduct) => (
                            <ProductRelated
                                key={relatedProduct.productId}
                                product={relatedProduct}
                                categoryId={relatedProduct.categoryId}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="reviewContainer">
                <ProductReview />
            </div>
            <PaymentModal 
                show={showPaymentModal} 
                handleClose={() => setShowPaymentModal(false)}
            />
        </div>
    );
};

export default ProductDetail;
