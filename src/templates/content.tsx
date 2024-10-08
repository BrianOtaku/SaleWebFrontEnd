import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../styles/content.css'; // File CSS tùy chỉnh style

function Content() {
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

    // Cài đặt của slider (tạm gán kiểu any)
    const settings: any = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Với kích thước màn hình dưới 1024px
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600, // Với kích thước màn hình dưới 600px
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480, // Với kích thước màn hình dưới 480px
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className='contentContainer'>
            <div className="product-slider">
                {/* Truyền trực tiếp các props vào Slider */}
                <Slider {...settings}>
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">{product.price}</p>
                            <ul className="specs">
                                {product.specs.map((spec, index) => (
                                    <li key={index}>{spec}</li>
                                ))}
                            </ul>
                            <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Content;