import { faDiscord, faFacebook, faGoogle, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Footer() {
    const handleScrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer>
            <div className='upRow'>
                {/* <div className='footerLogo' title='Home'>
                    <button>
                        <img src="/image/logoSketch.png" alt="Logo" />
                    </button>
                </div> */}
                <div className='footerContent'>
                    <div className='contactIcons'>
                        <span
                            onClick={() => window.open('http://surl.li/jclhkf', '_blank')}
                            title="Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} className='footerIcons' title='Facebook' />
                        </span>
                        <span><FontAwesomeIcon icon={faTwitter} className='footerIcons' title='Twitter' /></span>
                        <span><FontAwesomeIcon icon={faYoutube} className='footerIcons' title='Youtube' /></span>
                        <span><FontAwesomeIcon icon={faGoogle} className='footerIcons' title='Google' /></span>
                        <span><FontAwesomeIcon icon={faDiscord} className='footerIcons' title='Discord' /></span>
                    </div>
                    <div className='footerTaskBar'>
                        <p>RECOMMEND</p>
                        <p>OUR TEAM</p>
                        <Link
                            to="/"
                            className="footer-link"
                            onClick={handleScrollToTop}
                        >
                            <h5>HOME</h5>
                        </Link>
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
