import React, {
    useState
} from "react"
import HomeInput from "../HomeInput"
import {EnvelopeIcon} from "../../../Icons"
import UsersDataService from "../../../services/users"

const EMAILREGEX = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

const EmailInput = props =>{

    //main attribute
    const [spanClass,setSpanClass] = useState("label");
    const [alertText,setAlertText] = useState("Email is not valid");
    const spanText = "Email";
    let inputRightIcon = '';
    let inputType = 'text';
    let inputName = "email";
    let inputClass = (props.emailOK) ? "form-input" : "form-input border-red";

    const handleChange = event =>{
        props.setEmail(event.target.value);
        props.setEmailOK(EMAILREGEX.test(event.target.value));

        if(event.target.value === ""){
            setSpanClass("label")
        }else{
            setSpanClass("label span-up")
        }        
    }

    const checkEmailAvailability = (email) =>{
        if(props.emailOK)
            UsersDataService.getEmailAvailability(email)
                .then(res =>{
                    if(!res.data.available){
                        props.setEmailOK(false);
                        setAlertText("Email is already registered")
                        return;
                    }

                    props.setEmailOK(true);
                    setAlertText("Email is not valid")                 
                })
    }


    const Alert = () =>{      
        return(
            <p style={{visibility: (props.emailOK) ? "hidden" : "visible"}} className="input-alert">{alertText}</p>
        )
    }

    return(
        <HomeInput 
                spanClass={spanClass} setSpanClass={setSpanClass} spanText={spanText} 
                icon={<EnvelopeIcon />} inputRightIcon={inputRightIcon} 
                inputType={inputType} inputName={inputName}
                inputClass={inputClass} value={props.email} 
                handleChange={handleChange} alert={<Alert />} checkEmailAvailability={checkEmailAvailability} />
    )
}

export default EmailInput;