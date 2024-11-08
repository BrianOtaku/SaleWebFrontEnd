import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product, getProductById, getAllProduct } from "../API/apiGetProductDetail";
import "../styles/productDetail.css";
import Taskbar from "./taskbar";
import Footer from "./footer";
import Slider from "react-slick";
import { useCart } from "./CartContext";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
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
            setRelatedProducts(allProducts.filter(p => p.categoryId === productData.categoryId && p.productId !== productData.productId));
          } else {
            setError("Product not found.");
          }
        }
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const totalPages = Math.ceil(relatedProducts.length / productsPerPage);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.productId,
        productName: product.productName,
        productImage: product.productImage,
        cost: product.cost,
        quantity: 1,
      });
      alert("Product added to cart!");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        productId: product.productId,
        productName: product.productName,
        productImage: product.productImage,
        cost: product.cost,
        quantity: 1,
      });
      navigate("/cart");
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

  // Slider settings
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product data found.</div>;

  return (
    <div className="product-detail-page">
      <Taskbar />
      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.productImage} alt={product.productName} className="product-image" />
        </div>

        <div className="product-info-section">
          <h2 className="product-title">{product.productName}</h2>
          <div className="product-information">
            <p><strong>Product Description</strong></p>
            <p>{product.productDescription}</p>
          </div>
          <p className="product-price">
            Giá: <span className="price-value">{product.cost.toLocaleString()} VND</span>
          </p>
          <div className="button-group">
            <button className="buy-now-button" onClick={handleBuyNow}>Mua ngay</button>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>

      {/* Related Products Slider */}
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
                  window.scrollTo(0, 0); // Scroll to top
                }}
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </Slider>
        
        {/* Custom Pagination */}
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
