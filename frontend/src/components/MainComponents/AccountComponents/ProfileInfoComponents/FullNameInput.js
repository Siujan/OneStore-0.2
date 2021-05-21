import React, {useState, useEffect} from "react"
import AccountInput from "../AccountInput.js"

const FullNameInput = (props) =>{
    const label = "Full name";
    const labelDesc = "How do you want to be called?";

    const handleChange = event =>{
        props.setFullname(event.target.value);
    }

    return(
        <AccountInput 
                    label={label} labelDesc={labelDesc} 
                    value={props.fullname} handleChange={handleChange}
                    placeholder={"Tony Stark"} name={"fullname"} type={"text"}/>
    )
}

export default FullNameInput;