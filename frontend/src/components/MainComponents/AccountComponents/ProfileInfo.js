import React, {useState, useEffect} from "react"
import UsernameInput from "./ProfileInfoComponents/UsernameInput"
import FullNameInput from "./ProfileInfoComponents/FullNameInput"
import EmailInput from "./ProfileInfoComponents/EmailInput"
import PhoneInput from "./ProfileInfoComponents/PhoneInput"
import UsersDataService from "../../../services/users"

const ProfileInfo = (props) =>{
    const [username,setUsername] = useState(props.accountInfo.username || '');
    const [fullname,setFullname] = useState(props.accountInfo.fullname || '');
    const [email,setEmail] = useState(props.accountInfo.email || '');
    const [phone,setPhone] = useState(props.accountInfo.phone || '');
    
    const updateClick = () =>{
        UsersDataService.updateUsers(username,email,fullname,phone).then(res=>{
            //res.data.success do what?
            console.log(res.data)
        })
    }

    return(
        <div id="profile_info">
                <div className="row">
                    <div className="col-6">
                        <UsernameInput username={username} setUsername={setUsername} />
                    </div>
                    <div className="col-6">
                        <FullNameInput fullname={fullname} setFullname={setFullname}/>
                    </div>                
                </div>
                <div className="row">
                    <div className="col-6">
                        <EmailInput email={email} setEmail={setEmail}/>
                    </div>
                    <div className="col-6">
                        <PhoneInput phone={phone} setPhone={setPhone}/>
                    </div>                
                </div>
                
                <button type="button" onClick={updateClick} className="btn-account">Save Change</button>
        </div>
    )
}

export default ProfileInfo;