//Dependencies
import React from 'react';
//Styles
import "./current_data.scss";

export default function CurrentData(props) {
    return (
        <div className="data_holder">
            <div className="data_unit">
                <h5 tabIndex="0">Starting currency</h5>
                <p tabIndex="0">{props.initial_currency}</p>
            </div>
            <div className="data_unit">
                <h5 tabIndex="0">Target Currency</h5>
                <p tabIndex="0">{props.target_currency}</p>            </div>
            <div className="data_unit">
                <h5 tabIndex="0">Current Margin</h5>
                <p tabIndex="0">{props.original_margin_value.toFixed(4)}</p>            </div>
            <div className="data_unit">
                <h5 tabIndex="0">Target Margin</h5>
                <p tabIndex="0">{props.margin_value.toFixed(4)}</p>    
            </div>
            <div className="breakdown">
                <h4 tabIndex="0">What am I looking at?</h4>
                <p tabIndex="0">You want to buy foreign currency when it's weak against the currency you already own so that you can buy more for the same price. Sort of a discount.</p>
                <p tabIndex="0">This means that the more you increase the margin, the more you expect the foreign currency to be weak against yours, and the higher you go the unlikelier it gets.</p>
            </div>
        </div>
    )
}