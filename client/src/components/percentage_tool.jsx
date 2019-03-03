import React from 'react'
import "./percentage_tool.scss";
import CurrentData from './current_data';
const plus = require("../assets/images/interface_icons/plus.svg")
const minus = require("../assets/images/interface_icons/minus.svg")

let timer;

export default class PercentageTool extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            hint: "",
            hint_message: "",
            hint_classes: "hint bound"
        }
    }

    increase_margin = () => {
        if(this.props.margin === this.props.max_margin) return;
        this.props.increase_margin();
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(this.get_suggestion, 500)
    }

    decrease_margin = () => {
        if(this.props.margin === this.props.min_margin || this.props.margin - 1 === this.props.min_margin) return;
        this.props.decrease_margin();
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(this.get_suggestion, 500)
    }

    str_to_time = (str) => {
        const time =  new Date(str).getTime();
        if (!time) {
            alert("something went wrong while creating time check console");
        } else {
            return time;
        }
    }

    now = () => new Date().getTime();

    get_hint = ({result}) => {
        const result_date = new Date(result.date);
        const one_day = 1000 * 60 * 60 * 24;
        const one_week = one_day * 7;
        const one_month = one_day * 30;
        
        if (!result.date) {
            this.setState({
                hint_message: "The target hasn't been reached in six months, it's better to aim a little lower.",
                hint_classes: "hint red_alert"
            })
        } else if ( this.str_to_time(result.date) > (this.now() - one_week)){
            this.setState({
                hint_message: "The target has been reached less than a week ago, you can aim a little higher.",
                hint_classes: "hint ok"
            })
        } else if ( this.str_to_time(result.date) > (this.now() - one_week * 2 )){
            this.setState({
                hint_message: "The target has been reached less than two weeks ago, good enough if you're on a rush.",
                hint_classes: "hint ok"
            })
        } else if ( this.str_to_time(result.date) > (this.now() - one_month )){
            this.setState({
                hint_message: "The target has been reached in the last 30 days.",
                hint_classes: "hint ok"
            })
        } else if ( this.str_to_time(result.date) > (this.now() - one_month * 2 )){
            this.setState({
                hint_message: "The target has been reached in the last two months.",
                hint_classes: "hint ok"
            })
        } else {
            this.setState({
                hint_message: `The target has been reached the ${result_date.getDate()}/${result_date.getMonth() + 1}/${result_date.getFullYear()}.`,
                hint_classes: "hint alert"
            })
        }
    }

    get_suggestion = () => {
        const {initial_currency, target_currency, margin_value } = this.props;
        const body = JSON.stringify({initial_currency, target_currency, margin_value});
        fetch("/get_suggestion",{
            method: "POST",
            headers : {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-from-browser": window ? true : false
            },
            body
        })
        .then(res => res.json())
        .then(res => {
            this.get_hint(res);
        })
        .catch(err => {
            console.log(err);
            alert("something went wrong while retrieving suggestion, the page will now reload");
        })
    }

    render(){
        return (
                <div className="margin_container">
                    <div className="percentage_container p10 flex_r_wrap align_center justify_center">
                        <div className="minus_handle" onClick={this.decrease_margin} >
                            <button  type="button" className="flew_r_nowrap align_center justify_center" tabIndex="0">
                                <img src={minus} alt="Minus" arial-label="Subtract one"/>
                            </button>
                        </div>
                        <div className="percentage_value flex_r_nowrap align_center justify_center">
                            <span className="flex_r_nowrap align_center justify_center">
                                <span className="margin" tabIndex="0">
                                    {this.props.margin}<span className="percentage_sign">%</span>
                                </span>
                            </span>
                        </div>
                        <div className="plus_handle" onClick={this.increase_margin}>
                            <button type="button" className="flew_r_nowrap align_center justify_center" tabIndex="0">
                            <img src={plus} alt="Plus" arial-label="Add one"/>
                            </button>
                        </div>
                        <p className={this.state.hint_classes}>{this.state.hint_message}</p>

                    </div>
                    <CurrentData 
                        initial_currency={this.props.initial_currency}                
                        target_currency={this.props.target_currency}                
                        original_margin_value={this.props.original_margin_value}                
                        margin_value={this.props.margin_value}                
                    />                
                </div>
        )
    }
}

