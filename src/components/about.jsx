import React from "react";
import "./about.scss";

export default function about(props){
    return (
        <div className="container">
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">Why</span> <span class="highlight_title">ConvertWatch?</span></h2>
                <p>ConvertWatch has come to life because I'm a european national and crossing in and out the UK 
                    with the ever-changing pound's value to look out for is a job on its own. <span role="img" aria-label="sad face">😱</span> So here comes ConvertWatch, a free, no-frills currency watchdog, all at screaming speed.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">Is</span> <span class="highlight_title">it</span> <span class="highlight_title">free?</span></h2>
                <p>ConvertWatch is free. I made ConvertWatch for myself and decided that it might be useful for everyone who crosses the border regularly. 
                    One day karma will pay me back.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">How</span> <span class="highlight_title">does</span> <span class="highlight_title">it</span> <span class="highlight_title">work?</span></h2>
                <p>The whole thing takes 10 seconds, you select the initial currency. The target currency, and the percentage you hope to make.</p>
                <p>Example: You are a british lad looking to go on holiday in Spain this august. You select the &pound; as your initial currency, the &euro; as target currency and the percentage you wish to reach</p>
                <p>If your target percentage is met you will receive an email, if your percentage is not met in the arc of 6 months the entry will be automatically deleted.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">Where</span> <span class="highlight_title">do</span> <span class="highlight_title">I</span> <span class="highlight_title">sign</span> <span class="highlight_title">up?</span></h2>
                <p>No, you don't need to. ConvertWatch only needs your email to tell you when your target is met.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">What</span> <span class="highlight_title">about</span> <span class="highlight_title">my</span> <span class="highlight_title">data?</span></h2>
                <p>Only your email is stored and it's deleted the exact same moment you receive your confirmation, 
                    either you reached your goal or the entry has exceeded 6 months</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">Does</span> <span class="highlight_title">ConvertWatch</span> <span class="highlight_title">share</span> <span class="highlight_title">any</span> <span class="highlight_title">data?</span></h2>
                <p>No, it doesn't, ConvertWatch is strictly <i>what-you-see-is-what-you-get</i>.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">What</span> <span class="highlight_title">are</span> <span class="highlight_title">my</span> <span class="highlight_title">warranties?</span></h2>
                <p>None, ConvertWatch is <strong>NOT</strong> a professional tool. It's provided <strong>WITHOUT</strong> any warranties of 
                functionality and deliverability.</p>
                <p>Always check with a professional dedicated body before making any financial commitment.</p>
                <p>No responsibilities are taken in, or based on, the functionality of ConvertWatch, 
                    ConvertWatch it's not your accountant, it's a simple tool to save a few quids if luck allows.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">Why</span> <span class="highlight_title">the</span> <span class="highlight_title">exchange</span> <span class="highlight_title">rates</span> <span class="highlight_title">are</span> <span class="highlight_title">different</span> <span class="highlight_title">on</span> <span class="highlight_title">other</span> <span class="highlight_title">websites?</span></h2>
                <p>Rates are everchanging, by the time you perform your exchange it might have shifted.</p>
                <p>ConvertWatch will send you an email based on the exact rate as it's provided, but the currency exchange body of your choice 
                    might apply different rates and fees</p>
                <p>I usually use TransferWise as I find it to be the closest to the official value, but you do you.</p>
            </div>
            <div className="paragraph_highlight">
                <h2><span class="highlight_title">Are</span> <span class="highlight_title">we</span> <span class="highlight_title">done</span> <span class="highlight_title">yet?!</span></h2>
                <p>Yes! Press the button below to start!</p>
            </div>

            <a href="/" className="btn outline_contrast main_background p10">START</a>
        </div>
    )
}