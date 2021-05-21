import React, {useState, useEffect} from "react"

const AccountInput = (props) =>{
    return(
        <div className="acc-input">
            <div className="rowAccount acc-label-container">
                <label className="acc-label">{props.label}</label>
                <label className="acc-label-desc">{props.labelDesc}</label>
            </div>
            <div className="rowAccount acc-input-container">
                <input type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.handleChange} className="acc-text-input" value={props.value}></input>
            </div>
        </div>
    )
}

export default AccountInput;