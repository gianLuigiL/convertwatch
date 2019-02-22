import React from 'react';
import CurrencySelect from "./currency_select";
import Headings from './headings';

export default function TargetCurrency(props) {
    return (
        <>
            <Headings  title="Target Currency" text="Select the target currency."/>
            <CurrencySelect  {...props} changeHandler={props.set_target_currency} invalid_choice={props.initial_currency}/>
        </>
    )
}