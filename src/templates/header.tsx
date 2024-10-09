import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Taskbar from './taskbar';
const images = [
    '/image/banner.jpg',
    '/image/banner1.png',
    '/image/banner2.jpg',
    '/image/banner5.jpg',
    '/image/banner3.png',
    '/image/banner4.png',
    '/image/banner6.png',
];

function Header() {
    return (
        <div>
            <Taskbar />
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
        </div>
    );
}

export default Header;
