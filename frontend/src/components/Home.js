import React, {useState} from "react"
import '../css/home.css';
import Login from './HomeComponents/Login'
import Register from './HomeComponents/Register'

const Home = (props) =>{
    const [windowsTrans, setWindowTrans] = useState("translateX(0px)")
    
    return(
        <div id="home">
            <div className="auth-section">
                <div className="window-container">
                    <div className="window" style={ { transform: windowsTrans } }>
                        <Login setWindowTrans={setWindowTrans}/>
                        <Register setWindowTrans={setWindowTrans}/>
                    </div>
                </div>
            </div>
        </div>
    ) 

}

export default Home;