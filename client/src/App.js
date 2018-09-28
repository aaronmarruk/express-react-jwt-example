import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { demoAction, getDemoJSON } from './actions/demoActions'

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

class DemoJSON extends Component {
  static propTypes = {
    getDemoJSON: PropTypes.func.isRequired,
  };

  componentWillMount() {
    console.log('This component mounts?');
    this.getJSON();
  }

  getJSON = () => {
    const { getDemoJSON } = this.props;

    getDemoJSON();
  }

  render() {
    const { demoJSON } = this.props;

    return (
      <pre>
        {
          JSON.stringify(demoJSON)
        }
      </pre>
    );
  }
}

class App extends Component {
  demoAction = (event) => {
    this.props.demoAction();
  }

  componentWillUpdate() {
    console.log('This props', this.props.demoReducer && this.props.demoReducer.toJSON());
  }

  render() {
    const { getDemoJSON } = this.props;

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
              {/* {
                this.props.demoReducer.toJSON()
              } */}
            </pre>
            <DemoJSON 
              getDemoJSON={getDemoJSON}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, {demoAction, getDemoJSON})(App);

