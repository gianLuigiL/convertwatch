import React, { Component } from 'react';
import "./app_main.scss";
import About from './about';
export default class AppMain extends Component {
  render() {
    return (
      <main class="spacer">
        <About />
      </main>
    )
  }
}
