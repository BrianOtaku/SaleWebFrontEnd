import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import OffcanvasMenu from '../components/offcanvas';

function Taskbar() {
    return (
        <div className='taskBar'>
            <div className='function'>
                <button className='logo' title='Home'>
                    <img src="/image/logoSketch.png" alt="Logo" />
                </button>
                <form>
                    <div className="inputGroup">
                        <input type="text" placeholder="Search" />
                        <button type="submit" className="searchButton" title="Search">
                            <FontAwesomeIcon icon={faSearch} className='iconSearch' />
                        </button>
                    </div>
                </form>
                <div className='TaskBarButton'>
                    <button className='signInButton'>
                        Sign In
                    </button>
                    <button className='signUpButton'>
                        Sign Up
                    </button>
                    <OffcanvasMenu />
                </div>
            </div>
        </div>
    );
}

export default Taskbar;
