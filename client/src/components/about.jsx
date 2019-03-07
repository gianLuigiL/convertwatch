//Base dependencies
import React from "react";
//Styles
import "./about.scss";
//Components
import ProgressButton from "./progress_button";


export default function about(props){
    return (
        <>
        <h1 className="title">FAQ</h1>
        <div className="about_container">
            <div className="paragraph_highlight">
                <h2><span className="highlight_title">How</span> <span className="highlight_title">does</span> <span className="highlight_title">it</span> <span className="highlight_title">work?</span></h2>
                <p>The whole thing takes 10 seconds, you select the initial currency. The target currency, and the percentage you hope to make.</p>
                <p>Example: You are a british lad looking to go on holiday in Spain this August. You select the &pound; as your initial currency, the &euro; as target currency and the percentage you wish to reach</p>
                <p>If your target percentage is met you will receive an email, if your percentage is not met in the span of 6 months the entry will be automatically deleted.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span className="highlight_title">Why</span> <span className="highlight_title">ConvertWatch?</span></h2>
                <p>Keeping tabs open for the best deal is a job on its own, enter ConvertWatch. <strong>Free forever</strong>, fast, no account needed.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span className="highlight_title">What</span> <span className="highlight_title">about</span> <span className="highlight_title">my</span> <span className="highlight_title">data?</span></h2>
                <p>Only your email is required and it's deleted when you reach your goal or after 6 months if the target is not met. Who gives a damn about newsletters anyway?</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span className="highlight_title">Does</span> <span className="highlight_title">ConvertWatch</span> <span className="highlight_title">share</span> <span className="highlight_title">any</span> <span className="highlight_title">data?</span></h2>
                <p>No, it doesn't, ConvertWatch has no business going on with third parties.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span className="highlight_title">What</span> <span className="highlight_title">are</span> <span className="highlight_title">my</span> <span className="highlight_title">warranties?</span></h2>
                <p>None, ConvertWatch is <strong>NOT</strong> a professional tool. It's provided <strong>WITHOUT</strong> any warranties of 
                functionality and deliverability.</p>
                <p>Always check with a professional dedicated body before making any financial commitment.</p>
                <p>No responsibilities are taken in, or based on, the functionality of ConvertWatch, 
                    ConvertWatch it's not your accountant, it's a simple tool to save a few quids if luck allows.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span className="highlight_title">Why</span> <span className="highlight_title">the</span> <span className="highlight_title">exchange</span> <span className="highlight_title">rates</span> <span className="highlight_title">are</span> <span className="highlight_title">different</span> <span className="highlight_title">on</span> <span className="highlight_title">other</span> <span className="highlight_title">websites?</span></h2>
                <p>Rates are everchanging, by the time you perform your exchange it might have shifted.</p>
                <p>ConvertWatch will send you an email based on the exact rate as it's provided, but the currency exchange body of your choice 
                    might apply different rates and fees</p>
                <p>I usually use TransferWise as I find it to be the closest to the official value, but you do you.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span className="highlight_title">Are</span> <span className="highlight_title">we</span> <span className="highlight_title">done</span> <span className="highlight_title">yet?!</span></h2>
                <p>Yes! Press the button below to start!</p>
            </div>
            
            {/* Progress button can always navigate to the initial currency selection */}
            <ProgressButton can_navigate={true} next_section="/start" >START NOW</ProgressButton>
        </div>
        </>
    )
}