import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo-image.png';
import { Routes } from 'utils/routes';
import './Auth.scss';

const Auth = () => {
  return (
    <div className="h-screen">
      <div className="half-background half-background-top" />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={logo} alt="logo" className="logo" />
        <nav className="flex flex-col">
          <Link to={Routes.Login} className="auth-link mt-12 mb-6">
            <span>Login</span>
          </Link>
          <Link to={Routes.Register} className="auth-link">
            <span>Sign Up</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Auth;
