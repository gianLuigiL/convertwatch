import React from 'react'
import "./percentage_tool.scss";
import ProgressButton from './progress_button';
import CurrentData from './current_data';

let timer;

export default class PercentageTool extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            hint: "",
        }
    }

    increase_margin = () => {
        if(this.props.margin === this.props.max_margin) return;
        this.props.increase_margin();
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(this.get_suggestion, 800)
    }

    decrease_margin = () => {
        if(this.props.margin === this.props.min_margin || this.props.margin - 1 === this.props.min_margin) return;
        this.props.decrease_margin();
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(this.get_suggestion, 800)
    }

    str_to_time = (str) => {
        const time =  new Date(str).getTime();
        if (!time) {
            alert("something went wrong while conversion check console");
            console.log(str);
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
            return <p className="hint red_alert">The target hasn't been reached in six months, it's better to aim a little lower.</p>
        } else if ( this.str_to_time(result.date) > (this.now() - one_week)){
            return <p className="hint ok">The target has been reached less than a week ago, you can aim a little higher.</p>
        } else if ( this.str_to_time(result.date) > (this.now() - one_week * 2 )){
            return <p className="hint ok">The target has been reached less than two weeks ago, good enough if you're on a rush.</p>
        } else if ( this.str_to_time(result.date) > (this.now() - one_month )){
            return <p className="hint ok">The target has been reached in the last 30 days.</p>
        } else if ( this.str_to_time(result.date) > (this.now() - one_month * 2 )){
            return <p className="hint ok">The target has been reached in the last two months.</p>
        } else {
            return <p className="hint alert">The target has been reached the {result_date.getDate()}/{result_date.getMonth() + 1}/{result_date.getFullYear()}.</p>
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
            this.setState({
                hint: this.get_hint(res)
            })
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
                        <div className="minus_handle" onClick={this.decrease_margin}>
                            <button  type="button" className="btn outline_contrast flew_r_nowrap align_center justify_center">
                                <img src={require("../images/interface_icons/minus.svg")} alt="Minus" arial-label="subtract" aria-labelledby="subtract"/>
                            </button>
                        </div>
                        <div className="percentage_value flex_r_nowrap align_center justify_center">
                            <span className="flex_r_nowrap align_center justify_center">
                                {this.props.margin}
                            </span>
                        </div>
                        <div className="plus_handle" onClick={this.increase_margin}>
                            <button type="button" className="btn outline_contrast flew_r_nowrap align_center justify_center">
                            <img src={require("../images/interface_icons/plus.svg")} alt="Minus" arial-label="subtract" aria-labelledby="subtract"/>
                            </button></div>
                        {this.state.hint}

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

