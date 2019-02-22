import React, { Component } from 'react';
import "./app_main.scss";
//import About from './about';
import InitialCurrency from './initial_currency';
import TargetCurrency from './target_currency';
import PercentageSelect from './percentage_select';
import Confirm from './confirm';
import DonePage from './done';

export default class AppMain extends Component {
  render() {
    return (
      <main className="spacer">
        <div className="container">
            <InitialCurrency {...this.props} />
            <TargetCurrency {...this.props} />
            <PercentageSelect {...this.props} />
            <Confirm {...this.props} change_handler={this.props.accept_terms}/>
            <DonePage {...this.props} />
        { //<About />
        }
        </div>
      </main>
    )
  }
}
