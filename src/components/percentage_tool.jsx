import React from 'react'
import "./percentage_tool.scss";
import ProgressButton from './progress_button';

const generateMessages = (margin) => {
    switch(margin) {
        case 1: case 2:
            return "Usually happens in a matter of days";
        case 3:
            return "The best and quickest target is indeed 3%";
        case 4: case 5:
            return "Might require a few weeks";
        case 6: case 7:
            return "It starts to get unlikely.";
        case 8: case 9: case 10:
            return "Are we talking black monday?";
        default:
            return "Click on the + and - buttons to change the target.";
    }
}


export default function PercentageTool(props){

    return (
        <form action="/">
            <div>
                <div className="minus_handle" onClick={props.decrease_margin}>&minus;</div>
                <div id="percentage_value">{props.margin}</div>
                <div className="plus_handle" onClick={props.increase_margin}>&#43;</div>
            </div>
            <p>{generateMessages(props.margin)}</p>
            <ProgressButton >NEXT</ProgressButton>
        </form>
    )
}

