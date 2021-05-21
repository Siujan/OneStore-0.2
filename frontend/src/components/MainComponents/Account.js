import React, {useState, useEffect} from "react"
import "../../css/account.css"
import ProfilePicture from "./AccountComponents/ProfilePicture"
import ProfileInfo from "./AccountComponents/ProfileInfo"
import LinkedAcount from "./AccountComponents/LinkedAccount"
import DeleteAccount from "./AccountComponents/DeleteAccount"

const Account = (props) =>{
    return(
        <div id="main-account">
            <ProfilePicture />
            <hr></hr>
            <ProfileInfo accountInfo={props.accountInfo} />
            <hr></hr>
            <LinkedAcount provider={props.accountInfo.provider}/>
            <hr></hr>
            <DeleteAccount />
        </div>
    )
}

export default Account;