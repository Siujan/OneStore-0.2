import React, {
    useState
} from "react"
import {useHistory} from "react-router-dom"
import EmailInput from "./LoginComponent/EmailInput"
import PasswordInput from "./LoginComponent/PasswordInput"
import HomeButton from "./HomeButton"
import SocialMedia from "./LoginComponent/SocialMedia"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import AuthenticationDataService from "../../services/authentication"

const Login = props =>{
    const history = useHistory();
    const [alertBoxDisplay,setAlertBoxDisplay] = useState('none')
    const [email, setEmail] = useState('');   
    const [emailOK, setEmailOK] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordOK, setPasswordOK] = useState(true);
    const buttonEnabled = () =>{
        return (email !== "" && password !== "") && (passwordOK && emailOK)
    }
    const buttonText = "Sign in";

    const slideWindow = () =>{
        props.setWindowTrans("translateX(-330px)")
    }

    const submitForm = () =>{
        AuthenticationDataService.postLogin(email,password).then(res =>{

            if(res.data.accountNotFound === false){
                window.location.reload(false);
            }else{
                setAlertBoxDisplay('flex')
            }
            
        })
    }
    
    return(
        <div className="auth-block">
            <h3 className="title"> LOGIN </h3>
            <div className="rowInput alert-box" style={{display:alertBoxDisplay}}>
                <div className="icon-container">
                    <FontAwesomeIcon icon={faTimesCircle} className="icon-alert" />
                </div>
                <div className="input-group">
                    <p>Incorrect username/password, please, try again</p>        
                </div>  
            </div> 
            <form method="POST" autoComplete="off">
                <EmailInput email={email} setEmail={setEmail} emailOK={emailOK} setEmailOK={setEmailOK}/>
                <PasswordInput password={password} setPassword={setPassword} passwordOK={passwordOK} setPasswordOK={setPasswordOK}/>
                <HomeButton enabled={buttonEnabled} text={buttonText} submitForm={submitForm}/>
            </form>
            <p id="signupP">Don't have an account? <span onClick={slideWindow}>Sign Up Here</span></p>
            <SocialMedia /> 
        </div>
    )
}

export default Login;