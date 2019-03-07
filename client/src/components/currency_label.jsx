import React from 'react'


export default class CurrencyLabel extends React.Component {
    constructor(props){
        super(props);
        
        this.assistiveClick = this.assistiveClick.bind(this);
        this.state = {
            delay: this.props.delay,
            visible: false
        }
    }

    componentDidMount(){
        setTimeout( () => {
            this.setState({visible: true})
        } ,this.state.delay);
    }

    //Helps user navigating with the keyboard to trigger events
    assistiveClick(e){
        //Works both with spacebar and enter
        if(e.key === "Enter" || e.keyCode === 32) {
            const input = e.target.getElementsByTagName("input")[0];
            if(input) {
                input.checked = true;
                const value = input.value;
                this.props.changeHandler({target: {value}});
            }              
        }                      
    }

    render(){
        //Load symbol of the currency
        const image = require("../assets/images/currency_icons/" + this.props.symbol.toLowerCase() + ".svg");

        return (
            <label key={this.props.symbol} 
                    className={`currency_option ${this.state.visible ? "visible" : ""}`}  
                    onKeyDown={this.assistiveClick} 
                    htmlFor={this.props.symbol} tabIndex="0">
                <input  type="radio" 
                        name="currency" 
                        id={this.props.symbol} 
                        value={this.props.symbol}
                        checked={this.props.symbol === this.props.target}
                        onChange={this.props.changeHandler}
                        tabIndex="0"
                        />
                <span className="align_center">
                    <span className="currency_image">
                        <img src={image} alt={this.props.name + " currency symbol"}/>
                    </span>
                    <span className="currency_symbol">{this.props.symbol}</span> 
                    <span className="currency_name">{this.props.name}</span>
                </span>
            </label>
        )
    }
}