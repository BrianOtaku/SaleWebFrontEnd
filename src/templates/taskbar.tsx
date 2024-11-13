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

    return (
        <div className='taskBar'>
            <div className='function'>
                <button className='logo' title='Home'>
                    <img src="/image/logoSketch.png" alt="Logo" />
                </button>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
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
                            <Accordion.Header>MANUFACTURER</Accordion.Header>
                            <Accordion.Body>
                                <ProductManufacturer />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='taskList'>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>PRODUCT TYPE</Accordion.Header>
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
                        </>
                    )}
                    <OffcanvasMenu />
                </div>
            </div>
        </div>
    );
}

export default Taskbar;
