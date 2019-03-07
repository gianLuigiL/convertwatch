//Base dependencies
import React from 'react'
//Styles
import "./App.scss";
//Roter dependencies
import { withRouter } from "react-router-dom";
//Components
import AppHeader from './app_header';
import AppFooter from './app_footer';
import AppMain from './app_main';
//Helper function
import { get_rates } from "../helper/converter_functions";
//Currencies to retrieve and result 
import currencies_details from "../currencies/currencies_details";


//Array of symbols of the supported currencies
const allowed_currencies = currencies_details.map(el => el.symbol);

const sorted_currencies = currencies_details.sort( (a, b) => a.symbol.charCodeAt(0) - b.symbol.charCodeAt(0) )

//Used to conenct to the API
async function get_currencies(){
  try {
    const results = await (await fetch(`https://api.exchangeratesapi.io/latest`)).json();
    return results;
  } catch (error) {
    console.log(error)
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //Don't load anything until currencies are available
      currencies: [],
      currency_rates: {},
      initial_currency: null,
      target_currency: null,
      //Margin in %
      margin: 0,
      max_margin: 10,
      min_margin: 0,
      //Placeholder float for real conversion between starting and target currency
      original_margin_value: 1.0,
      //Target margin as float
      margin_value: 1.0,
      email: null,
      is_valid_email: false,
      terms_accepted: false,
      //Backup for pristine state
      initial_state: null
    }

    this.set_initial_currency = this.set_initial_currency.bind(this);
    this.set_target_currency = this.set_target_currency.bind(this);
    this.increase_margin = this.increase_margin.bind(this);
    this.decrease_margin = this.decrease_margin.bind(this);
    this.accept_terms = this.accept_terms.bind(this);
    this.set_email = this.set_email.bind(this);
    this.submit_data = this.submit_data.bind(this);
    this.reset_state = this.reset_state.bind(this);
  }

  componentDidMount(){ 

    //Redirect if the page has been loaded to a valid address but without required data
    if(!this.state.initial_currency) {
      this.props.history.push("/")
    }

    get_currencies()
    .then(currencies => {
      //API responds with EUR based rates, inject base 1:1 rate for EUR
      const eur_based_rates = {...currencies.rates, EUR: 1};
      //Set currencies only when they are available
      this.setState({
        currencies: currencies_details,
        //Computes and stores rates in every base currency not only EUR
        currency_rates: get_rates(eur_based_rates)
      });

      this.setState({
        //Make a backup of the blank state to reset it later
        initial_state: {...this.state}
      })
    }).catch(err => {
      //Retry to retrieve results or log error
      get_currencies()
      .then(currencies => {
        const eur_based_rates = {...currencies.rates, EUR: 1};
        this.setState({
          currencies: sorted_currencies,
          currency_rates: get_rates(eur_based_rates)
        })
      }).catch(err => {
        console.log(err);
      })
    })
  }

  render(){
    return (
      <div className="app">
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
          original_margin_value={this.state.original_margin_value}
          margin_value={this.state.margin_value}
          get_suggestion={this.get_suggestion}

          accept_terms={this.accept_terms}
          terms_accepted={this.state.terms_accepted}

          email={this.state.email}
          set_email={this.set_email}

          submit_data={this.submit_data}
          reset_state={this.reset_state}
        />
        <AppFooter />
      </div>
    )
  }

  /**
   * Set the initial currency symbol into the app state.
   * @param {event} event The event object or an object with a target property that has a value property. 
   */
  set_initial_currency({target: {value}}){
    //If the value is injected or is forced into being the same as the target, return.
    if( !allowed_currencies.includes(value) || value === this.state.target_currency ) {
      return;
    }
    this.setState({
      initial_currency: value
    });
  }

  /**
   * Set the target currency symbol into the app state.
   * @param {event} event The event object or an object with a target property that has a value property. 
   * @returns {undefined}
   */
  set_target_currency({target: {value}}){
    //If the value is injected or is forced into being the same as the initial, return.
    if( !allowed_currencies.includes(value) || value === this.state.initial_currency) {
      return;
    }
    //Acces the exchange value for 1 initial currency unit to X target currency unit
    const current_rate = this.state.currency_rates[this.state.initial_currency][value];
    this.setState({
      target_currency: value,
      //Set the original margin value
      original_margin_value: +current_rate,
      //Set a placeholder for future goal amrgin value
      margin_value: +current_rate
    })
  }

  /**
   * Increase the margin % as int and its margin target as float.
   * @returns {undefined}
   */
  increase_margin(){
    //Current float exchange value for 1 initial_currency to X target_currency
    const current_rate = this.state.original_margin_value;
    //Return if the margin is out of bounds or if the currencies are not set
    if(this.state.margin === this.state.max_margin || 
      (!this.state.initial_currency && !this.state.target_currency)) return false;

    this.setState({
      //Set int margin %
      margin: this.state.margin + 1,
      //Set float margin value
      margin_value: +current_rate + current_rate * ( ( this.state.margin + 1 ) / 100 )
    })
  }

  /**
   * Decrease the margin % as int and its margin target as float.
   * @returns {undefined}
   */
  decrease_margin(){
    const current_rate = this.state.original_margin_value;
        //Return if the margin is out of bounds or if the currencies are not set
    if(this.state.margin === this.state.min_margin || 
      (!this.state.initial_currency && !this.state.target_currency)) return false;

    this.setState({
      //Set int margin %
      margin: this.state.margin - 1,
      //Set float margin value
      margin_value: +current_rate + current_rate * ( ( this.state.margin - 1 ) / 100 )
    })
  }

  /**
   * Tests the email and set validity flags and the email itself in state.
   * @param {string} email The entry email to be saved.
   * @returns {undefined}
   */

  set_email(email){
    //If doesn't pass format
    if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      //Flag it
      this.setState({
        is_valid_email: false
      })
    } else {
      //Save it
      this.setState({
        email,
        is_valid_email: true
      })
    }
  }

  /**
   * Linked to "accept terms" input. Can set both true and false.
   * @param {any} event The event object. 
   */
  accept_terms(e){
    if(typeof e.target.checked !== "boolean") {
      return;
    }
    this.setState({
      terms_accepted: e.target.checked
    })
  }

  /**
   * Creates an entry and submits the data in JSON format.
   * @param {any} event The event object. 
   */
  submit_data(e){
    e.preventDefault();
    //Extract values
    const {initial_currency, target_currency, margin_value, email } = this.state;
    const body = JSON.stringify({initial_currency, target_currency, margin_value, email});
    fetch("/add_entry",{
      method: "POST",
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body
    })
    .then(res => res.text())
    .then(res => {
      //When the backend API responds go to the next session
      this.props.history.push("/done");
    })
    .catch(err => {
      console.log(err);
      this.props.history.push("/")
    })
  }

  /**
   * Reset state to its initial configuration
   * @returns {undefined}
   */
  reset_state(){
    if(this.state.initial_state) {
      this.setState({
        ...this.state.initial_state
      });
    }
  }
}

//Export component with ability to navigate programmatically
export default withRouter(App);