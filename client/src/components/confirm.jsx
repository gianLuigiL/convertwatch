import React from 'react';
import "./confirm.scss";

export default class Confirm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            validation_message: "",
            validation_classes: "hint bound"
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
                    <span className={this.state.validation_classes}>{this.state.validation_message}</span>

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
            let validation_message = "";
            let validation_classes = "";
            //Set appropriate messages based on the outcome
            if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed_value)) {
                validation_message = "Email is not valid";
                validation_classes = "hint red_alert"
            //If it's valid and terms have been accepted
            } else if (this.props.terms_accepted) {
                validation_message = "Ready, set, go!";
                validation_classes = "hint ok"
                this.props.set_email(trimmed_value);
            } else {
                validation_message = "Email is valid!!";
                validation_classes = "hint ok"
                this.props.set_email(trimmed_value);
            }
            this.setState({
                validation_message,
                validation_classes
            })
        },300)
        
    }
}