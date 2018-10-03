import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';

export class Login extends Component {
  state = {
    redirect: false
  }

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
          <h4>Login</h4>
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
            Login
          </button>
        </div>
      )
  }

  handleClick(event) {
    const { password, username } = this.refs;

    this.props.loginUser({ 
      username: username.value.trim(), 
      password: password.value.trim(), 
    })
  }
}

const mapStateToProps = (state) => {
  return { 
    errorMessage: state.getIn(['userReducer', 'errorMessage']),
    isAuthenticated: state.getIn(['userReducer', 'isAuthenticated']),
  };
};

export default connect(mapStateToProps, { loginUser })(Login);