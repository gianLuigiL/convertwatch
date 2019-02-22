import React from 'react'
import AppHeader from './app_header';
import AppFooter from './app_footer';
import AppMain from './app_main';

import pick from "lodash/pick";
import { getRatios } from "../converter_functions";



async function getCurrencies(){
  const results = await (await fetch(`https://api.exchangeratesapi.io/latest`)).json();
  return results;
}

//Currencies to retrieve and result 
const allowed_currencies = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK" ,"ZAR", "RUB"];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currencies: [],
      initial_currency: null,
      target_currency: null,
      margin: 0,
      max_margin: 10,
      min_margin: 0,
      email: null,
      is_valid_email: false,
      terms_accepted: false
    }

    this.set_initial_currency = this.set_initial_currency.bind(this);
    this.set_target_currency = this.set_target_currency.bind(this);
    this.increase_margin = this.increase_margin.bind(this);
    this.decrease_margin = this.decrease_margin.bind(this);
    this.accept_terms = this.accept_terms.bind(this);
    this.set_email = this.set_email.bind(this);
  }

  componentDidMount(){

    getCurrencies()
    .then(currencies => {
      currencies.rates.EUR = 1;
      console.log(currencies);
      this.setState({
        currencies: Object.entries(pick(currencies.rates, allowed_currencies)),
      });

      console.log(getRatios(currencies))
    });
  }

  render(){
    return (
      <>
        <AppHeader />
        <AppMain 
          initial_currency={this.state.initial_currency}
          target_currency={this.state.target_currency}
          currencies={this.state.currencies} 

          set_initial_currency={this.set_initial_currency}
          set_target_currency={this.set_target_currency}

          increase_margin={this.increase_margin}
          decrease_margin={this.decrease_margin}
          margin={this.state.margin}

          accept_terms={this.accept_terms}
          set_email={this.set_email}
        />
        <AppFooter />
      </>
    )
  }

  set_initial_currency({target: {value}}){
    //If the value is injected or is forced into being the same as the target, return.
    if( !allowed_currencies.includes(value) || value === this.state.target_currency ) {
      return;
    }
    this.setState({
      initial_currency: value
    });
  }

  set_target_currency({target: {value}}){
    //If the value is injected or is forced into being the same as the initial, return.
    if( !allowed_currencies.includes(value) || value === this.state.target_currency ) {
      return;
    }
    this.setState({
      target_currency: value
    })
  }

  increase_margin(){
    if(this.state.margin === this.state.max_margin) return;
    this.setState({
      margin: this.state.margin + 1
    })
  }

  decrease_margin(){
    if(this.state.margin === this.state.min_margin) return;
    this.setState({
      margin: this.state.margin - 1
    })
  }

  set_email(email){
    if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      this.setState({
        is_valid_email: false
      })
    } else {
      this.setState({
        email,
        is_valid_email: true
      })
    }
  }

  accept_terms(e){
    if(typeof e.target.checked !== "boolean") {
      return;
    }
    this.setState({
      terms_accepted: e.target.checked
    })
  }
}