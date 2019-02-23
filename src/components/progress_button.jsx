import React from 'react';
import "./progress_button.scss";

export default function ProgressButton(props){
    return (
        <button onClick={props.clickHandler} type="submit" className="progress btn btn-lg outline_contrast main_background">
            <span>
               {props.children}
            </span>
        </button>
    )
}

ProgressButton.defaultProps = {
    clickHandler: (e)=>{
        e.preventDefault();
    }
}