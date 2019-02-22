import React from 'react';
import CurrencySelect from "./currency_select";
import Headings from "./headings";

export default function InitialCurrency(props) {
    return (
        <>
            <Headings title="Initial Currency" text="Select the starting currency you want to exchange." />
            <CurrencySelect {...props} changeHandler={props.set_initial_currency} invalid_choice={props.target_currency} />
        </>
    )
}