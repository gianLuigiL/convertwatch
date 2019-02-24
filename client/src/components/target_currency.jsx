import React from 'react';
import CurrencySelect from "./currency_select";
import Headings from './headings';

export default function TargetCurrency(props) {
    const message = props.target_currency ? "NEXT" : "PLEASE SELECT A CURRENCY";
    const can_navigate = props.target_currency || false;

    return (
        <>
            <Headings  title="Target Currency" text="Select the target currency."/>
            <CurrencySelect  
                {...props} 
                changeHandler={props.set_target_currency} 
                invalid_choice={props.initial_currency}
                preselected_choice={props.target_currency}
                next_section={props.next_section}
                message={message}
                can_navigate={can_navigate}   
                />
        </>
    )
}