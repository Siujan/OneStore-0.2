import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { GoogleIcon } from '../../../Icons'
import '../../../css/social-media.css'

const SocialMedia = props =>{

    return(
        <div id="social-media">
            <div className="rowOr">
                <div className="rowOr-item">
                    <hr className="hrOr"></hr>
                </div>
                <div className="rowOr-item">
                    <span className="orText">or</span>
                </div> 
                <div className="rowOr-item">
                    <hr className="hrOr"></hr>
                </div>  
            </div>
            <div className="socialDiv">
            <a href="http://localhost:5000/api/v1/onestore/auth/google" type="button" className="btn btn-social btn-block">
                <GoogleIcon />
                <p className="m-0 p-0 text-left">Sign in with Google</p>
            </a>
            <a href="/" type="button" className="btn btn-social btn-facebook btn-block">
                <div id="facebook-container">
                <FontAwesomeIcon icon={faFacebookF} id="facebook-icon" />
                </div>
                <p className="m-0 p-0 text-left">Sign in with Facebook</p>
            </a>		
            </div>
        </div>
    )
}

export default SocialMedia;