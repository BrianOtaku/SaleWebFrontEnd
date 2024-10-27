import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import OffcanvasMenu from '../components/offcanvas';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import Accordion from 'react-bootstrap/Accordion';
import UserConfig from '../components/userConfig';
import { useCart } from './CartContext'; // Import useCart
import CartOffcanvas from './CartOffcanvas'; // Import CartOffcanvas

function Taskbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const { cartItems } = useCart(); // Sử dụng hook để truy cập CartContext

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userProfile = localStorage.getItem('userProfile');

        if (token || userProfile) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleCartClick = () => {
        setCartVisible(true); // Hiển thị giỏ hàng khi nhấp vào icon
    };

    const handleCloseCart = () => {
        setCartVisible(false);
    };

    return (
        <div className='taskBar'>
            <div className='function'>
                <button className='logo' title='Home'>
                    <img src="/image/logoSketch.png" alt="Logo" />
                </button>
                <form>
                    <input type="text" placeholder="Search" />
                    <button type="submit" className="searchButton" title="Search">
                        <FontAwesomeIcon icon={faSearch} className='iconSearch' />
                    </button>
                </form>
                <div className='taskList'>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>MANUFACTURER</Accordion.Header>
                            <Accordion.Body>
                                <li>Asus</li>
                                <li>Apple</li>
                                <li>Lenovo</li>
                                <li>MSI</li>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='taskList'>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>PRODUCT TYPE</Accordion.Header>
                            <Accordion.Body>
                                <li>Laptop</li>
                                <li>Gaming Laptop</li>
                                <li>Gear</li>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='taskBarIcons'>
                    <button className='cartButton' title="Cart" onClick={handleCartClick}>
                        <FontAwesomeIcon icon={faShoppingCart} className='iconCart' />
                        {cartItems.length > 0 && (
                            <span className='cart-count'>{cartItems.length}</span>
                        )}
                    </button>
                </div>
                <div className='TaskBarButton'>
                    {!isLoggedIn ? (
                        <>
                            <SignIn onLogin={handleLogin} />
                            <SignUp />
                        </>
                    ) : (
                        <UserConfig />
                    )}
                    <OffcanvasMenu />
                </div>
            </div>

            {/* Giỏ hàng Offcanvas */}
            <CartOffcanvas show={cartVisible} onHide={handleCloseCart} />
        </div>
    );
}

export default Taskbar;
