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
        this.timer = null;
        this.input = React.createRef();
        this.validation_message = "";

        this.check_email = this.check_email.bind(this);
    }

    render(){
        const message = this.state.validation_message ? <p className="hint">{this.state.validation_message}</p> : "";

        return (
            <>
                <Headings title="Almost there!" text="Insert your email to be notified when your target is met"/>
                <form action="/">
                    <label htmlFor="email">
                        <p>
                            Your email:
                        </p>
                        <input type="email" name="email" id="email" required ref={this.input} onInput={this.check_email}/>
                    </label>
                    {message}
                    <label htmlFor="terms">
                        <p>
                            I read and understand the terms.
                        </p>
                        <input type="checkbox" name="terms" id="terms" onChange={this.props.change_handler}/>
                    </label>
                   <ProgressButton>CONFIRM</ProgressButton>
                </form>
            </>
        )
    }

    check_email({target: {value}}) {
        if(this.timer) {
            clearTimeout(this.timer);
        } 
        const trimmed_value = value.trim();
            this.timer = setTimeout(()=>{
                if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed_value)) {
                    this.validation_message = "Email is not valid";
                } else if (this.props.terms_accepted) {
                    this.validation_message = "Ready, set, Go!";
                    this.setState({
                        validation_message: "Email is valid"
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