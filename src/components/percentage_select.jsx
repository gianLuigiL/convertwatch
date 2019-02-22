import React from 'react';
import Headings from './headings';
import PercentageTool from "./percentage_tool";

export default function PercentageSelect(props) {
    return (
        <>
            <Headings title="Margin" text="Select the target percentage you want to reach."/>
            <PercentageTool margin={props.margin} decrease_margin={props.decrease_margin} increase_margin={props.increase_margin}  />
        </>
    )
}