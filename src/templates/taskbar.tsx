import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

//import components
import OffcanvasMenu from '../components/offcanvas';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import UserConfig from '../components/userConfig';
import CartModal from '../components/productFlow/cartModal';
import ProductTypeList from '../components/productFlow/productTypeList';
import ProductManufacturer from '../components/productFlow/productManufacturer';
import NotificationModal from '../components/productFlow/notificationModal';

function Taskbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search/${searchQuery}`);
        }
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
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="searchButton" title="Search">
                        <FontAwesomeIcon icon={faSearch} className='iconSearch' />
                    </button>
                </form>
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
