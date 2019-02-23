import React, { Component } from 'react';
import { Route} from "react-router-dom";

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
          <Route path="/" render={props => <InitialCurrency {...this.props} />}/>
          <Route path="/target" render={props => <TargetCurrency {...this.props} />}/>
          <Route path="/percentage" render={props => <PercentageSelect {...this.props} />}/>
          <Route path="/confirm" render={props => <Confirm {...this.props} change_handler={this.props.accept_terms}/>}/>
          <Route path="/done" render={props => <DonePage {...this.props} />}/>
        { //<About />
        }
        </div>
      </main>
    )
  }
}
