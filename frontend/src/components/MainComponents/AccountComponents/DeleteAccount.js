import React, {useState, useEffect} from "react"

const DeleteAccount = (props) =>{

    return(
        <div id="delete_account">
            <div className="icon_container">
                <h3>Delete Account</h3>
                <p>By deleting your account you will lose all your data</p>
            </div>
            <button className="btn-account">Delete</button>        
        </div>
    )
}

export default DeleteAccount;