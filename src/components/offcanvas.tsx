import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Option 1</p>
                    <p>Option 2</p>
                    <p>Option 3</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffcanvasMenu;
