//Dependencies
import React from 'react'
import posed from "react-pose";
//Styles
import "./home.scss";
//Components
import ProgressButton from './progress_button';

const Box = posed.div({
    visible: { opacity: 1, transform: "scale(1)", transitionDuration: "0.7s"},
    hidden: { opacity: 0, transform: "scale(0)" }
  });


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        this.setState({
            visible: true
        })
    }
    render(){
        return(
            <div className="home_container flex_r_nowrap align_center justify_center">
                <Box className="action_container" pose={this.state.visible ? "visible": "hidden"}>
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
                </Box>
            </div>
        )
    }
}