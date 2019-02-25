import React from 'react';
import Headings from './headings';
import PercentageTool from "./percentage_tool";

export default function PercentageSelect(props) {
    return (
        <>
            <Headings title="Margin" text="Select the target percentage you want to reach."/>
            <PercentageTool 
                initial_currency={props.initial_currency}
                target_currency={props.target_currency}
                margin_value={props.margin_value}
                margin={props.margin} 
                min_margin={props.min_margin}
                max_margin={props.max_margin}
                decrease_margin={props.decrease_margin} 
                increase_margin={props.increase_margin}  
                next_section={props.next_section}
                />
        </>
    )
}