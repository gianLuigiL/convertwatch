import React from 'react'
import ProgressButton from './progress_button';
import Headings from './headings';

import "./done.scss"
import scroll_to_top from '../helper/scroll_to_top';

export default class DonePage extends React.Component {
    componentDidMount(){
        scroll_to_top();
    }

    render(){
        return (
            <>
                <Headings title="Hooray!" text="**fireworks cracking in the background**"/>
                <form action="/done" className="done">  
                    <div className="done">
                        <h3>You're all set! What now?</h3>
                        <p>You can start again with the button below or Convertwatch will send you an email if you reach your target within 6 months (and delete your entry), or will send you an email 
                        on the expiration date to let you know that your entry will be removed. Convertwatch has no purpose in retaining 
                        your email. If you wish for your email to be deleted from Convertwatch storage please email or click: <a href="mailto:hello@convertwatch.com">hello@convertwatch.com</a></p>
                        <h3>Wanna help?</h3>
                        <p>Convertwatch is <strong>free</strong> and will <strong>always be</strong>, if you want to pass the karma on, you can share on social media about your amazing newly found tool and help a friend out.</p>
                        <div className="fb">
                            <div className="fb-share-button" data-href="https://convertwatch.herokuapp.com/" data-layout="button" data-size="large" data-mobile-iframe="true"><a target="_blank"  rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fconvertwatch.herokuapp.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Facebook</a></div>
                        </div>
                        <div className="twitter">
                            <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=I%20just%20found%20a%205%20seconds%20tool%20to%20keep%20an%20eye%20on%20currencies%20for%20me!%20Try%20it%20out!" rel="noopener noreferrer" url="https://convertwatch.herokuapp.com/" target="_blank">Tweet it!</a>
                        </div>
                        <div className="spacer"></div>
                    </div>
                            <ProgressButton 
                    next_section={"/"} 
                    can_navigate={true}
                    reset_state={this.props.reset_state} 
                    >START AGAIN</ProgressButton>
                </form>
            </>
    
        )
    }
}