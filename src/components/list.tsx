import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function List() {
    return (
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
            <Accordion.Item eventKey="1">
                <Accordion.Header>PRODUCT TYPE</Accordion.Header>
                <Accordion.Body>
                    <li>Laptop</li>
                    <li>Gaming Laptop</li>
                    <li>Gear</li>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>CONTACT US</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>SUPPORT US</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>SETTING</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default List;