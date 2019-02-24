import React from 'react';
import { withRouter } from "react-router-dom";
import "./progress_button.scss";

class ProgressButton extends React.Component{
    constructor(props){
        super(props);

        this.changeRoute = this.changeRoute.bind(this);
    }

    changeRoute(e){
        e.preventDefault();
        if(this.props.can_navigate){            
            this.props.history.push(this.props.next_section)
        }
    }


    render(){
        return (
            <button onClick={this.props.clickHandler || this.changeRoute} className="progress btn btn-lg outline_contrast main_background flex_r_nowrap">
                    <span>
                        {this.props.children}
                    </span>
            </button>
        )        
    }


}

export default withRouter(ProgressButton);