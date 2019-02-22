import React from 'react';
import "./confirm.scss";

import Headings from './headings';
import ProgressButton from "./progress_button";

export default function Confirm(props) {
    return (
        <>
            <Headings title="Almost there!" text="Insert your email to be notified when your target is met"/>
            <form action="/">
                <label htmlFor="email">
                    <p>
                        Your email:
                    </p>
                    <input type="email" name="email" id="email" required/>
                    
                </label>
                <label htmlFor="terms">
                    <p>
                        I read and understand the terms.
                    </p>
                    <input type="checkbox" name="terms" id="terms" onChange={props.change_handler}/>
                </label>
               <ProgressButton>CONFIRM</ProgressButton>
            </form>
        </>
    )
}