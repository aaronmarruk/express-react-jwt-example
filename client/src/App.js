import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { demoAction, getDemoJSON } from './actions/demoActions'
import { loginUser, logoutUser, signUpUser } from './actions/userActions'

import './App.css';

import Header from './components/Header';
import Main from './components/Main';

const mapStateToProps = (state) => {
  console.log('THE STATE!!!', state.toJS());
  return { 
    userReducer: state.get('userReducer'), 
    demoReducer: state.get('demoReducer'),
  };
};

// class DemoJSON extends Component {
//   static propTypes = {
//     getDemoJSON: PropTypes.func.isRequired,
//   };

//   componentWillMount() {
//     console.log('This component mounts?');
//     this.getJSON();
//   }

//   getJSON = () => {
//     const { getDemoJSON } = this.props;

//     getDemoJSON();
//   }

//   render() {
//     const { demoJSON } = this.props;

//     return (
//       <pre>
//         {
//           JSON.stringify(demoJSON)
//         }
//       </pre>
//     );
//   }
// }

class App extends Component {
  demoAction = (event) => {
    this.props.demoAction();
  }

  render() {
    return(
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

    // const { getDemoJSON } = this.props;
    // console.log('THE PROPS!!!!!', this.props.userReducer);
    // const isAuthenticated = this.props.userReducer.getIn('isAuthenticated');
    // const errorMessage = this.props.userReducer.get('errorMessage');
    // const { loginUser, logoutUser, signUpUser } = this.props;
    // <Header />
    // <Main />
    // return (
    //   <Router>
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <h1 className="App-title">Welcome to React</h1>
    //         <MainMenu />
    //       </header>
    //       <div>
    //         {!isAuthenticated &&
    //           <div>
    //             <Login
    //               errorMessage={errorMessage}
    //               onLoginClick={ creds => loginUser(creds) }
    //             />
    //             <hr />
    //             <SignUp
    //               errorMessage={errorMessage}
    //               onSignUpClick={ creds => signUpUser(creds) }
    //             />
    //           </div>
    //         }

    //         {isAuthenticated &&
    //           <Logout onLogoutClick={() => logoutUser()} />
    //         }
    //         <Route exact path="/" component={Home} />
    //         <Route exact path="/about" component={Login} />
    //         <Route exact path="/code" component={SignUp} />
    //         <Route exact path="/contact" component={Profile} />
          
    //         <button onClick={this.demoAction}>Test redux action</button>
    //         <pre>
    //           {/* {
    //             this.props.demoReducer.toJSON()
    //           } */}
    //         </pre>
    //         <DemoJSON 
    //           getDemoJSON={getDemoJSON}
    //         />
    //       </div>
    //     </div>
    //   </Router>
    // );





export class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props

    return (
      <button onClick={() => onLogoutClick()} className="btn btn-primary">
        Logout
      </button>
    )
  }
}

export default connect(mapStateToProps, {demoAction, getDemoJSON, loginUser, logoutUser, signUpUser})(App);

