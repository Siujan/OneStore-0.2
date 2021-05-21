import React, {useState, useEffect} from "react"
import AccountInput from "../AccountInput.js"

const UsernameInput = (props) =>{
    const label = "Email Address";
    const labelDesc = "For notification and logging in";

    const handleChange = event =>{
        props.setEmail(event.target.value);
    }

    return(
        <AccountInput 
                    label={label} labelDesc={labelDesc} 
                    value={props.email} handleChange={handleChange}
                    placeholder={"jarvis@stark.com"} name={"email"} type="text"/>
    )
}

export default UsernameInput;