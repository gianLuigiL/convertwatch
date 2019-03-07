//Dependencies
import React from 'react';
//Styles
import "./progress_button.scss";
//Router dependencies
import { withRouter } from "react-router-dom";

class ProgressButton extends React.Component{
    constructor(props){
        super(props);

        this.changeRoute = this.changeRoute.bind(this);
    }
    //Guards if the component can actually navigate away and goes to the passed section
    changeRoute(e){
        e.preventDefault();
        if(this.props.can_navigate){
            //If the next section is the home (last screen) reset pristine state
            if(this.props.next_section === "/") {
                this.props.reset_state();
                this.props.history.push(this.props.next_section)
            }            
            this.props.history.push(this.props.next_section)
        }
    }

    render(){
        return (
            <div>
                <button onClick={this.props.clickHandler || this.changeRoute} className="progress btn btn-lg outline_contrast main_background flex_r_nowrap">
                        <span>
                            {this.props.children}
                        </span>
                </button>
            </div>
        )        
    }
}
//Export with navigation capabilities
export default withRouter(ProgressButton);