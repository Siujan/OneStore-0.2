import React, {
    useState
} from "react"
import HomeInput from "../HomeInput"
import {UserIcon} from "../../../Icons"

const EmailInput = props =>{

    //main attribute
    const [spanClass,setSpanClass] = useState("label");
    const spanText = "Username/email";
    let inputRightIcon = '';
    let inputType = 'text';
    let inputName = "username";
    let inputClass = (props.emailOK) ? "form-input" : "form-input border-red";

    const handleChange = event =>{
        props.setEmail(event.target.value);
        
        if(event.target.value === ""){
            setSpanClass("label")
        }else{
            setSpanClass("label span-up")
        }
    }

    const Alert = () =>{      
        return(
            <p style={{visibility: (props.emailOK) ? "hidden" : "visible"}} className="input-alert">Email is not valid</p>
        )
    }

    return(
        <HomeInput 
                spanClass={spanClass} setSpanClass={setSpanClass} spanText={spanText} 
                icon={<UserIcon />} inputRightIcon={inputRightIcon} 
                inputType={inputType} inputName={inputName}
                inputClass={inputClass} value={props.email} 
                handleChange={handleChange} alert={<Alert />} />
    )
}

export default EmailInput;