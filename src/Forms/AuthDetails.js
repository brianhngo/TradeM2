import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

export default function AuthDetails() {
  // storing the User Info as a state
  const [authUser, setAuthUser] = useState(null);

  // Once the page is loaded. It checks the auth token, If true. It will
  //Update out state variable with User Info.
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  // Logout Handler. Using Firebase built in signout function (token)
  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log('You are signed out');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p> {`Signed In as ${authUser.email}`}</p>
          <button onClick={logOutHandler}> Log Out </button>
        </>
      ) : (
        <p> Signed Out</p>
      )}
    </div>
  );
}
