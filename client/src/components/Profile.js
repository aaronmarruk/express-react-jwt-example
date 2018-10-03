import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getUser } from '../actions/userActions';

export class Profile extends Component {
  componentWillMount() {
    const { getUser } = this.props;

    getUser();
  }

  render() {
    const { successMessage, isAuthenticated, user } = this.props;

    return !isAuthenticated ? 
      (
        <Redirect to='/login'/>
      ) :
      (
        <div>
          {successMessage &&
            <div 
              className="alert alert-success" 
              role="alert"
            >
              {successMessage}
            </div>
          }
          <div className="container">
            <div className="py-5 px-5">
              <h2>Authenticated route!</h2>
              <p className="lead">If you are reading this in your web browser then you have signed in successfully.</p>
              <p className="lead">The data below is passed from the Express server into our reducer via redux actions.</p>
            </div>
            {!!user && (
              <div className="py-5 px-5">
                <h4>Username</h4>
                <p className="lead">{user.email}</p>
                <h4>Profile</h4>
                <p className="lead">{user.profile}</p>
              </div>
            )}
          </div>
        </div>
      )
  }
}

  
const mapStateToProps = (state) => {
  return { 
    user: state.getIn(['userReducer', 'user']),
    successMessage: state.getIn(['userReducer', 'successMessage']),
    isAuthenticated: state.getIn(['userReducer', 'isAuthenticated']),
  };
};

export default connect(mapStateToProps, { getUser })(Profile);