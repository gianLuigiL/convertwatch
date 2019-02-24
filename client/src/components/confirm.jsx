import React from 'react';
import "./confirm.scss";

import Headings from './headings';
import ProgressButton from "./progress_button";

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
        //If there's no message don't display the element
        const validation_message = this.state.validation_message ? <p className="hint" ref={this.message}>{this.state.validation_message}</p> : "";
        let progress_message = "";
        if (this.props.email && this.props.terms_accepted) {
            progress_message = "CONFIRM";
        } else if (!this.props.email && this.props.terms_accepted) {
            progress_message = "PLEASE INSERT YOUR EMAIL";
        } else if (this.props.email && !this.props.terms_accepted) {
            progress_message = "PLEASE ACCEPT THE TERMS";
        } else if (!this.props.email && !this.props.terms_accepted) {
            progress_message = "PLEASE INSERT YOUR EMAIL AND ACCEPT THE TERMS";
        }
        const can_navigate = this.props.email && this.props.terms_accepted;
        
        return (
            <>
                <Headings title="Almost there!" text="Insert your email to be notified when your target is met"/>

                <form action="/">
                    <label htmlFor="email" className="email_label">
                        <p>
                            Your email:
                        </p>
                        <input type="email" name="email" id="email" placeholder="Insert your email" required ref={this.email} onInput={this.check_email}/>
                    </label>
                    {validation_message}

                    <label htmlFor="terms" className="terms_label flex_r_nowrap align_center">
                        <span className="custom_checkbox_container">
                            <input type="checkbox" name="terms" id="terms" onChange={this.props.change_handler}/>
                            <span className="custom_checkbox">
                                <img src={require("../images/interface_icons/tick.svg")} alt="checkbox_tick"/>
                                
                            </span>
                        </span>
                        I read and understand the terms.
                    </label>

                   <ProgressButton 
                    next_section={this.props.next_section}
                    can_navigate={can_navigate}
                    >{progress_message}</ProgressButton>
                </form>
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
                    validation_message: "Email is not valid"
                })
            //If it's valid and terms have been accepted
            } else if (this.props.terms_accepted) {
                this.setState({
                    validation_message: "Ready, set, go!"
                })
                this.props.set_email(value);
            } else {
                this.props.set_email(value);
                this.setState({
                    validation_message: "Email is valid"
                })
            }
        },300)
        
    }
}