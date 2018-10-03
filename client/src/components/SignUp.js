import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { signUpUser } from '../actions/userActions';

export class SignUp extends Component {
  render() {
    const { errorMessage, isAuthenticated } = this.props;

    return isAuthenticated ? 
      (
        <Redirect to='/profile'/>
      ) :
      (
        <div>
          {errorMessage &&
            <div 
              className="alert alert-danger" 
              role="alert"
            >
              {errorMessage}
            </div>
          }
          <h4>Sign up</h4>
          <input 
            type='text' 
            ref='username' 
            className="form-control mb-2" 
            placeholder='Username'
          />
          <input 
            type='password' 
            ref='password' 
            className="form-control mb-2" 
            placeholder='Password'
          />
          
          <button 
            onClick={(event) => this.handleClick(event)} 
            className="btn btn-primary"
          >
            Sign up
          </button>
        </div>
      )
  }

  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password

    const credentials = { 
      username: username.value.trim(), 
      password: password.value.trim(), 
    };

    this.props.signUpUser(credentials)    
  }
}

const mapStateToProps = (state) => {
  return { 
    errorMessage: state.getIn(['userReducer', 'errorMessage']),
    isAuthenticated: state.getIn(['userReducer', 'isAuthenticated']),
  };
};

export default connect(mapStateToProps, { signUpUser })(SignUp);