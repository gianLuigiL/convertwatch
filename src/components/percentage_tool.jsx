import React from 'react'
import "./percentage_tool.scss";
import ProgressButton from './progress_button';

const generateMessages = (margin) => {
    switch(margin) {
        case 1: case 2:
            return <p className="hint ok f_100">Usually happens in a matter of days.</p>;
        case 3:
            return <p className="hint ok f_100">The best and quickest target is indeed 3%.</p>;
        case 4: case 5:
            return <p className="hint ok f_100">Might require some time.</p>;
        case 6: case 7:
            return <p className="hint alert f_100">It starts getting unlikely.</p>;
        case 8: case 9: case 10:
            return <p className="hint red_alert f_100">Are we talking black monday?</p>;
        default:
            return <p className="hint empty f_100">Click on the plus and minus button to change the target.</p>;
    }
}


export default function PercentageTool(props){

    return (
        <form action="/">
            <div className="percentage_container p10 flex_r_wrap align_center justify_center">
                <div className="minus_handle" onClick={props.decrease_margin}>
                    <button  type="button" className="btn outline_contrast flew_r_nowrap align_center justify_center">
                        <img src={require("../images/interface_icons/minus.svg")} alt="Minus" arial-label="subtract" aria-labelledby="subtract"/>
                    </button>
                </div>
                <div className="percentage_value flex_r_nowrap align_center justify_center">
                    <span className="flex_r_nowrap align_center justify_center">
                        {props.margin}
                    </span>
                </div>
                <div className="plus_handle" onClick={props.increase_margin}>
                    <button type="button"className="btn outline_contrast flew_r_nowrap align_center justify_center">
                    <img src={require("../images/interface_icons/plus.svg")} alt="Minus" arial-label="subtract" aria-labelledby="subtract"/>
                    </button></div>
                {generateMessages(props.margin)}
            </div>
            <ProgressButton >NEXT</ProgressButton>
        </form>
    )
}

