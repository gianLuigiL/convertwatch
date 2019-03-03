import React, { Component } from 'react';
import { Route} from "react-router-dom";

import "./app_main.scss";
//import About from './about';
import Home from "./home";
import InitialCurrency from './initial_currency';
import TargetCurrency from './target_currency';
import PercentageSelect from './percentage_select';
import About from "./about.jsx";

import DonePage from './done';

export default class AppMain extends Component {
  render() {
    return (
      <main>
        <div className="container">
          <Route path="/"  exact render={props => <Home next_section="/start" />}/>
          <Route path="/start"  exact render={props => <InitialCurrency {...this.props} next_section="/target" />}/>
          <Route path="/target"  exact render={props => <TargetCurrency {...this.props}  next_section="/percentage"/>} />
          <Route path="/percentage"  exact render={props => <PercentageSelect {...this.props} next_section="/done"/>}/>
          <Route path="/done" exact  render={props => <DonePage {...this.props} />}/>
          <Route path="/about" exact  render={props => <About />}/>
        </div>
      </main>
    )
  }
}
