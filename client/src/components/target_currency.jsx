//Dependencies
import React from 'react';
//Components
import CurrencySelect from "./currency_select";
import Headings from './headings';

export default function TargetCurrency(props) {
    //If the target currency has been selected set message and possibility to advance
    const message = props.target_currency ? "NEXT" : "PLEASE SELECT A CURRENCY";
    const can_navigate = props.target_currency || false;

    return (
        <>
            <Headings  title="Target Currency" text="Select the target currency."/>
            <CurrencySelect  
                {...props} 
                //Event handler
                changeHandler={props.set_target_currency} 
                target={props.target_currency}
                invalid_choice={props.initial_currency}
                //Navigation
                next_section={props.next_section}
                message={message}
                can_navigate={can_navigate}   
                />
        </>
    )
}