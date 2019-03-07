//Dependencies
import React from 'react';
//Styles
import "./percentage_select.scss";
//Components
import Headings from './headings';
import PercentageTool from "./percentage_tool";
import Confirm from './confirm';
import ProgressButton from "./progress_button";
//Helper function to scroll to top on load
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
                            //Margin in int %
                            margin={this.props.margin} 
                            //Target margin float
                            margin_value={this.props.margin_value}
                            //original margin float
                            original_margin_value={this.props.original_margin_value}
                            min_margin={this.props.min_margin}
                            max_margin={this.props.max_margin}
                            //Handlers
                            decrease_margin={this.props.decrease_margin} 
                            increase_margin={this.props.increase_margin} 
                            //Navigation 
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