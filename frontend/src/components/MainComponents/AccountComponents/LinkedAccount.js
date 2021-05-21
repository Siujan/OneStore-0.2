import React, {useState, useEffect} from "react"
import { GoogleIcon } from '../../../Icons'

const LinkedAccount = (props) =>{
    console.log(props)
    return(
        <div id="linked_account">
            <h3>Linked Account</h3>
            <p>We use this to let you sign in and populate your profile information</p>
            <div className="rowAccount linked_account_tab">
                <div className="icon_container">
                    <GoogleIcon />
                    <p> Sign in with google</p>
                </div>
                {(!props.provider || !props.provider.google) ? <button className="btn-account">Connect</button> : <p style={{marginRight:36,marginBottom:0}}>Connected</p>}
            </div>
            <div className="rowAccount linked_account_tab">
                <div className="icon_container">
                    <GoogleIcon />
                    <p> Sign in with facebook</p>
                </div>
                <button className="btn-account">Connect</button>
            </div>                
        </div>
    )
}

export default LinkedAccount;