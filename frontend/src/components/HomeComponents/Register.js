import React, {
    useState
} from "react"
import { useHistory} from "react-router-dom";
//import {Link} from "react-router-dom"
import EmailInput from "./RegisterComponents/EmailInput";
import UsernameInput from "./RegisterComponents/UsernameInput"
import PasswordInput from "./RegisterComponents/PasswordInput"
import ConfirmPasswordInput from "./RegisterComponents/ConfirmPasswordInput";
import HomeButton from "./HomeButton"
import UsersDataService from '../../services/users'

const Register = props =>{

    const history = useHistory();

    const [username, setUsername] = useState('');   
    const [usernameOK, setUsernameOK] = useState(true);   
    const [email, setEmail] = useState('');   
    const [emailOK, setEmailOK] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordOK, setPasswordOK] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordOK, setConfirmPasswordOK] = useState(true);
    const buttonEnabled = () =>{
        return (username !== "" && email !== "" && password !== "" && confirmPassword !== "") && (usernameOK && emailOK && passwordOK && confirmPasswordOK);
    }    
    const buttonText = "Sign up";

    const slideWindow = () =>{
        props.setWindowTrans("translateX(0px)")
    }

    const submitForm = () =>{
        UsersDataService.insertUsers(username,email,password).then(res=>{
            if(res.data.success) return history.push('/main')

            console.log("Registration has failed")
        });  
    }
    

    return(
        <div className="auth-block">
            <h3 className = "title" style={{marginBottom:0}} > SIGN UP </h3>
            <p className="secondary_title">Create a new Account</p>
            <form method="POST" action="http://localhost:5000/api/v1/onestore/users" autoComplete="off">
                <UsernameInput username={username} setUsername={setUsername} usernameOK={usernameOK} setUsernameOK={setUsernameOK}/>  
                <EmailInput email={email} setEmail={setEmail} emailOK={emailOK} setEmailOK={setEmailOK}/>
                <PasswordInput password={password} setPassword={setPassword} passwordOK={passwordOK} setPasswordOK={setPasswordOK}/>
                <ConfirmPasswordInput password={password} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} confirmPasswordOK={confirmPasswordOK} setConfirmPasswordOK={setConfirmPasswordOK}/>
                <HomeButton enabled={buttonEnabled} text={buttonText} submitForm={submitForm}/>
            </form>
            <p id="signupP">Have an Account? <span onClick={slideWindow}>Login Here</span></p>            
        </div>
    )
}

export default Register;