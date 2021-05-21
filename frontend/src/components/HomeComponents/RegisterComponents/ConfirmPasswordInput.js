import React, {
    useState
} from "react"
import HomeInput from "../HomeInput"
import {EyeIcon,EyeCloseIcon} from "../../../Icons"

const ConfirmPasswordInput = props =>{

    //additional attribute
    const [showPassword, setShowPassword] = useState(false);
    const toggleEye = () =>{
        setShowPassword(!showPassword);
    }

    // main attribute
    const [spanClass,setSpanClass] = useState("label");
    const spanText = "Confirm Password";
    let inputRightIcon = (showPassword) ? <EyeIcon toggleEye={toggleEye}/> : <EyeCloseIcon toggleEye={toggleEye}/>;
    let inputType = (showPassword) ? "text" : "password";   
    let inputName = "confirmPassword"; 
    let inputClass = (props.confirmPasswordOK) ? "form-input borderBlack" : "form-input border-red";
    
    const handleChange = event =>{
        props.setConfirmPassword(event.target.value);
        props.setConfirmPasswordOK(props.password === event.target.value);

        if(event.target.value === ""){
            setSpanClass("label")
        }else{
            setSpanClass("label span-up")
        }        
    }

    const Alert = () =>{      
        return(
            <p style={{visibility: (props.confirmPasswordOK) ? "hidden" : "visible"}} className="input-alert">Password is not the same!</p>
        )
    }

    return(
        <HomeInput 
                spanClass={spanClass} setSpanClass={setSpanClass} spanText={spanText} 
                icon={""} inputRightIcon={inputRightIcon} 
                inputType={inputType} inputName={inputName}
                inputClass={inputClass} value={props.confirmPassword} 
                handleChange={handleChange} alert={<Alert />} />
    )
}

export default ConfirmPasswordInput;