import React from 'react';
import "./currency_select.scss";

import ProgressButton from './progress_button';

export default function CurrencySelect(props) {
    const labels = props.currencies.map(el => {
        if (el[0] === props.invalid_choice) return "";
        return (
            <label key={el[0]} className="currency_option">
                <input type="radio" name="currency" id={el[0]} value={el[0]} onChange={props.changeHandler}/>
                <span className="align_center">
                    <img src={`./assets/images/currency_icons/${el[0].toLowerCase()}.svg`} alt={el[0] + " currency symbol"}/>
                    
                    {el[0]}            
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