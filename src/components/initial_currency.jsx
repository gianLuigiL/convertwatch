import React from 'react';
import CurrencySelect from "./currency_select";
import Headings from "./headings";

export default function InitialCurrency(props) {
    const message = props.initial_currency ? "NEXT" : "PLEASE SELECT A CURRENCY";
    const can_navigate = props.initial_currency || false;

    return (
        <>
            <Headings title="Initial Currency" text="Select the starting currency you want to exchange." />
            <CurrencySelect 
                {...props} 
                changeHandler={props.set_initial_currency} 
                invalid_choice={props.target_currency} 
                next_section={props.next_section} 
                message={message}
                can_navigate={can_navigate}    
            />
        </>
    )
}