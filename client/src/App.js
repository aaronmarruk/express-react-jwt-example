import React, { Component } from 'react';
import { connect } from 'react-redux';

import { demoAction } from './actions/demoActions'

import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const mapStateToProps = state => ({
  ...state
});

const MainMenu = () => (
  <div>
    <Link to="/">
      <button>home</button>
    </Link>
    <Link to="/about">
      <button>About</button>
    </Link>
    <Link to="/code">
      <button>code</button>
    </Link>
    <Link to="/contact">
      <button>contact</button>
    </Link>
    <Link to="/info">
      <button>info</button>
    </Link>
  </div>
)

const Home = () => (
  <div>
    Home
  </div>
)

const About = () => (
  <div>
    About
  </div>
)

const Code = () => (
  <div>
    Code
  </div>
)

const Contact = () => (
  <div>
    Contact
  </div>
)

const Info = () => (
  <div>
    info
  </div>
)

class App extends Component {
  demoAction = (event) => {
    this.props.demoAction();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <MainMenu />
          </header>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/code" component={Code} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/info" component={Info} />
            <button onClick={this.demoAction}>Test redux action</button>
            <pre>
              {
                JSON.stringify(this.props)
              }
            </pre>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, {demoAction})(App);

