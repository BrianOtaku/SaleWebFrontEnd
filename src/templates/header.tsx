import React, { useEffect, useState } from 'react';

const images = [
    '/image/banner.png',
    '/image/banner1.png',
    '/image/banner2.jpeg',
    '/image/banner3.png',
    '/image/banner4.jpeg',
];

function Header() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="banner">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`image ${index === currentImageIndex ? 'visible' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
        </div>
    );
}

export default Header;
