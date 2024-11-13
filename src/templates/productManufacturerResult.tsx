import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../API/apiGetProductDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { getProductsByManufacturer } from "../API/apiGetProductDetail";

const ProductManufacturerResult: React.FC<any> = ({
    handleAddToCart,
    page,
    limit,
}) => {
    const { manufacturer } = useParams<{ manufacturer: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [isAdded, setIsAdded] = useState<boolean[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await getProductsByManufacturer(
                    manufacturer!,
                    page,
                    limit
                );
                if (Array.isArray(fetchedProducts)) {
                    setProducts(fetchedProducts);
                } else {
                    setProducts([]);  // Nếu dữ liệu không phải là mảng, trả về mảng rỗng
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);  // Trả về mảng rỗng nếu có lỗi
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [manufacturer, page, limit]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const updatedIsAdded = products.map((product) =>
            cartItems.includes(product.productId)
        );
        setIsAdded(updatedIsAdded);
    }, [products]);

    const handleButtonClick = (product: Product, index: number) => {
        if (!isAdded[index]) {
            handleAddToCart(product);

            const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            cartItems.push(product.productId);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            const updatedIsAdded = [...isAdded];
            updatedIsAdded[index] = true;
            setIsAdded(updatedIsAdded);
        } else {
            alert("Sản phẩm đã có trong giỏ hàng!");
        }
    };

    return (
        <div className="product-manufacturer-result">
            {loading ? (
                <p>Loading...</p>
            ) : Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                    <div className="product-card" key={product.productId}>
                        <div className="cardContent">
                            <div className="product-image">
                                <img
                                    src={product.productImage}
                                    alt={product.productName}
                                />
                            </div>

                            <div className="product-info">
                                <h2 className="product-name">{product.productName}</h2>
                                <p className="product-price">Giá: {product.cost} VND</p>
                            </div>
                        </div>

                        <div className="CardButtons">
                            <button className="buyNowCardBtn">
                                Buy Now!
                                <FontAwesomeIcon icon={faDollarSign} style={{ marginLeft: '7px' }} />
                            </button>
                            <button
                                className={`add-to-cart-button ${isAdded[index] ? "added" : ""}`}
                                onClick={() => handleButtonClick(product, index)}
                            >
                                {isAdded[index] ? "Đã thêm" : "Add to Cart"}
                                <FontAwesomeIcon icon={faCartArrowDown} style={{ marginLeft: '7px' }} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Không có sản phẩm nào từ nhà sản xuất này.</p>
            )}
        </div>
    );
};

export default ProductManufacturerResult;
