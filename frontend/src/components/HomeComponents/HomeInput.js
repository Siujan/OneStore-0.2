const HomeInput = props =>{
    const handleClick = event =>{
      if(event.target.value === "")
          props.setSpanClass("label span-up")
    }

    const handleBlur = event =>{
      if(event.target.value === ""){
        props.setSpanClass("label")
        return;
      }

      if(props.checkUserNameAvailability)
        props.checkUserNameAvailability(event.target.value);

      if(props.checkEmailAvailability)
        props.checkEmailAvailability(event.target.value);
    }

    return(
        <div className="input-container">
            <div className="row-input">
                <div className="icon-container"></div>
                <div className="input-group"><span className={props.spanClass}>{props.spanText}</span></div>
            </div>
            <div className="row-input">
                <div className="icon-container">{props.icon}</div>
                <div className="input-group">
                    {props.inputRightIcon}  
                    <input type={props.inputType} name={props.inputName} className={props.inputClass} value={props.value} onChange={props.handleChange} onClick={handleClick} onBlur={handleBlur} autoComplete="new-password" required/>
                </div>
            </div>
            <div className="row-input">
                <div className="icon-container"></div>
                <div className="input-group">{props.alert}</div>
            </div>
        </div>   
    )    
}

export default HomeInput;