import React, {
    useState,
    useEffect
} from "react"

const PopUp1 = (props) =>{
    return(
        <div className="pop-up" style={props.popUpStyle}>
            <div className="pop-up-logout">
                <h4>Are you sure?</h4>
                <div className="pop-up-logout-choice">
                    <button className="btn btn-danger" onClick={props.popUpAction(1)}>Yes</button>
                    <button className="btn btn-primary" onClick={props.popUpAction(0)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp1;