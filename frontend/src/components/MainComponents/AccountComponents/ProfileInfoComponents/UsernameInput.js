import React, {useState, useEffect} from "react"
import AccountInput from "../AccountInput.js"

const UsernameInput = (props) =>{
    const label = "Display name/User name";
    const labelDesc = "Viable to other users";
    
    const handleChange = event =>{
        props.setUsername(event.target.value);
    }

    return(
        <AccountInput 
                    label={label} labelDesc={labelDesc} 
                    value={props.username} handleChange={handleChange}
                    placeholder={"Noobmaster69"} name={"username"} type="text"/>
    )
}

export default UsernameInput;