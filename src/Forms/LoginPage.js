import React from 'react';
import CreateNewUser from './CreateNewUser';
import SignInForm from './SignInForm';
import AuthDetails from './AuthDetails';

export default function LoginPage() {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1> LOGIN </h1>
          <p> Please enter your login and password! </p>
        </div>
        <div className="body">
          <SignInForm />
        </div>

        <div className="footer">
          <p> Create New User Link</p>
          <p> Forget Password Link</p>
          <div className="thirdPartyUrl"></div>
        </div>
      </div>
    </div>
  );
}
