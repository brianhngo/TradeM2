import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
export default function CreateNewUser() {
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
    // Fills in the empty Token with Email and Password after checking if email doesn't exist
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <form onSubmit={submitHandler}>
        <h1> Create New User</h1>
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          name="email"
          onChange={emailHandler}
          value={email}
          placeholder="Enter your email"></input>
        <label htmlFor="password"> Password </label>
        {/* // Has to be length >= 6 */}
        <input
          type="password"
          name="password"
          onChange={passwordHandler}
          value={password}
          placeholder="Enter your password"></input>
        <button> Submit </button>
      </form>
    </main>
  );
}
