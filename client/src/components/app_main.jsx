//Base dependencies
import React from 'react';
//Route rendering dependencies
import { Route} from "react-router-dom";
//Styles
import "./app_main.scss";
//Components
import About from "./about.jsx";
import DonePage from './done';
import Home from "./home";
import InitialCurrency from './initial_currency';
import PercentageSelect from './percentage_select';
import TargetCurrency from './target_currency';


export default class AppMain extends React.Component {
  render() {
    return (
      <main>
        <div className="container">
          {/* Home doesn't need props */}
          <Route path="/"  exact render={props => <Home next_section="/start" />}/>
          {/* Initial currency selection */}
          <Route path="/start"  exact render={props => <InitialCurrency {...this.props} next_section="/target" />}/>
          {/* Target currency selection */}
          <Route path="/target"  exact render={props => <TargetCurrency {...this.props}  next_section="/percentage"/>} />
          {/* Margin value selection */}
          <Route path="/percentage"  exact render={props => <PercentageSelect {...this.props} next_section="/done"/>}/>
          {/* Last screen in user journey */}
          <Route path="/done" exact  render={props => <DonePage {...this.props} />}/>
          {/* About page doesn't need props */}
          <Route path="/about" exact  render={props => <About />}/>
        </div>
      </main>
    )
  }
}
