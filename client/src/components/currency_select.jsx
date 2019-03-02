import React from 'react';
import "./currency_select.scss";
import scroll_to_top from "../helper/scroll_to_top";

import ProgressButton from './progress_button';

class CurrencySelect extends React.Component {

    componentDidMount(){
        scroll_to_top();
    }

    render(){
        //currencies is an array of objs like [{name: "US Dollar", symbol: "USD"}]
        const labels = this.props.currencies.map( el => {

            const image = require("../assets/images/currency_icons/" + el.symbol.toLowerCase() + ".svg");
            const is_checked = this.props.preselected_choice === el.symbol ? "checked" : "";


            if (el.symbol === this.props.invalid_choice) return "";
            return (
                <label key={el.symbol} className="currency_option">
                    <input  type="radio" 
                            name="currency" 
                            id={el.symbol} 
                            value={el.symbol}
                            checked={is_checked}
                            onChange={this.props.changeHandler}
                            />
                    <span className="align_center">
                        <span className="currency_image">
                            <img src={image} alt={el.name + " currency symbol"}/>
                        </span>
                        <span className="currency_symbol">{el.symbol}</span> 
                        <span className="currency_name">{el.name}</span>
                    </span>

                </label>
                )
            }
        )
        return (
            <form action="" className="currency_select">
                <div className="labels">
                    {labels}
                </div>
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