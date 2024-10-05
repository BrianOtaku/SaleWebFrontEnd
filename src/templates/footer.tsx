import { faDiscord, faFacebook, faGoogle, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Footer() {
    return (
        <footer>
            <div className='upRow'>
                <div className='footerLogo' title='Home'>
                    <button>
                        <img src="/image/logoSketch.png" alt="Logo" />
                    </button>
                </div>
                <div className='footerContent'>
                    <div className='contactIcons'>
                        <span><FontAwesomeIcon icon={faFacebook} className='footerIcons' /></span>
                        <span><FontAwesomeIcon icon={faTwitter} className='footerIcons' /></span>
                        <span><FontAwesomeIcon icon={faYoutube} className='footerIcons' /></span>
                        <span><FontAwesomeIcon icon={faGoogle} className='footerIcons' /></span>
                        <span><FontAwesomeIcon icon={faDiscord} className='footerIcons' /></span>
                    </div>
                    <div className='footerTaskBar'>
                        <p>RECOMMEND</p>
                        <p>OUR TEAM</p>
                        <h5>HOME</h5>
                        <p>CONTACT US</p>
                        <p>SUPPORT US</p>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                © 2024 The 4-TN Shop. Intellectual property rights protected.
            </div>
        </footer>
    );
}

export default Footer;
