import React, {
    useState
} from "react"

const HomeButton = props =>{
    const [circleClass,setCircleClass] = useState("");
    const [circle1Delay,setCircle1Delay] = useState("");
    const [circle2Delay,setCircle2Delay] = useState('.3s');

    const circleExpand = () =>{
        setCircleClass("circle-up");
        setCircle1Delay("");
        setCircle2Delay(".3s");
    }

    const circleShrink = () =>{
        setCircleClass("");
        setCircle1Delay(".3s");
        setCircle2Delay("");    
    }

    const submitButtonHandler = () =>{
        props.submitForm();
    }

    return(
        <button type="button" className="submit-button" disabled={!props.enabled()} onMouseEnter={circleExpand} onMouseLeave={circleShrink} onClick={submitButtonHandler}>
            <div id="circle1" className={circleClass} style={{transitionDelay: `${circle1Delay}` }}></div>
            <div id="circle2" className={circleClass} style={{transitionDelay: `${circle2Delay}` }}></div>
            <span id="circle-span">{props.text}</span>
        </button>  
    )
}

export default HomeButton;