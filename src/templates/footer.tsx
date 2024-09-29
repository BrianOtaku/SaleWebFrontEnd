import React from 'react';

function Footer() {
    return (
        <footer>
            <div className='upRow'>
                <div className='footerLogo'>
                    <button title='Home'>
                        <img src="/image/logoSketch.png" alt="Logo" />
                    </button>
                </div>
                <div className='footerContent'>
                    <h1>footerContent</h1>
                </div>
            </div>
            <div className='copyright'>
                copyright
            </div>
        </footer>
    );
}

export default Footer;
