import React from 'react'
import ProgressButton from './progress_button';
import Headings from './headings';

import "./done.scss"

export default function DonePage(props) {
    return (
        <>  
            <Headings title="Done!" text="Good job!"/>
            <div className="confirm">
            <h3>HOORAY! You're all set!</h3>
                <p>Now fingers crossed! <span role="img" aria-label="fingers crossed image">🤞</span> <br/>You can also set up another reminder with the button below or you can spread the voice on Facebook. 😊</p>
                <ProgressButton>START AGAIN</ProgressButton>
            </div>
        </>

    )
}