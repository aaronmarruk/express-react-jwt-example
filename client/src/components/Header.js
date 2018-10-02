import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal">Example App</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link 
          className="p-2 text-dark" 
          to="/"
        >
          Home
        </Link>
        <Link 
          className="p-2 text-dark" 
          to="/login"
        >
          Login
        </Link>
        <Link 
          className="p-2 text-dark" 
          to="/signup"
        >
          Sign up
        </Link>
        <Link 
          className="p-2 text-dark" 
          to="/profile"
        >
          Profile
        </Link>
      </nav>
      {/* <a className="btn btn-outline-primary" href="#">Sign up</a> */}
    </div>
  </header>
)

export default Header;