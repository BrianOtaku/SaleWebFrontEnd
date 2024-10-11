import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../styles/content.css'; 

const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "-5%" }}
            onClick={onClick}
        >
            ‹
        </div>
    );
};

const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "-5%" }} 
            onClick={onClick}
        >
            ›
        </div>
    );
};

function Content() {
    const [selectedLaptop, setSelectedLaptop] = useState<string | null>(null);
    // sản phẩm tự thêm đê test bố cục
    const products = [
        {
            id: 1,
            name: 'Gaming Laptop',
            price: '20,000,000 VND',
            image: process.env.PUBLIC_URL + '/image/sp6.png',
            specs: ['i5-14400F', 'RTX 4060', 'B760', '16GB', '1TB'],
        },
        {
            id: 2,
            name: 'Mechanical Keyboard',
            price: '2,000,000 VND',
            image: process.env.PUBLIC_URL + '/image/sp5.png',
            specs: ['i5-13400F', 'RTX 3050', 'B660', '16GB', '500GB'],
        },
        {
            id: 3,
            name: 'Gaming Mouse',
            price: '1,500,000 VND',
            image: process.env.PUBLIC_URL + '/image/sp4.png',
            specs: ['i7-13700K', 'RTX 4080', 'Z690', '32GB', '2TB'],
        },
        {
            id: 4,
            name: 'Headset',
            price: '3,500,000 VND',
            image: process.env.PUBLIC_URL + '/image/sp3.png',
            specs: ['i3-12100F', 'GTX 1650', 'B460', '8GB', '256GB'],
        },
        {
            id: 5,
            name: 'Gaming Chair',
            price: '5,000,000 VND',
            image: process.env.PUBLIC_URL + '/image/sp2.png',
            specs: ['i9-13900K', 'RTX 4090', 'Z790', '64GB', '4TB'],
        },
        {
            id: 6,
            name: 'Custom PC',
            price: '30,000,000 VND',
            image: process.env.PUBLIC_URL + '/image/sp1.png',
            specs: ['Ryzen 9 5900X', 'RTX 3080', 'X570', '32GB', '1TB'],
        },
    ];

    const settings: any = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 3000, 
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className='contentContainer'>
            <div className="product-categories">
                <h4>Danh Mục Sản Phẩm</h4>
            </div>
            <div className="product-slider">
            <ul className="product-list">
                    {products.map(product => (
                        <li key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <span className="product-name">{product.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="laptop-menu">
                <h4>Laptop Bán Chạy</h4>
                <ul>
                    {products.map(product => (
                        <li 
                            key={product.id}
                            onClick={() => setSelectedLaptop(product.name)}
                            style={{ cursor: 'pointer', padding: '5px 10px', borderBottom: '1px solid #ccc' }}
                        >
                            {product.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="product-slider">
                <Slider {...settings}>
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">{product.price}</p>
                            <div className="specs-box">
                                <ul className="specs">
                                    {product.specs.map((spec, index) => (
                                        <li key={index} className="spec-item">{spec}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="button">
                                <button className="add-to-cart-button">Mua</button>
                                <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Content;
