import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

function Taskbar() {
    return (
        <div className='taskBar'>
            <Form>
                <InputGroup>
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <Form.Control
                        placeholder="Search"
                    />
                    <button className='searchButton' title='Search'>
                        <FontAwesomeIcon icon={faSearch} className='iconSearch' />
                    </button>
                </InputGroup>
            </Form>
            <div className='SignButton'>
                <button className='signInButton'>
                    Sign In
                </button>
                <button className='signUpButton'>
                    Sign Up
                </button>
                <button className='Menu' title='Menu'>
                    <FontAwesomeIcon icon={faBars} className='iconBars' />
                </button>
            </div>
        </div>
    );
}

export default Taskbar;
