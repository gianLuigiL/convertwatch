import React from 'react'
import ProgressButton from './progress_button';

export default function DonePage(props) {
    return (
        <>
            <h3>HOORAY! You're all set!</h3>
            <p>Now fingers crossed! <span role="img" aria-label="fingers crossed image">🤞</span> <br/>You can also set up another reminder with the button below!</p>
            <ProgressButton>START AGAIN</ProgressButton>
            <ProgressButton>DONE</ProgressButton>
        </>

    )
}