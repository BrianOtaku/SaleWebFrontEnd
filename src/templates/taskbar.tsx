import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

// Import components
import OffcanvasMenu from '../components/offcanvas';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import UserConfig from '../components/userConfig';
import CartModal from '../components/productFlow/cartModal';
import ProductTypeList from '../components/productFlow/productTypeList';
import ProductManufacturer from '../components/productFlow/productManufacturer';
import NotificationModal from '../components/productFlow/notificationModal';
import SearchBar from '../components/searchBar';

function Taskbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        window.location.reload();
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className='taskBar'>
            <div className='function'>
                <button className='logo' title='Home' onClick={handleLogoClick}>
                    <img src="/image/logoSketch.png" alt="Logo" />
                </button>
                <SearchBar />
                <div className='taskList'>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>NHÀ SẢN XUẤT</Accordion.Header>
                            <Accordion.Body>
                                <ProductManufacturer />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='taskList'>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>LOẠI SẢN PHẨM</Accordion.Header>
                            <Accordion.Body>
                                <ProductTypeList />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='TaskBarButton'>
                    {!isLoggedIn ? (
                        <>
                            <SignIn onLogin={handleLogin} />
                            <SignUp />
                        </>
                    ) : (
                        <>
                            <CartModal />
                            <UserConfig />
                            <NotificationModal />
                        </>
                    )}
                    <OffcanvasMenu />
                </div>
            </div>
        </div>
    );
}

export default Taskbar;
