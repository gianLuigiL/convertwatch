import React from 'react'
import AppHeader from './app_header';
import AppFooter from './app_footer';
import AppMain from './app_main';

const currencies = ["usd", "eur", "jpy", "gbp", "aud", "cad", "chf", "cnh", "sek" ,"zar", "rub"];

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {currencies}
  }

  render(){
    return (
      <>
        <AppHeader />
        <AppMain currencies={currencies}/>
        <AppFooter />
      </>
    )
  }
}