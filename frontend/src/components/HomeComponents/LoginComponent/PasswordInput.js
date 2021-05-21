import React, {
    useState
} from "react"
import {Link} from "react-router-dom"
import HomeInput from "../HomeInput"
import {LockIcon,EyeIcon,EyeCloseIcon} from "../../../Icons"

const PASSWORDREGEX = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

const PasswordInput = props =>{

    //additional attribute
    const [showPassword, setShowPassword] = useState(false);
    const toggleEye = () =>{
        setShowPassword(!showPassword);
    }

    // main attribute
    const [spanClass,setSpanClass] = useState("label");
    const spanText = "Password";
    let inputRightIcon = (showPassword) ? <EyeIcon toggleEye={toggleEye}/> : <EyeCloseIcon toggleEye={toggleEye}/>;
    let inputType = (showPassword) ? "text" : "password";   
    let inputName = "password"; 
    let inputClass = (props.passwordOK) ? "form-input" : "form-input border-red";
    
    const handleChange = event =>{
        props.setPassword(event.target.value);
        props.setPasswordOK(PASSWORDREGEX.test(event.target.value));
        
        if(event.target.value === ""){
            setSpanClass("label")
        }else{
            setSpanClass("label span-up")
        }        
    }
    
    const Alert = () =>{      
        return(
            <div className="login-password-block">
                <p style={{visibility: (props.passwordOK) ? "hidden" : "visible"}} className="input-alert">Password invalid!</p>
                <Link to={""} className="forgot-password">Forgot Password?</Link>
            </div>   
        )
    }

    return(
        <HomeInput 
                spanClass={spanClass} setSpanClass={setSpanClass} spanText={spanText} 
                icon={<LockIcon />} inputRightIcon={inputRightIcon} 
                inputType={inputType} inputName={inputName}
                inputClass={inputClass} value={props.password} 
                handleChange={handleChange} alert={<Alert />} />
    )
}

export default PasswordInput;