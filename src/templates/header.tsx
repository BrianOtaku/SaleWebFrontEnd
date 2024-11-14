import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
const images = [
    '/image/banner1.png',
    '/image/banner.jpg',
    // '/image/banner2.jpg',
    '/image/banner3.png',
    '/image/banner4.jpg',
];

function Header() {
    return (
        <Carousel fade>
            {images.map((image, index) => (
                <Carousel.Item key={index} interval={2000}>
                    <img
                        className="banner"
                        src={image}
                        alt={`Slide ${index + 1}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Header;