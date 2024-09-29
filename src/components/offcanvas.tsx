import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './list';

function OffcanvasMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className='Menu' onClick={handleShow} title='Menu'>
                <FontAwesomeIcon icon={faBars} className='iconfaBars' />
            </button>

            <Offcanvas show={show} onHide={handleClose} placement="end" scroll={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <div className='offcanvasContent'>
                        <List />
                    </div>
                    <div className='offcanvasFooter'>
                        <div className='offcanvasFooterContact'>
                            <h4>Contact Us:</h4>
                            <div className='contact-item'>
                                <a href="https://www.facebook.com/bao.nguyentam.585/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookSquare} className='footer-icon' />
                                    Nguyễn Tâm Bảo
                                </a>
                                <a href="https://www.facebook.com/Raycrop" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookSquare} className='footer-icon' />
                                    Nguyễn Quốc Khánh
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100012529452762&locale=vi_VN" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookSquare} className='footer-icon' />
                                    Nguyễn Phúc Đỉnh
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100012529452762&locale=vi_VN" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookSquare} className='footer-icon' />
                                    Phan Văn Huy
                                </a>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffcanvasMenu;
