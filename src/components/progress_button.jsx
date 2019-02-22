import React from 'react'

export default function ProgressButton(props){
    return (
        <button onClick={props.clickHandler} type="submit" className="btn btn-lg outline_contrast main_background">{props.children}</button>
    )
}

ProgressButton.defaultProps = {
    clickHandler: (e)=>{
        e.preventDefault();
    }
}