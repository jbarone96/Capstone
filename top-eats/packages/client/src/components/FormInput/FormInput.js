import React, { useState } from "react";
import './FormInput.css';

const FormInput = ({ label, onChange, errorMessage, ...inputProps }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    }
    
    return (
        <div className="formInput">
            <label>{label}</label>
            <input 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                focused={focused.toString()} onFocus={() => inputProps.name==='confirmPassword' && setFocused(true)}/>
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput;