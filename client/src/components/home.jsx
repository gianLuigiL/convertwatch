import React from 'react'
import "./home.scss";
import ProgressButton from './progress_button';


export default function Home(props) {
    return(
        <div className="home_container flex_r_nowrap align_center justify_center">
            <div className="action_container">
                <h1>ConvertWatch</h1>
                <h2>
                    The free currency watcher for busy people
                </h2>
                <hr/>
                <p>ConvertWatch keeps tabs open on currency values so you don't have to. No frills, no sign-up, and free.</p>
                <p>Select the currency you want to track and get an email when you reach your target. Simple as that. </p>
                <div className="button_holder">
                    <ProgressButton can_navigate={true} next_section="/start" >START</ProgressButton>
                    <ProgressButton can_navigate={true} next_section="/about" >HOW DOES IT WORK</ProgressButton>
                </div>
            </div>
        </div>
    )
}