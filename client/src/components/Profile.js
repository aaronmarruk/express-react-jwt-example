import React from 'react';
import { connect } from 'react-redux';

const Profile = ({ successMessage }) => (
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
      <div className="py-5 px-5 text-center">
        <h2>Authenticated route!</h2>
        <p className="lead">If you are reading this in your web browser then you have signed in successfully.</p>

        <p className="lead">This route is protected in the client by Redux. The data is also protected by Express on the backend.</p>
      </div>
    </div>
  </div>
)
  
const mapStateToProps = (state) => {
  return { 
    successMessage: state.getIn(['userReducer', 'successMessage']),
  };
};

export default connect(mapStateToProps)(Profile);