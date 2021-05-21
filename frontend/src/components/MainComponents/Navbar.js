import React, {
    useState,
    useEffect
} from "react"
import {useLocation} from "react-router-dom";
import '../../css/navbar.css';
import { useHistory} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar,faUser,faFileAlt, faSquare, faGrinBeam} from '@fortawesome/free-regular-svg-icons/'
import {PinIcon,SignOutIcon} from '../../Icons.js'
import AuthenticationDataService from '../../services/authentication'
import PopUp1 from './popUp1'

const Navbar = props =>{
    const location = useLocation();
    const history = useHistory();
    const [activeButton,setActiveButton] = useState(['active','','','']);
    const [spanOn,setSpanOn] = useState(['span-on','','','']);
    const [popUpStyle,setPopUpStyle] = useState({});

    useEffect(()=>{
        switch(location.pathname.substring(6,)){
            case "inventory":
                setActiveButton(['active','','','']);
                setSpanOn(['span-on','','','']);
                break;
            case "order":
                setActiveButton(['','active','','']);
                setSpanOn(['','span-on','','']);
                break;
            case "business":
                setActiveButton(['','','active','']);
                setSpanOn(['','','span-on','']);
                break;
            case "account":
                setActiveButton(['','','','active']);
                setSpanOn(['','','','span-on']);            
                break;
            default:
                break;
        }
    },[])

    const menuClick = (e) =>{
        let clickedButton = e.currentTarget.getAttribute("option");
        let currentActiveButton = activeButton;
        let currentSpan = spanOn;
        currentActiveButton = currentActiveButton.map((x,ind)=>{
            if(ind == clickedButton){
                currentSpan[ind] = "span-on";
                x = "active"
            }else{
                x = ""
                currentSpan[ind] = "";
            }
            console.log(x)
            return  x;
        })
        setActiveButton(currentActiveButton)
        setSpanOn(currentSpan);
        
        switch(parseInt(clickedButton)){
            case 0:
                history.push("/main/inventory");
                break;
            case 1:
                history.push("/main/order");
                break;
            case 2:
                history.push("/main/business");
                break;
            case 3:
                history.push("/main/account");
                break;
            default:
                history.push("/main/inventory");
                break;
        }
    }

    const popUpAction = (act) => (e) => {
        switch(act){
            case 0:
                setPopUpStyle({opacity:0,pointerEvents:"none"})
                break;
            case 1:
                AuthenticationDataService.logout().then(res => {
                    if(res.data.success){
                        history.push("/home");   
                        history.go();
                    }
                })
                break;
            default:
                break;
        }
    }

    const toggleModal = () =>{
        setPopUpStyle({opacity:1,pointerEvents:"all"})
    }

    return(
        <div id="main-navbar">
            <div id="navbar">
                <button className="button-icon"><FontAwesomeIcon icon={faGrinBeam} className="navbar-icon"/></button>
                <div className="navbar-main">
                    <button className="button-icon" option="0" onClick={menuClick}>
                        <PinIcon spanClass={spanOn[0]} />
                        <FontAwesomeIcon icon={faFileAlt} className={"navbar-icon " + activeButton[0]}/>
                    </button>
                    <button className="button-icon" option="1" onClick={menuClick}>
                        <PinIcon spanClass={spanOn[1]} />
                        {/* <span className={spanOn[1]}></span> */}
                        <FontAwesomeIcon icon={faChartBar} className={"navbar-icon " + activeButton[1]}/>
                    </button>
                    <button className="button-icon" option="2" onClick={menuClick}>
                        <PinIcon spanClass={spanOn[2]} />
                        <FontAwesomeIcon icon={faSquare} className={"navbar-icon " + activeButton[2]}/>
                    </button>
                    <button className="button-icon" option="3" onClick={menuClick}>
                        <PinIcon spanClass={spanOn[3]} />
                        <FontAwesomeIcon icon={faUser} className={"navbar-icon " + activeButton[3]}/>
                    </button>
                </div>
                <button className="button-icon" onClick={toggleModal}><SignOutIcon /></button>
            </div>
            <PopUp1 popUpStyle={popUpStyle} popUpAction={popUpAction}/>
        </div>
    )
}

export default Navbar;