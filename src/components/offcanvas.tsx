import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffcanvasMenu;
