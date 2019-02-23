import React from 'react';
import "./currency_select.scss";

import ProgressButton from './progress_button';

export default function CurrencySelect(props) {
    //currencies is an array of objs like [{name: "US Dollar", symbol: "USD"}]
    const labels = props.currencies.map( el => {
        const image = require("../images/currency_icons/" + el.symbol.toLowerCase() + ".svg")

        if (el.symbol === props.invalid_choice) return "";
        return (
            <label key={el.symbol} className="currency_option">
                <input type="radio" name="currency" id={el.symbol} value={el.symbol} onChange={props.changeHandler}/>
                <span className="align_center">
                    <span className="currency_image">
                        {<img src={image} alt={el.name + " currency symbol"}/>}
                    </span>
                    <span className="currency_symbol">{el.symbol}</span> 
                    &nbsp;&bull;&nbsp;
                    <span className="currency_name">{el.name}</span>
                </span>

            </label>
            )
        }
        )


    return (
        <form action="">
            {labels}
            <ProgressButton>NEXT</ProgressButton>
        </form>    
    )
}

CurrencySelect.defaultProps = {
    title: "",
    text: ""
}