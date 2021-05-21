import React, {useState, useEffect} from "react"
import AccountInput from "../AccountInput.js"

const UsernameInput = (props) =>{
    const label = "Phone Number";
    const labelDesc = "For recieving notifications";

    const handleChange = event =>{
        props.setPhone(event.target.value);
    }

    return(
        <AccountInput 
                    label={label} labelDesc={labelDesc} 
                    value={props.phone} handleChange={handleChange}
                    placeholder={"081XXXXXXXX"} name={"phonenumber"} type="number"/>
    )
}

export default UsernameInput;