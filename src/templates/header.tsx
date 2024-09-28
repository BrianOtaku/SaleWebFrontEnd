import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="banner">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`image ${index === currentImageIndex ? 'visible' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
            <button className="prev" onClick={previousImage}>
                <FontAwesomeIcon icon={faChevronLeft} className='iconfaChevronLeft' />
            </button>
            <button className="next" onClick={nextImage}>
                <FontAwesomeIcon icon={faChevronRight} className='iconfaChevronRight' />
            </button>
        </div>
    );
}

export default Header;
