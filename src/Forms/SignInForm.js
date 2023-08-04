import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Checks the token to see if the Username and Password associated to token matches input
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="loginBody">
      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          onChange={emailHandler}
          value={email}
          placeholder="Email"></input>

        <input
          type="password"
          name="password"
          onChange={passwordHandler}
          value={password}
          placeholder="Password"></input>
        <button> Submit </button>
      </form>
    </section>
  );
}
