//Dependencies
import React from 'react';
//Styles
import "./currency_select.scss";
//Components
import ProgressButton from './progress_button';
//Helper function to scorll to top on loading
import scroll_to_top from "../helper/scroll_to_top";
import CurrencyLabel from './currency_label';

class CurrencySelect extends React.Component {
    componentDidMount(){
        scroll_to_top();
    }

    render(){
        //currencies is an array of objects like [{name: "US Dollar", symbol: "USD"}]
        const labels = this.props.currencies.map( (el, index )=> {
            //Skip the currency that's not allowed
            if (el.symbol === this.props.invalid_choice) return "";
            return <CurrencyLabel 
                {...el} 
                key={el.symbol} 
                //Event handler
                changeHandler={this.props.changeHandler} 
                //Forbid same value for target and initial currency
                invalid_choice={this.props.target_currency} 
                //Preselect on back navogation
                preselected_choice={this.props.initial_currency} 
                //Delay in rendering
                delay={index * 100}
                //Checked?
                target={this.props.target}
                />
            }
        )
        return (
            <form action="" className="currency_select">
                <fieldset>
                    <legend>Select the initial currency, the one you already own.</legend>
                    <div className="labels">
                        {labels}
                    </div>
                </fieldset>
                {this.props.children}
                <ProgressButton 
                    next_section={this.props.next_section} 
                    can_navigate={this.props.can_navigate}>{this.props.message}</ProgressButton>
            </form>    
        )
    }
}

CurrencySelect.defaultProps = {
    title: "",
    text: ""
}

export default CurrencySelect;