import React from 'react'

export default function CurrentData(props) {
    return (
        <div className="data_holder">
            <div className="data_unit">
                <h5>Starting currency</h5>
                <p>{props.initial_currency}</p>
            </div>
            <div className="data_unit">
                <h5>Target Currency</h5>
                <p>{props.target_currency}</p>            </div>
            <div className="data_unit">
                <h5>Current Margin</h5>
                <p>{props.original_margin_value.toFixed(4)}</p>            </div>
            <div className="data_unit">
                <h5>Target Margin</h5>
                <p>{props.margin_value.toFixed(4)}</p>    
            </div>
            <h3>What am I doing here?</h3>
            <p>You want to buy foreign currency when it's weak against the currency you already own so that you can buy more for the same price. Sort of a discount.</p>
            <p>This means that the more you increase the margin, the more you expect the foreign currency to be weaker against yours, and the higher you go the unlikelier it gets.</p>
        </div>
    )
}