import React from 'react'
import AppHeader from './app_header';
import AppFooter from './app_footer';
import AppMain from './app_main';
import { withRouter } from "react-router-dom";
//Currencies to retrieve and result 
import currencies_details from "../currencies/currencies_details";

import { getRatios } from "../helper/converter_functions";

//Array of symbols of the supported currencies
const allowed_currencies = currencies_details.map(el => el.symbol);

const sorted_currencies = currencies_details.sort( (a, b) => a.symbol.charCodeAt(0) - b.symbol.charCodeAt(0) )

async function getCurrencies(){
  const results = await (await fetch(`https://api.exchangeratesapi.io/latest`)).json();
  return results;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //Don't load anything until resource gets available
      currencies: [],
      initial_currency: null,
      target_currency: null,
      margin: 0,
      max_margin: 10,
      min_margin: 0,
      margin_value: 1,
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
    this.submit_data = this.submit_data.bind(this);
  }

  componentDidMount(){
    //Redirect if the page has been loaded to a valid address but without required data
    if(!this.state.initial_currency) {
      this.props.history.push("/")
    }

    getCurrencies()
    .then(currencies => {
      //Set the base ratios to eur base
      const eur_based_ratios = {...currencies.rates, EUR: 1};
      //Set currencies only when they have returned to prevent unmatching results
      this.setState({
        currencies: currencies_details,
        currency_rates: getRatios(eur_based_ratios)
      });
    }).catch(err => {
      //Retry to retrieve results or alert the user
      getCurrencies()
      .then(currencies => {
        currencies.rates.EUR = 1;
        this.setState({
          currencies: sorted_currencies,
          currency_rates: getRatios(currencies)
        })
      }).catch(err => {
        console.log(err);
        alert("Something went wrong while trying to reach the European Central Bank. Please reload and try again.");
      })
    })
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
            min_margin={this.state.min_margin}
            max_margin={this.state.max_margin}
            margin_value={this.state.margin_value}
            get_suggestion={this.get_suggestion}

            accept_terms={this.accept_terms}
            terms_accepted={this.state.terms_accepted}

            email={this.state.email}
            set_email={this.set_email}

            submit_data={this.submit_data}
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
    if( !allowed_currencies.includes(value) || value === this.state.initial_currency) {
      return;
    }
    const current_ratio = this.state.currency_rates[this.state.initial_currency][value];
    this.setState({
      target_currency: value,
      margin_value: current_ratio
    })
  }

  increase_margin(){
    const current_ratio = this.state.currency_rates[this.state.initial_currency][this.state.target_currency];
    //Return if the margin is out of bounds or if the currencies are not set
    if(this.state.margin === this.state.max_margin || (!this.state.initial_currency && !this.state.target_currency)) return false;
    this.setState({
      margin: this.state.margin + 1,
      margin_value: +current_ratio + current_ratio * ( ( this.state.margin + 1 ) / 100 )
    })
  }

  decrease_margin(){
    const current_ratio = this.state.currency_rates[this.state.initial_currency][this.state.target_currency];
    if(this.state.margin === this.state.min_margin || (!this.state.initial_currency && !this.state.target_currency)) return false;
    this.setState({
      margin: this.state.margin - 1,
      margin_value: +current_ratio + current_ratio * ( ( this.state.margin - 1 ) / 100 )
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

  submit_data(){
    const {initial_currency, target_currency, margin_value, email } = this.state;
    const body = JSON.stringify({initial_currency, target_currency, margin_value, email});
    fetch("/add_entry",{
      method: "POST",
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-from-browser": window ? true : false
      },
      body
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => {
      alert("something went wrong, the page will now reload");
      this.props.history.push("/")
    })
  }
}

export default withRouter(App);