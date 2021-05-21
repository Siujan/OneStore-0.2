import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfilePicture = (props) =>{
    return(
        <div className="rowAccount">
            <div className="profile-picture-frame">
                <FontAwesomeIcon icon={faUser} className="profile-picture"/>
            </div>
            <button className="btn-account">Upload</button>
            <button className="btn-account">Remove</button>
        </div>
    )
}

export default ProfilePicture;