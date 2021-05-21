import React, {
    useState
} from "react"
import HomeInput from "../HomeInput"
import {UserIcon} from "../../../Icons"
import UsersDataService from "../../../services/users"

const userNameRegex = RegExp("^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");

/*
    User name alert have not been implemented
*/
const UsernameInput = props =>{

    //main attribute
    const [spanClass,setSpanClass] = useState("label");
    const [alertText,setAlertText] = useState("Please use only letters, numbers, and periods(6-20)");
    const spanText = "Username";
    let inputRightIcon = '';
    let inputType = 'text';
    let inputName = "username";
    let inputClass = (props.usernameOK) ? "form-input" : "form-input border-red";
    
    const handleChange = event =>{
        props.setUsername(event.target.value);
        props.setUsernameOK(userNameRegex.test(event.target.value))

        if(event.target.value === ""){
            setSpanClass("label")
        }else{
            setSpanClass("label span-up")
        }
    }

    const checkUserNameAvailability = (username) =>{
        if(props.usernameOK)
            UsersDataService.getUserNameAvailability(username)
                .then(res =>{
                    if(!res.data.available){
                        props.setUsernameOK(false);
                        setAlertText("User name is not available")
                        return;
                    }

                    props.setUsernameOK(true);
                    setAlertText("Please use only letters, numbers, and periods(6-20)")                 
                })
    }

    const Alert = () =>{      
        return(
            <p style={{visibility: (props.usernameOK) ? "hidden" : "visible"}} className="input-alert">{alertText}</p>
        )
    }

    return(
        <HomeInput 
                spanClass={spanClass} setSpanClass={setSpanClass} spanText={spanText} 
                icon={<UserIcon />} inputRightIcon={inputRightIcon} 
                inputType={inputType} inputName={inputName}
                inputClass={inputClass} value={props.username} 
                handleChange={handleChange} alert={<Alert />} checkUserNameAvailability={checkUserNameAvailability} />
    )
}

export default UsernameInput;