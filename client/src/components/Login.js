import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';

export class Login extends Component {
  state = {
    redirect: false
  }

  componentWillMount() {
    const { isAuthenticated } = this.props;

    this.setState({ redirect: isAuthenticated });
  }

  render() {
    const { errorMessage } = this.props;
    const { redirect } = this.state;

    return redirect ? 
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
          <input 
            type='text' 
            ref='username' 
            className="form-control" 
            placeholder='Username'
          />
          <input 
            type='password' 
            ref='password' 
            className="form-control" 
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