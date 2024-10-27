import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsDetail, Product } from "../API/apiGetProductDetail";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId) return;
      const productData = await getProductsDetail();
      if (!productData) {
        setError("Không tìm thấy sản phẩm.");
      } else {
        setProduct(product);
      }
      setIsLoading(false);
    };
    fetchProductDetail();
  }, [productId]);

  if (isLoading) return <div>Đang tải chi tiết sản phẩm...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div>
      <h1>{product.productName}</h1>
      {/* Các thành phần hiển thị chi tiết khác */}
    </div>
  );
};

export default ProductDetail;
