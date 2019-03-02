import React from 'react';
import Headings from './headings';
import PercentageTool from "./percentage_tool";
import Confirm from './confirm';
import ProgressButton from "./progress_button";
import "./percentage_select.scss";

export default function PercentageSelect(props) {
    return (
        <>
            <Headings title="Margin" text="Select the target percentage you want to reach."/>
            <form action="/" className="percentage_select">
                <div>
                    <PercentageTool 
                        initial_currency={props.initial_currency}
                        target_currency={props.target_currency}
                        margin_value={props.margin_value}
                        original_margin_value={props.original_margin_value}
                        margin={props.margin} 
                        min_margin={props.min_margin}
                        max_margin={props.max_margin}
                        decrease_margin={props.decrease_margin} 
                        increase_margin={props.increase_margin}  
                        next_section={props.next_section}
                        can_navigate={props.margin > 0}
                        />
                    <Confirm change_handler={props.accept_terms} {...props}/>
                </div>
                <ProgressButton 
                        clickHandler={props.submit_data}
                        can_navigate={props.margin > 0 && props.email && props.terms_accepted}
                >{props.margin > 0 && props.email && props.terms_accepted ? "CONFIRM" : "PLEASE COMPLETE"}</ProgressButton>
            </form>
        </>
    )
}