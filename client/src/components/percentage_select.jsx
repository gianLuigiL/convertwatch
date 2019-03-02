import React from 'react';
import Headings from './headings';
import PercentageTool from "./percentage_tool";
import Confirm from './confirm';
import ProgressButton from "./progress_button";
import "./percentage_select.scss";
import scroll_to_top from "../helper/scroll_to_top";

export default class PercentageSelect extends React.Component {
    componentDidMount() {
        scroll_to_top();
    }

    render(){
        return (
            <>
                <Headings title="Margin" text="Select the target percentage you want to reach."/>
                <form action="/" className="percentage_select">
                    <div>
                        <PercentageTool 
                            initial_currency={this.props.initial_currency}
                            target_currency={this.props.target_currency}
                            margin_value={this.props.margin_value}
                            original_margin_value={this.props.original_margin_value}
                            margin={this.props.margin} 
                            min_margin={this.props.min_margin}
                            max_margin={this.props.max_margin}
                            decrease_margin={this.props.decrease_margin} 
                            increase_margin={this.props.increase_margin}  
                            next_section={this.props.next_section}
                            can_navigate={this.props.margin > 0}
                            />
                        <Confirm change_handler={this.props.accept_terms} {...this.props}/>
                    </div>
                    <ProgressButton 
                            clickHandler={this.props.submit_data}
                            can_navigate={this.props.margin > 0 && this.props.email && this.props.terms_accepted}
                    >{this.props.margin > 0 && this.props.email && this.props.terms_accepted ? "CONFIRM" : "PLEASE COMPLETE"}</ProgressButton>
                </form>
            </>
        )
    }
}