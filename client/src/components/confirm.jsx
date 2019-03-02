import React from 'react';
import "./confirm.scss";

export default class Confirm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            validation_message: ""
        }

        //Holds timing offset for checking the email validation
        this.timer = null;
        //Reference to the email input
        this.email = React.createRef();
        this.message = React.createRef();

        this.check_email = this.check_email.bind(this);
    }

    render(){
        return (
            <>
                <div className="confirm_holder">
                    <label htmlFor="email" className="email_label">
                        <h5>
                            Your email:
                        </h5>
                        <input type="email" name="email" id="email" placeholder="Insert your email" required ref={this.email} onInput={this.check_email}/>
                    </label>
                    {this.state.validation_message}

                    <label htmlFor="terms" className="terms_label flex_r_nowrap align_center">
                        <span className="custom_checkbox_container">
                            <input type="checkbox" name="terms" id="terms" onChange={this.props.change_handler}/>
                            <span className="custom_checkbox">
                                <img src={require("../assets/images/interface_icons/tick.svg")} alt="checkbox_tick"/>
                                
                            </span>
                        </span>
                        I read and understand the terms.
                    </label>
                </div>
        </>
        )
    }
    //Sets appropriate validation messages into the state, runs at every keystroke (but throttles them)
    check_email({target: {value}}) {
        //If it's not the first keystroke clear timer
        if(this.timer) {
            clearTimeout(this.timer);
        } 

        const trimmed_value = value.trim();
        //Set a reference to the timer
        this.timer = setTimeout(()=>{
            //Set appropriate messages based on the outcome
            if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed_value)) {
                this.setState({
                    validation_message: <span className="hint red_alert">Email is not valid</span>
                })
            //If it's valid and terms have been accepted
            } else if (this.props.terms_accepted) {
                this.setState({
                    validation_message: <span className="hint ok">Ready, set, go!</span>
                })
                this.props.set_email(value);
            } else {
                this.props.set_email(value);
                this.setState({
                    validation_message: <span className="hint ok">Email is valid!</span>
                })
            }
        },300)
        
    }
}