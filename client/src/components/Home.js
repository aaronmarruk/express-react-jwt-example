import React from 'react';
import { connect } from 'react-redux';

const Home = ({ errorMessage, successMessage }) => (
  <div>
    {errorMessage &&
      <div 
        className="alert alert-danger" 
        role="alert"
      >
        {errorMessage}
      </div>
    }
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
        <h2>
          Express + React + Redux + JWT Authentication
        </h2>
        <p 
          className="lead"
        >
          An example application demonstrating user authentication using Express.js (using the Passport package) on the backend, and handling user flow using React and Redux on the front-end.
        </p>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return { 
    errorMessage: state.getIn(['userReducer', 'errorMessage']),
    successMessage: state.getIn(['userReducer', 'successMessage']),
  };
};

export default connect(mapStateToProps)(Home);