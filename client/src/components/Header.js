import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';

class Header extends Component {
  handleLogout = () => {
    const { logoutUser } = this.props;

    logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <header>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <Link 
            className="p-2 text-dark my-0 mr-md-auto " 
            to="/"
          >
            <h5 className="font-weight-normal my-0">Example App</h5>
          </Link>
          
          <nav className="my-2 my-md-0 mr-md-3">
            <Link 
              className="p-2 text-dark" 
              to="/"
            >
              Home
            </Link>
            { !isAuthenticated && (
              <Link 
                className="p-2 text-dark" 
                to="/login"
              >
                Login
              </Link>
            )}
            { !isAuthenticated && (
              <Link 
                className="p-2 text-dark" 
                to="/signup"
              >
                Sign up
              </Link>
            )}
            { !!isAuthenticated && (
              <Link 
                className="p-2 text-dark" 
                to="/profile"
              >
                Profile
              </Link>
            )}
            { !!isAuthenticated && (
              <button 
                className="btn btn-outline-primary" 
                onClick={() => this.handleLogout()}
              >
                Log out
              </button> 
            )} 

          </nav>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    isAuthenticated: state.getIn(['userReducer', 'isAuthenticated']),
  };
};

export default connect(mapStateToProps, { logoutUser })(Header);