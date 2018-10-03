import React, { Component } from 'react';
import { connect } from 'react-redux';
import { demoAction, getDemoJSON } from './actions/demoActions'
import { loginUser, logoutUser, signUpUser } from './actions/userActions'
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  demoAction = (event) => {
    this.props.demoAction();
  }

  render() {
    return(
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <Header />
        <Main />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    userReducer: state.get('userReducer'), 
    demoReducer: state.get('demoReducer'),
  };
};

export default connect(
  mapStateToProps, 
  {demoAction, getDemoJSON, loginUser, logoutUser, signUpUser}
)(App);

